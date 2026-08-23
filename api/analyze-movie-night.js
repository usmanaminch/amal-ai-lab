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
    multiples: false,
    keepExtensions: true,
    maxFileSize: 8 * 1024 * 1024,
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
      return res.status(500).json({ error: "Missing OPENAI_API_KEY environment variable." });
    }

    const { fields, files } = await parseForm(req);

    const setupPhoto = Array.isArray(files.photo) ? files.photo[0] : files.photo;
    if (!setupPhoto) {
      return res.status(400).json({ error: "Please upload a TV or movie-night setup photo." });
    }

    const imageBuffer = fs.readFileSync(setupPhoto.filepath);
    const base64Image = imageBuffer.toString("base64");
    const mimeType = setupPhoto.mimetype || "image/jpeg";

    const movieNightType = firstValue(fields.movieNightType);
    const snacks = firstValue(fields.snacks);
    const ages = firstValue(fields.ages);
    const mood = firstValue(fields.mood);
    const avoid = firstValue(fields.avoid);
    const length = firstValue(fields.length);
    const streaming = firstValue(fields.streaming);

    const prompt = `
You are Movie Night Picker AI for Amal's website.

Look at the uploaded TV/movie-night setup photo and use the user's answers to recommend 5 movies.

User answers:
- Type of movie night: ${movieNightType}
- Snacks: ${snacks}
- Ages watching: ${ages}
- Desired mood: ${mood}
- Things to avoid: ${avoid}
- Movie length preference: ${length}
- Streaming services available: ${streaming}

Return ONLY valid JSON. No markdown.

Format:
{
  "setupVibe": "1 short sentence describing the movie-night setup from the photo",
  "bestPick": "movie title",
  "recommendations": [
    {
      "title": "Movie title",
      "ratingFit": "age/vibe fit, not an official rating unless certain",
      "vibe": "short vibe",
      "whyItFits": "2 sentences max",
      "snackPairing": "snack pairing based on user's snacks",
      "whoWillLikeItMost": "who in the group may like it most"
    }
  ],
  "movieNightTip": "one cute practical tip for making the night better"
}

Rules:
- Give exactly 5 recommendations.
- Keep it family-safe when children are included.
- If the user says avoid scary things, avoid horror and intense movies.
- Do not recommend anything extremely adult, graphic, or inappropriate for kids.
- Prefer widely available, recognizable movies.
- Do not claim exact streaming availability unless the user says they have that service and the title is commonly associated with it.
`;

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: prompt },
            {
              type: "input_image",
              image_url: `data:${mimeType};base64,${base64Image}`,
            },
          ],
        },
      ],
      temperature: 0.8,
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
      error: "Movie Night Picker AI had trouble making recommendations. Please try again.",
      details: error.message,
    });
  }
}
