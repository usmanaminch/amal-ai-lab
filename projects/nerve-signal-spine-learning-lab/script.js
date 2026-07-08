const mapData = {
  brain: {
    title: "Brain",
    copy: "The brain is the main control center. It processes information, helps you think, and sends instructions through the nervous system.",
    tip: "The brain and spinal cord together make the central nervous system.",
    layers: [".ns-brain"]
  },
  spinal: {
    title: "Spinal Cord",
    copy: "The spinal cord is the main message highway that carries information between the brain and the body.",
    tip: "The spinal cord runs inside the spine for protection.",
    layers: [".ns-spinal-cord"]
  },
  nerves: {
    title: "Peripheral Nerves",
    copy: "Peripheral nerves branch out from the spinal cord into the arms, torso, and legs to carry messages all through the body.",
    tip: "Peripheral means outside the brain and spinal cord.",
    layers: [".ns-nerve"]
  },
  sensory: {
    title: "Sensory Nerves",
    copy: "Sensory nerves carry information from the body toward the brain and spinal cord, such as touch, temperature, and pain.",
    tip: "Sensory = messages coming in.",
    layers: [".ns-nerve.left-arm-lower", ".ns-nerve.right-arm-lower", ".ns-nerve.left-leg", ".ns-nerve.right-leg", ".ns-nerve.left-rib", ".ns-nerve.right-rib"]
  },
  motor: {
    title: "Motor Nerves",
    copy: "Motor nerves carry instructions from the brain and spinal cord out to muscles, helping the body move.",
    tip: "Motor = movement messages going out.",
    layers: [".ns-nerve.left-shoulder", ".ns-nerve.right-shoulder", ".ns-nerve.left-arm-upper", ".ns-nerve.right-arm-upper", ".ns-nerve.left-hip", ".ns-nerve.right-hip"]
  },
  spine: {
    title: "Spine",
    copy: "The spine is the bony support structure that protects the spinal cord and helps the body stay upright and move safely.",
    tip: "Spine = bones around the spinal cord.",
    layers: [".ns-spinal-cord"]
  }
};

function clearMapHighlights(){
  document.querySelectorAll('.map-layer').forEach(el => el.classList.remove('active'));
}

function selectMap(key) {
  const item = mapData[key];
  document.getElementById('map-title').textContent = item.title;
  document.getElementById('map-copy').textContent = item.copy;
  document.getElementById('map-tip').textContent = item.tip;
  document.querySelectorAll('.map-button').forEach(btn => btn.classList.toggle('active', btn.dataset.map === key));
  clearMapHighlights();
  item.layers.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => el.classList.add('active'));
  });
}

document.querySelectorAll('.map-button').forEach(el => {
  el.addEventListener('click', () => selectMap(el.dataset.map));
});

const neuronData = {
  dendrites: {
    title: 'Dendrites',
    copy: 'Dendrites receive messages from other neurons and carry them toward the cell body.',
    tip: 'Dendrites receive signals.'
  },
  cellbody: {
    title: 'Cell Body',
    copy: 'The cell body contains the nucleus and helps keep the neuron alive.',
    tip: 'The cell body is the control area of the neuron.'
  },
  axon: {
    title: 'Axon',
    copy: 'The axon carries the nerve signal away from the cell body.',
    tip: 'Axon = signal travels away.'
  },
  myelin: {
    title: 'Myelin',
    copy: 'Myelin is a protective covering that helps signals move faster along some axons.',
    tip: 'Myelin helps speed up signals.'
  },
  terminals: {
    title: 'Axon Terminals',
    copy: 'Axon terminals pass the message to another neuron, muscle, or gland.',
    tip: 'Terminals are the sending end.'
  }
};

function selectNeuron(key) {
  const item = neuronData[key];
  document.getElementById('neuron-title').textContent = item.title;
  document.getElementById('neuron-copy').textContent = item.copy;
  document.getElementById('neuron-tip').textContent = item.tip;
  document.querySelectorAll('.neuron-button').forEach(el => el.classList.toggle('active', el.dataset.neuron === key));
  document.querySelectorAll('.focus-part').forEach(part => part.classList.toggle('show', part.id === `part-${key}`));
}

document.querySelectorAll('.neuron-button').forEach(el => {
  el.addEventListener('click', () => selectNeuron(el.dataset.neuron));
});

document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(x => x.classList.toggle('active', x === btn));
    document.querySelectorAll('.panel').forEach(panel => panel.classList.toggle('active', panel.id === btn.dataset.tab));
  });
});

const quiz = [
  ['What is the main job of the nervous system?', ['Send messages through the body', 'Make food', 'Store urine', 'Make bones only'], 'Send messages through the body', 'The nervous system sends information and instructions.'],
  ['What protects the spinal cord?', ['The spine', 'The stomach', 'The lungs', 'The bladder'], 'The spine', 'The vertebrae of the spine help protect the spinal cord.'],
  ['What cell sends nerve signals?', ['Neuron', 'Platelet', 'Osteoblast', 'Red blood cell only'], 'Neuron', 'Neurons are specialized nerve cells.'],
  ['Which nerve carries information toward the spinal cord and brain?', ['Sensory nerve', 'Motor nerve', 'Coronary artery', 'Tendon'], 'Sensory nerve', 'Sensory nerves bring information in.'],
  ['Which nerve carries instructions to muscles?', ['Motor nerve', 'Sensory nerve', 'Vein', 'Ligament'], 'Motor nerve', 'Motor nerves send movement instructions out.'],
  ['Why are reflexes fast?', ['They can use the spinal cord pathway', 'They skip the nervous system', 'They happen in the stomach', 'They are made by bones'], 'They can use the spinal cord pathway', 'A reflex can use a quick spinal cord pathway before full conscious thought.']
];

let q = 0;
function renderQuiz(){
  const item = quiz[q];
  document.getElementById('quiz-number').textContent = q + 1;
  document.getElementById('quiz-question').textContent = item[0];
  const feedback = document.getElementById('quiz-feedback');
  feedback.textContent = '';
  feedback.className = '';
  const choices = document.getElementById('quiz-choices');
  choices.innerHTML = '';
  item[1].forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'quiz-choice';
    btn.textContent = choice;
    btn.onclick = () => {
      document.querySelectorAll('.quiz-choice').forEach(x => x.classList.remove('selected'));
      btn.classList.add('selected');
      const ok = choice === item[2];
      feedback.textContent = (ok ? 'Correct. ' : 'Not quite. Correct answer: ' + item[2] + '. ') + item[3];
      feedback.className = ok ? 'correct' : 'wrong';
    };
    choices.appendChild(btn);
  });
  document.getElementById('next-question').textContent = q === quiz.length - 1 ? 'Restart Study Check' : 'Next Question';
}

document.getElementById('next-question').addEventListener('click', () => {
  q = (q + 1) % quiz.length;
  renderQuiz();
});

selectMap('brain');
selectNeuron('dendrites');
renderQuiz();
