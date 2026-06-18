const closetInput = document.getElementById("closet-photo");
const closetPreview = document.getElementById("closet-preview");
const emptyPreview = document.getElementById("empty-preview");
const pasteStatus = document.getElementById("paste-status");
const createPromptButton = document.getElementById("create-prompt");
const aiPrompt = document.getElementById("ai-prompt");
const aiResult = document.getElementById("ai-result");
const makePlanButton = document.getElementById("make-plan");
const outfitPlan = document.getElementById("outfit-plan");

const styleChoice = document.getElementById("style");
const weekType = document.getElementById("week-type");
const weather = document.getElementById("weather");
const comfort = document.getElementById("comfort");
const favoriteColors = document.getElementById("favorite-colors");
const avoid = document.getElementById("avoid");
const notes = document.getElementById("notes");

let closetPhotoName = "";

function showClosetPhoto(file, source) {
  if (!file) return;

  closetPhotoName = file.name || "pasted closet photo";
  closetPreview.src = URL.createObjectURL(file);
  closetPreview.style.display = "block";
  emptyPreview.style.display = "none";

  pasteStatus.textContent = source === "paste"
    ? "Pasted closet image added ✅"
    : "Uploaded closet image added ✅";
  pasteStatus.classList.add("ready");
}

closetInput.addEventListener("change", () => {
  showClosetPhoto(closetInput.files[0], "upload");
});

document.addEventListener("paste", (event) => {
  const items = event.clipboardData?.items || [];
  const imageItem = [...items].find((item) => item.type.startsWith("image/"));

  if (!imageItem) {
    pasteStatus.textContent = "No image found. Copy a closet image first, then press Command + V.";
    pasteStatus.classList.remove("ready");
    return;
  }

  showClosetPhoto(imageItem.getAsFile(), "paste");
});

function createClosetPrompt() {
  const photoLine = closetPhotoName
    ? `- Closet photo added to website preview: ${closetPhotoName}`
    : "- No closet photo preview added yet. The student should attach the closet photo separately.";

  aiPrompt.value = `You are helping with an educational outfit organizer project for a student.

Look at the uploaded closet photo and use the student's style answers to create a 7-day outfit plan.

Please do these things:
1. Identify visible clothing categories from the photo, such as tops, bottoms, jackets, shoes, dresses, and accessories.
2. Notice colors, patterns, and easy-to-match pieces.
3. Ask for uncertainty if some clothes are hard to see.
4. Create a 7-day outfit plan.

Use this exact format so the website can organize it:

DAY 1:
Outfit:
Why it works:

DAY 2:
Outfit:
Why it works:

DAY 3:
Outfit:
Why it works:

DAY 4:
Outfit:
Why it works:

DAY 5:
Outfit:
Why it works:

DAY 6:
Outfit:
Why it works:

DAY 7:
Outfit:
Why it works:

STYLE NOTES:
- Give 3 short tips.

Student preferences:
${photoLine}
- Style: ${styleChoice.value}
- Week type: ${weekType.value}
- Weather: ${weather.value}
- Comfort: ${comfort.value}
- Favorite colors: ${favoriteColors.value || "not provided"}
- Avoid: ${avoid.value || "nothing listed"}
- Special days: ${notes.value || "none listed"}

Do not suggest anything inappropriate, uncomfortable, or too grown-up. Keep the outfits age-appropriate, practical, and comfortable.`;
}

function addDayCard(title, text) {
  const card = document.createElement("article");
  card.className = "day-card";

  const heading = document.createElement("h3");
  heading.textContent = title;

  const body = document.createElement("p");
  body.textContent = text.trim();

  card.appendChild(heading);
  card.appendChild(body);
  outfitPlan.appendChild(card);
}

function makeSevenDayPlan() {
  const result = aiResult.value.trim();
  outfitPlan.innerHTML = "";

  if (!result) {
    addDayCard("Paste AI result first", "Send the closet prompt and closet photo to ChatGPT or Gemini, then paste the answer here.");
    return;
  }

  const dayMatches = [...result.matchAll(/DAY\s*([1-7])\s*:\s*([\s\S]*?)(?=DAY\s*[1-7]\s*:|STYLE NOTES:|$)/gi)];

  if (dayMatches.length > 0) {
    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    dayMatches.forEach((match) => {
      const dayIndex = Number(match[1]) - 1;
      addDayCard(dayNames[dayIndex] || `Day ${match[1]}`, match[2]);
    });

    const notesMatch = result.match(/STYLE NOTES:\s*([\s\S]*)/i);
    if (notesMatch) {
      addDayCard("Style Notes", notesMatch[1]);
    }
  } else {
    addDayCard("AI Outfit Plan", result);
  }

  addDayCard("Safety Note", "This is an educational style helper. Use clothing-only photos and avoid private photos.");
}

createPromptButton.addEventListener("click", createClosetPrompt);
makePlanButton.addEventListener("click", makeSevenDayPlan);
