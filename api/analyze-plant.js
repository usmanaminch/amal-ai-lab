import formidable from "formidable";
import fs from "node:fs/promises";
import OpenAI from "openai";

export const config = {
  api: {
    bodyParser: false
  },
  maxDuration: 60
};

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Use POST with a plantPhoto file." });
    return;
  }

  try {
    if (!process.env.OPENAI_API_KEY) {
      res.status(500).json({ error: "OPENAI_API_KEY is missing in Vercel Environment Variables." });
      return;
    }

    const { files } = await parseMultipartForm(req);
    const plantFile = Array.isArray(files.plantPhoto) ? files.plantPhoto[0] : files.plantPhoto;

    if (!plantFile) {
      res.status(400).json({ error: "No plantPhoto file uploaded." });
      return;
    }

    const imageBuffer = await fs.readFile(plantFile.filepath);
    const mimeType = plantFile.mimetype || "image/jpeg";
    const imageDataUrl = `data:${mimeType};base64,${imageBuffer.toString("base64")}`;

    const plantPlan = await analyzePlantPhoto(imageDataUrl);
    const weeks = await generateWeekImages(plantPlan);

    res.status(200).json({
      advice: plantPlan.advice,
      weeks
    });
  } catch (error) {
    console.error("Plant AI error:", error);
    res.status(500).json({
      error: "Plant AI backend failed.",
      detail: error?.message || String(error)
    });
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
    form.parse(req, (error, fields, files) => {
      if (error) reject(error);
      else resolve({ fields, files });
    });
  });
}

async function analyzePlantPhoto(imageDataUrl) {
  const prompt = `
You are a kid-friendly plant care helper for an educational website.

Look at the uploaded plant photo. Return JSON only.

Rules:
- The advice must be exactly 3 short sentences.
- Do not call it a professional diagnosis.
- Give safe, practical plant-care advice based on the picture.
- Create 5 week captions, Week 1 through Week 5.
- Create 5 image prompts for generating future plant preview pictures.
- The generated image prompts should be based on what the uploaded plant looks like, but should show gradual improvement from Week 1 to Week 5.
- Keep the style: clean, bright, kid-friendly, pastel mint/blue website image, single potted plant, no people, no text inside image.

Return JSON exactly like this:
{
  "advice": ["sentence 1", "sentence 2", "sentence 3"],
  "weekCaptions": ["week 1 caption", "week 2 caption", "week 3 caption", "week 4 caption", "week 5 caption"],
  "imagePrompts": ["week 1 image prompt", "week 2 image prompt", "week 3 image prompt", "week 4 image prompt", "week 5 image prompt"]
}
`;

  const response = await client.responses.create({
    model: process.env.OPENAI_VISION_MODEL || "gpt-4.1-mini",
    input: [
      {
        role: "user",
        content: [
          { type: "input_text", text: prompt },
          { type: "input_image", image_url: imageDataUrl }
        ]
      }
    ],
    text: {
      format: {
        type: "json_object"
      }
    }
  });

  const rawText = response.output_text || "";
  const parsed = JSON.parse(rawText);

  return {
    advice: normalizeArray(parsed.advice, 3, "Keep checking the plant every few days and compare new photos."),
    weekCaptions: normalizeArray(parsed.weekCaptions, 5, "Keep care steady and watch for healthy new growth."),
    imagePrompts: normalizeArray(parsed.imagePrompts, 5, "A clean pastel website image of a potted houseplant slowly recovering, no text.")
  };
}

async function generateWeekImages(plantPlan) {
  const weeks = [];

  for (let i = 0; i < 5; i += 1) {
    const weekNumber = i + 1;
    const caption = plantPlan.weekCaptions[i];
    const prompt = plantPlan.imagePrompts[i];

    const image = await client.images.generate({
      model: process.env.OPENAI_IMAGE_MODEL || "gpt-image-1",
      prompt,
      size: "1024x1024"
    });

    const first = image.data?.[0];

    weeks.push({
      week: weekNumber,
      caption,
      imageDataUrl: first?.b64_json
        ? `data:image/png;base64,${first.b64_json}`
        : first?.url || ""
    });
  }

  return weeks;
}

function normalizeArray(value, desiredLength, fallback) {
  let items = Array.isArray(value) ? value : [String(value || fallback)];
  items = items.filter(Boolean).map(item => String(item).trim()).filter(Boolean);

  while (items.length < desiredLength) {
    items.push(fallback);
  }

  return items.slice(0, desiredLength);
}
