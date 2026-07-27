import formidable from "formidable";
import fs from "node:fs/promises";
import OpenAI from "openai";

export const config = { api: { bodyParser: false }, maxDuration: 300 };
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST with a roomPhoto file." });

  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "OPENAI_API_KEY is missing in Vercel Environment Variables." });
    }

    const { fields, files } = await parseMultipartForm(req);
    const roomFile = Array.isArray(files.roomPhoto) ? files.roomPhoto[0] : files.roomPhoto;
    if (!roomFile) return res.status(400).json({ error: "No roomPhoto file uploaded." });

    const imageBuffer = await fs.readFile(roomFile.filepath);
    const mimeType = roomFile.mimetype || "image/jpeg";
    const imageDataUrl = `data:${mimeType};base64,${imageBuffer.toString("base64")}`;

    const preferences = {
      roomType: readField(fields.roomType, "bedroom"),
      style: readField(fields.style, "cozy modern"),
      budget: readField(fields.budget, "small budget"),
      colors: readField(fields.colors, ""),
      keep: readField(fields.keep, ""),
      avoid: readField(fields.avoid, ""),
      goal: readField(fields.goal, "make the room look nicer and more organized")
    };

    const decorPlan = await createDecorPlan(imageDataUrl, preferences);
    const designs = await generateDecorImages(decorPlan.designs);

    res.status(200).json({
      summary: decorPlan.summary,
      advice: decorPlan.advice,
      designs
    });
  } catch (error) {
    console.error("Decor AI error:", error);
    res.status(500).json({ error: "Decor AI backend failed.", detail: error?.message || String(error) });
  }
}

function parseMultipartForm(req) {
  const form = formidable({
    multiples: false,
    maxFiles: 1,
    maxFileSize: 8 * 1024 * 1024,
    keepExtensions: true
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (error, fields, files) => error ? reject(error) : resolve({ fields, files }));
  });
}

function readField(fields, name, fallback) {
  const value = fields[name];
  if (Array.isArray(value)) return value[0] || fallback;
  return value || fallback;
}

async function createDecorPlan(imageDataUrl, preferences) {
  const prompt = `
You are a kid-friendly AI decor helper for a student website.

Look at the uploaded room photo and make a room makeover plan.

Rules:
- Do not identify any person in the image.
- If people appear, ignore identity and focus only on room/decor.
- Keep advice practical, safe, affordable, and age-appropriate.
- Do not suggest construction, electrical work, heavy lifting, or anything unsafe.
- Give exactly 3 short advice sentences.
- Create exactly 4 decor design options.
- Each design must include title, color palette, what to move/change, decor items, why it works, and an image prompt.
- Image prompts should generate a room makeover preview inspired by the uploaded room, not an exact duplicate.
- No readable text in generated images.

Room preferences:
Room type: ${preferences.roomType}
Style: ${preferences.style}
Budget: ${preferences.budget}
Favorite colors: ${preferences.colors || "use colors that fit the room"}
Keep: ${preferences.keep || "keep useful existing pieces"}
Avoid: ${preferences.avoid || "nothing specific"}
Goal: ${preferences.goal}

Return JSON only:
{
  "summary": "one short sentence about the room style goal",
  "advice": ["sentence 1", "sentence 2", "sentence 3"],
  "designs": [
    {
      "rank": 1,
      "title": "short design title",
      "palette": "3-5 colors",
      "changes": "what to move or change",
      "decorItems": "decor items to add",
      "why": "why this design works",
      "imagePrompt": "prompt for a generated room makeover preview, no text"
    }
  ]
}

Need exactly 4 designs.
`;

  const response = await client.responses.create({
    model: process.env.OPENAI_VISION_MODEL || "gpt-4.1-mini",
    input: [
      {
        role: "user",
        content: [
          { type: "input_text", text: prompt },
          { type: "input_image", image_url: imageDataUrl, detail: "low" }
        ]
      }
    ],
    text: { format: { type: "json_object" } }
  });

  const parsed = JSON.parse(response.output_text || "{}");
  const rawDesigns = Array.isArray(parsed.designs) ? parsed.designs : [];

  const designs = [0, 1, 2, 3].map((_, index) => {
    const item = rawDesigns[index] || {};
    return {
      rank: Number(item.rank || index + 1),
      title: String(item.title || `Decor Idea ${index + 1}`),
      palette: String(item.palette || "soft neutrals, light blue, warm white"),
      changes: String(item.changes || "Tidy the layout, clear surfaces, and create a more balanced room setup."),
      decorItems: String(item.decorItems || "A lamp, small rug, wall art, storage basket, and cozy pillow."),
      why: String(item.why || "This works because it makes the room feel calmer, cleaner, and more organized."),
      imagePrompt: String(item.imagePrompt || "A cozy modern room makeover preview, soft pastel colors, organized layout, no text.")
    };
  });

  return {
    summary: String(parsed.summary || "AI made room decor ideas based on the photo and style choices."),
    advice: normalizeArray(parsed.advice, 3, "Make one simple decor change at a time and keep the room safe and organized."),
    designs
  };
}

async function generateDecorImages(designs) {
  const requests = designs.map(async (design) => {
    const prompt = `
${design.imagePrompt}

Create one polished room decor makeover preview for: ${design.title}.
Room should feel kid-friendly/student-friendly, clean, cozy, and realistic.
Include the palette: ${design.palette}.
Include decor ideas such as: ${design.decorItems}.
No readable text, no logos, no people, no unsafe construction.
Make it a beautiful website-card image.
`;

    const image = await client.images.generate({
      model: process.env.OPENAI_IMAGE_MODEL || "gpt-image-1",
      prompt,
      size: "1024x1024",
      quality: "low"
    });

    const first = image.data?.[0];

    return {
      ...design,
      imageDataUrl: first?.b64_json ? `data:image/png;base64,${first.b64_json}` : first?.url || ""
    };
  });

  return Promise.all(requests);
}

function normalizeArray(value, desiredLength, fallback) {
  let items = Array.isArray(value) ? value : [String(value || fallback)];
  items = items.filter(Boolean).map(item => String(item).trim()).filter(Boolean);
  while (items.length < desiredLength) items.push(fallback);
  return items.slice(0, desiredLength);
}
