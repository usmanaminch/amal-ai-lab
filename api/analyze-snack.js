import formidable from "formidable";
import fs from "node:fs/promises";
import OpenAI from "openai";

export const config = { api: { bodyParser: false }, maxDuration: 300 };
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST with optional snackPhoto and snack preferences." });

  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "OPENAI_API_KEY is missing in Vercel Environment Variables." });
    }

    const { fields, files } = await parseMultipartForm(req);
    const snackFile = Array.isArray(files.snackPhoto) ? files.snackPhoto[0] : files.snackPhoto;

    let imageDataUrl = null;
    if (snackFile) {
      const imageBuffer = await fs.readFile(snackFile.filepath);
      const mimeType = snackFile.mimetype || "image/jpeg";
      imageDataUrl = `data:${mimeType};base64,${imageBuffer.toString("base64")}`;
    }

    const preferences = {
      mood: readField(fields.mood, "quick and yummy"),
      time: readField(fields.time, "5-10 minutes"),
      type: readField(fields.type, "balanced snack"),
      sweetness: readField(fields.sweetness, "not too sweet"),
      avoid: readField(fields.avoid, ""),
      ingredients: readField(fields.ingredients, ""),
      goal: readField(fields.goal, "make an easy snack with what I have")
    };

    const snackPlan = await createSnackIdeas(imageDataUrl, preferences);
    const snacks = await generateSnackImages(snackPlan.snacks);

    res.status(200).json({
      summary: snackPlan.summary,
      safetyNote: snackPlan.safetyNote,
      snacks
    });
  } catch (error) {
    console.error("Snack AI error:", error);
    res.status(500).json({ error: "Snack AI backend failed.", detail: error?.message || String(error) });
  }
}

function parseMultipartForm(req) {
  const form = formidable({ multiples: false, maxFiles: 1, maxFileSize: 8 * 1024 * 1024, keepExtensions: true });
  return new Promise((resolve, reject) => {
    form.parse(req, (error, fields, files) => error ? reject(error) : resolve({ fields, files }));
  });
}

function readField(fields, name, fallback) {
  const value = fields[name];
  if (Array.isArray(value)) return value[0] || fallback;
  return value || fallback;
}

async function createSnackIdeas(imageDataUrl, preferences) {
  const prompt = `
You are a kid-friendly AI snack helper for a student website.

Goal:
Recommend easy snack ideas based on the uploaded pantry/fridge/snack photo and user preferences.

If a photo is uploaded:
- Look for visible ingredients, snacks, fruit, yogurt, bread, crackers, cheese, nuts, spreads, drinks, etc.
- Do not identify people if any people appear. Focus only on food.
- If the image is unclear, make ideas inspired by visible food and typed preferences.

Safety rules:
- Keep suggestions kid-friendly and simple.
- Avoid unsafe cooking, knives, stovetop, raw meat, alcohol, choking hazards, or risky steps.
- If heat is needed, say to ask an adult.
- Do not give medical/diet advice.
- Respect avoid/allergy text. If the user says avoid something, do not use it.
- Mention checking with an adult for allergies.

Snack preferences:
Mood: ${preferences.mood}
Time: ${preferences.time}
Snack type: ${preferences.type}
Sweetness: ${preferences.sweetness}
Avoid/allergies: ${preferences.avoid || "nothing specific"}
Extra ingredients typed by user: ${preferences.ingredients || "none"}
Goal: ${preferences.goal}

Return JSON only:
{
  "summary": "one short sentence about the snack plan",
  "safetyNote": "one short kid-friendly safety note",
  "snacks": [
    {
      "rank": 1,
      "title": "snack name",
      "ingredients": "ingredients list",
      "steps": "2-4 easy steps",
      "why": "why this snack fits",
      "adultHelp": "yes/no and why",
      "imagePrompt": "prompt for a generated snack preview image, no text"
    }
  ]
}

Need exactly 4 snack ideas.
`;

  const content = [{ type: "input_text", text: prompt }];
  if (imageDataUrl) content.push({ type: "input_image", image_url: imageDataUrl, detail: "low" });

  const response = await client.responses.create({
    model: process.env.OPENAI_VISION_MODEL || "gpt-4.1-mini",
    input: [{ role: "user", content }],
    text: { format: { type: "json_object" } }
  });

  const parsed = JSON.parse(response.output_text || "{}");
  const rawSnacks = Array.isArray(parsed.snacks) ? parsed.snacks : [];

  const snacks = [0, 1, 2, 3].map((_, index) => {
    const item = rawSnacks[index] || {};
    return {
      rank: Number(item.rank || index + 1),
      title: String(item.title || `Snack Idea ${index + 1}`),
      ingredients: String(item.ingredients || "Simple ingredients from the photo or pantry."),
      steps: String(item.steps || "Put the ingredients together, keep it simple, and ask an adult if needed."),
      why: String(item.why || "This snack fits because it is quick, easy, and balanced."),
      adultHelp: String(item.adultHelp || "No, unless using heat or sharp tools."),
      imagePrompt: String(item.imagePrompt || "A colorful kid-friendly snack plate on a clean pastel background, no text, no logos.")
    };
  });

  return {
    summary: String(parsed.summary || "AI made snack ideas based on the photo and preferences."),
    safetyNote: String(parsed.safetyNote || "Check allergies first and ask an adult before using heat or sharp tools."),
    snacks
  };
}

async function generateSnackImages(snacks) {
  const requests = snacks.map(async (snack) => {
    const prompt = `${snack.imagePrompt}

Create one polished snack preview image for: ${snack.title}.
Show the snack clearly as a fun, kid-friendly, appetizing snack plate or bowl.
Ingredients should match: ${snack.ingredients}.
No readable text, no logos, no people, no unsafe tools.
Website-card image, bright, clean, colorful, realistic but playful.`;

    const image = await client.images.generate({
      model: process.env.OPENAI_IMAGE_MODEL || "gpt-image-1",
      prompt,
      size: "1024x1024",
      quality: "low"
    });

    const first = image.data?.[0];
    return {
      ...snack,
      imageDataUrl: first?.b64_json ? `data:image/png;base64,${first.b64_json}` : first?.url || ""
    };
  });

  return Promise.all(requests);
}
