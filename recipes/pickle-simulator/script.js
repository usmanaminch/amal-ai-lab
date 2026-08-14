const steps = [
  {
    label: "Step 1",
    title: "Choose your pickle type",
    text: "Pick what you want to turn into pickles.",
    button: "Choose Pickle",
    choices: [
      { name: "Cucumber", emoji: "🥒" },
      { name: "Carrot", emoji: "🥕" },
      { name: "Red Onion", emoji: "🧅" },
      { name: "Mixed Veggie", emoji: "🥒🥕" }
    ]
  },
  {
    label: "Step 2",
    title: "Cut the vegetables",
    text: "Click the button to chop the vegetables into pickle pieces.",
    button: "Chop Chop"
  },
  {
    label: "Step 3",
    title: "Put pieces in the jar",
    text: "Move the cut pieces from the counter into the jar.",
    button: "Pack the Jar"
  },
  {
    label: "Step 4",
    title: "Add flavor",
    text: "Choose what flavor you want to add to the jar.",
    button: "Add Flavor",
    choices: [
      { name: "Garlic Dill", emoji: "🧄🌿" },
      { name: "Spicy", emoji: "🌶️" },
      { name: "Sweet Sour", emoji: "🍯" },
      { name: "Classic", emoji: "🌿" }
    ]
  },
  {
    label: "Step 5",
    title: "Pour the brine",
    text: "Pour vinegar-water brine into the jar.",
    button: "Pour Brine"
  },
  {
    label: "Step 6",
    title: "Close the lid",
    text: "Seal the jar so it is ready for the fridge.",
    button: "Close Jar"
  },
  {
    label: "Step 7",
    title: "Chill in the fridge",
    text: "Refrigerator pickles need time to soak up flavor.",
    button: "Chill Pickles"
  },
  {
    label: "Done",
    title: "Your pickles are ready!",
    text: "You made a refrigerator pickle recipe from start to finish.",
    button: "Make Another Jar"
  }
];

const state = {
  step: 0,
  veggie: null,
  flavor: null,
  piecesInJar: false,
  brine: false,
  lid: false
};

const stepLabel = document.getElementById("stepLabel");
const stepTitle = document.getElementById("stepTitle");
const stepText = document.getElementById("stepText");
const choices = document.getElementById("choices");
const mainBtn = document.getElementById("mainBtn");
const resetBtn = document.getElementById("resetBtn");
const ingredient = document.getElementById("ingredient");
const knife = document.getElementById("knife");
const pieces = document.getElementById("pieces");
const spices = document.getElementById("spices");
const brine = document.getElementById("brine");
const lid = document.getElementById("lid");
const jarPieces = document.getElementById("jarPieces");
const jarSpices = document.getElementById("jarSpices");
const jarBrine = document.getElementById("jarBrine");
const jarLid = document.getElementById("jarLid");
const meterFill = document.getElementById("meterFill");
const progressText = document.getElementById("progressText");
const recipeName = document.getElementById("recipeName");
const recipeSteps = document.getElementById("recipeSteps");

function render() {
  const s = steps[state.step];

  stepLabel.textContent = s.label;
  stepTitle.textContent = s.title;
  stepText.textContent = s.text;
  mainBtn.textContent = s.button;

  const percent = Math.round((state.step / (steps.length - 1)) * 100);
  meterFill.style.width = percent + "%";
  progressText.textContent = percent + "%";

  choices.innerHTML = "";

  if (s.choices) {
    s.choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.className = "choice";
      btn.textContent = `${choice.emoji} ${choice.name}`;

      const isSelected = state.step === 0
        ? state.veggie?.name === choice.name
        : state.flavor?.name === choice.name;

      if (isSelected) btn.classList.add("selected");

      btn.addEventListener("click", () => {
        if (state.step === 0) {
          state.veggie = choice;
          ingredient.textContent = choice.emoji;
          ingredient.classList.add("bounce");
          setTimeout(() => ingredient.classList.remove("bounce"), 500);
        }

        if (state.step === 3) {
          state.flavor = choice;
          spices.textContent = choice.emoji;
        }

        render();
      });

      choices.appendChild(btn);
    });
  }

  updateVisuals();
  updateRecipe();
}

