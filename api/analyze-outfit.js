import formidable from "formidable";
import fs from "node:fs/promises";
import OpenAI from "openai";

export const config = { api: { bodyParser: false }, maxDuration: 300 };
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST with a closetPhoto file." });

  try {
    if (!process.env.OPENAI_API_KEY) return res.status(500).json({ error: "OPENAI_API_KEY is missing in Vercel Environment Variables." });

    const { fields, files } = await parseMultipartForm(req);
    const closetFile = Array.isArray(files.closetPhoto) ? files.closetPhoto[0] : files.closetPhoto;
    if (!closetFile) return res.status(400).json({ error: "No closetPhoto file uploaded." });

    const imageBuffer = await fs.readFile(closetFile.filepath);
    const mimeType = closetFile.mimetype || "image/jpeg";
    const imageDataUrl = `data:${mimeType};base64,${imageBuffer.toString("base64")}`;

    const preferences = {
      style: readField(fields.style, "stylized magazine lookbook"),
      weather: readField(fields.weather, "mixed weather"),
      weekType: readField(fields.weekType, "school and weekend"),
      comfort: readField(fields.comfort, "comfortable but polished"),
      colors: readField(fields.colors, "use colors visible in the closet"),
      avoid: readField(fields.avoid, "nothing specific"),
      specialDay: readField(fields.specialDay, "none")
    };

    const lookbook = await analyzeClosetAndPlan(imageDataUrl, preferences);
    const days = await generateOutfitImagesInParallel(lookbook);
    res.status(200).json({ summary: lookbook.summary, days });
  } catch (error) {
    console.error("Outfit AI error:", error);
    res.status(500).json({ error: "Outfit AI backend failed.", detail: error?.message || String(error) });
  }
}

function parseMultipartForm(req) {
  const form = formidable({ multiples: false, maxFiles: 1, maxFileSize: 8 * 1024 * 1024, keepExtensions: true });
  return new Promise((resolve, reject) => {
    form.parse(req, (error, fields, files) => error ? reject(error) : resolve({ fields, files }));
  });
}
function readField(fields, name, fallback) { const value = fields[name]; return Array.isArray(value) ? (value[0] || fallback) : (value || fallback); }

async function analyzeClosetAndPlan(imageDataUrl, preferences) {
  const prompt = `You are a kid-friendly fashion organizer for a student website.
Look at the uploaded closet/clothing photo and create a 7-day outfit lookbook.

Rules:
- Do not identify any person in the photo. If a person appears, ignore identity and focus only on clothing/style.
- Keep outputs modest, age-appropriate, practical, and school-friendly.
- Use clothing that seems visible in the photo when possible.
- If the closet photo is unclear, make reasonable outfit ideas inspired by visible colors/textures.
- The image generation style is Option C: stylized magazine lookbook.
- Generated images should be fashion editorial flat-lay lookbook cards.
- No faces, no people, no body poses, no text inside the image.

User preferences:
- Style: ${preferences.style}
- Weather: ${preferences.weather}
- Week type: ${preferences.weekType}
- Comfort: ${preferences.comfort}
- Favorite colors: ${preferences.colors}
- Avoid: ${preferences.avoid}
- Special day: ${preferences.specialDay}

Return JSON only in this exact shape:
{
  "summary": "one short sentence about the closet style",
  "days": [
    {"day":"Monday","title":"short outfit name","outfit":"what to wear","why":"why it works","imagePrompt":"detailed prompt for a stylized magazine lookbook outfit flat-lay image, no text, no humans"}
  ]
}
Need exactly 7 days: Monday through Sunday.`;

  const response = await client.responses.create({
    model: process.env.OPENAI_VISION_MODEL || "gpt-4.1-mini",
    input: [{ role: "user", content: [{ type: "input_text", text: prompt }, { type: "input_image", image_url: imageDataUrl, detail: "low" }] }],
    text: { format: { type: "json_object" } }
  });
  const parsed = JSON.parse(response.output_text || "{}");
  const names = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  const sourceDays = Array.isArray(parsed.days) ? parsed.days : [];
  const days = names.map((name, i) => {
    const item = sourceDays[i] || {};
    return {
      day: String(item.day || name),
      title: String(item.title || `${name} Outfit`),
      outfit: String(item.outfit || "A comfortable outfit inspired by the closet photo."),
      why: String(item.why || "It balances comfort, color, and a polished look."),
      imagePrompt: String(item.imagePrompt || "Stylized magazine lookbook flat lay of a comfortable school-friendly outfit inspired by a closet photo, pastel editorial background, no text, no people.")
    };
  });
  return { summary: String(parsed.summary || "AI created outfit ideas inspired by your closet photo."), days };
}

async function generateOutfitImagesInParallel(lookbook) {
  const requests = lookbook.days.map(async (day, index) => {
    const finalPrompt = `${day.imagePrompt}\n\nCreate one polished stylized magazine lookbook image for ${day.day}. Show clothing items arranged as a tasteful fashion flat lay on a clean pastel editorial background. No person, no face, no body, no model, no mannequin, no text, no logo-heavy layout. Kid-friendly, modest, stylish, bright, organized, and website-card ready.`;
    const image = await client.images.generate({
      model: process.env.OPENAI_IMAGE_MODEL || "gpt-image-1",
      prompt: finalPrompt,
      size: "1024x1024",
      quality: "low"
    });
    const first = image.data?.[0];
    return { day: day.day, title: day.title, outfit: day.outfit, why: day.why, imageDataUrl: first?.b64_json ? `data:image/png;base64,${first.b64_json}` : first?.url || "" };
  });
  return Promise.all(requests);
}
