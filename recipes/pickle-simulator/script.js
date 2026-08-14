const state = {
  pickle: "",
  flavor: "",
  crunch: "",
  addIn: ""
};

let step = 0;

const steps = [
  {
    title: "What type of pickle do you want to make?",
    key: "pickle",
    choices: [
      ["Cucumber", "Classic crunchy cucumber pickles 🥒"],
      ["Carrot", "Bright carrot sticks with a snap 🥕"],
      ["Red Onion", "Tangy pink onions for tacos and bowls 🧅"],
      ["Mixed Veggie", "A colorful jar with lots of crunch 🌈"]
    ]
  },
  {
    title: "Choose your flavor style.",
    key: "flavor",
    choices: [
      ["Garlic Dill", "Fresh, herby, and classic"],
      ["Spicy", "A little heat with chili flakes"],
      ["Sweet & Sour", "Tangy with a tiny sweet twist"],
      ["Extra Sour", "More vinegar power"]
    ]
  },
  {
    title: "Choose your crunch level.",
    key: "crunch",
    choices: [
      ["Soft Crunch", "Thin slices"],
      ["Medium Crunch", "Spears or thicker slices"],
      ["Mega Crunch", "Big chunky pieces"]
    ]
  },
  {
    title: "Pick one fun add-in.",
    key: "addIn",
    choices: [
      ["Garlic", "Bold flavor"],
      ["Dill", "Classic pickle taste"],
      ["Mustard Seeds", "Tiny flavor pops"],
      ["Pepper Flakes", "Spicy sparkle"],
      ["No Extra", "Keep it simple"]
    ]
  },
  {
    title: "Simulator steps",
    key: "final",
    choices: []
  }
];

const stepArea = document.getElementById("stepArea");
const progressFill = document.getElementById("progressFill");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const recipeTitle = document.getElementById("recipeTitle");
const recipeOutput = document.getElementById("recipeOutput");

function render() {
  const current = steps[step];
  progressFill.style.width = `${(step / (steps.length - 1)) * 100}%`;

  backBtn.style.display = step === 0 ? "none" : "inline-block";
  nextBtn.textContent = step === steps.length - 1 ? "Restart" : "Next";

  if (current.key === "final") {
    renderFinal();
    return;
  }

  const selected = state[current.key];

  stepArea.innerHTML = `
    <p class="eyebrow">Step ${step + 1} of ${steps.length}</p>
    <h2>${current.title}</h2>
    <div class="choice-grid">
      ${current.choices.map(([name, desc]) => `
        <button class="choice ${selected === name ? "selected" : ""}" data-value="${name}">
          <span>${name}</span><br>
          <small>${desc}</small>
        </button>
      `).join("")}
    </div>
  `;

  document.querySelectorAll(".choice").forEach(btn => {
    btn.addEventListener("click", () => {
      state[current.key] = btn.dataset.value;
      render();
      updateRecipeCard();
    });
  });

  updateRecipeCard();
}

function renderFinal() {
  progressFill.style.width = "100%";

  stepArea.innerHTML = `
    <p class="eyebrow">Final Step</p>
    <h2>Your pickle simulator is complete 🥒✨</h2>
    <p>
      Here is the safe refrigerator-pickle flow. Ask an adult before using hot water,
      vinegar, knives, or glass jars.
    </p>
    <ol class="recipe-list">
      <li>Wash your ${state.pickle || "vegetables"}.</li>
      <li>Cut them for ${state.crunch || "your favorite crunch"}.</li>
      <li>Mix a refrigerator brine with vinegar, water, salt, and your flavor choices.</li>
      <li>Pack everything into a clean jar.</li>
      <li>Pour brine over the vegetables.</li>
      <li>Put the jar in the fridge and wait at least 24 hours.</li>
      <li>Taste test and rate your pickle crunch.</li>
    </ol>
  `;

  updateRecipeCard(true);
}

function updateRecipeCard(final = false) {
  const title = state.flavor && state.pickle
    ? `${state.flavor} ${state.pickle} Pickles`
    : "Build your pickle recipe";

  recipeTitle.textContent = title;

  recipeOutput.innerHTML = `
    <div class="badge-row">
      <span class="badge">${state.pickle || "Pickle type?"}</span>
      <span class="badge">${state.flavor || "Flavor?"}</span>
      <span class="badge">${state.crunch || "Crunch?"}</span>
      <span class="badge">${state.addIn || "Add-in?"}</span>
    </div>
    <p>
      ${final
        ? "Your recipe is ready! Keep it refrigerated and eat it within a few days with adult help."
        : "Keep choosing options and your recipe card will fill in."}
    </p>
  `;
}

backBtn.addEventListener("click", () => {
  if (step > 0) step--;
  render();
});

nextBtn.addEventListener("click", () => {
  if (step === steps.length - 1) {
    step = 0;
    state.pickle = "";
    state.flavor = "";
    state.crunch = "";
    state.addIn = "";
  } else {
    const key = steps[step].key;
    if (!state[key]) {
      alert("Pick an option first!");
      return;
    }
    step++;
  }
  render();
});

render();
