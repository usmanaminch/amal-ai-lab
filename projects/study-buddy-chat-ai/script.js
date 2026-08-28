const subjectInput = document.getElementById("subject");
const topicInput = document.getElementById("topic");
const modeInput = document.getElementById("mode");
const startBtn = document.getElementById("startBtn");

const chatWindow = document.getElementById("chatWindow");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

const quickButtons = document.querySelectorAll(".quick-actions button");

let messages = [];

startBtn.addEventListener("click", () => {
  const subject = subjectInput.value;
  const topic = topicInput.value.trim() || "my topic";
  const mode = modeInput.value;

  const startMessage = `Let's study ${topic} for ${subject}. Mode: ${mode}. Please start by helping me.`;

  addUserMessage(startMessage);
  askStudyBuddy(startMessage);
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = userInput.value.trim();
  if (!text) return;

  userInput.value = "";
  addUserMessage(text);
  askStudyBuddy(text);
});

quickButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const text = btn.dataset.prompt;
    addUserMessage(text);
    askStudyBuddy(text);
  });
});

function addUserMessage(text) {
  messages.push({ role: "user", content: text });

  const el = document.createElement("div");
  el.className = "message user";
  el.innerHTML = `<div class="bubble">${escapeHtml(text)}</div>`;
  chatWindow.appendChild(el);
  scrollChat();
}

function addAiMessage(text) {
  messages.push({ role: "assistant", content: text });

  const el = document.createElement("div");
  el.className = "message ai";
  el.innerHTML = `
    <div class="avatar">📚</div>
    <div class="bubble">${escapeHtml(text)}</div>
  `;
  chatWindow.appendChild(el);
  scrollChat();
}

function addLoadingMessage() {
  const el = document.createElement("div");
  el.className = "message ai";
  el.id = "loadingMessage";
  el.innerHTML = `
    <div class="avatar">📚</div>
    <div class="bubble loading-dot">Thinking...</div>
  `;
  chatWindow.appendChild(el);
  scrollChat();
}

function removeLoadingMessage() {
  const el = document.getElementById("loadingMessage");
  if (el) el.remove();
}

async function askStudyBuddy(text) {
  sendBtn.disabled = true;
  startBtn.disabled = true;
  addLoadingMessage();

  try {
    const response = await fetch("/api/study-buddy-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        subject: subjectInput.value,
        topic: topicInput.value,
        mode: modeInput.value,
        messages
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Study Buddy had trouble.");
    }

    removeLoadingMessage();
    addAiMessage(data.reply);
  } catch (error) {
    removeLoadingMessage();
    addAiMessage(error.message || "Study Buddy had trouble. Try again?");
  } finally {
    sendBtn.disabled = false;
    startBtn.disabled = false;
  }
}

function scrollChat() {
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
