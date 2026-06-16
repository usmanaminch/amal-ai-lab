const bodySvg = document.getElementById("body-svg");
const currentMode = document.getElementById("current-mode");
const activePartsText = document.getElementById("active-parts-text");

const title = document.getElementById("part-title");
const summary = document.getElementById("part-summary");
const doesText = document.getElementById("part-does");
const mattersText = document.getElementById("part-matters");
const doctorText = document.getElementById("part-doctor");
const factText = document.getElementById("part-fact");

const bodyInfo = {
  heart: {
    label: "Heart",
    summary: "The heart pumps blood around the body.",
    does: "Moves blood so oxygen and nutrients can reach the body.",
    matters: "Every cell needs blood flow to stay alive.",
    doctor: "Heart surgeons can repair heart problems in specialized operations.",
    fact: "Your heart beats all day and night without you telling it to."
  },
  lungs: {
    label: "Lungs",
    summary: "The lungs help the body breathe.",
    does: "Bring oxygen into the body and help remove carbon dioxide.",
    matters: "Oxygen helps the body make energy.",
    doctor: "Doctors check breathing with tools like stethoscopes and imaging.",
    fact: "Your lungs expand like balloons when you breathe in."
  },
  brain: {
    label: "Brain",
    summary: "The brain controls thinking, movement, and senses.",
    does: "Helps you think, remember, move, feel, and make decisions.",
    matters: "It is the body’s control center.",
    doctor: "Brain surgeons need extremely careful planning and precision.",
    fact: "Your brain is always working, even when you sleep."
  },
  bones: {
    label: "Bones",
    summary: "Bones give the body shape and protect organs.",
    does: "Support the body and protect important organs.",
    matters: "Bones help you stand, move, and stay protected.",
    doctor: "Orthopedic surgeons help repair bones and joints.",
    fact: "Bones are strong, but they are also living tissue."
  },
  muscles: {
    label: "Muscles",
    summary: "Muscles help the body move.",
    does: "Pull on bones so you can walk, jump, smile, and write.",
    matters: "Muscles help with movement, posture, and strength.",
    doctor: "Surgeons must understand muscles before operating near them.",
    fact: "Smiling uses muscles in your face."
  },
  skin: {
    label: "Skin",
    summary: "Skin protects the body from the outside world.",
    does: "Protects the body, helps sense touch, and helps control temperature.",
    matters: "Skin is the body’s outer shield.",
    doctor: "Plastic and reconstructive surgeons help repair skin after injuries or burns.",
    fact: "Skin is the body’s largest organ."
  },
  teeth: {
    label: "Teeth",
    summary: "Teeth help you bite, chew, and speak clearly.",
    does: "Break food into smaller pieces and help with speech.",
    matters: "Teeth help with eating, smiling, and communication.",
    doctor: "Oral surgeons may help with wisdom teeth, jaw issues, and mouth surgery.",
    fact: "Teeth are covered by enamel, which is very hard."
  },
  jaw: {
    label: "Jaw",
    summary: "The jaw helps you chew, talk, and shape your smile.",
    does: "Holds teeth and helps the mouth open and close.",
    matters: "The jaw is important for chewing, speaking, and face structure.",
    doctor: "Oral and maxillofacial surgeons work with teeth, jaws, and facial bones.",
    fact: "Your jaw is one of the most-used moving parts of your body."
  }
};

const partTargets = {
  heart: ["heart-group", "heart-shape", "blood-left", "blood-right"],
  lungs: ["lungs-group", "lung-left", "lung-right", "breath-left", "breath-right"],
  brain: ["brain-group", "brain-shape"],
  bones: ["spine", "bone-arm-left", "bone-arm-right", "bone-leg-left", "bone-leg-right"],
  muscles: ["muscle-left", "muscle-right"],
  skin: ["skin-head", "skin-torso", "arm-left", "arm-right"],
  teeth: ["teeth-top"],
  jaw: ["jaw-shape"]
};

const clickableNodes = document.querySelectorAll("[data-part]");
const activeParts = new Set(["heart"]);
let lastClicked = "heart";

function updateInfo(part) {
  const info = bodyInfo[part];
  if (!info) return;

  title.textContent = info.label;
  summary.textContent = info.summary;
  doesText.textContent = info.does;
  mattersText.textContent = info.matters;
  doctorText.textContent = info.doctor;
  factText.textContent = info.fact;
  currentMode.textContent = `Last clicked: ${info.label}`;
}

function clearSelectedOutlines() {
  document.querySelectorAll(".selected-stroke").forEach((el) => {
    el.classList.remove("selected-stroke");
  });
}

function applySelectionOutline(part) {
  clearSelectedOutlines();
  (partTargets[part] || []).forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (
      id === "heart-shape" ||
      id === "brain-shape" ||
      id === "lung-left" ||
      id === "lung-right" ||
      id === "teeth-top" ||
      id === "jaw-shape"
    ) {
      el.classList.add("selected-stroke");
    }
  });
}

function clearPartClasses(part) {
  (partTargets[part] || []).forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.remove("part-on");
  });

  if (part === "heart") bodySvg.classList.remove("active-heart-on");
  if (part === "lungs") bodySvg.classList.remove("active-lungs-on");
}

function addPartClasses(part) {
  (partTargets[part] || []).forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.add("part-on");
  });

  if (part === "heart") bodySvg.classList.add("active-heart-on");
  if (part === "lungs") bodySvg.classList.add("active-lungs-on");
}

function renderActiveParts() {
  Object.keys(partTargets).forEach((part) => clearPartClasses(part));
  activeParts.forEach((part) => addPartClasses(part));

  const labels = [...activeParts].map((part) => bodyInfo[part].label);
  activePartsText.textContent = labels.length ? labels.join(", ") : "None";
}

function togglePart(part) {
  lastClicked = part;
  updateInfo(part);
  applySelectionOutline(part);

  if (activeParts.has(part)) {
    activeParts.delete(part);
  } else {
    activeParts.add(part);
  }

  renderActiveParts();
}

clickableNodes.forEach((node) => {
  node.addEventListener("click", () => {
    togglePart(node.dataset.part);
  });
});

updateInfo("heart");
applySelectionOutline("heart");
renderActiveParts();
