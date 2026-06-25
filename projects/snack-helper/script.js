const mood = document.getElementById("mood");
const snackType = document.getElementById("snack-type");
const time = document.getElementById("time");
const tools = document.getElementById("tools");
const ingredients = document.getElementById("ingredients");
const avoid = document.getElementById("avoid");

const createPromptButton = document.getElementById("create-prompt");
const aiPrompt = document.getElementById("ai-prompt");
const aiResult = document.getElementById("ai-result");
const makeSnacksButton = document.getElementById("make-snacks");
const snackResults = document.getElementById("snack-results");

function createSnackPrompt() {
  aiPrompt.value = `You are helping with an educational Snack Helper project for a student.

Use the student's answers to suggest 3 simple snack ideas.

Please keep the snacks kid-friendly, safe, and realistic. If a snack needs cutting, stove, oven, or anything risky, clearly say adult help is needed.

Use this exact format so the website can organize it:

SNACK 1:
Name:
Why it fits:
Ingredients:
Steps:
Safety note:

SNACK 2:
Name:
Why it fits:
Ingredients:
Steps:
Safety note:

SNACK 3:
Name:
Why it fits:
Ingredients:
Steps:
Safety note:

SNACK TIPS:
- Give 3 short snack tips.

Student preferences:
- Snack mood: ${mood.value}
- Snack type: ${snackType.value}
- Time available: ${time.value}
- Kitchen level: ${tools.value}
- Ingredients at home: ${ingredients.value || "not provided"}
- Avoid / allergies / dislikes: ${avoid.value || "nothing listed"}

Do not suggest anything unsafe. Avoid any ingredient listed in avoid/allergies/dislikes.`;
}

function extractName(snackText, fallback) {
  const nameMatch = snackText.match(/Name:\s*([^\n]+)/i);
  return nameMatch ? nameMatch[1].trim() : fallback;
}

function addSnackCard(title, text) {
  const card = document.createElement("article");
  card.className = "result-card";

  const heading = document.createElement("h3");
  heading.textContent = title;

  const body = document.createElement("p");
  body.textContent = text.trim();

  card.appendChild(heading);
  card.appendChild(body);
  snackResults.appendChild(card);
}

function buildSnackCards() {
  const result = aiResult.value.trim();
  snackResults.innerHTML = "";

  if (!result) {
    addSnackCard("Paste AI result first", "Copy the snack prompt into ChatGPT or Gemini, then paste the snack ideas here.");
    return;
  }

  const snackMatches = [...result.matchAll(/SNACK\s*([1-3])\s*:\s*([\s\S]*?)(?=SNACK\s*[1-3]\s*:|SNACK TIPS:|$)/gi)];

  if (snackMatches.length > 0) {
    snackMatches.forEach((match) => {
      const snackText = match[2];
      const name = extractName(snackText, `Snack ${match[1]}`);
      addSnackCard(name, snackText);
    });

    const tipsMatch = result.match(/SNACK TIPS:\s*([\s\S]*)/i);
    if (tipsMatch) {
      addSnackCard("Snack Tips", tipsMatch[1]);
    }
  } else {
    addSnackCard("AI Snack Ideas", result);
  }

  addSnackCard("Safety Reminder", "Ask an adult before using knives, stove, oven, blender, or anything that could be unsafe. Always avoid allergy foods.");
}

createPromptButton.addEventListener("click", createSnackPrompt);
makeSnacksButton.addEventListener("click", buildSnackCards);
