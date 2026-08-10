import OpenAI from "openai";

export const config = { maxDuration: 60 };
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const fallbackPrompts = [
  { title: "Technology and Friendship", prompt: "Some people believe technology helps friendships grow, while others believe it makes people more distant. Write an essay explaining your opinion and supporting it with examples.", type: "Argumentative", skills: ["Claim", "Evidence", "Reasoning"] },
  { title: "A Challenge That Teaches You", prompt: "Write an essay about a challenge that can teach someone an important lesson. Explain the challenge, the lesson, and why it matters.", type: "Expository", skills: ["Organization", "Details", "Reflection"] },
  { title: "Student Choice", prompt: "Should students have more choice in what they learn at school? Write an essay arguing your position with clear reasons and examples.", type: "Persuasive", skills: ["Thesis", "Examples", "Conclusion"] }
];

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST." });

  try {
    if (!process.env.OPENAI_API_KEY) return res.status(200).json(randomFallback());

    const body = await readJson(req);
    const level = body.level || "Middle School";
    const type = body.type || "Mixed";
    const topic = body.topic || "surprise me";

    const response = await client.responses.create({
      model: process.env.OPENAI_TEXT_MODEL || "gpt-4.1-mini",
      input: [
        { role: "system", content: "Create age-appropriate essay prompts for a student writing practice app. Return JSON only." },
        { role: "user", content: `Create one fresh essay prompt for ${level}. Essay type: ${type}. Topic preference: ${topic}. The student has a 2000 character limit, so keep the prompt focused. Do not ask for private personal information. Return JSON only with title, prompt, type, and skills array of 3 items.` }
      ],
      text: { format: { type: "json_object" } }
    });

    const parsed = JSON.parse(response.output_text || "{}");
    res.status(200).json({
      title: String(parsed.title || "Essay Practice Prompt"),
      prompt: String(parsed.prompt || randomFallback().prompt),
      type: String(parsed.type || type),
      skills: Array.isArray(parsed.skills) ? parsed.skills.slice(0, 3).map(String) : ["Thesis", "Evidence", "Organization"]
    });
  } catch (error) {
    console.error("Prompt AI error:", error);
    res.status(200).json(randomFallback());
  }
}

function randomFallback() {
  return fallbackPrompts[Math.floor(Math.random() * fallbackPrompts.length)];
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", chunk => data += chunk);
    req.on("end", () => {
      try { resolve(data ? JSON.parse(data) : {}); } catch (error) { reject(error); }
    });
    req.on("error", reject);
  });
}
