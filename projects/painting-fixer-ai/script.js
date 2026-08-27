const form = document.getElementById("paintingForm");
const paintingInput = document.getElementById("painting");
const previewWrap = document.getElementById("previewWrap");
const paintingPreview = document.getElementById("paintingPreview");

const submitBtn = document.getElementById("submitBtn");
const loading = document.getElementById("loading");
const results = document.getElementById("results");

const studioMessage = document.getElementById("studioMessage");
const score = document.getElementById("score");

const beforeImage = document.getElementById("beforeImage");
const afterImage = document.getElementById("afterImage");
const previewLoading = document.getElementById("previewLoading");

const whatWorks = document.getElementById("whatWorks");
const whatToImprove = document.getElementById("whatToImprove");
const colorAdvice = document.getElementById("colorAdvice");
const compositionAdvice = document.getElementById("compositionAdvice");
const nextBrushSteps = document.getElementById("nextBrushSteps");

let latestReview = null;

paintingInput.addEventListener("change", () => {
  const file = paintingInput.files[0];
  if (!file) return;

  const url = URL.createObjectURL(file);
  paintingPreview.src = url;
  beforeImage.src = url;
  previewWrap.classList.remove("hidden");
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  loading.classList.remove("hidden");
  results.classList.add("hidden");
  submitBtn.disabled = true;
  submitBtn.textContent = "Fixing painting...";

  try {
    const reviewResponse = await fetch("/api/analyze-painting-fixer", {
      method: "POST",
      body: formData,
    });

    const review = await reviewResponse.json();

    if (!reviewResponse.ok) {
      const message = review.details
        ? `${review.error}\n\nDetails: ${review.details}`
        : review.error;
      throw new Error(message || "Could not review painting.");
    }

    latestReview = review;
    renderReview(review);

    results.classList.remove("hidden");
    results.scrollIntoView({ behavior: "smooth", block: "start" });

    await generatePreview(review);
  } catch (error) {
    alert(error.message || "Painting Fixer AI had trouble.");
  } finally {
    loading.classList.add("hidden");
    submitBtn.disabled = false;
    submitBtn.textContent = "Fix My Painting";
  }
});

function renderReview(data) {
  studioMessage.textContent = data.studioMessage || "Here’s your painting feedback.";
  score.textContent = data.score || "--";

  renderList(whatWorks, data.whatWorks);
  renderList(whatToImprove, data.whatToImprove);
  colorAdvice.textContent = data.colorAdvice || "";
  compositionAdvice.textContent = data.compositionAdvice || "";
  renderList(nextBrushSteps, data.nextBrushSteps);

  afterImage.classList.add("hidden");
  afterImage.removeAttribute("src");
  previewLoading.classList.remove("hidden");
}

async function generatePreview(review) {
  const formData = new FormData(form);
  formData.append("previewPlan", review.previewPlan || "");

  const response = await fetch("/api/generate-painting-preview", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    const message = data.details
      ? `${data.error}\n\nDetails: ${data.details}`
      : data.error;
    throw new Error(message || "Could not create improved preview.");
  }

  afterImage.src = data.previewImage;
  afterImage.classList.remove("hidden");
  previewLoading.classList.add("hidden");
}

function renderList(element, items) {
  const safeItems = Array.isArray(items) ? items : [];
  element.innerHTML = safeItems.map(item => `<li>${escapeHtml(item)}</li>`).join("");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
