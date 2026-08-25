const form = document.getElementById("glowForm");
const productPhoto = document.getElementById("productPhoto");
const lookPhoto = document.getElementById("lookPhoto");

const productPreviewWrap = document.getElementById("productPreviewWrap");
const productPreview = document.getElementById("productPreview");
const lookPreviewWrap = document.getElementById("lookPreviewWrap");
const lookPreview = document.getElementById("lookPreview");

const submitBtn = document.getElementById("submitBtn");
const loading = document.getElementById("loading");
const results = document.getElementById("results");

const openingMessage = document.getElementById("openingMessage");
const productRead = document.getElementById("productRead");
const confidenceNote = document.getElementById("confidenceNote");

const whatLooksGood = document.getElementById("whatLooksGood");
const improvements = document.getElementById("improvements");
const routineOrder = document.getElementById("routineOrder");
const productSuggestions = document.getElementById("productSuggestions");
const nextTimePlan = document.getElementById("nextTimePlan");

function previewFile(input, wrap, img) {
  const file = input.files[0];
  if (!file) return;

  img.src = URL.createObjectURL(file);
  wrap.classList.remove("hidden");
}

productPhoto.addEventListener("change", () => {
  previewFile(productPhoto, productPreviewWrap, productPreview);
});

lookPhoto.addEventListener("change", () => {
  previewFile(lookPhoto, lookPreviewWrap, lookPreview);
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  loading.classList.remove("hidden");
  results.classList.add("hidden");
  submitBtn.disabled = true;
  submitBtn.textContent = "Asking Glow Guide...";

  try {
    const response = await fetch("/api/analyze-glow-guide", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong.");
    }

    renderResults(data);
  } catch (error) {
    alert(error.message || "Glow Guide AI had trouble. Please try again.");
  } finally {
    loading.classList.add("hidden");
    submitBtn.disabled = false;
    submitBtn.textContent = "Ask Glow Guide";
  }
});

function renderResults(data) {
  openingMessage.textContent = data.openingMessage || "Here’s your glow advice!";
  productRead.textContent = data.productRead || "";
  confidenceNote.textContent = data.confidenceNote || "";

  renderList(whatLooksGood, data.whatLooksGood);
  renderList(improvements, data.improvements);
  renderList(routineOrder, data.routineOrder);
  renderList(productSuggestions, data.productSuggestions);

  nextTimePlan.textContent = data.nextTimePlan || "Try one small change next time and compare the result.";

  results.classList.remove("hidden");
  results.scrollIntoView({ behavior: "smooth", block: "start" });
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


// Day 39: AI before/after preview
const beforeAfterSection = document.getElementById("beforeAfterSection");
const beforeImage = document.getElementById("beforeImage");
const afterImage = document.getElementById("afterImage");
const afterLoading = document.getElementById("afterLoading");
const generateAfterBtn = document.getElementById("generateAfterBtn");

lookPhoto.addEventListener("change", () => {
  const file = lookPhoto.files[0];
  if (!file) return;

  beforeImage.src = URL.createObjectURL(file);
  beforeAfterSection.classList.remove("hidden");
  afterImage.classList.add("hidden");
  afterImage.removeAttribute("src");
});

generateAfterBtn.addEventListener("click", async () => {
  const file = lookPhoto.files[0];

  if (!file) {
    alert("Upload your final makeup look photo first.");
    return;
  }

  const formData = new FormData(form);

  afterLoading.classList.remove("hidden");
  afterImage.classList.add("hidden");
  generateAfterBtn.disabled = true;
  generateAfterBtn.textContent = "Creating preview...";

  try {
    const response = await fetch("/api/generate-glow-after", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      const message = data.details
        ? `${data.error || "Could not create after preview."}\n\nDetails: ${data.details}`
        : (data.error || "Could not create after preview.");
      throw new Error(message);
    }

    afterImage.src = data.afterImage;
    afterImage.classList.remove("hidden");
  } catch (error) {
    alert(error.message || "Glow Guide could not create the after preview.");
  } finally {
    afterLoading.classList.add("hidden");
    generateAfterBtn.disabled = false;
    generateAfterBtn.textContent = "Create AI After Preview";
  }
});
