const form = document.getElementById("movieForm");
const photoInput = document.getElementById("photo");
const previewWrap = document.getElementById("previewWrap");
const preview = document.getElementById("preview");
const submitBtn = document.getElementById("submitBtn");
const loading = document.getElementById("loading");
const results = document.getElementById("results");
const setupVibe = document.getElementById("setupVibe");
const bestPick = document.getElementById("bestPick");
const movieNightTip = document.getElementById("movieNightTip");
const recommendations = document.getElementById("recommendations");

photoInput.addEventListener("change", () => {
  const file = photoInput.files[0];
  if (!file) return;

  preview.src = URL.createObjectURL(file);
  previewWrap.classList.remove("hidden");
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  loading.classList.remove("hidden");
  results.classList.add("hidden");
  submitBtn.disabled = true;
  submitBtn.textContent = "Picking movies...";

  try {
    const response = await fetch("/api/analyze-movie-night", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong.");
    }

    renderResults(data);
  } catch (error) {
    alert(error.message || "Movie Night Picker AI had trouble. Please try again.");
  } finally {
    loading.classList.add("hidden");
    submitBtn.disabled = false;
    submitBtn.textContent = "Get 5 Movie Picks";
  }
});

function renderResults(data) {
  setupVibe.textContent = data.setupVibe || "A cozy movie night setup.";
  bestPick.textContent = data.bestPick || "One of the picks below";
  movieNightTip.textContent = data.movieNightTip || "";

  recommendations.innerHTML = "";

  const movies = Array.isArray(data.recommendations) ? data.recommendations : [];

  movies.slice(0, 5).forEach((movie) => {
    const card = document.createElement("article");
    const isBest = movie.title === data.bestPick;

    card.className = `movie-card ${isBest ? "best" : ""}`;

    card.innerHTML = `
      ${isBest ? '<span class="badge">Best Pick</span>' : '<span class="badge">Movie Pick</span>'}
      <h3>${escapeHtml(movie.title || "Movie")}</h3>
      <p><strong>Vibe:</strong> ${escapeHtml(movie.vibe || "")}</p>
      <p><strong>Fit:</strong> ${escapeHtml(movie.ratingFit || "")}</p>
      <p><strong>Why it fits:</strong> ${escapeHtml(movie.whyItFits || "")}</p>
      <p><strong>Snack pairing:</strong> ${escapeHtml(movie.snackPairing || "")}</p>
      <p><strong>Who will like it most:</strong> ${escapeHtml(movie.whoWillLikeItMost || "")}</p>
    `;

    recommendations.appendChild(card);
  });

  results.classList.remove("hidden");
  results.scrollIntoView({ behavior: "smooth", block: "start" });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
