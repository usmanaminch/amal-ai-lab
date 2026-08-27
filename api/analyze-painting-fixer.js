import OpenAI from "openai";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: { bodyParser: false },
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function parseForm(req) {
  const form = formidable({
    multiples: false,
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024,
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

function firstValue(value) {
  if (Array.isArray(value)) return value[0];
  return value || "";
}

function imageContent(file) {
  const buffer = fs.readFileSync(file.filepath);
  const base64 = buffer.toString("base64");
  const mimeType = file.mimetype || "image/jpeg";

  return {
    type: "input_image",
    image_url: `data:${mimeType};base64,${base64}`,
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "Missing OPENAI_API_KEY." });
    }

    const { fields, files } = await parseForm(req);

    const painting = Array.isArray(files.painting) ? files.painting[0] : files.painting;

    if (!painting) {
      return res.status(400).json({ error: "Please upload a painting photo." });
    }

    const artType = firstValue(fields.artType);
    const goal = firstValue(fields.goal);
    const struggle = firstValue(fields.struggle);
    const style = firstValue(fields.style);

    const prompt = `
You are Painting Fixer AI for Amal's website.

Look at the uploaded painting and give kind, useful art feedback.
The app has a watercolor art studio vibe.

User details:
- Painting type: ${artType}
- What they wanted to create: ${goal}
- What they struggled with: ${struggle}
- Preferred style: ${style}

Rules:
- Be kind and encouraging.
- Do not insult the painting.
- Focus on teachable art improvements.
- Give advice about color, composition, shading, contrast, details, water control, and finishing touches.
- Keep it useful for a student artist.
- Do not overcomplicate it.

Return ONLY valid JSON. No markdown.

Format:
{
  "studioMessage": "short friendly opening",
  "score": 85,
  "whatWorks": ["short point", "short point", "short point"],
  "whatToImprove": ["short practical tip", "short practical tip", "short practical tip"],
  "colorAdvice": "short color advice",
  "compositionAdvice": "short composition advice",
  "nextBrushSteps": ["step 1", "step 2", "step 3", "step 4"],
  "previewPlan": "short description of what the improved preview should show"
}
`;

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: prompt },
            imageContent(painting),
          ],
        },
      ],
      temperature: 0.65,
    });

    const text = response.output_text || "";
    let data;

    try {
      data = JSON.parse(text);
    } catch {
      const match = text.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("AI did not return JSON.");
      data = JSON.parse(match[0]);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Painting Fixer AI had trouble reviewing the painting.",
      details: error.message,
    });
  }
}
