const $ = id => document.getElementById(id);

const cases = [
  {
    id: "wrist",
    icon: "🦴",
    name: "Zoe's Soccer Wrist",
    short: "Zoe fell during soccer and her wrist is swollen.",
    chart: "Pretend case: Zoe has wrist swelling after a fall. Your job is to safely check and support the wrist.",
    specialist: "Orthopedic Surgeon",
    modelClass: "wrist-model",
    tools: [
      {name:"X-ray Scanner", icon:"🩻", className:"scanned", direction:"Drag the X-ray Scanner onto the wrist to check the bone before deciding what support it needs."},
      {name:"Splint", icon:"🪵", className:"splinted", direction:"Drag the Splint onto the wrist to keep it still and protected."},
      {name:"Cast Kit", icon:"🦴", className:"cast", direction:"Drag the Cast Kit onto the wrist to show longer support after the injury is checked."}
    ],
    steps: ["Check the injury with imaging", "Keep the wrist still with a splint", "Add a cast/support plan"],
    lesson: "For a wrist injury, the safe order is check first, support the wrist, then plan protection and follow-up."
  },
  {
    id: "jaw",
    icon: "🦷",
    name: "Ayaan's Jaw Injury",
    short: "Ayaan fell from a bike and has jaw pain.",
    chart: "Pretend case: Ayaan has jaw pain and a chipped tooth after a bike fall. Your job is to check safety and support the jaw.",
    specialist: "Oral & Maxillofacial Surgeon",
    modelClass: "jaw-model",
    tools: [
      {name:"Airway Check", icon:"💨", className:"airway", direction:"Drag Airway Check onto the face first. In real care, breathing and safety come first."},
      {name:"Face X-ray", icon:"🩻", className:"xray", direction:"Drag Face X-ray onto the jaw to check the jaw and face area."},
      {name:"Sterile Gauze", icon:"🧻", className:"gauze", direction:"Drag Sterile Gauze onto the mouth area to show safe bleeding control in the model."},
      {name:"Jaw Support", icon:"🦷", className:"supported", direction:"Drag Jaw Support onto the jaw to show careful support and referral."}
    ],
    steps: ["Check airway and safety", "Use imaging", "Control bleeding safely", "Support and refer"],
    lesson: "Jaw and face injuries need careful safety checks, imaging, and the right specialist."
  },
  {
    id: "skin",
    icon: "🧵",
    name: "Mia's Skin Repair",
    short: "Mia has a deep skin cut that needs careful repair.",
    chart: "Pretend case: Mia has a skin cut. Your job is to clean, close, and protect it in a safe learning model.",
    specialist: "Plastic / Reconstructive Surgeon",
    modelClass: "skin-model",
    tools: [
      {name:"Sterile Wash", icon:"🧼", className:"cleaned", direction:"Drag Sterile Wash onto the skin first to show cleaning before repair."},
      {name:"Suture Kit", icon:"🧵", className:"stitched", direction:"Drag Suture Kit onto the cut to show careful closing in this model."},
      {name:"Bandage", icon:"🩹", className:"bandaged", direction:"Drag Bandage onto the repair to protect it while healing."}
    ],
    steps: ["Clean the area", "Close the cut", "Protect with dressing"],
    lesson: "Skin repair usually follows a safe order: clean, close, protect."
  },
  {
    id: "belly",
    icon: "🏥",
    name: "Leo's Belly Pain",
    short: "Leo has strong belly pain and needs urgent evaluation.",
    chart: "Pretend case: Leo has strong belly pain and fever. Your job is to check safely and call the right team.",
    specialist: "General Surgeon",
    modelClass: "belly-model",
    tools: [
      {name:"Vitals Monitor", icon:"💓", className:"vitals", direction:"Drag Vitals Monitor onto the patient to check basic safety signs first."},
      {name:"Ultrasound", icon:"📡", className:"ultrasound", direction:"Drag Ultrasound onto the belly to look for clues in the model."},
      {name:"IV Fluids", icon:"💧", className:"fluids", direction:"Drag IV Fluids onto the patient to show supportive care while evaluating."},
      {name:"Call Surgical Team", icon:"📞", className:"called", direction:"Drag Call Surgical Team onto the model when the case needs a surgeon."}
    ],
    steps: ["Check vital signs", "Use imaging", "Support the patient", "Call surgical team"],
    lesson: "Abdominal emergencies need careful evaluation, support, and the correct team."
  }
];

