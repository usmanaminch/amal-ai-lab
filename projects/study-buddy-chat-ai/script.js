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
  const topic = topicInput.value.trim() || "my topic";
  const text = `Let's study ${topic}. Please help me in ${modeInput.value} mode.`;
  addUserMessage(text);
  askStudyBuddy(text);
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
  chatWindow.insertAdjacentHTML("beforeend", `<div class="message user"><div class="bubble">${escapeHtml(text)}</div></div>`);
  scrollChat();
}

function addAiMessage(text) {
  messages.push({ role: "assistant", content: text });
  chatWindow.insertAdjacentHTML("beforeend", `<div class="message ai"><div class="avatar">📚</div><div class="bubble">${escapeHtml(text)}</div></div>`);
  scrollChat();
}

function addLoading() {
  chatWindow.insertAdjacentHTML("beforeend", `<div id="loadingMessage" class="message ai"><div class="avatar">📚</div><div class="bubble">Thinking...</div></div>`);
  scrollChat();
}

function removeLoading() {
  const el = document.getElementById("loadingMessage");
  if (el) el.remove();
}

async function askStudyBuddy() {
  sendBtn.disabled = true;
  startBtn.disabled = true;
  addLoading();

  try {
    const response = await fetch("/api/study-buddy-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject: subjectInput.value,
        topic: topicInput.value,
        mode: modeInput.value,
        messages
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Study Buddy had trouble.");

    removeLoading();
    addAiMessage(data.reply);
  } catch (error) {
    removeLoading();
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
