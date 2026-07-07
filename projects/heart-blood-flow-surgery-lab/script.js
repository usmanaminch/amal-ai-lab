const organData = {
  brain: {
    title: "Brain",
    text: "The brain is the control center of the body. It helps manage thinking, movement, senses, and body signals.",
    bullets: [
      "It sends messages through nerves.",
      "It helps control breathing and heartbeat too.",
      "The heart sends blood to the brain for oxygen."
    ],
    tip: "Notice how the heart and brain both depend on steady blood flow."
  },
  lungs: {
    title: "Lungs",
    text: "The lungs help blood pick up oxygen and get rid of carbon dioxide.",
    bullets: [
      "They work closely with the heart.",
      "Oxygen enters the blood in the lungs.",
      "Pulmonary vessels carry blood to and from the lungs."
    ],
    tip: "The right side of the heart sends blood to the lungs."
  },
  heart: {
    title: "Heart",
    text: "The heart is a muscular pump that moves blood through the body.",
    bullets: [
      "It has four chambers.",
      "It sends oxygen-poor blood to the lungs.",
      "It sends oxygen-rich blood out to the body."
    ],
    tip: "The heart is the center of the circulatory system."
  },
  liver: {
    title: "Liver",
    text: "The liver helps process nutrients, store energy, and filter certain substances from the blood.",
    bullets: [
      "It has many metabolic jobs.",
      "It helps process what you absorb from food.",
      "It receives a large blood supply."
    ],
    tip: "The liver is one of the body’s hardest-working organs."
  },
  stomach: {
    title: "Stomach",
    text: "The stomach helps break down food using acid and muscle movement.",
    bullets: [
      "It is part of the digestive system.",
      "Food is mixed and partially digested there.",
      "The bloodstream later helps carry absorbed nutrients."
    ],
    tip: "Digestion and circulation work together."
  },
  kidneys: {
    title: "Kidneys",
    text: "The kidneys help filter waste and extra water from the blood.",
    bullets: [
      "They help make urine.",
      "They help balance fluids in the body.",
      "They need healthy blood flow to do their job."
    ],
    tip: "Blood is cleaned by the kidneys."
  },
  intestines: {
    title: "Intestines",
    text: "The intestines help finish digestion and absorb nutrients and water.",
    bullets: [
      "The small intestine absorbs many nutrients.",
      "The large intestine helps with water absorption.",
      "The blood carries absorbed nutrients where they are needed."
    ],
    tip: "Absorbed nutrients enter the bloodstream."
  },
  bladder: {
    title: "Bladder",
    text: "The bladder stores urine until the body is ready to release it.",
    bullets: [
      "It is part of the urinary system.",
      "Urine is made by the kidneys first.",
      "The bladder holds urine before it leaves the body."
    ],
    tip: "The bladder stores, but the kidneys filter."
  }
};

function selectOrgan(key) {
  const info = organData[key];
  document.getElementById("organ-title").textContent = info.title;
  document.getElementById("organ-text").textContent = info.text;
  document.getElementById("organ-tip").textContent = info.tip;
  document.getElementById("organ-bullets").innerHTML = info.bullets.map(item => `<li>${item}</li>`).join("");

  document.querySelectorAll(".organ, .organ-hotspot").forEach(el => {
    el.classList.toggle("active", el.dataset.organ === key);
  });
  document.querySelectorAll(".organ-button").forEach(el => {
    el.classList.toggle("active", el.dataset.target === key);
  });
}

document.querySelectorAll(".organ, .organ-hotspot").forEach(el => {
  el.addEventListener("click", () => selectOrgan(el.dataset.organ));
});
document.querySelectorAll(".organ-button").forEach(el => {
  el.addEventListener("click", () => selectOrgan(el.dataset.target));
});