const quizzes = [
  {q:"Why should procedure steps happen in order?", choices:["Safety", "Decoration", "To make it harder", "No reason"], answer:"Safety", explain:"The order helps keep the patient safe in the learning model."},
  {q:"For Zoe's wrist, what comes before support?", choices:["Checking with imaging", "Guessing", "Ignoring swelling", "Choosing random tools"], answer:"Checking with imaging", explain:"The model teaches checking the injury before support."},
  {q:"For a jaw injury, what should come first?", choices:["Airway and safety check", "Bandage the knee", "Pick colors", "Ignore the face"], answer:"Airway and safety check", explain:"Safety and breathing come first in serious injury thinking."},
  {q:"For skin repair, what is the safe order?", choices:["Clean, close, protect", "Protect, dirty, guess", "Close before cleaning", "Skip the bandage"], answer:"Clean, close, protect", explain:"The model teaches cleaning before repair and protection after."},
  {q:"Why is this lab educational only?", choices:["Real patients need real doctors", "Websites can do surgery", "Games replace hospitals", "Tools are magic"], answer:"Real patients need real doctors", explain:"This lab teaches ideas. Real health problems need trained professionals."}
];

let selectedCase = null;
let stepIndex = 0;
let draggingTool = null;
let completedCase = false;
let quizIndex = 0;

document.querySelectorAll(".tab").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(b => b.classList.toggle("active", b === button));
    document.querySelectorAll(".panel").forEach(panel => panel.classList.toggle("active", panel.id === button.dataset.tab));
    if(button.dataset.tab === "quiz") renderQuiz();
  });
});

function switchTab(id){
  const button = document.querySelector(`.tab[data-tab="${id}"]`);
  if(button) button.click();
}

function renderCases(){
  const grid = $("case-grid");
  grid.innerHTML = "";
  cases.forEach(item => {
    const card = document.createElement("article");
    card.className = "case-card" + (selectedCase && selectedCase.id === item.id ? " selected" : "");
    card.innerHTML = `
      <div class="case-icon">${item.icon}</div>
      <h3>${item.name}</h3>
      <p>${item.short}</p>
      <p><strong>Specialist:</strong> ${item.specialist}</p>
      <button type="button">Start Procedure</button>
    `;
    card.addEventListener("click", () => {
      selectedCase = item;
      stepIndex = 0;
      renderCases();
      renderProcedure();
      switchTab("procedure");
    });
    grid.appendChild(card);
  });
}

function renderProcedure(){
  if(!selectedCase){
    $("procedure-title").textContent = "Pick a case first";
    $("procedure-summary").textContent = "Choose a patient from the Case Board to begin.";
    $("patient-icon").textContent = "🩺";
    $("patient-name").textContent = "No case selected";
    $("patient-chart").textContent = "Choose a case from the Case Board.";
    $("current-step-title").textContent = "Step 0";
    $("current-step-direction").textContent = "Pick a case to see the steps.";
    $("step-list").innerHTML = "";
    $("tool-tray").innerHTML = "";
    $("body-model").className = "body-model empty";
    $("model-label").textContent = "No model loaded";
    $("model-visual").innerHTML = "";
    updateProgress();
    return;
  }

  $("procedure-title").textContent = selectedCase.name;
  $("procedure-summary").textContent = selectedCase.short;
  $("patient-icon").textContent = selectedCase.icon;
  $("patient-name").textContent = selectedCase.name;
  $("patient-chart").textContent = selectedCase.chart;

  const currentTool = selectedCase.tools[stepIndex];
  if(currentTool){
    $("current-step-title").textContent = `Step ${stepIndex + 1}: ${selectedCase.steps[stepIndex]}`;
    $("current-step-direction").textContent = currentTool.direction;
  } else {
    $("current-step-title").textContent = "Procedure Complete";
    $("current-step-direction").textContent = selectedCase.lesson;
  }

  const list = $("step-list");
  list.innerHTML = "";
  selectedCase.steps.forEach((step, i) => {
    const div = document.createElement("div");
    div.className = "step-item" + (i < stepIndex ? " done" : i === stepIndex ? " active" : "");
    div.textContent = `${i + 1}. ${step}`;
    list.appendChild(div);
  });

  renderModel();
  renderTools();
  updateProgress();
}

