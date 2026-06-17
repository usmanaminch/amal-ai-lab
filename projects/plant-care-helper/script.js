const photoInput = document.getElementById("plant-photo");
const plantPreview = document.getElementById("plant-preview");
const emptyPreview = document.getElementById("empty-preview");
const generateButton = document.getElementById("generate-plan");
const carePlan = document.getElementById("care-plan");
const plantType = document.getElementById("plant-type");
const sunlight = document.getElementById("sunlight");
const soil = document.getElementById("soil");

photoInput.addEventListener("change", () => {
  const file = photoInput.files[0];
  if (!file) return;
  const imageUrl = URL.createObjectURL(file);
  plantPreview.src = imageUrl;
  plantPreview.style.display = "block";
  emptyPreview.style.display = "none";
});

function getSymptoms() {
  return [...document.querySelectorAll("input[type='checkbox']:checked")].map((box) => box.value);
}

function addTip(title, message, important = false) {
  const card = document.createElement("div");
  card.className = important ? "tip-card priority" : "tip-card";
  const heading = document.createElement("h3");
  heading.textContent = title;
  const text = document.createElement("p");
  text.textContent = message;
  card.appendChild(heading);
  card.appendChild(text);
  carePlan.appendChild(card);
}

function generateCarePlan() {
  const type = plantType.value;
  const light = sunlight.value;
  const soilFeel = soil.value;
  const symptoms = getSymptoms();
  carePlan.innerHTML = "";

  if (!photoInput.files[0]) {
    addTip("Add a photo first", "Upload a plant picture so this feels like a real plant care check.", true);
  }

  if (symptoms.length === 0) {
    addTip("Choose at least one observation", "Pick what you notice about the plant, like yellow leaves, brown tips, or drooping.", true);
    return;
  }

  addTip("First look", "This helper uses your observations to make suggestions. Today’s version does not truly diagnose the plant from the image yet.");

  if (soilFeel === "wet") {
    addTip("Watering tip", "The soil sounds very wet. Let it dry before watering again, and make sure the pot has drainage holes.", true);
  } else if (soilFeel === "dry" && symptoms.includes("drooping")) {
    addTip("Watering tip", "The soil is dry and the plant is drooping. It may need a careful drink of water.");
  } else if (soilFeel === "damp") {
    addTip("Watering tip", "The soil is a little damp. Wait and check again before watering more.");
  } else {
    addTip("Watering tip", "Check the top inch of soil with your finger before watering.");
  }

  if (light === "low" && (symptoms.includes("yellow-leaves") || symptoms.includes("drooping"))) {
    addTip("Light tip", "Low light can make some plants weak or yellow. Try brighter indirect light for a few days.", true);
  } else if (light === "direct" && symptoms.includes("brown-tips")) {
    addTip("Light tip", "Strong direct sun can make leaf tips crispy. Move the plant away from harsh sun.");
  } else if (light === "bright") {
    addTip("Light tip", "Bright indirect light is great for many houseplants.");
  } else {
    addTip("Light tip", "Most plants like steady light. Avoid sudden big changes.");
  }

  if (symptoms.includes("yellow-leaves")) addTip("Yellow leaves", "Yellow leaves can happen from too much water, not enough light, or normal old leaves. Check water and light first.");
  if (symptoms.includes("brown-tips")) addTip("Brown crispy tips", "Brown tips can come from dry air, underwatering, strong sun, or salt buildup. Trim only the dead crispy part if needed.");
  if (symptoms.includes("spots")) addTip("Leaf spots", "Keep spotted leaves dry when watering, remove badly damaged leaves, and avoid splashing water on leaves.");
  if (symptoms.includes("bugs")) addTip("Bug check", "Separate the plant from other plants and gently check under leaves. A parent can help clean leaves with water and mild soap.", true);
  if (symptoms.includes("healthy")) addTip("Healthy plant", "Keep doing what is working. Watch light, water, and new growth.");

  if (type === "succulent") addTip("Succulent note", "Succulents usually prefer more light and less frequent watering than many houseplants.");
  else if (type === "vegetable") addTip("Vegetable or herb note", "Vegetables and herbs often need more sunlight than indoor houseplants.");
  else if (type === "flower") addTip("Flower note", "Flowering plants often need enough light to keep blooming.");
  else if (type === "tree") addTip("Tree or fruit plant note", "Fruit plants usually need strong light and consistent watering, but soggy soil can hurt roots.");

  addTip("Next step", "Take another picture in 3–5 days and compare. A plant journal helps you see if the care plan is working.");
}

generateButton.addEventListener("click", generateCarePlan);
