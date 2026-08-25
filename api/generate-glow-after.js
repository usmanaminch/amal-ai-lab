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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "Missing OPENAI_API_KEY." });
    }

    const { fields, files } = await parseForm(req);

    const lookPhoto = Array.isArray(files.lookPhoto) ? files.lookPhoto[0] : files.lookPhoto;

    if (!lookPhoto) {
      return res.status(400).json({ error: "Please upload a final makeup look photo first." });
    }

    const goal = firstValue(fields.goal);
    const style = firstValue(fields.style);
    const routine = firstValue(fields.routine);
    const concerns = firstValue(fields.concerns);

    const prompt = `
Create a realistic after-makeup preview based on this uploaded photo.

Keep the same person, pose, face shape, expression, skin tone, hair, background, and identity.
Only adjust makeup styling.

Makeup goal: ${goal}
Preferred style: ${style}
Routine used: ${routine}
User wants help with: ${concerns}

Apply subtle, age-appropriate makeup improvements:
- smoother blending
- more balanced blush placement
- softly enhanced lips
- neat lashes or eye definition
- cohesive colors
- natural glow

Do not change facial features, age, body, skin texture drastically, hairstyle, clothing, or background.
Do not make the person look like a different person.
Do not sexualize the image.
Keep it kind, realistic, and natural.
`;

    const result = await openai.images.edit({
      model: "gpt-image-1",
      image: fs.createReadStream(lookPhoto.filepath),
      prompt,
      size: "1024x1024"
    });

    const imageBase64 = result.data?.[0]?.b64_json;

    if (!imageBase64) {
      return res.status(500).json({ error: "No image returned from AI." });
    }

    return res.status(200).json({
      afterImage: `data:image/png;base64,${imageBase64}`
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Glow Guide had trouble creating the after preview.",
      details: error.message,
    });
  }
}