function renderModel(){
  const model = $("body-model");
  model.className = "body-model";
  if(selectedCase) model.classList.add(selectedCase.id);
  $("model-label").textContent = selectedCase ? selectedCase.name : "No model loaded";

  const visual = $("model-visual");
  visual.innerHTML = "";

  if(!selectedCase) return;

  const modelDiv = document.createElement("div");
  modelDiv.className = selectedCase.modelClass;

  if(selectedCase.id === "wrist"){
    modelDiv.innerHTML = '<div class="wrist-swelling"></div><div class="wrist-arm"></div><div class="wrist-hand"></div><div class="wrist-bone"></div>';
  }
  if(selectedCase.id === "jaw"){
    modelDiv.innerHTML = '<div class="face"></div><div class="jaw-shape"></div><div class="jaw-pain"></div>';
  }
  if(selectedCase.id === "skin"){
    modelDiv.innerHTML = '<div class="skin-patch"><div class="cut"></div></div>';
  }
  if(selectedCase.id === "belly"){
    modelDiv.innerHTML = '<div class="torso"></div><div class="belly-alert"></div>';
  }

  selectedCase.tools.forEach((tool, i) => {
    if(i < stepIndex) modelDiv.classList.add(tool.className);
  });

  visual.appendChild(modelDiv);
}

function renderTools(){
  const tray = $("tool-tray");
  tray.innerHTML = "";
  if(!selectedCase) return;

  selectedCase.tools.forEach((tool, i) => {
    const t = document.createElement("div");
    t.className = "tool";
    if(i < stepIndex) t.classList.add("used");
    if(i !== stepIndex) t.classList.add("inactive");
    t.dataset.toolIndex = i;
    t.innerHTML = `<span class="tool-icon">${tool.icon}</span><strong>${tool.name}</strong><small>${i === stepIndex ? "Use now" : i < stepIndex ? "Done" : "Later"}</small>`;
    t.addEventListener("pointerdown", startDrag);
    tray.appendChild(t);
  });
}

function startDrag(e){
  const source = e.currentTarget;
  if(source.classList.contains("inactive") || source.classList.contains("used")) return;
  e.preventDefault();
  draggingTool = {
    source,
    index: Number(source.dataset.toolIndex),
    originalParent: source.parentElement,
    nextSibling: source.nextSibling
  };
  source.classList.add("dragging");
  document.body.appendChild(source);
  moveDrag(e);
}

function moveDrag(e){
  if(!draggingTool) return;
  draggingTool.source.style.left = e.clientX + "px";
  draggingTool.source.style.top = e.clientY + "px";

  draggingTool.source.style.display = "none";
  const target = document.elementFromPoint(e.clientX, e.clientY);
  draggingTool.source.style.display = "";

  const model = target && target.closest ? target.closest("#body-model") : null;
  $("body-model").classList.toggle("ready", Boolean(model));
}

function endDrag(e){
  if(!draggingTool) return;

  draggingTool.source.style.display = "none";
  const target = document.elementFromPoint(e.clientX, e.clientY);
  draggingTool.source.style.display = "";
  const model = target && target.closest ? target.closest("#body-model") : null;

  if(model && draggingTool.index === stepIndex){
    completeStep();
  } else {
    wrongToolEffect();
  }

  draggingTool.source.classList.remove("dragging");
  draggingTool.source.style.left = "";
  draggingTool.source.style.top = "";
  if(draggingTool.nextSibling) draggingTool.originalParent.insertBefore(draggingTool.source, draggingTool.nextSibling);
  else draggingTool.originalParent.appendChild(draggingTool.source);
  $("body-model").classList.remove("ready");
  draggingTool = null;
}

