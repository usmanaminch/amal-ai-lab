const photoInput = document.getElementById("room-photo");
const photoPreview = document.getElementById("photo-preview");
const askAIButton = document.getElementById("ask-ai");
const statusBox = document.getElementById("status");
const summaryBox = document.getElementById("summary");
const adviceBox = document.getElementById("ai-advice");

let selectedFile = null;

photoInput.addEventListener("change", event => {
  const file = event.target.files[0];
  if (!file) return;

  selectedFile = file;
  const reader = new FileReader();

  reader.onload = () => {
    photoPreview.innerHTML = `<img src="${reader.result}" alt="Uploaded room preview">`;
    statusBox.textContent = "Room photo added. Ready for AI.";
    statusBox.className = "status-box success";
  };

  reader.readAsDataURL(file);
});

function getPreferences() {
  return {
    roomType: document.getElementById("room-type").value,
    style: document.getElementById("style").value,
    budget: document.getElementById("budget").value,
    colors: document.getElementById("colors").value.trim(),
    keep: document.getElementById("keep").value.trim(),
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

function renderAdvice(advice) {
  const sentences = Array.isArray(advice) ? advice.slice(0, 3) : [String(advice || "")];
  while (sentences.length < 3) sentences.push("Make one small safe change at a time.");
  adviceBox.innerHTML = sentences.map(sentence => `<p>${sentence}</p>`).join("");
}

function renderDecor(designs, summary) {
  summaryBox.textContent = summary || "AI made room makeover ideas from your photo.";

  const cards = Array.from(document.querySelectorAll(".decor-card"));

  cards.forEach((card, index) => {
    const design = designs[index];
    if (!design) return;

    const imageSlot = card.querySelector(".image-slot");
    card.querySelector(".rank-badge").textContent = `Idea ${design.rank || index + 1}`;
    card.querySelector("h3").textContent = design.title || "Decor Idea";
    card.querySelector(".palette-text").textContent = `Palette: ${design.palette || "soft colors"}`;
    card.querySelector(".changes-text").textContent = `Changes: ${design.changes || "organize and refresh the room"} · Items: ${design.decorItems || "simple decor pieces"}`;
    card.querySelector(".why-text").textContent = design.why || "AI explained why this works.";

    const src = design.imageDataUrl || design.imageUrl || design.image || "";
    if (src) {
      imageSlot.innerHTML = `<img src="${src}" alt="AI generated decor preview">`;
    } else {
      imageSlot.textContent = "AI image not returned";
    }
  });
}

async function makeDecorPlan() {
  if (!selectedFile) {
    statusBox.textContent = "Please upload a room photo first.";
    statusBox.className = "status-box error";
    return;
  }

  askAIButton.disabled = true;
  statusBox.textContent = "AI is looking at the room and making makeover previews. This can take up to two minutes.";
  statusBox.className = "status-box";

  try {
    const prefs = getPreferences();
    const formData = new FormData();
    formData.append("roomPhoto", selectedFile);

    Object.entries(prefs).forEach(([key, value]) => formData.append(key, value || ""));

    const response = await fetch(window.DECOR_AI_API_URL, { method: "POST", body: formData });
    const result = await safeJson(response);

    if (!response.ok) throw new Error(result.detail || result.error || `Backend returned ${response.status}`);

    renderAdvice(result.advice || []);
    renderDecor(result.designs || [], result.summary);
    statusBox.textContent = "AI decor plan complete.";
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

askAIButton.addEventListener("click", makeDecorPlan);
