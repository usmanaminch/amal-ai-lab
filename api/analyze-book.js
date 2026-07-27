import formidable from "formidable";
import fs from "node:fs/promises";
import OpenAI from "openai";

export const config = { api: { bodyParser: false }, maxDuration: 300 };

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST with optional bookPhoto and reader preferences." });

  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "OPENAI_API_KEY is missing in Vercel Environment Variables." });
    }

    const { fields, files } = await parseMultipartForm(req);
    const bookFile = Array.isArray(files.bookPhoto) ? files.bookPhoto[0] : files.bookPhoto;

    let imageDataUrl = null;
    if (bookFile) {
      const imageBuffer = await fs.readFile(bookFile.filepath);
      const mimeType = bookFile.mimetype || "image/jpeg";
      imageDataUrl = `data:${mimeType};base64,${imageBuffer.toString("base64")}`;
    }

    const preferences = {
      mood: readField(fields.mood, "fun and interesting"),
      genre: readField(fields.genre, "surprise me"),
      length: readField(fields.length, "medium"),
      readerAge: readField(fields.readerAge, "middle school"),
      favorites: readField(fields.favorites, ""),
      avoid: readField(fields.avoid, ""),
      goal: readField(fields.goal, "find a book I will actually enjoy")
    };

    const bookPlan = await createBookRecommendations(imageDataUrl, preferences);
    const picks = await generateReadingVibeImages(bookPlan.picks);

    res.status(200).json({ summary: bookPlan.summary, picks });
  } catch (error) {
    console.error("Book AI error:", error);
    res.status(500).json({ error: "Book AI backend failed.", detail: error?.message || String(error) });
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

async function createBookRecommendations(imageDataUrl, preferences) {
  const prompt = `
You are a kid-friendly AI book selector for a student website.

Goal: Recommend books the reader might actually enjoy.

If a book/photo is uploaded:
- Look at the photo for clues such as book covers, book spines, genres, colors, or reading level.
- Do not identify people if any people appear. Focus only on books and reading clues.

Rules:
- Keep recommendations age-appropriate for the reader age.
- Avoid explicit/adult content.
- Give exactly 5 book picks.
- Include a mix of safe popular classics and discovery-style picks when possible.
- If you are not sure about exact visible books, say the picks are inspired by the photo and preferences.
- For image prompts, do NOT ask for real copyrighted book covers or exact cover art.
- Image prompts should create a reading vibe image, not a copy of a real book cover.

Reader preferences:
Mood: ${preferences.mood}
Genre: ${preferences.genre}
Length: ${preferences.length}
Reader age/level: ${preferences.readerAge}
Favorite books/shows/topics: ${preferences.favorites || "none given"}
Avoid: ${preferences.avoid || "nothing specific"}
Reading goal: ${preferences.goal}

Return JSON only:
{
  "summary": "one short sentence about the reader's taste",
  "picks": [
    {
      "rank": 1,
      "title": "book title",
      "author": "author name or unknown",
      "why": "why this book fits",
      "readingVibe": "short vibe description",
      "tryIfYouLike": "one short comparison",
      "imagePrompt": "prompt for a cozy reading vibe image inspired by this recommendation, no real book cover copying, no text"
    }
  ]
}

Need exactly 5 picks.
`;

  const content = [{ type: "input_text", text: prompt }];
  if (imageDataUrl) content.push({ type: "input_image", image_url: imageDataUrl, detail: "low" });

  const response = await client.responses.create({
    model: process.env.OPENAI_VISION_MODEL || "gpt-4.1-mini",
    input: [{ role: "user", content }],
    text: { format: { type: "json_object" } }
  });

  const parsed = JSON.parse(response.output_text || "{}");
  const rawPicks = Array.isArray(parsed.picks) ? parsed.picks : [];

  const picks = [0, 1, 2, 3, 4].map((_, index) => {
    const item = rawPicks[index] || {};
    return {
      rank: Number(item.rank || index + 1),
      title: String(item.title || `Book Pick ${index + 1}`),
      author: String(item.author || "Author not listed"),
      why: String(item.why || "This book matches the reader's mood and reading goal."),
      readingVibe: String(item.readingVibe || "cozy, curious, and fun"),
      tryIfYouLike: String(item.tryIfYouLike || "engaging stories"),
      imagePrompt: String(item.imagePrompt || "A cozy kid-friendly reading nook with a stack of books, warm light, and a magical reading vibe, no text, no real book covers.")
    };
  });

  return {
    summary: String(parsed.summary || "AI found book ideas based on the reader's mood and preferences."),
    picks
  };
}

async function generateReadingVibeImages(picks) {
  const requests = picks.map(async (pick) => {
    const prompt = `
${pick.imagePrompt}

Create ONE polished image for a book recommendation card.
Theme: ${pick.readingVibe}.
Book: ${pick.title} by ${pick.author}.
Show a cozy reading vibe or symbolic scene inspired by the recommendation.
Do not recreate a real book cover.
No readable text. No logos. No people needing identity. Kid-friendly, warm, imaginative, website-card ready.
`;

    const image = await client.images.generate({
      model: process.env.OPENAI_IMAGE_MODEL || "gpt-image-1",
      prompt,
      size: "1024x1024",
      quality: "low"
    });

    const first = image.data?.[0];

    return {
      ...pick,
      imageDataUrl: first?.b64_json ? `data:image/png;base64,${first.b64_json}` : first?.url || ""
    };
  });

  return Promise.all(requests);
}