window.addEventListener("pointermove", moveDrag);
window.addEventListener("pointerup", endDrag);

function completeStep(){
  const effect = $("model-effect");
  effect.innerHTML = '<div class="success-burst">✓</div>';
  setTimeout(() => effect.innerHTML = "", 750);
  stepIndex++;
  if(stepIndex >= selectedCase.tools.length){
    completedCase = true;
    $("procedure-feedback").textContent = "Case complete! The quiz is unlocked.";
  } else {
    $("procedure-feedback").textContent = "Good. Now follow the next step.";
  }
  renderProcedure();
  renderQuiz();
}

function wrongToolEffect(){
  $("body-model").classList.add("wrong-shake");
  $("procedure-feedback").textContent = "Try the tool that matches the current step direction.";
  setTimeout(() => $("body-model").classList.remove("wrong-shake"), 400);
}

function updateProgress(){
  if(!selectedCase){
    $("progress-title").textContent = "0%";
    $("progress-fill").style.width = "0%";
    $("procedure-feedback").textContent = "Pick a case and follow the directions.";
    $("go-quiz").textContent = "Finish a Case to Unlock Quiz";
    $("go-quiz").classList.add("locked");
    return;
  }

  const percent = Math.round((stepIndex / selectedCase.tools.length) * 100);
  $("progress-title").textContent = `${percent}%`;
  $("progress-fill").style.width = percent + "%";

  if(percent === 0) $("procedure-feedback").textContent = "Start with the first tool in the directions.";
  else if(percent < 100) $("procedure-feedback").textContent = "Nice progress. Keep following the procedure steps.";
  else $("procedure-feedback").textContent = "Case complete! The quiz is unlocked.";

  $("go-quiz").textContent = completedCase ? "Go to Quiz" : "Finish a Case to Unlock Quiz";
  $("go-quiz").classList.toggle("locked", !completedCase);
}

$("reset-procedure").addEventListener("click", () => {
  if(!selectedCase) return;
  stepIndex = 0;
  renderProcedure();
});

$("go-quiz").addEventListener("click", () => {
  if(completedCase) switchTab("quiz");
});

function renderQuiz(){
  const title = $("quiz-lock-title");
  const copy = $("quiz-lock-copy");
  const card = $("quiz-card");

  if(!completedCase){
    title.textContent = "Finish a case to unlock the quiz";
    copy.textContent = "Complete one procedure in the Procedure Room first.";
    card.classList.add("locked-card");
    $("quiz-question").textContent = "Locked";
    $("quiz-choices").innerHTML = "";
    $("quiz-feedback").textContent = "";
    return;
  }

  title.textContent = "Lab Check";
  copy.textContent = "Answer 5 questions about procedure steps, tools, and safety.";
  card.classList.remove("locked-card");

  const item = quizzes[quizIndex];
  $("quiz-number").textContent = quizIndex + 1;
  $("quiz-question").textContent = item.q;
  $("quiz-feedback").textContent = "";
  $("quiz-feedback").className = "quiz-feedback";
  $("quiz-choices").innerHTML = "";

  item.choices.forEach(choice => {
    const b = document.createElement("button");
    b.className = "quiz-choice";
    b.textContent = choice;
    b.addEventListener("click", () => {
      document.querySelectorAll(".quiz-choice").forEach(x => x.classList.remove("selected"));
      b.classList.add("selected");
      const ok = choice === item.answer;
      $("quiz-feedback").textContent = (ok ? "Correct! " : "Not quite. Correct answer: " + item.answer + ". ") + item.explain;
      $("quiz-feedback").className = "quiz-feedback " + (ok ? "correct" : "wrong");
    });
    $("quiz-choices").appendChild(b);
  });

  $("next-question").textContent = quizIndex === quizzes.length - 1 ? "Restart Quiz" : "Next Question";
}

$("next-question").addEventListener("click", () => {
  if(!completedCase) return;
  quizIndex = (quizIndex + 1) % quizzes.length;
  renderQuiz();
});

renderCases();
renderProcedure();
renderQuiz();
