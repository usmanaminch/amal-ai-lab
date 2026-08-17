const state = {
  step: 0,
  treat: "cupcake",
  ingredients: new Set(),
  mixed: false,
  baked: false,
  decor: []
};

const steps = [
  ["Choose your treat", "Pick what you want to bake today."],
  ["Mix ingredients", "Add flour, sugar, egg, and milk into the mixing bowl."],
  ["Make the treat", "Turn your batter into a treat tray."],
  ["Bake it", "Put it in the warm oven and bake it."],
  ["Decorate it", "Choose frosting, drizzle, sprinkles, or a cherry."],
  ["Bakery reveal", "See your finished bakery special."]
];

const entranceScreen = document.getElementById("entranceScreen");
const simulatorScreen = document.getElementById("simulatorScreen");
const finalScreen = document.getElementById("finalScreen");

const enterBtn = document.getElementById("enterBtn");
const stepLabel = document.getElementById("stepLabel");
const stepTitle = document.getElementById("stepTitle");
const stepText = document.getElementById("stepText");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");

const choiceArea = document.getElementById("choiceArea");
const mixingBowl = document.getElementById("mixingBowl");
const ingredients = document.getElementById("ingredients");
const batter = document.getElementById("batter");
const mixBtn = document.getElementById("mixBtn");
const treatTray = document.getElementById("treatTray");
const rawTreat = document.getElementById("rawTreat");
const ovenTreat = document.getElementById("ovenTreat");
const bakeBtn = document.getElementById("bakeBtn");
const bakeTimer = document.getElementById("bakeTimer");
const timerFill = document.getElementById("timerFill");
const decorateArea = document.getElementById("decorateArea");
const nextBtn = document.getElementById("nextBtn");
const resetBtn = document.getElementById("resetBtn");

const finalTreat = document.getElementById("finalTreat");
const finalTitle = document.getElementById("finalTitle");
const specialName = document.getElementById("specialName");
const specialText = document.getElementById("specialText");
const specialList = document.getElementById("specialList");
const makeAnotherBtn = document.getElementById("makeAnotherBtn");

const treatOptions = [
  ["cupcake", "Cupcake"],
  ["cookie", "Cookie"],
  ["donut", "Donut"]
];

function render() {
  const [title, text] = steps[state.step];
  stepLabel.textContent = `Step ${state.step + 1}`;
  stepTitle.textContent = title;
  stepText.textContent = text;

  const percent = Math.round((state.step / (steps.length - 1)) * 100);
  progressText.textContent = `${percent}%`;
  progressFill.style.width = `${percent}%`;

  choiceArea.innerHTML = "";
  mixingBowl.classList.toggle("hidden", state.step !== 1);
  ingredients.classList.toggle("hidden", state.step !== 1);
  mixBtn.classList.toggle("hidden", state.step !== 1);
  treatTray.classList.toggle("hidden", state.step !== 2);
  bakeBtn.classList.toggle("hidden", state.step !== 3);
  bakeTimer.classList.toggle("hidden", state.step !== 3);
  decorateArea.classList.toggle("hidden", state.step !== 4);

  if (state.step === 0) renderTreatChoices();
  if (state.step === 2) renderRawTreat();
  if (state.step === 3) renderOvenTreat();

  nextBtn.textContent = state.step === 4 ? "Reveal Treat" : "Next";
}

function renderTreatChoices() {
  treatOptions.forEach(([key, label]) => {
    const btn = document.createElement("button");
    btn.className = "choice";
    if (state.treat === key) btn.classList.add("selected");
    btn.textContent = label;
    btn.onclick = () => {
      state.treat = key;
      renderTreatChoices();
    };
    choiceArea.appendChild(btn);
  });
}

function renderRawTreat() {
  rawTreat.className = `raw-treat ${state.treat}`;
}

function renderOvenTreat() {
  ovenTreat.className = `oven-treat visible ${state.treat}`;
}

document.querySelectorAll(".ingredient").forEach(btn => {
  btn.addEventListener("click", () => {
    state.ingredients.add(btn.dataset.ingredient);
    btn.classList.add("added");
    batter.style.height = `${22 + state.ingredients.size * 12}px`;
  });
});

mixBtn.addEventListener("click", () => {
  if (state.ingredients.size < 4) {
    alert("Add all four ingredients first!");
    return;
  }
  state.mixed = true;
  batter.classList.add("mixed");
});

document.querySelectorAll(".decor-choice").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.dataset.decor;
    if (state.decor.includes(item)) {
      state.decor = state.decor.filter(d => d !== item);
      btn.classList.remove("selected");
    } else {
      state.decor.push(item);
      btn.classList.add("selected");
    }
  });
});

bakeBtn.addEventListener("click", () => {
  bakeTimer.classList.remove("hidden");
  timerFill.style.width = "0%";

  setTimeout(() => {
    timerFill.style.transition = "width 1.6s ease";
    timerFill.style.width = "100%";
  }, 50);

  setTimeout(() => {
    state.baked = true;
    alert("Ding! Your treat is baked.");
  }, 1700);
});

nextBtn.addEventListener("click", () => {
  if (state.step === 1 && !state.mixed) {
    alert("Mix your batter first!");
    return;
  }

  if (state.step === 3 && !state.baked) {
    alert("Bake your treat first!");
    return;
  }

  if (state.step === 4) {
    showFinal();
    return;
  }

  state.step++;
  render();
});

resetBtn.addEventListener("click", reset);
makeAnotherBtn.addEventListener("click", reset);

enterBtn.addEventListener("click", () => {
  entranceScreen.classList.add("hidden");
  simulatorScreen.classList.remove("hidden");
  render();
});

function showFinal() {
  simulatorScreen.classList.add("hidden");
  finalScreen.classList.remove("hidden");

  finalTreat.className = `final-treat ${state.treat} ${state.decor.join(" ")}`;
  const label = treatOptions.find(([key]) => key === state.treat)[1];

  finalTitle.textContent = `Your ${label} is ready!`;
  specialName.textContent = `Amal’s ${label} Bakery Special`;
  specialText.textContent = "Sweet score: 10/10 · Freshly baked in the simulator.";

  const decorations = state.decor.length
    ? state.decor.map(d => d.replace("-", " ")).join(", ")
    : "simple bakery style";

  specialList.innerHTML = `
    <li>Treat: ${label}</li>
    <li>Decorations: ${decorations}</li>
    <li>Bakery vibe: pastel, cozy, and sweet</li>
  `;
}

function reset() {
  state.step = 0;
  state.treat = "cupcake";
  state.ingredients = new Set();
  state.mixed = false;
  state.baked = false;
  state.decor = [];

  document.querySelectorAll(".ingredient").forEach(btn => btn.classList.remove("added"));
  document.querySelectorAll(".decor-choice").forEach(btn => btn.classList.remove("selected"));

  batter.classList.remove("mixed");
  batter.style.height = "22px";
  timerFill.style.transition = "none";
  timerFill.style.width = "0%";

  finalScreen.classList.add("hidden");
  simulatorScreen.classList.remove("hidden");
  entranceScreen.classList.add("hidden");

  render();
}
