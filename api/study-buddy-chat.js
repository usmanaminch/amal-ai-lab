import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "Missing OPENAI_API_KEY." });
    }

    const { subject, topic, mode, messages } = req.body || {};

    const safeMessages = Array.isArray(messages) ? messages.slice(-12) : [];

    const systemPrompt = `
You are Study Buddy Chat AI for Amal's website.

You are a friendly tutor for a student. Help with studying in a warm, clear way.

Subject: ${subject || "General"}
Topic: ${topic || "Not specified"}
Mode: ${mode || "Explain"}

Rules:
- Be encouraging and easy to understand.
- Do not just give answers if the user is practicing homework. Give hints and explain steps.
- If quiz mode is selected, ask one question at a time.
- If the student answers, check it kindly and explain.
- Keep responses short enough for a student.
- Use examples.
- End with either a tiny check question or a next step.
`;

    const input = [
      {
        role: "system",
        content: systemPrompt,
      },
      ...safeMessages.map((msg) => ({
        role: msg.role === "assistant" ? "assistant" : "user",
        content: String(msg.content || ""),
      })),
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: input,
      temperature: 0.65,
    });

    const reply = response.choices?.[0]?.message?.content || "I had trouble answering that. Try again?";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Study Buddy Chat had trouble responding.",
      details: error.message,
    });
  }
}
