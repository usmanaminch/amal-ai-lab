const $ = id => document.getElementById(id);

let cleanStage = "scale";
let scaledCount = 0;
let brushedCount = 0;
let selectedFlavor = "";
let foamColor = "#bff8dd";
let selectedBraceColor = "#ff4d6d";
let brackets = {};
let dragging = null;
let quizIndex = 0;
let loadedFood = "";

const plaqueTotal = 12;
const rainbowColors = ["#ff4d6d","#ff9f1c","#ffd60a","#4cd964","#30bced","#5b6cff","#b267ff","#ff70c8"];

document.querySelectorAll(".tab").forEach(b => {
  b.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(x => x.classList.toggle("active", x === b));
    document.querySelectorAll(".panel").forEach(p => p.classList.toggle("active", p.id === b.dataset.tab));
  });
});

function makeCleanTooth(i){
  const d = document.createElement("div");
  d.className = "tooth clean-tooth";
  d.dataset.tooth = i;
  const p = document.createElement("span");
  p.className = "plaque p" + (i % 6);
  p.dataset.plaque = i;
  d.appendChild(p);
  return d;
}
for(let i=0;i<6;i++) $("clean-top").appendChild(makeCleanTooth(i));
for(let i=6;i<12;i++) $("clean-bottom").appendChild(makeCleanTooth(i));

function makeBraceTooth(i){
  const d = document.createElement("div");
  d.className = "tooth brace-tooth";
  d.dataset.tooth = i;
  return d;
}
for(let i=1;i<=6;i++) $("braces-top").appendChild(makeBraceTooth(i));
for(let i=7;i<=12;i++) $("braces-bottom").appendChild(makeBraceTooth(i));

function updateStages(){
  $("scale-step").className = "stage " + (cleanStage === "scale" ? "active" : "done");
  $("flavor-step").className = "stage " + (cleanStage === "flavor" ? "active" : (cleanStage === "brush" || cleanStage === "done" ? "done" : "locked"));
  $("brush-step").className = "stage " + (cleanStage === "brush" ? "active" : (cleanStage === "done" ? "done" : "locked"));
  $("toothbrush-tool").classList.toggle("disabled", cleanStage !== "brush");
}

function updateClean(){
  let progress = 0;
  if(cleanStage === "scale") progress = Math.round((scaledCount / plaqueTotal) * 40);
  else if(cleanStage === "flavor") progress = 45;
  else progress = 50 + Math.round((brushedCount / plaqueTotal) * 50);
  if(cleanStage === "done") progress = 100;

  $("clean-title").textContent = progress + "% Complete";
  $("clean-fill").style.width = progress + "%";

  if(cleanStage === "scale") $("clean-message").textContent = "Drag the scaler anywhere on a tooth. It will remove that tooth’s yellow plaque.";
  if(cleanStage === "flavor") $("clean-message").textContent = "Plaque has been scaled. Now choose a toothpaste flavor.";
  if(cleanStage === "brush") $("clean-message").textContent = "Now drag the " + selectedFlavor + " toothbrush over the teeth to brush them.";
  if(cleanStage === "done") $("clean-message").textContent = "Sparkly clean! You scaled first, picked toothpaste, and brushed.";
  updateStages();
}

function scalePlaque(plaque){
  if(!plaque || plaque.classList.contains("scaled")) return;
  plaque.classList.add("scaled");
  scaledCount++;
  if(scaledCount >= plaqueTotal) cleanStage = "flavor";
  updateClean();
}

function scaleTooth(tooth){
  if(!tooth || !tooth.classList.contains("clean-tooth")) return false;
  const plaque = tooth.querySelector(".plaque:not(.scaled)");
  if(plaque){
    scalePlaque(plaque);
    return true;
  }
  return false;
}

function nearestPlaque(x, y){
  let best = null;
  let bestDistance = 999999;
  document.querySelectorAll(".plaque:not(.scaled)").forEach(plaque => {
    const r = plaque.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const distance = Math.hypot(cx - x, cy - y);
    if(distance < bestDistance){
      best = plaque;
      bestDistance = distance;
    }
  });
  return bestDistance < 120 ? best : null;
}

function brushTooth(tooth){
  if(cleanStage !== "brush" || !tooth || tooth.classList.contains("brushed")) return;
  const plaque = tooth.querySelector(".plaque");
  if(plaque && plaque.classList.contains("scaled")){
    plaque.classList.add("gone");
    tooth.classList.add("brushed");
    brushedCount++;
    addFoam(tooth);
    addSparkles(tooth);
    if(brushedCount >= plaqueTotal) cleanStage = "done";
    updateClean();
  }
}

