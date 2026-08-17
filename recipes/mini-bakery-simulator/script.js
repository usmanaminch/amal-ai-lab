const state = {
  screen: "entrance",
  step: 0,
  treat: "cupcake",
  ingredients: new Set(),
  mixed: false,
  trayInOven: false,
  baked: false,
  decorations: []
};

const steps = [
  ["Choose your treat", "Pick what you want to bake today."],
  ["Drag ingredients", "Drag flour, sugar, egg, and milk into the bowl."],
  ["Whisk batter", "Click the whisk button to mix the batter."],
  ["Drag tray to oven", "Move your treat tray into the warm oven."],
  ["Bake it", "Click bake and watch the timer."],
  ["Decorate it", "Choose decorations for your treat."],
  ["Bakery reveal", "See your finished bakery special."]
];

const treatNames = {
  cupcake: "Cupcake",
  cookie: "Cookie",
  donut: "Donut"
};

const entrance = document.getElementById("entrance");
const simulator = document.getElementById("simulator");
const final = document.getElementById("final");

const enterBtn = document.getElementById("enterBtn");
const stepLabel = document.getElementById("stepLabel");
const stepTitle = document.getElementById("stepTitle");
const stepText = document.getElementById("stepText");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const choices = document.getElementById("choices");

const ingredients = document.getElementById("ingredients");
const bowl = document.getElementById("bowl");
const batter = document.getElementById("batter");
const bowlText = document.getElementById("bowlText");
const whiskBtn = document.getElementById("whiskBtn");
const tray = document.getElementById("tray");
const rawTreat = document.getElementById("rawTreat");
const oven = document.getElementById("oven");
const ovenTreat = document.getElementById("ovenTreat");
const bakeBtn = document.getElementById("bakeBtn");
const timer = document.getElementById("timer");
const timerFill = document.getElementById("timerFill");
const decorate = document.getElementById("decorate");

const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const againBtn = document.getElementById("againBtn");

const finalTitle = document.getElementById("finalTitle");
const finalTreat = document.getElementById("finalTreat");
const specialName = document.getElementById("specialName");
const specialText = document.getElementById("specialText");
const specialList = document.getElementById("specialList");

function render() {
  entrance.classList.toggle("hidden", state.screen !== "entrance");
  simulator.classList.toggle("hidden", state.screen !== "simulator");
  final.classList.toggle("hidden", state.screen !== "final");

  if (state.screen !== "simulator") return;

  const [title, text] = steps[state.step];
  stepLabel.textContent = `Step ${state.step + 1}`;
  stepTitle.textContent = title;
  stepText.textContent = text;

  const percent = Math.round((state.step / (steps.length - 1)) * 100);
  progressText.textContent = percent + "%";
  progressFill.style.width = percent + "%";

  choices.innerHTML = "";
  ingredients.classList.toggle("hidden", state.step !== 1);
  bowl.classList.toggle("hidden", state.step < 1 || state.step > 2);
  whiskBtn.classList.toggle("hidden", state.step !== 2);
  tray.classList.toggle("hidden", state.step !== 3);
  bakeBtn.classList.toggle("hidden", state.step !== 4);
  timer.classList.toggle("hidden", state.step !== 4);
  decorate.classList.toggle("hidden", state.step !== 5);

  if (state.step === 0) renderTreatChoices();

  rawTreat.className = `raw-treat ${state.treat}`;
  ovenTreat.className = `oven-treat ${state.trayInOven ? "visible" : ""} ${state.treat}`;

  nextBtn.textContent = state.step === 5 ? "Reveal Treat" : "Next";
}

function renderTreatChoices() {
  ["cupcake", "cookie", "donut"].forEach(treat => {
    const btn = document.createElement("button");
    btn.className = "choice";
    if (state.treat === treat) btn.classList.add("selected");
    btn.textContent = treatNames[treat];
    btn.onclick = () => {
      state.treat = treat;
      renderTreatChoices();
    };
    choices.appendChild(btn);
  });
}

enterBtn.onclick = () => {
  state.screen = "simulator";
  render();
};

