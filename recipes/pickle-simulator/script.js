const state = {
  step: 0,
  type: "cucumber",
  cuts: 0,
  piecesPacked: 0,
  spicesAdded: false,
  brineAdded: false,
  lidClosed: false
};

const steps = [
  ["Choose your pickle", "Pick the vegetable you want to turn into pickles."],
  ["Cut on the dotted lines", "Drag the knife onto each dotted line to cut the pickle."],
  ["Put pieces in the jar", "Drag the cut pickle pieces into the jar."],
  ["Add spices", "Drag the spice bowl into the jar."],
  ["Pour the brine", "Drag the brine cup into the jar."],
  ["Close the jar", "Click the button to close the lid."],
  ["See what you made", "Your finished pickle jar is ready!"]
];

const typeData = {
  cucumber: { label: "Cucumber", cls: "cucumber" },
  carrot: { label: "Carrot", cls: "carrot" },
  onion: { label: "Red Onion", cls: "onion" },
  mixed: { label: "Mixed Veggie", cls: "mixed" }
};

const stepLabel = document.getElementById("stepLabel");
const stepTitle = document.getElementById("stepTitle");
const stepText = document.getElementById("stepText");
const choices = document.getElementById("choices");
const progressFill = document.getElementById("progressFill");

const pickleShape = document.getElementById("pickleShape");
const pickleBoard = document.getElementById("pickleBoard");
const knife = document.getElementById("knife");
const cutPieces = document.getElementById("cutPieces");
const spiceBowl = document.getElementById("spiceBowl");
const brineCup = document.getElementById("brineCup");
const jar = document.getElementById("jar");
const jarPieces = document.getElementById("jarPieces");
const jarSpices = document.getElementById("jarSpices");
const jarBrine = document.getElementById("jarBrine");
const jarLid = document.getElementById("jarLid");
const lidButton = document.getElementById("lidButton");
const nextBtn = document.getElementById("nextBtn");
const resetBtn = document.getElementById("resetBtn");
const finalCard = document.getElementById("finalCard");
const finalTitle = document.getElementById("finalTitle");
const finalText = document.getElementById("finalText");
const finishedPieces = document.getElementById("finishedPieces");
const recipeList = document.getElementById("recipeList");

function render() {
  const [title, text] = steps[state.step];
  stepLabel.textContent = state.step === steps.length - 1 ? "Done" : `Step ${state.step + 1}`;
  stepTitle.textContent = title;
  stepText.textContent = text;
  progressFill.style.width = `${Math.round((state.step / (steps.length - 1)) * 100)}%`;

  choices.innerHTML = "";
  finalCard.classList.toggle("hidden", state.step !== 6);

  pickleBoard.classList.toggle("hidden", state.step > 1);
  knife.classList.toggle("hidden", state.step !== 1);
  cutPieces.classList.toggle("hidden", state.step !== 2);
  spiceBowl.classList.toggle("hidden", state.step !== 3);
  brineCup.classList.toggle("hidden", state.step !== 4);
  lidButton.classList.toggle("hidden", state.step !== 5);

  nextBtn.textContent = state.step === 6 ? "Make Another Jar" : "Next";

  if (state.step === 0) renderChoices();
  if (state.step === 6) renderFinal();

  updateRecipe();
}

function renderChoices() {
  Object.entries(typeData).forEach(([key, item]) => {
    const btn = document.createElement("button");
    btn.className = "choice";
    if (state.type === key) btn.classList.add("selected");
    btn.textContent = item.label;
    btn.onclick = () => {
      state.type = key;
      pickleShape.className = `pickle-shape ${item.cls}`;
      renderChoices();
    };
    choices.appendChild(btn);
  });
}

function makePieces() {
  cutPieces.innerHTML = "";
  const pieceClass = state.type === "carrot" ? "carrot" : state.type === "onion" ? "onion" : "";
  for (let i = 0; i < 12; i++) {
    const piece = document.createElement("div");
    piece.className = `piece ${pieceClass}`;
    piece.draggable = true;
    piece.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text/plain", "piece");
      piece.classList.add("dragging");
    });
    piece.addEventListener("dragend", () => piece.classList.remove("dragging"));
    cutPieces.appendChild(piece);
  }
}

function addJarPiece() {
  const pieceClass = state.type === "carrot" ? "carrot" : state.type === "onion" ? "onion" : "";
  const piece = document.createElement("div");
  piece.className = `jar-piece ${pieceClass}`;
  jarPieces.appendChild(piece);
}

