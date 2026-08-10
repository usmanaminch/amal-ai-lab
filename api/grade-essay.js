import OpenAI from "openai";

export const config = { maxDuration: 120 };
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST." });

  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "OPENAI_API_KEY is missing in Vercel Environment Variables." });
    }

    const body = await readJson(req);
    const essay = String(body.essay || "").trim();
    const prompt = String(body.prompt || "").trim();
    const level = String(body.level || "Middle School");
    const essayType = String(body.essayType || "Essay");
    const characterCount = essay.length;

    if (!essay) return res.status(400).json({ error: "Essay is empty." });
    if (characterCount > 2000) return res.status(400).json({ error: "Essay is over the 2000 character limit.", characterCount });

    const response = await client.responses.create({
      model: process.env.OPENAI_TEXT_MODEL || "gpt-4.1-mini",
      input: [
        { role: "system", content: "You are a strict but encouraging essay grader. Grade the student's writing, not their opinion. Do not write the essay for them. Return JSON only." },
        { role: "user", content: `Grade this essay for ${level}. Essay type: ${essayType}.

Prompt:
${prompt}

Essay:
${essay}

Return JSON only:
{
 "score": 0-100,
 "letterGrade": "A+/A/A-/B+/B/B-/C+/C/C-/D/F",
 "gradeExplanation": "2-3 sentences",
 "rubric": { "promptResponse": 0-20, "organization": 0-20, "evidenceAndDetails": 0-20, "clarityAndStyle": 0-20, "grammarAndMechanics": 0-20 },
 "whatYouDidWell": ["strength 1", "strength 2", "strength 3"],
 "whatToImprove": ["improvement 1", "improvement 2", "improvement 3"],
 "revisionAdvice": ["step 1", "step 2", "step 3"],
 "teacherComment": "one encouraging comment"
}` }
      ],
      text: { format: { type: "json_object" } }
    });

    const parsed = JSON.parse(response.output_text || "{}");
    const score = clampScore(parsed.score);

    res.status(200).json({
      score,
      letterGrade: String(parsed.letterGrade || scoreToLetter(score)),
      gradeExplanation: String(parsed.gradeExplanation || "The essay was graded using the rubric."),
      rubric: normalizeRubric(parsed.rubric),
      whatYouDidWell: normalizeArray(parsed.whatYouDidWell, 3, "You responded to the prompt."),
      whatToImprove: normalizeArray(parsed.whatToImprove, 3, "Add more specific examples."),
      revisionAdvice: normalizeArray(parsed.revisionAdvice, 3, "Revise one paragraph at a time."),
      teacherComment: String(parsed.teacherComment || "Keep practicing. Each revision makes your writing stronger."),
      characterCount
    });
  } catch (error) {
    console.error("Essay grading error:", error);
    res.status(500).json({ error: "Essay grading failed.", detail: error?.message || String(error) });
  }
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

function clampScore(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 75;
  return Math.max(0, Math.min(100, Math.round(number)));
}

function scoreToLetter(score) {
  if (score >= 97) return "A+";
  if (score >= 93) return "A";
  if (score >= 90) return "A-";
  if (score >= 87) return "B+";
  if (score >= 83) return "B";
  if (score >= 80) return "B-";
  if (score >= 77) return "C+";
  if (score >= 73) return "C";
  if (score >= 70) return "C-";
  if (score >= 60) return "D";
  return "F";
}

function normalizeRubric(value) {
  const rubric = value && typeof value === "object" ? value : {};
  return {
    promptResponse: clamp20(rubric.promptResponse),
    organization: clamp20(rubric.organization),
    evidenceAndDetails: clamp20(rubric.evidenceAndDetails),
    clarityAndStyle: clamp20(rubric.clarityAndStyle),
    grammarAndMechanics: clamp20(rubric.grammarAndMechanics)
  };
}

function clamp20(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 15;
  return Math.max(0, Math.min(20, Math.round(number)));
}

function normalizeArray(value, count, fallback) {
  let items = Array.isArray(value) ? value : [String(value || fallback)];
  items = items.map(item => String(item).trim()).filter(Boolean);
  while (items.length < count) items.push(fallback);
  return items.slice(0, count);
}