function addFoam(tooth){
  const mouth = $("clean-mouth").getBoundingClientRect();
  const rect = tooth.getBoundingClientRect();
  const bubble = document.createElement("span");
  bubble.className = "foam";
  bubble.style.setProperty("--foam", foamColor);
  bubble.style.left = (rect.left - mouth.left + rect.width/2 - 16) + "px";
  bubble.style.top = (rect.top - mouth.top + rect.height/2 - 16) + "px";
  $("foam-layer").appendChild(bubble);
  setTimeout(()=>bubble.remove(), 900);
}

function addSparkles(tooth){
  const mouth = $("clean-mouth").getBoundingClientRect();
  const rect = tooth.getBoundingClientRect();
  const points = [
    [rect.left - mouth.left + 8, rect.top - mouth.top + 10],
    [rect.left - mouth.left + rect.width - 18, rect.top - mouth.top + 14],
    [rect.left - mouth.left + rect.width/2 - 10, rect.top - mouth.top + rect.height/2 - 10]
  ];
  points.forEach(([x,y], i) => {
    const s = document.createElement("span");
    s.className = "sparkle";
    s.style.left = x + "px";
    s.style.top = y + "px";
    $("foam-layer").appendChild(s);
    setTimeout(() => s.remove(), 900 + i*50);
  });
}

document.querySelectorAll(".flavor").forEach(btn => {
  btn.addEventListener("click", () => {
    if(cleanStage !== "flavor" && cleanStage !== "brush") return;
    selectedFlavor = btn.dataset.flavor;
    foamColor = btn.dataset.foam;
    cleanStage = "brush";
    $("toothbrush-label").textContent = selectedFlavor + " toothpaste";
    document.querySelectorAll(".flavor").forEach(b => b.classList.toggle("active", b === btn));
    updateClean();
  });
});

$("scale-all").addEventListener("click", () => {
  document.querySelectorAll(".plaque:not(.scaled)").forEach(p => scalePlaque(p));
  cleanStage = "flavor";
  updateClean();
});

$("reset-clean").addEventListener("click", () => {
  cleanStage = "scale";
  scaledCount = 0;
  brushedCount = 0;
  selectedFlavor = "";
  document.querySelectorAll(".plaque").forEach(p => p.className = "plaque p" + (Number(p.dataset.plaque)%6));
  document.querySelectorAll(".clean-tooth").forEach(t => t.classList.remove("brushed"));
  document.querySelectorAll(".flavor").forEach(b => b.classList.remove("active"));
  $("foam-layer").innerHTML = "";
  $("toothbrush-label").textContent = "Pick flavor first";
  updateClean();
});

const braceColorHex = $("brace-color-hex");
const braceColorWheel = $("brace-color-wheel");
const wheelSelector = $("wheel-selector");