function addSpices() {
  jarSpices.innerHTML = "";
  for (let i = 0; i < 18; i++) {
    const dot = document.createElement("div");
    dot.className = "spice-dot";
    jarSpices.appendChild(dot);
  }
}

function renderFinal() {
  const label = typeData[state.type].label;
  finalTitle.textContent = `You made ${label} Pickles!`;
  finalText.textContent = "Your jar has cut pickle pieces, spices, brine, and a closed lid. Put it in the fridge and wait at least 24 hours with adult help.";

  finishedPieces.innerHTML = "";
  for (let i = 0; i < 12; i++) {
    const piece = document.createElement("div");
    piece.className = `jar-piece ${state.type === "carrot" ? "carrot" : state.type === "onion" ? "onion" : ""}`;
    finishedPieces.appendChild(piece);
  }
}

function updateRecipe() {
  recipeList.innerHTML = `
    <li>Choose ${typeData[state.type].label.toLowerCase()}.</li>
    <li>Cut on the dotted lines.</li>
    <li>Put the pieces in the jar.</li>
    <li>Add spices.</li>
    <li>Pour brine into the jar.</li>
    <li>Close the lid.</li>
    <li>Chill in the fridge for at least 24 hours with adult help.</li>
  `;
}

knife.addEventListener("dragstart", e => {
  e.dataTransfer.setData("text/plain", "knife");
  knife.classList.add("dragging");
});

knife.addEventListener("dragend", () => knife.classList.remove("dragging"));

document.querySelectorAll(".cut-line").forEach(line => {
  line.addEventListener("dragover", e => e.preventDefault());
  line.addEventListener("drop", e => {
    e.preventDefault();
    if (e.dataTransfer.getData("text/plain") !== "knife") return;
    if (line.classList.contains("hit")) return;

    line.classList.add("hit");
    state.cuts += 1;

    if (state.cuts >= 3) {
      makePieces();
      setTimeout(() => {
        state.step = 2;
        render();
      }, 450);
    }
  });
});

jar.addEventListener("dragover", e => {
  e.preventDefault();
  jar.classList.add("drop-ready");
});

jar.addEventListener("dragleave", () => jar.classList.remove("drop-ready"));

jar.addEventListener("drop", e => {
  e.preventDefault();
  jar.classList.remove("drop-ready");
  const kind = e.dataTransfer.getData("text/plain");

  if (state.step === 2 && kind === "piece") {
    addJarPiece();
    const dragging = document.querySelector(".piece.dragging");
    if (dragging) dragging.remove();
    state.piecesPacked += 1;

    if (state.piecesPacked >= 6) {
      state.step = 3;
      render();
    }
  }

  if (state.step === 3 && kind === "spices") {
    state.spicesAdded = true;
    addSpices();
    state.step = 4;
    render();
  }

  if (state.step === 4 && kind === "brine") {
    state.brineAdded = true;
    jarBrine.style.height = "72%";
    setTimeout(() => {
      state.step = 5;
      render();
    }, 500);
  }
});

spiceBowl.addEventListener("dragstart", e => {
  e.dataTransfer.setData("text/plain", "spices");
});

brineCup.addEventListener("dragstart", e => {
  e.dataTransfer.setData("text/plain", "brine");
});

lidButton.addEventListener("click", () => {
  state.lidClosed = true;
  jarLid.classList.add("closed");
  setTimeout(() => {
    state.step = 6;
    render();
  }, 600);
});

nextBtn.addEventListener("click", () => {
  if (state.step === 0) {
    state.step = 1;
    render();
    return;
  }

  if (state.step === 6) {
    reset();
    return;
  }

  alert("Complete the simulator action first!");
});

resetBtn.addEventListener("click", reset);

function reset() {
  state.step = 0;
  state.type = "cucumber";
  state.cuts = 0;
  state.piecesPacked = 0;
  state.spicesAdded = false;
  state.brineAdded = false;
  state.lidClosed = false;

  pickleShape.className = "pickle-shape cucumber";
  document.querySelectorAll(".cut-line").forEach(line => line.classList.remove("hit"));
  cutPieces.innerHTML = "";
  jarPieces.innerHTML = "";
  jarSpices.innerHTML = "";
  jarBrine.style.height = "0%";
  jarLid.classList.remove("closed");

  render();
}

render();
