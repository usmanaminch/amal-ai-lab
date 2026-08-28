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

Subject: ${subject || "General"}
Topic: ${topic || "Not specified"}
Mode: ${mode || "Explain"}

Rules:
- Be friendly, clear, and encouraging.
- Give hints instead of just final answers when it looks like homework.
- If quiz mode is selected, ask one question at a time.
- Keep answers student-friendly and not too long.
- End with a tiny check question or next step.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...safeMessages.map(msg => ({
          role: msg.role === "assistant" ? "assistant" : "user",
          content: String(msg.content || "")
        }))
      ],
      temperature: 0.65,
    });

    return res.status(200).json({
      reply: response.choices?.[0]?.message?.content || "Try asking that again?"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Study Buddy Chat had trouble responding.",
      details: error.message
    });
  }
}
