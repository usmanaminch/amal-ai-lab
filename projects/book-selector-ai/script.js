const photoInput = document.getElementById("book-photo");
const photoPreview = document.getElementById("photo-preview");
const askAIButton = document.getElementById("ask-ai");
const statusBox = document.getElementById("status");
const summaryBox = document.getElementById("summary");

let selectedFile = null;

photoInput.addEventListener("change", event => {
  const file = event.target.files[0];
  if (!file) return;

  selectedFile = file;
  const reader = new FileReader();

  reader.onload = () => {
    photoPreview.innerHTML = `<img src="${reader.result}" alt="Uploaded book preview">`;
    statusBox.textContent = "Book photo added. Ready for AI.";
    statusBox.className = "status-box success";
  };

  reader.readAsDataURL(file);
});

function getPreferences() {
  return {
    mood: document.getElementById("mood").value,
    genre: document.getElementById("genre").value,
    length: document.getElementById("length").value,
    readerAge: document.getElementById("reader-age").value,
    favorites: document.getElementById("favorites").value.trim(),
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

function renderBooks(picks, summary) {
  summaryBox.textContent = summary || "AI found book ideas based on your reading mood.";
  const cards = Array.from(document.querySelectorAll(".book-card"));

  cards.forEach((card, index) => {
    const pick = picks[index];
    if (!pick) return;

    const imageSlot = card.querySelector(".image-slot");
    card.querySelector(".rank-badge").textContent = `Pick ${pick.rank || index + 1}`;
    card.querySelector("h3").textContent = pick.title || "Book Pick";
    card.querySelector(".author-text").textContent = `Author: ${pick.author || "Author not listed"}`;
    card.querySelector(".why-text").textContent = pick.why || "AI explained why this fits.";
    card.querySelector(".vibe-text").textContent = `Vibe: ${pick.readingVibe || "cozy reading"} · Try if you like: ${pick.tryIfYouLike || "engaging stories"}`;

    const src = pick.imageDataUrl || pick.imageUrl || pick.image || "";
    if (src) {
      imageSlot.innerHTML = `<img src="${src}" alt="AI generated reading vibe image">`;
    } else {
      imageSlot.textContent = "AI image not returned";
    }
  });
}

async function findBooks() {
  askAIButton.disabled = true;
  statusBox.textContent = "AI is choosing books and making reading vibe images. This can take up to two minutes.";
  statusBox.className = "status-box";

  try {
    const prefs = getPreferences();
    const formData = new FormData();

    if (selectedFile) formData.append("bookPhoto", selectedFile);

    Object.entries(prefs).forEach(([key, value]) => formData.append(key, value || ""));

    const response = await fetch(window.BOOK_AI_API_URL, { method: "POST", body: formData });
    const result = await safeJson(response);

    if (!response.ok) throw new Error(result.detail || result.error || `Backend returned ${response.status}`);

    renderBooks(result.picks || [], result.summary);
    statusBox.textContent = "AI book picks complete.";
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

askAIButton.addEventListener("click", findBooks);
