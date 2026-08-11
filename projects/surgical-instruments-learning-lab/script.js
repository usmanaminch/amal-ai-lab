const toolData = {
  scalpel: {
    title: "Scalpel",
    copy: "A scalpel is a very sharp cutting instrument used by trained professionals for precise cutting.",
    job: "Used for precise cutting in a controlled medical setting.",
    facts: ["Designed for precision.", "Must stay sterile.", "Counted carefully for safety."],
    shape: "shape-scalpel"
  },
  forceps: {
    title: "Forceps",
    copy: "Forceps are used to hold or pick up small items carefully.",
    job: "Helps grasp small materials without using fingers.",
    facts: ["Often compared to tweezers.", "Good for small items.", "Kept on the sterile tray."],
    shape: "shape-forceps"
  },
  clamp: {
    title: "Clamp",
    copy: "A clamp can hold something steady or closed.",
    job: "Helps hold something in place during a medical procedure.",
    facts: ["Some clamps can lock.", "Used to hold things steady.", "Handled by trained teams."],
    shape: "shape-clamp"
  },
  scissors: {
    title: "Scissors",
    copy: "Surgical scissors are specialized cutting tools used in medical settings.",
    job: "Used for cutting selected materials in controlled settings.",
    facts: ["Different scissors have different jobs.", "Made for precise work.", "Need careful handling."],
    shape: "shape-scissors"
  },
  retractor: {
    title: "Retractor",
    copy: "A retractor helps hold an area open so the team can see better.",
    job: "Improves visibility by holding an area open.",
    facts: ["Helps with visibility.", "Used only by trained professionals.", "Part of many procedures."],
    shape: "shape-retractor"
  },
  needle: {
    title: "Needle Holder",
    copy: "A needle holder helps trained professionals hold a surgical needle.",
    job: "Helps control a needle during suturing.",
    facts: ["Used with suturing.", "Made for a secure grip.", "This lab does not teach real procedures."],
    shape: "shape-needle"
  }
};

function selectTool(key){
  const tool = toolData[key];
  document.getElementById("tool-title").textContent = tool.title;
  document.getElementById("tool-copy").textContent = tool.copy;
  document.getElementById("tool-job").textContent = tool.job;
  document.getElementById("tool-facts").innerHTML = tool.facts.map(item => `<li>${item}</li>`).join("");
  const visual = document.getElementById("tool-visual");
  visual.className = `tool-visual ${tool.shape} large`;
  document.querySelectorAll(".tray-tool").forEach(btn => btn.classList.toggle("active", btn.dataset.tool === key));
}

document.querySelectorAll(".tray-tool").forEach(btn => {
  btn.addEventListener("click", () => selectTool(btn.dataset.tool));
});

document.querySelectorAll(".tab-button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-button").forEach(b => b.classList.toggle("active", b === btn));
    document.querySelectorAll(".tab-panel").forEach(panel => panel.classList.toggle("active", panel.id === btn.dataset.tab));
  });
});

const matchCases = [
  {
    title: "Hold small items carefully",
    copy: "Which tool is generally used to pick up or hold small materials?",
    answer: "forceps",
    explain: "Forceps are commonly used to hold or pick up small items."
  },
  {
    title: "Make a precise cut",
    copy: "Which tool is the sharp cutting instrument?",
    answer: "scalpel",
    explain: "A scalpel is used for precise cutting."
  },
  {
    title: "Hold something steady",
    copy: "Which tool is generally used to hold something steady or closed?",
    answer: "clamp",
    explain: "A clamp can hold something steady or closed."
  },
  {
    title: "Hold an area open",
    copy: "Which tool helps improve visibility by holding an area open?",
    answer: "retractor",
    explain: "A retractor is used to hold an area open."
  }
];
let caseIndex = 0;

function renderCase(){
  const item = matchCases[caseIndex];
  document.getElementById("case-title").textContent = item.title;
  document.getElementById("case-copy").textContent = item.copy;
  const feedback = document.getElementById("match-feedback");
  feedback.textContent = "";
  feedback.className = "";
  document.querySelectorAll(".match-choice").forEach(btn => btn.classList.remove("selected"));
}
document.querySelectorAll(".match-choice").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".match-choice").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    const item = matchCases[caseIndex];
    const ok = btn.dataset.answer === item.answer;
    const feedback = document.getElementById("match-feedback");
    feedback.textContent = (ok ? "Correct. " : "Not quite. ") + item.explain;
    feedback.className = ok ? "correct" : "wrong";
  });
});
document.getElementById("next-case").addEventListener("click", () => {
  caseIndex = (caseIndex + 1) % matchCases.length;
  renderCase();
});

const quiz = [
  {
    q: "What is the main rule for this project?",
    choices: ["It is educational only", "It teaches real surgery", "Use real tools at home", "Ignore safety"],
    a: "It is educational only",
    explain: "This project is for learning names and ideas only."
  },
  {
    q: "Which tool is known for precise cutting?",
    choices: ["Scalpel", "Monitor", "Bandage", "Cabinet"],
    a: "Scalpel",
    explain: "The scalpel is the sharp cutting tool."
  },
  {
    q: "Which tool can pick up small items carefully?",
    choices: ["Forceps", "Clamp", "Mask", "Retractor"],
    a: "Forceps",
    explain: "Forceps are used to pick up or hold small items."
  },
  {
    q: "Why do teams count instruments?",
    choices: ["To keep patients safe", "To decorate the tray", "To make tools shiny", "To make the room quieter"],
    a: "To keep patients safe",
    explain: "Counting instruments is an important OR safety step."
  },
  {
    q: "What does a retractor do?",
    choices: ["Hold an area open", "Take blood pressure", "Show X-rays", "Clean the floor"],
    a: "Hold an area open",
    explain: "A retractor helps hold an area open so the team can see better."
  },
  {
    q: "Who should use real surgical instruments?",
    choices: ["Trained medical professionals", "Kids at home", "Any website visitor", "Anyone curious"],
    a: "Trained medical professionals",
    explain: "Real surgical instruments are used only by trained professionals."
  }
];
let qIndex = 0;

function renderQuiz(){
  const q = quiz[qIndex];
  document.getElementById("quiz-number").textContent = qIndex + 1;
  document.getElementById("quiz-question").textContent = q.q;
  const wrap = document.getElementById("quiz-choices");
  wrap.innerHTML = "";
  const feedback = document.getElementById("quiz-feedback");
  feedback.textContent = "";
  feedback.className = "";
  q.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.className = "quiz-choice";
    btn.textContent = choice;
    btn.addEventListener("click", () => {
      document.querySelectorAll(".quiz-choice").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      const ok = choice === q.a;
      feedback.textContent = (ok ? "Correct. " : "Not quite. Correct answer: " + q.a + ". ") + q.explain;
      feedback.className = ok ? "correct" : "wrong";
    });
    wrap.appendChild(btn);
  });
  document.getElementById("next-question").textContent = qIndex === quiz.length - 1 ? "Restart Study Check" : "Next Question";
}
document.getElementById("next-question").addEventListener("click", () => {
  qIndex = (qIndex + 1) % quiz.length;
  renderQuiz();
});

selectTool("scalpel");
renderCase();
renderQuiz();
