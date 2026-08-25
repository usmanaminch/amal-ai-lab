import OpenAI from "openai";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function parseForm(req) {
  const form = formidable({
    multiples: true,
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

function fileToImageContent(file) {
  if (!file) return null;
  const imageBuffer = fs.readFileSync(file.filepath);
  const base64Image = imageBuffer.toString("base64");
  const mimeType = file.mimetype || "image/jpeg";

  return {
    type: "input_image",
    image_url: `data:${mimeType};base64,${base64Image}`,
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "Missing OPENAI_API_KEY environment variable." });
    }

    const { fields, files } = await parseForm(req);

    const productPhoto = Array.isArray(files.productPhoto) ? files.productPhoto[0] : files.productPhoto;
    const lookPhoto = Array.isArray(files.lookPhoto) ? files.lookPhoto[0] : files.lookPhoto;

    const routine = firstValue(fields.routine);
    const goal = firstValue(fields.goal);
    const style = firstValue(fields.style);
    const concerns = firstValue(fields.concerns);
    const experience = firstValue(fields.experience);

    const content = [
      {
        type: "input_text",
        text: `
You are Glow Guide AI, a kind makeup routine helper for Amal's website.

The user may upload:
1. A photo of makeup products.
2. A photo of the final makeup look.

User details:
- Makeup routine: ${routine}
- Makeup goal: ${goal}
- Makeup style: ${style}
- What they want help with: ${concerns}
- Experience level: ${experience}

Give helpful makeup advice, but be kind and age-appropriate.

Important rules:
- Do NOT judge facial attractiveness.
- Do NOT shame skin, face shape, acne, features, or natural appearance.
- Focus only on makeup technique, product use, color harmony, blending, routine order, and practical improvements.
- Do not diagnose skin conditions.
- Suggest general product types, not expensive must-buy items.
- If the final look photo is unclear, say what you can and cannot tell.
- Keep advice positive and encouraging.

Return ONLY valid JSON. No markdown.

Format:
{
  "openingMessage": "short friendly chat-style response",
  "productRead": "what products you can see or infer from the product photo",
  "whatLooksGood": ["short point", "short point", "short point"],
  "improvements": ["short practical tip", "short practical tip", "short practical tip"],
  "routineOrder": ["step 1", "step 2", "step 3", "step 4", "step 5"],
  "productSuggestions": ["general product type", "general product type", "general product type"],
  "nextTimePlan": "short plan for the next makeup try",
  "confidenceNote": "short note about photo clarity or limits"
}
        `,
      },
    ];

    const productImage = fileToImageContent(productPhoto);
    const lookImage = fileToImageContent(lookPhoto);

    if (productImage) content.push(productImage);
    if (lookImage) content.push(lookImage);

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content,
        },
      ],
      temperature: 0.7,
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
      error: "Glow Guide AI had trouble giving advice. Please try again.",
      details: error.message,
    });
  }
}
