const photoInput = document.getElementById("snack-photo");
const photoPreview = document.getElementById("photo-preview");
const askAIButton = document.getElementById("ask-ai");
const statusBox = document.getElementById("status");
const summaryBox = document.getElementById("summary");
const safetyBox = document.getElementById("safety-note");

let selectedFile = null;

photoInput.addEventListener("change", event => {
  const file = event.target.files[0];
  if (!file) return;

  selectedFile = file;
  const reader = new FileReader();

  reader.onload = () => {
    photoPreview.innerHTML = `<img src="${reader.result}" alt="Uploaded snack preview">`;
    statusBox.textContent = "Snack photo added. Ready for AI.";
    statusBox.className = "status-box success";
  };

  reader.readAsDataURL(file);
});

function getPreferences() {
  return {
    mood: document.getElementById("mood").value,
    time: document.getElementById("time").value,
    type: document.getElementById("type").value,
    sweetness: document.getElementById("sweetness").value,
    ingredients: document.getElementById("ingredients").value.trim(),
    avoid: document.getElementById("avoid").value.trim(),
    goal: document.getElementById("goal").value.trim()
  };
}

async function safeJson(response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return { error: "Backend returned a non-JSON error page.", detail: text.slice(0, 500) };
  }
}

function renderSnacks(snacks, summary, safetyNote) {
  summaryBox.textContent = summary || "AI made snack ideas based on your food photo and preferences.";
  safetyBox.textContent = safetyNote || "Check allergies first and ask an adult before using heat or sharp tools.";

  const cards = Array.from(document.querySelectorAll(".snack-card"));

  cards.forEach((card, index) => {
    const snack = snacks[index];
    if (!snack) return;

    const imageSlot = card.querySelector(".image-slot");
    card.querySelector(".rank-badge").textContent = `Snack ${snack.rank || index + 1}`;
    card.querySelector("h3").textContent = snack.title || "Snack Idea";
    card.querySelector(".ingredients-text").textContent = `Ingredients: ${snack.ingredients || "simple pantry ingredients"}`;
    card.querySelector(".steps-text").textContent = `Steps: ${snack.steps || "easy steps returned by AI"} · Adult help: ${snack.adultHelp || "ask if needed"}`;
    card.querySelector(".why-text").textContent = snack.why || "AI explained why this snack works.";

    const src = snack.imageDataUrl || snack.imageUrl || snack.image || "";
    if (src) {
      imageSlot.innerHTML = `<img src="${src}" alt="AI generated snack preview">`;
    } else {
      imageSlot.textContent = "AI image not returned";
    }
  });
}

async function makeSnacks() {
  askAIButton.disabled = true;
  statusBox.textContent = "AI is making snack ideas and preview pictures. This can take up to two minutes.";
  statusBox.className = "status-box";

  try {
    const prefs = getPreferences();
    const formData = new FormData();

    if (selectedFile) formData.append("snackPhoto", selectedFile);
    Object.entries(prefs).forEach(([key, value]) => formData.append(key, value || ""));

    const response = await fetch(window.SNACK_AI_API_URL, { method: "POST", body: formData });
    const result = await safeJson(response);

    if (!response.ok) throw new Error(result.detail || result.error || `Backend returned ${response.status}`);

    renderSnacks(result.snacks || [], result.summary, result.safetyNote);
    statusBox.textContent = "AI snack ideas complete.";
    statusBox.className = "status-box success";
  } catch (error) {
    console.error(error);
    statusBox.textContent = "AI backend error. Ask Dad to check Vercel logs.";
    statusBox.className = "status-box error";
    summaryBox.textContent = error.message;
  } finally {
    askAIButton.disabled = false;
  }
}

askAIButton.addEventListener("click", makeSnacks);
