import formidable from "formidable";
import fs from "node:fs/promises";
import OpenAI from "openai";

export const config = { api: { bodyParser: false }, maxDuration: 300 };

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST with a closetPhoto file." });

  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "OPENAI_API_KEY is missing in Vercel Environment Variables." });
    }

    const { fields, files } = await parseMultipartForm(req);
    const closetFile = Array.isArray(files.closetPhoto) ? files.closetPhoto[0] : files.closetPhoto;
    if (!closetFile) return res.status(400).json({ error: "No closetPhoto file uploaded." });

    const imageBuffer = await fs.readFile(closetFile.filepath);
    const mimeType = closetFile.mimetype || "image/jpeg";
    const imageDataUrl = `data:${mimeType};base64,${imageBuffer.toString("base64")}`;

    const preferences = {
      style: readField(fields.style, "magazine lookbook"),
      weather: readField(fields.weather, "mixed weather"),
      weekType: readField(fields.weekType, "school and weekend"),
      comfort: readField(fields.comfort, "comfortable but polished"),
      colors: readField(fields.colors, ""),
      avoid: readField(fields.avoid, ""),
      specialDay: readField(fields.specialDay, "")
    };

    const lookbook = await createOutfitPlan(imageDataUrl, preferences);
    const days = await generateOutfitImages(lookbook.days);
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

function readField(fields, name, fallback) {
  const value = fields[name];
  if (Array.isArray(value)) return value[0] || fallback;
  return value || fallback;
}

async function createOutfitPlan(imageDataUrl, preferences) {
  const prompt = `
You are an AI outfit organizer for a kid-friendly/student website.
Look at the uploaded closet or clothing photo. Build a 7-day outfit plan.

Rules:
- Do not identify any person in the image.
- If a person appears, ignore identity and focus only on clothing items.
- Keep everything school-friendly, modest, age-appropriate, practical, and positive.
- Use visible clothing colors/items from the photo when possible.
- Every outfit must be a COMPLETE LOOK.

Every day must include:
- main clothes
- shoes
- purse/bag/backpack or carried item
- jewelry/accessories
- optional finishing touch
- why the outfit works
- one prompt for a generated image showing the full outfit

Generated image prompts must show the COMPLETE outfit clearly:
- top
- bottom/dress/skirt/pants
- outer layer if needed
- shoes
- purse/bag/backpack
- jewelry/accessories
- small finishing touches
- arranged as a stylized magazine lookbook / polished fashion planning board
- no people, no faces, no models, no mannequins, no logos, no text inside the image

User preferences:
Style: ${preferences.style}
Weather: ${preferences.weather}
Week type: ${preferences.weekType}
Comfort: ${preferences.comfort}
Favorite colors: ${preferences.colors || "use colors from closet photo"}
Avoid: ${preferences.avoid || "nothing specific"}
Special day: ${preferences.specialDay || "none"}

Return JSON only in this exact format:
{
  "summary": "one short sentence summary",
  "days": [
    {
      "day": "Monday",
      "title": "short outfit title",
      "clothes": "main clothes",
      "shoes": "shoes",
      "bag": "purse, backpack, or bag",
      "accessories": "jewelry and accessories",
      "finishingTouch": "small extra detail",
      "why": "why the whole outfit works",
      "imagePrompt": "prompt for one complete outfit image"
    }
  ]
}
Need exactly 7 days: Monday through Sunday.
`;

  const response = await client.responses.create({
    model: process.env.OPENAI_VISION_MODEL || "gpt-4.1-mini",
    input: [{ role: "user", content: [{ type: "input_text", text: prompt }, { type: "input_image", image_url: imageDataUrl, detail: "low" }] }],
    text: { format: { type: "json_object" } }
  });

  const parsed = JSON.parse(response.output_text || "{}");
  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const rawDays = Array.isArray(parsed.days) ? parsed.days : [];

  const days = dayNames.map((dayName, index) => {
    const item = rawDays[index] || {};
    return {
      day: String(item.day || dayName),
      title: String(item.title || `${dayName} Complete Look`),
      clothes: String(item.clothes || "A comfortable outfit inspired by the closet photo."),
      shoes: String(item.shoes || "Comfortable matching shoes."),
      bag: String(item.bag || "A matching purse, backpack, or small bag."),
      accessories: String(item.accessories || "Simple jewelry or accessories."),
      finishingTouch: String(item.finishingTouch || "A polished finishing touch."),
      why: String(item.why || "This outfit works because it is balanced, comfortable, and coordinated."),
      imagePrompt: String(item.imagePrompt || "A complete school-friendly outfit flat lay with clothing, shoes, bag, jewelry, and accessories, magazine lookbook style, no people, no text.")
    };
  });

  return { summary: String(parsed.summary || "AI created a complete 7-day lookbook inspired by your closet photo."), days };
}

async function generateOutfitImages(days) {
  const requests = days.map(async (day) => {
    const prompt = `
${day.imagePrompt}

Create ONE polished image for ${day.day}: ${day.title}.
Show a COMPLETE outfit plan with:
- main clothes: ${day.clothes}
- shoes: ${day.shoes}
- bag: ${day.bag}
- jewelry/accessories: ${day.accessories}
- finishing touch: ${day.finishingTouch}

Style: stylized magazine lookbook, elegant outfit organizer board, soft pastel editorial background.
No people, no faces, no models, no mannequins, no text, no logos.
The image must make it obvious what the full outfit is.
`;

    const image = await client.images.generate({ model: process.env.OPENAI_IMAGE_MODEL || "gpt-image-1", prompt, size: "1024x1024", quality: "low" });
    const first = image.data?.[0];
    return { ...day, imageDataUrl: first?.b64_json ? `data:image/png;base64,${first.b64_json}` : first?.url || "" };
  });
  return Promise.all(requests);
}
