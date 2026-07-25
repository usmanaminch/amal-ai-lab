const photoInput = document.getElementById("closet-photo");
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
    photoPreview.innerHTML = `<img src="${reader.result}" alt="Uploaded closet preview">`;
    statusBox.textContent = "Closet photo added. Ready for AI.";
    statusBox.className = "status-box success";
  };
  reader.readAsDataURL(file);
});

function getPreferences() {
  return {
    style: document.getElementById("style").value,
    weather: document.getElementById("weather").value,
    weekType: document.getElementById("week-type").value,
    comfort: document.getElementById("comfort").value,
    colors: document.getElementById("colors").value.trim(),
    avoid: document.getElementById("avoid").value.trim(),
    specialDay: document.getElementById("special-day").value.trim()
  };
}

async function safeJson(response) {
  const text = await response.text();
  try { return JSON.parse(text); }
  catch { return { error: "Backend returned a non-JSON error page.", detail: text.slice(0, 500) }; }
}

function renderLookbook(days, summary) {
  summaryBox.textContent = summary || "AI created a 7-day complete-look plan inspired by your closet.";
  const cards = Array.from(document.querySelectorAll(".day-card"));
  cards.forEach((card, index) => {
    const day = days[index];
    if (!day) return;
    card.querySelector(".day-badge").textContent = day.day || `Day ${index + 1}`;
    card.querySelector("h3").textContent = day.title || "Complete Look";
    card.querySelector(".outfit-text").textContent = `Clothes: ${day.clothes || "Outfit idea returned by AI."}`;
    card.querySelector(".detail-text").textContent = `Shoes: ${day.shoes || "matching shoes"} · Bag: ${day.bag || "matching bag"} · Accessories: ${day.accessories || "simple jewelry"} · Finish: ${day.finishingTouch || "polished detail"}`;
    card.querySelector(".why-text").textContent = day.why || "AI explained why this outfit works.";
    const src = day.imageDataUrl || day.imageUrl || day.image || "";
    const imageSlot = card.querySelector(".image-slot");
    imageSlot.innerHTML = src ? `<img src="${src}" alt="${day.day || "Day"} complete outfit image">` : "AI image not returned";
  });
}

async function makeLookbook() {
  if (!selectedFile) {
    statusBox.textContent = "Please upload a closet photo first.";
    statusBox.className = "status-box error";
    return;
  }
  askAIButton.disabled = true;
  statusBox.textContent = "AI is making complete outfits with clothes, shoes, bags, jewelry, and accessories. This can take up to two minutes.";
  statusBox.className = "status-box";
  try {
    const formData = new FormData();
    formData.append("closetPhoto", selectedFile);
    Object.entries(getPreferences()).forEach(([key, value]) => formData.append(key, value || ""));
    const response = await fetch(window.OUTFIT_AI_API_URL, { method: "POST", body: formData });
    const result = await safeJson(response);
    if (!response.ok) throw new Error(result.detail || result.error || `Backend returned ${response.status}`);
    renderLookbook(result.days || [], result.summary);
    statusBox.textContent = "AI complete-look planner finished.";
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
askAIButton.addEventListener("click", makeLookbook);