function updateVisuals() {
  knife.classList.toggle("hidden", state.step < 1 || state.step > 2);
  pieces.classList.toggle("hidden", state.step < 2 || state.step > 2);
  spices.classList.toggle("hidden", state.step !== 3);
  brine.classList.toggle("hidden", state.step !== 4);
  lid.classList.toggle("hidden", state.step !== 5);

  if (state.step < 2) {
    pieces.innerHTML = "";
  }

  if (state.step === 0 || state.step === 1) {
    ingredient.classList.remove("hidden");
  }

  if (state.step >= 2) {
    ingredient.classList.add("hidden");
  }

  jarBrine.style.height = state.brine ? "72%" : "0%";
  jarLid.classList.toggle("closed", state.lid);
}

function makePieces() {
  const emoji = state.veggie?.emoji || "🥒";
  pieces.innerHTML = "";
  for (let i = 0; i < 12; i++) {
    const span = document.createElement("span");
    span.className = "piece";
    span.style.animationDelay = `${i * 0.04}s`;
    span.textContent = emoji.includes("🥕") && !emoji.includes("🥒") ? "🥕" : emoji.includes("🧅") ? "🧅" : "🥒";
    pieces.appendChild(span);
  }
}

function packJar() {
  const emoji = state.veggie?.emoji || "🥒";
  jarPieces.innerHTML = "";
  for (let i = 0; i < 11; i++) {
    const span = document.createElement("span");
    span.textContent = emoji.includes("🥕") && !emoji.includes("🥒") ? "🥕" : emoji.includes("🧅") ? "🧅" : i % 3 === 0 ? "🥕" : "🥒";
    jarPieces.appendChild(span);
  }
  state.piecesInJar = true;
}

function addFlavorToJar() {
  jarSpices.textContent = state.flavor?.emoji || "🧄🌿";
}

function updateRecipe() {
  const veggie = state.veggie?.name || "Vegetable";
  const flavor = state.flavor?.name || "Flavor";

  recipeName.textContent = `${flavor} ${veggie} Refrigerator Pickles`;

  const items = [
    `Choose ${veggie.toLowerCase()} for your pickle jar.`,
    state.step >= 2 ? "Cut the vegetables into pieces." : "Next: cut the vegetables.",
    state.piecesInJar ? "Pack the pieces into a clean jar." : "Next: pack the jar.",
    state.flavor ? `Add ${flavor.toLowerCase()} flavor.` : "Next: choose a flavor.",
    state.brine ? "Pour refrigerator brine into the jar." : "Next: pour the brine.",
    state.lid ? "Close the lid and refrigerate." : "Next: close the lid.",
    state.step >= 7 ? "Wait at least 24 hours, then taste with adult help." : "Final step: chill in the fridge."
  ];

  recipeSteps.innerHTML = items.map(item => `<li>${item}</li>`).join("");
}

mainBtn.addEventListener("click", () => {
  if (state.step === 0 && !state.veggie) {
    alert("Choose your pickle type first!");
    return;
  }

  if (state.step === 1) {
    knife.classList.add("chop");
    setTimeout(() => {
      knife.classList.remove("chop");
      makePieces();
      state.step++;
      render();
    }, 1200);
    return;
  }

  if (state.step === 2) {
    packJar();
  }

  if (state.step === 3) {
    if (!state.flavor) {
      alert("Choose a flavor first!");
      return;
    }
    addFlavorToJar();
  }

  if (state.step === 4) {
    state.brine = true;
  }

  if (state.step === 5) {
    state.lid = true;
  }

  if (state.step === steps.length - 1) {
    reset();
    return;
  }

  state.step++;
  render();
});

resetBtn.addEventListener("click", reset);

function reset() {
  state.step = 0;
  state.veggie = null;
  state.flavor = null;
  state.piecesInJar = false;
  state.brine = false;
  state.lid = false;

  ingredient.textContent = "🥒";
  ingredient.classList.remove("hidden");
  pieces.innerHTML = "";
  jarPieces.innerHTML = "";
  jarSpices.textContent = "";
  jarBrine.style.height = "0%";
  jarLid.classList.remove("closed");

  render();
}

render();
