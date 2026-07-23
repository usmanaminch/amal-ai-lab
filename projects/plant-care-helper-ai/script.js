const photoInput = document.getElementById("plant-photo");
const photoPreview = document.getElementById("photo-preview");
const askAIButton = document.getElementById("ask-ai");
const adviceBox = document.getElementById("ai-advice");
const statusBox = document.getElementById("status");

let selectedFile = null;

photoInput.addEventListener("change", event => {
  const file = event.target.files[0];
  if (!file) return;

  selectedFile = file;
  const reader = new FileReader();

  reader.onload = () => {
    photoPreview.innerHTML = `<img src="${reader.result}" alt="Uploaded plant preview">`;
    statusBox.textContent = "Plant picture added. Ready for AI.";
    statusBox.className = "status-box success";
  };

  reader.readAsDataURL(file);
});

function renderAdvice(advice) {
  const sentences = Array.isArray(advice) ? advice.slice(0, 3) : [String(advice || "")];
  while (sentences.length < 3) {
    sentences.push("Keep checking the plant every few days and compare new photos.");
  }

  adviceBox.innerHTML = sentences
    .slice(0, 3)
    .map(sentence => `<p>${sentence}</p>`)
    .join("");
}

function renderWeeks(weeks) {
  const cards = Array.from(document.querySelectorAll(".week-card"));

  cards.forEach((card, index) => {
    const week = weeks[index];
    const imageBox = card.querySelector(".week-image");
    const textBox = card.querySelector(".week-text");

    if (!week) {
      imageBox.textContent = "AI image missing";
      textBox.textContent = "AI week plan missing.";
      return;
    }

    const src = week.imageDataUrl || week.imageUrl || week.image || "";

    if (src) {
      imageBox.classList.remove("empty");
      imageBox.innerHTML = `<img src="${src}" alt="AI generated Week ${index + 1} plant preview">`;
    } else {
      imageBox.textContent = "AI image not returned";
    }

    textBox.textContent = week.caption || `Week ${index + 1} care step returned by AI.`;
  });
}

async function analyzePlant() {
  if (!selectedFile) {
    statusBox.textContent = "Please upload a plant picture first.";
    statusBox.className = "status-box error";
    return;
  }

  askAIButton.disabled = true;
  statusBox.textContent = "AI is looking at the plant and generating Week 1–5 pictures. This can take up to a minute.";
  statusBox.className = "status-box";

  try {
    const formData = new FormData();
    formData.append("plantPhoto", selectedFile);

    const response = await fetch(window.PLANT_AI_API_URL, {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.detail || result.error || `Backend returned ${response.status}`);
    }

    renderAdvice(result.advice);
    renderWeeks(result.weeks || []);

    statusBox.textContent = "AI analysis complete.";
    statusBox.className = "status-box success";
  } catch (error) {
    console.error(error);
    statusBox.textContent = "AI backend error. Ask Dad to check Vercel logs.";
    statusBox.className = "status-box error";
    adviceBox.innerHTML = `
      <p>The website reached the AI button, but the backend returned an error.</p>
      <p>Dad should open Vercel → Logs and check the latest function error.</p>
      <p>${error.message}</p>
    `;
  } finally {
    askAIButton.disabled = false;
  }
}

askAIButton.addEventListener("click", analyzePlant);