const heartData = {
  chambers: {
    title: "Heart Chambers",
    text: "The heart has four chambers. The atria receive blood, and the ventricles pump blood out.",
    clue: "Atria receive. Ventricles pump."
  },
  valves: {
    title: "Valves",
    text: "Valves are like one-way doors. They help keep blood moving forward.",
    clue: "Valves help stop backward flow."
  },
  arteries: {
    title: "Arteries",
    text: "Arteries carry blood away from the heart. The aorta is the biggest artery.",
    clue: "Arteries = away from the heart."
  },
  veins: {
    title: "Veins",
    text: "Veins carry blood back toward the heart. Pulmonary veins are a special example from the lungs.",
    clue: "Veins return blood."
  },
  coronary: {
    title: "Coronary Arteries",
    text: "Coronary arteries bring oxygen-rich blood to the heart muscle itself.",
    clue: "The heart muscle needs its own blood supply."
  },
  muscle: {
    title: "Heart Muscle",
    text: "The heart muscle is called myocardium. It squeezes to pump blood.",
    clue: "Myocardium = pumping muscle."
  }
};

function selectHeart(key) {
  const info = heartData[key];
  document.getElementById("heart-title").textContent = info.title;
  document.getElementById("heart-copy").textContent = info.text;
  document.getElementById("heart-clue").textContent = info.clue;
  document.getElementById("heart-picture-label").textContent = info.title;
  const box = document.getElementById("heart-picture");
  box.className = "heart-picture " + key;

  const shape = box.querySelector(".heart-shape");
  if (key === "chambers") {
    shape.innerHTML = `
      <div class="chamber ra">Right Atrium</div>
      <div class="chamber la">Left Atrium</div>
      <div class="chamber rv">Right Ventricle</div>
      <div class="chamber lv">Left Ventricle</div>
    `;
  } else {
    shape.innerHTML = "";
  }

  document.querySelectorAll(".heart-button").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.heart === key);
  });
}

document.querySelectorAll(".heart-button").forEach(btn => {
  btn.addEventListener("click", () => selectHeart(btn.dataset.heart));
});

document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(x => x.classList.toggle("active", x === btn));
    document.querySelectorAll(".panel").forEach(panel => panel.classList.toggle("active", panel.id === btn.dataset.tab));
  });
});

const quiz = [
  ["Which organ pumps blood through the body?", ["Heart", "Stomach", "Bladder", "Skin"], "Heart", "The heart is the pump of the circulatory system."],
  ["Where does blood pick up oxygen?", ["Lungs", "Kidneys", "Liver", "Bladder"], "Lungs", "The lungs add oxygen to blood."],
  ["Which side of the heart sends blood to the lungs?", ["Right side", "Left side", "Both at the same time only", "Neither"], "Right side", "The right heart sends oxygen-poor blood to the lungs."],
  ["What do kidneys help do?", ["Filter waste from blood", "Pump blood", "Store food", "Move muscles"], "Filter waste from blood", "Kidneys help filter waste and extra water."],
  ["What do coronary arteries feed?", ["The heart muscle", "The bladder", "The skin", "Only the lungs"], "The heart muscle", "Coronary arteries give blood to the heart muscle itself."],
  ["Why is this lesson educational only?", ["Real symptoms need real medical care", "Websites replace doctors", "A quiz can diagnose disease", "An organ map can treat patients"], "Real symptoms need real medical care", "Real medical problems need trained professionals."]
];

let q = 0;
function renderQuiz() {
  const item = quiz[q];
  document.getElementById("quiz-number").textContent = q + 1;
  document.getElementById("quiz-question").textContent = item[0];
  document.getElementById("quiz-feedback").textContent = "";
  document.getElementById("quiz-feedback").className = "";
  const wrap = document.getElementById("quiz-choices");
  wrap.innerHTML = "";
  item[1].forEach(choice => {
    const btn = document.createElement("button");
    btn.className = "quiz-choice";
    btn.textContent = choice;
    btn.onclick = () => {
      document.querySelectorAll(".quiz-choice").forEach(x => x.classList.remove("selected"));
      btn.classList.add("selected");
      const ok = choice === item[2];
      const feedback = document.getElementById("quiz-feedback");
      feedback.textContent = (ok ? "Correct. " : "Not quite. Correct answer: " + item[2] + ". ") + item[3];
      feedback.className = ok ? "correct" : "wrong";
    };
    wrap.appendChild(btn);
  });
  document.getElementById("next-question").textContent = q === quiz.length - 1 ? "Restart Study Check" : "Next Question";
}
document.getElementById("next-question").addEventListener("click", () => {
  q = (q + 1) % quiz.length;
  renderQuiz();
});
renderQuiz();
