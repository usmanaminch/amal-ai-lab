const newPromptButton = document.getElementById("new-prompt");
const clearEssayButton = document.getElementById("clear-essay");
const submitEssayButton = document.getElementById("submit-essay");
const levelInput = document.getElementById("level");
const essayTypeInput = document.getElementById("essay-type");
const topicInput = document.getElementById("topic");
const promptTitle = document.getElementById("prompt-title");
const promptType = document.getElementById("prompt-type");
const promptText = document.getElementById("prompt-text");
const skillsBox = document.getElementById("skills");
const essayInput = document.getElementById("essay");
const characterCount = document.getElementById("character-count");
const statusBox = document.getElementById("status");
const scoreNumber = document.getElementById("score-number");
const letterGrade = document.getElementById("letter-grade");
const scoreMessage = document.getElementById("score-message");
const rubricPrompt = document.getElementById("rubric-prompt");
const rubricOrganization = document.getElementById("rubric-organization");
const rubricEvidence = document.getElementById("rubric-evidence");
const rubricClarity = document.getElementById("rubric-clarity");
const rubricGrammar = document.getElementById("rubric-grammar");
const strengthsList = document.getElementById("strengths");
const improvementsList = document.getElementById("improvements");
const revisionList = document.getElementById("revision");
const teacherComment = document.getElementById("teacher-comment");

let currentPrompt = "";

function updateCharacterCount() {
  const count = essayInput.value.length;
  characterCount.textContent = `${count} / 2000 characters`;
  characterCount.classList.toggle("danger", count > 1900);
  if (count === 0) {
    statusBox.textContent = "Waiting for your essay.";
    statusBox.className = "";
  } else if (count > 1900) {
    statusBox.textContent = "Almost at the 2000 character limit.";
    statusBox.className = "warning";
  } else {
    statusBox.textContent = "Essay ready when you are.";
    statusBox.className = "success";
  }
}

async function safeJson(response) {
  const text = await response.text();
  try { return JSON.parse(text); }
  catch { return { error: "Backend returned a non-JSON error page.", detail: text.slice(0, 500) }; }
}

async function generatePrompt() {
  newPromptButton.disabled = true;
  statusBox.textContent = "AI is creating a new writing prompt...";
  statusBox.className = "";
  try {
    const response = await fetch(window.ESSAY_PROMPT_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ level: levelInput.value, type: essayTypeInput.value, topic: topicInput.value.trim() })
    });
    const result = await safeJson(response);
    if (!response.ok) throw new Error(result.detail || result.error || `Prompt backend returned ${response.status}`);
    currentPrompt = result.prompt || "";
    promptTitle.textContent = result.title || "Essay Practice Prompt";
    promptType.textContent = result.type || "Essay";
    promptText.textContent = currentPrompt;
    const skills = Array.isArray(result.skills) ? result.skills : ["Thesis", "Evidence", "Organization"];
    skillsBox.innerHTML = skills.slice(0, 3).map(skill => `<span>Skill: ${escapeHtml(skill)}</span>`).join("");
    statusBox.textContent = "New prompt ready. Start writing.";
    statusBox.className = "success";
  } catch (error) {
    console.error(error);
    statusBox.textContent = error.message;
    statusBox.className = "error";
  } finally {
    newPromptButton.disabled = false;
  }
}

async function gradeEssay() {
  const essay = essayInput.value.trim();
  if (!currentPrompt) return setError("Get a prompt first.");
  if (!essay) return setError("Write your essay before submitting.");
  if (essay.length > 2000) return setError("Essay is over 2000 characters. Shorten it before submitting.");

  submitEssayButton.disabled = true;
  statusBox.textContent = "AI is grading your essay...";
  statusBox.className = "";
  try {
    const response = await fetch(window.ESSAY_GRADE_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: currentPrompt, essay, level: levelInput.value, essayType: promptType.textContent })
    });
    const result = await safeJson(response);
    if (!response.ok) throw new Error(result.detail || result.error || `Grading backend returned ${response.status}`);
    renderGrade(result);
    statusBox.textContent = "Essay graded. Read the feedback and revise.";
    statusBox.className = "success";
  } catch (error) {
    console.error(error);
    setError(error.message);
  } finally {
    submitEssayButton.disabled = false;
  }
}

function setError(message) {
  statusBox.textContent = message;
  statusBox.className = "error";
}

function renderGrade(result) {
  scoreNumber.textContent = `${result.score ?? "—"}`;
  letterGrade.textContent = `Grade: ${result.letterGrade || "—"}`;
  scoreMessage.textContent = result.gradeExplanation || "AI graded your essay.";
  const rubric = result.rubric || {};
  rubricPrompt.textContent = `${rubric.promptResponse ?? "—"} / 20`;
  rubricOrganization.textContent = `${rubric.organization ?? "—"} / 20`;
  rubricEvidence.textContent = `${rubric.evidenceAndDetails ?? "—"} / 20`;
  rubricClarity.textContent = `${rubric.clarityAndStyle ?? "—"} / 20`;
  rubricGrammar.textContent = `${rubric.grammarAndMechanics ?? "—"} / 20`;
  renderList(strengthsList, result.whatYouDidWell);
  renderList(improvementsList, result.whatToImprove);
  renderList(revisionList, result.revisionAdvice);
  teacherComment.textContent = result.teacherComment || "Keep practicing.";
}

function renderList(element, items) {
  const list = Array.isArray(items) ? items : ["Feedback will show here."];
  element.innerHTML = list.map(item => `<li>${escapeHtml(item)}</li>`).join("");
}

function clearEssay() {
  essayInput.value = "";
  updateCharacterCount();
}

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

essayInput.addEventListener("input", updateCharacterCount);
newPromptButton.addEventListener("click", generatePrompt);
submitEssayButton.addEventListener("click", gradeEssay);
clearEssayButton.addEventListener("click", clearEssay);
updateCharacterCount();
generatePrompt();