function setWheelSelection(clientX, clientY){
  const rect = braceColorWheel.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  let dx = clientX - cx;
  let dy = clientY - cy;
  const radius = rect.width / 2 - 12;
  const distance = Math.hypot(dx, dy);
  if(distance > radius){
    dx = (dx / distance) * radius;
    dy = (dy / distance) * radius;
  }
  const angle = (Math.atan2(dy, dx) * 180 / Math.PI + 90 + 360) % 360;
  selectedBraceColor = hslToHex(angle, 100, 60);
  braceColorHex.textContent = selectedBraceColor.toUpperCase();
  document.querySelector(".bracket-preview").style.setProperty("--band", selectedBraceColor);
  wheelSelector.style.left = `calc(50% + ${dx}px)`;
  wheelSelector.style.top = `calc(50% + ${dy}px)`;
}

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => {
    const color = l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

braceColorWheel.addEventListener("click", e => setWheelSelection(e.clientX, e.clientY));
braceColorWheel.addEventListener("pointerdown", e => {
  setWheelSelection(e.clientX, e.clientY);
});

function addBracket(tooth){
  if(!tooth) return;
  brackets[tooth.dataset.tooth] = selectedBraceColor;
  renderBraces();
}
function renderBraces(){
  document.querySelectorAll(".brace-tooth").forEach(t => {
    t.innerHTML = "";
    const color = brackets[t.dataset.tooth];
    if(color){
      const b = document.createElement("span");
      b.className = "bracket";
      b.style.setProperty("--band", color);
      t.appendChild(b);
    }
  });
  const count = Object.keys(brackets).length;
  $("braces-title").textContent = count + " Bracket" + (count === 1 ? "" : "s") + " Added";
  $("braces-message").textContent = count === 0 ? "Choose a color, then drag a bracket onto a tooth." : count < 12 ? "Nice. Each tooth can have its own color. Keep dragging brackets." : "Full rainbow braces added.";
}
$("rainbow-all").addEventListener("click", () => {
  brackets = {};
  for(let i=1;i<=12;i++) brackets[i] = rainbowColors[(i-1) % rainbowColors.length];
  renderBraces();
});
$("reset-braces").addEventListener("click", () => { brackets = {}; renderBraces(); });

function makeFood(name){
  const span = document.createElement("span");
  span.className = "food-piece";
  span.dataset.food = name;
  if(name === "apple") span.innerHTML = '<span class="food-apple"></span>';
  if(name === "carrot") span.innerHTML = '<span class="food-carrot"></span>';
  if(name === "cracker") span.innerHTML = '<span class="food-cracker"></span>';
  return span;
}

function crumbColor(food){
  if(food === "apple") return "#ff9c8c";
  if(food === "carrot") return "#ffb14d";
  return "#e4c07d";
}

function addCrumbs(food){
  const layer = $("crumb-layer");
  layer.innerHTML = "";
  for(let i=1;i<=5;i++){
    const c = document.createElement("span");
    c.className = "crumb c" + i;
    c.style.background = crumbColor(food);
    layer.appendChild(c);
  }
  setTimeout(() => { layer.innerHTML = ""; }, 1100);
}

function loadFood(name){
  loadedFood = name;
  $("food-stage").innerHTML = "";
  $("food-stage").appendChild(makeFood(name));
  $("jaw-title").textContent = "Food Loaded";
  $("jaw-info").textContent = "Now press Chew Motion to see how the jaw helps break food into smaller pieces.";
}

function startDrag(e, source){
  if(source.classList.contains("disabled")) return;
  e.preventDefault();
  const rect = source.getBoundingClientRect();
  dragging = { source, tool: source.dataset.tool, food: source.dataset.food || "", originalParent: source.parentElement, nextSibling: source.nextSibling };
  source.classList.add("dragging");
  document.body.appendChild(source);
  moveDrag(e);
}

function moveDrag(e){
  if(!dragging) return;
  dragging.source.style.left = e.clientX + "px";
  dragging.source.style.top = e.clientY + "px";
  document.querySelectorAll(".tooth,.jaw-model").forEach(t => t.classList.remove("drop-ready"));
  dragging.source.style.display = "none";
  const target = document.elementFromPoint(e.clientX, e.clientY);
  dragging.source.style.display = "";
  const tooth = target && target.closest ? target.closest(".tooth") : null;
  const jaw = target && target.closest ? target.closest("#jaw-model") : null;
  if(tooth){
    if(dragging.tool === "scaler" && tooth.classList.contains("clean-tooth")) tooth.classList.add("drop-ready");
    if(dragging.tool === "toothbrush" && tooth.classList.contains("clean-tooth")) tooth.classList.add("drop-ready");
    if(dragging.tool === "bracket" && tooth.classList.contains("brace-tooth")) tooth.classList.add("drop-ready");
  }
  if(jaw && dragging.tool === "food") jaw.classList.add("drop-ready");
}

function endDrag(e){
  if(!dragging) return;
  dragging.source.style.display = "none";
  const target = document.elementFromPoint(e.clientX, e.clientY);
  dragging.source.style.display = "";
  const tooth = target && target.closest ? target.closest(".tooth") : null;
  const plaque = target && target.closest ? target.closest(".plaque") : null;
  const jaw = target && target.closest ? target.closest("#jaw-model") : null;

  if(dragging.tool === "scaler"){
    if(plaque) scalePlaque(plaque);
    else if(tooth && tooth.classList.contains("clean-tooth")) scaleTooth(tooth);
    else {
      const nearby = nearestPlaque(e.clientX, e.clientY);
      if(nearby) scalePlaque(nearby);
    }
  }
  if(dragging.tool === "toothbrush" && tooth && tooth.classList.contains("clean-tooth")) brushTooth(tooth);
  if(dragging.tool === "bracket" && tooth && tooth.classList.contains("brace-tooth")) addBracket(tooth);
  if(dragging.tool === "food" && jaw) loadFood(dragging.food);

  dragging.source.classList.remove("dragging");
  dragging.source.style.left = ""; dragging.source.style.top = "";
  if(dragging.nextSibling) dragging.originalParent.insertBefore(dragging.source, dragging.nextSibling);
  else dragging.originalParent.appendChild(dragging.source);
  document.querySelectorAll(".tooth,.jaw-model").forEach(t => t.classList.remove("drop-ready"));
  dragging = null;
}

document.querySelectorAll(".drag-tool").forEach(tool => tool.addEventListener("pointerdown", e => startDrag(e, tool)));
window.addEventListener("pointermove", moveDrag);
window.addEventListener("pointerup", endDrag);

$("open-jaw").onclick = () => {
  $("lower-jaw").classList.remove("chew");
  $("lower-jaw").classList.add("open");
  $("jaw-title").textContent = "Open Jaw";
  $("jaw-info").textContent = loadedFood ? "The jaw is open and ready to take in food." : "Opening the jaw creates space for speaking, biting, and chewing.";
};
$("close-jaw").onclick = () => {
  $("lower-jaw").classList.remove("open","chew");
  $("jaw-title").textContent = "Closed Bite";
  $("jaw-info").textContent = "When the jaw is closed, upper and lower teeth come near each other.";
};
$("chew-jaw").onclick = () => {
  $("lower-jaw").classList.remove("open","chew");
  void $("lower-jaw").offsetWidth;
  $("lower-jaw").classList.add("chew");
  $("jaw-title").textContent = "Chew Motion";
  $("jaw-info").textContent = loadedFood ? "The jaw is chewing the food and breaking it into smaller pieces." : "Chewing uses repeated jaw movement to break food into smaller pieces.";
  const piece = $("food-stage").firstElementChild;
  if(piece){
    piece.classList.remove("chewing","eaten");
    void piece.offsetWidth;
    piece.classList.add("chewing");
    setTimeout(() => addCrumbs(piece.dataset.food || loadedFood), 550);
    setTimeout(() => piece.classList.add("eaten"), 2100);
    setTimeout(() => { $("food-stage").innerHTML = ""; loadedFood = ""; }, 2600);
  }
};

const quiz = [
  {q:"What tool does the lab use first to remove plaque?", c:["Scaler","Toothbrush","Braces wire","Jaw"], a:"Scaler", e:"The scaler step comes before brushing in this simulator."},
  {q:"When can you brush the teeth?", c:["After scaling plaque and picking toothpaste","Before doing anything","Only after braces","Never"], a:"After scaling plaque and picking toothpaste", e:"The lab order is scale, choose flavor, then brush."},
  {q:"How do you add braces in this version?", c:["Drag brackets onto teeth","Click the tooth only","Type a code","Shake the screen"], a:"Drag brackets onto teeth", e:"Dragging makes it more interactive."},
  {q:"Can every tooth have a different braces color?", c:["Yes","No","Only top teeth","Only bottom teeth"], a:"Yes", e:"Each tooth stores its own selected color."},
  {q:"What can you drag into the jaw model?", c:["Food","A shoe","A pencil","Nothing"], a:"Food", e:"Food helps show how chewing works."}
];
function renderQuiz(){
  const it = quiz[quizIndex];
  $("quiz-num").textContent = quizIndex + 1;
  $("quiz-q").textContent = it.q;
  $("quiz-feedback").textContent = "";
  $("quiz-feedback").className = "feedback";
  $("quiz-choices").innerHTML = "";
  it.c.forEach(ch => {
    const b = document.createElement("button");
    b.className = "choice";
    b.textContent = ch;
    b.onclick = () => {
      document.querySelectorAll(".choice").forEach(x => x.classList.remove("selected"));
      b.classList.add("selected");
      const ok = ch === it.a;
      $("quiz-feedback").textContent = (ok ? "Correct! " : "Not quite. Correct answer: " + it.a + ". ") + it.e;
      $("quiz-feedback").className = "feedback " + (ok ? "correct" : "wrong");
    };
    $("quiz-choices").appendChild(b);
  });
  $("next-q").textContent = quizIndex === quiz.length - 1 ? "Restart Quiz" : "Next Question";
}
$("next-q").onclick = () => { quizIndex = (quizIndex + 1) % quiz.length; renderQuiz(); };

updateClean();
renderBraces();
renderQuiz();
document.querySelector('.bracket-preview').style.setProperty('--band', selectedBraceColor);
braceColorHex.textContent = selectedBraceColor.toUpperCase();
wheelSelector.style.left = '50%';
wheelSelector.style.top = '50%';