document.querySelectorAll(".ingredient").forEach(item => {
  item.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text/plain", item.dataset.item);
  });
});

bowl.addEventListener("dragover", e => {
  e.preventDefault();
  bowl.classList.add("drop-ready");
});

bowl.addEventListener("dragleave", () => bowl.classList.remove("drop-ready"));

bowl.addEventListener("drop", e => {
  e.preventDefault();
  bowl.classList.remove("drop-ready");
  const item = e.dataTransfer.getData("text/plain");

  if (state.step !== 1 || !item) return;

  state.ingredients.add(item);
  document.querySelector(`[data-item="${item}"]`).classList.add("used");
  batter.style.height = `${18 + state.ingredients.size * 14}px`;
  bowlText.textContent = `${state.ingredients.size}/4 ingredients`;

  if (state.ingredients.size === 4) {
    setTimeout(() => {
      state.step = 2;
      render();
    }, 300);
  }
});

whiskBtn.onclick = () => {
  state.mixed = true;
  batter.classList.add("mixed");
  setTimeout(() => {
    state.step = 3;
    render();
  }, 700);
};

tray.addEventListener("dragstart", e => {
  e.dataTransfer.setData("text/plain", "tray");
});

oven.addEventListener("dragover", e => {
  e.preventDefault();
  oven.classList.add("drop-ready");
});

oven.addEventListener("dragleave", () => oven.classList.remove("drop-ready"));

oven.addEventListener("drop", e => {
  e.preventDefault();
  oven.classList.remove("drop-ready");
  if (state.step !== 3 || e.dataTransfer.getData("text/plain") !== "tray") return;

  state.trayInOven = true;
  state.step = 4;
  render();
});

bakeBtn.onclick = () => {
  timerFill.style.transition = "none";
  timerFill.style.width = "0%";

  setTimeout(() => {
    timerFill.style.transition = "width 1.6s ease";
    timerFill.style.width = "100%";
  }, 50);

  setTimeout(() => {
    state.baked = true;
    state.step = 5;
    render();
  }, 1800);
};

document.querySelectorAll(".decor-choice").forEach(btn => {
  btn.onclick = () => {
    const decor = btn.dataset.decor;
    if (state.decorations.includes(decor)) {
      state.decorations = state.decorations.filter(d => d !== decor);
      btn.classList.remove("selected");
    } else {
      state.decorations.push(decor);
      btn.classList.add("selected");
    }
  };
});

nextBtn.onclick = () => {
  if (state.step === 0) {
    state.step = 1;
    render();
    return;
  }

  if (state.step === 5) {
    showFinal();
    return;
  }

  alert("Complete the bakery action first!");
};

restartBtn.onclick = reset;
againBtn.onclick = reset;

function showFinal() {
  state.screen = "final";

  const treat = treatNames[state.treat];
  finalTitle.textContent = `Your ${treat} is ready!`;
  finalTreat.className = `final-treat ${state.treat}`;
  specialName.textContent = `Amal’s ${treat} Bakery Special`;
  specialText.textContent = "Sweet score: 10/10 · Fresh from the pastel oven.";

  const decors = state.decorations.length ? state.decorations.join(", ") : "simple bakery style";

  specialList.innerHTML = `
    <li>Treat: ${treat}</li>
    <li>Decorations: ${decors}</li>
    <li>Bakery vibe: cozy, pastel, and sweet</li>
  `;

  render();
}

function reset() {
  state.screen = "entrance";
  state.step = 0;
  state.treat = "cupcake";
  state.ingredients = new Set();
  state.mixed = false;
  state.trayInOven = false;
  state.baked = false;
  state.decorations = [];

  document.querySelectorAll(".ingredient").forEach(i => i.classList.remove("used"));
  document.querySelectorAll(".decor-choice").forEach(i => i.classList.remove("selected"));

  batter.classList.remove("mixed");
  batter.style.height = "18px";
  bowlText.textContent = "Drop ingredients here";
  timerFill.style.transition = "none";
  timerFill.style.width = "0%";

  render();
}

render();
