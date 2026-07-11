const sections = document.querySelectorAll(".panel");
const navButtons = document.querySelectorAll(".nav-button");

navButtons.forEach(button => {
  button.addEventListener("click", () => {
    navButtons.forEach(b => b.classList.toggle("active", b === button));
    sections.forEach(section => section.classList.toggle("active", section.id === button.dataset.section));
  });
});

const vitals = {
  heart: {
    icon: "❤️",
    title: "Heart Rate",
    copy: "Heart rate tells how many times the heart beats in one minute.",
    why: "It helps the team understand how hard the heart is working.",
    facts: [
      "The heart pumps blood through the body.",
      "A monitor can show the heartbeat pattern.",
      "Trained teams look for changes over time."
    ]
  },
  oxygen: {
    icon: "🫁",
    title: "Oxygen Level",
    copy: "Oxygen level tells how much oxygen is being carried in the blood.",
    why: "Body cells need oxygen to make energy and keep working.",
    facts: [
      "Oxygen enters the body through the lungs.",
      "Blood carries oxygen to body tissues.",
      "A pulse oximeter can estimate oxygen level."
    ]
  },
  blood: {
    icon: "🩸",
    title: "Blood Pressure",
    copy: "Blood pressure describes the force of blood pushing against blood vessel walls.",
    why: "It gives clues about blood flow and circulation.",
    facts: [
      "Blood pressure is written as two numbers.",
      "The top number relates to heart squeeze.",
      "The bottom number relates to heart relaxation."
    ]
  },
  breathing: {
    icon: "🌬️",
    title: "Breathing Rate",
    copy: "Breathing rate tells how many breaths happen in one minute.",
    why: "Breathing brings in oxygen and removes carbon dioxide.",
    facts: [
      "The lungs move air in and out.",
      "Breathing can change with activity, illness, or stress.",
      "The care team watches for changes."
    ]
  },
  temp: {
    icon: "🌡️",
    title: "Temperature",
    copy: "Temperature tells how warm the body is.",
    why: "Changes in temperature can give clues about how the body is doing.",
    facts: [
      "The body tries to keep a steady temperature.",
      "Temperature can be measured in different ways.",
      "Trained teams combine temperature with other vital signs."
    ]
  }
};

function selectVital(key){
  const v = vitals[key];

  document.getElementById("focus-icon").textContent = v.icon;
  document.getElementById("focus-title").textContent = v.title;
  document.getElementById("focus-copy").textContent = v.copy;
  document.getElementById("focus-why").textContent = v.why;

  document.getElementById("study-icon").textContent = v.icon;
  document.getElementById("study-title").textContent = v.title;
  document.getElementById("study-copy").textContent = v.copy;
  document.getElementById("study-list").innerHTML = v.facts.map(f => `<li>${f}</li>`).join("");

  document.querySelectorAll(".reading-card").forEach(card => card.classList.toggle("active", card.dataset.vital === key));
  document.querySelectorAll(".study-button").forEach(card => card.classList.toggle("active", card.dataset.vital === key));
}

document.querySelectorAll(".reading-card, .study-button").forEach(button => {
  button.addEventListener("click", () => selectVital(button.dataset.vital));
});

const quiz = [
  {
    q: "What are vitals?",
    choices: ["Body signals that help show how a patient is doing", "A type of snack", "Only the color of a monitor", "A surgery tool"],
    a: "Body signals that help show how a patient is doing",
    explain: "Vitals are important body signals that trained teams watch."
  },
  {
    q: "What does heart rate measure?",
    choices: ["Heart beats per minute", "Number of bones", "How tall someone is", "Eye color"],
    a: "Heart beats per minute",
    explain: "Heart rate is how many times the heart beats in one minute."
  },
  {
    q: "What does oxygen level tell us?",
    choices: ["How much oxygen is being carried in the blood", "How loud the room is", "How sharp a tool is", "How old the patient is"],
    a: "How much oxygen is being carried in the blood",
    explain: "Oxygen level gives clues about oxygen in the blood."
  },
  {
    q: "Why does the team watch breathing rate?",
    choices: ["Breathing brings in oxygen and removes carbon dioxide", "It changes eye color", "It makes the monitor brighter", "It replaces hand hygiene"],
    a: "Breathing brings in oxygen and removes carbon dioxide",
    explain: "Breathing helps the body get oxygen and remove carbon dioxide."
  },
  {
    q: "What does blood pressure describe?",
    choices: ["The force of blood pushing against blood vessel walls", "How many teeth someone has", "The size of the OR lights", "A type of glove"],
    a: "The force of blood pushing against blood vessel walls",
    explain: "Blood pressure is about blood flow force in the vessels."
  },
  {
    q: "Who watches vitals in real patient care?",
    choices: ["Trained medical professionals working as a team", "Only one random person", "A student website", "Nobody"],
    a: "Trained medical professionals working as a team",
    explain: "Patient safety is teamwork by trained professionals."
  }
];

let currentQuiz = 0;

function renderQuiz(){
  const item = quiz[currentQuiz];
  document.getElementById("quiz-number").textContent = currentQuiz + 1;
  document.getElementById("quiz-question").textContent = item.q;
  const choices = document.getElementById("quiz-choices");
  const feedback = document.getElementById("quiz-feedback");
  choices.innerHTML = "";
  feedback.textContent = "";
  feedback.className = "";

  item.choices.forEach(choice => {
    const button = document.createElement("button");
    button.className = "quiz-choice";
    button.textContent = choice;
    button.addEventListener("click", () => {
      document.querySelectorAll(".quiz-choice").forEach(b => b.classList.remove("selected"));
      button.classList.add("selected");
      const ok = choice === item.a;
      feedback.textContent = (ok ? "Correct. " : "Not quite. Correct answer: " + item.a + ". ") + item.explain;
      feedback.className = ok ? "correct" : "wrong";
    });
    choices.appendChild(button);
  });

  document.getElementById("next-question").textContent =
    currentQuiz === quiz.length - 1 ? "Restart Study Check" : "Next Question";
}

document.getElementById("next-question").addEventListener("click", () => {
  currentQuiz = (currentQuiz + 1) % quiz.length;
  renderQuiz();
});

selectVital("heart");
renderQuiz();
