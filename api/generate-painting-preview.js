import OpenAI from "openai";
import formidable from "formidable";
import fs from "fs";
import { toFile } from "openai/uploads";

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
    const previewPlan = firstValue(fields.previewPlan);

    const originalName = painting.originalFilename || "painting.png";
    const lowerName = originalName.toLowerCase();

    let mimeType = painting.mimetype;

    if (!mimeType || mimeType === "application/octet-stream") {
      if (lowerName.endsWith(".jpg") || lowerName.endsWith(".jpeg")) {
        mimeType = "image/jpeg";
      } else if (lowerName.endsWith(".webp")) {
        mimeType = "image/webp";
      } else {
        mimeType = "image/png";
      }
    }

    const imageFile = await toFile(
      fs.createReadStream(painting.filepath),
      originalName,
      { type: mimeType }
    );

    const prompt = `
Create an improved preview of this student painting.

Keep the same overall subject, composition, and watercolor art feeling.
Do not make it look like a completely different artwork.
Do not make it hyperrealistic.
Make it look like a polished version of the same painting.

Painting type: ${artType}
Artist goal: ${goal}
Artist struggle: ${struggle}
Preferred style: ${style}
Improvement plan: ${previewPlan}

Improve:
- watercolor softness
- cleaner edges where helpful
- better color harmony
- clearer focal point
- better contrast
- more finished-looking details

Keep it artistic, handmade, and age-appropriate.
`;

    const result = await openai.images.edit({
      model: "gpt-image-1",
      image: imageFile,
      prompt,
      size: "1024x1024",
    });

    const imageBase64 = result.data?.[0]?.b64_json;

    if (!imageBase64) {
      return res.status(500).json({ error: "No preview image returned." });
    }

    return res.status(200).json({
      previewImage: `data:image/png;base64,${imageBase64}`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Painting Fixer AI had trouble creating the improved preview.",
      details: error.message,
    });
  }
}
