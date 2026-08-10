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

const CHARACTER_LIMITS = {
  "Elementary School": 2000,
  "Middle School": 3500,
  "High School": 4500,
  "College Prep": 6000
};

function getCharacterLimit() {
  return CHARACTER_LIMITS[levelInput.value] || 3500;
}

function updateCharacterCount(messageMode = "normal") {
  const limit = getCharacterLimit();

  // This is the key fix: the textarea limit changes from the grade level.
  essayInput.maxLength = limit;

  const count = essayInput.value.length;
  characterCount.textContent = `${count} / ${limit} characters`;
  characterCount.classList.toggle("danger", count > limit * 0.95);

  if (messageMode === "prompt") {
    statusBox.textContent = `${levelInput.value} limit selected: ${limit} characters. AI is creating a new prompt...`;
    statusBox.className = "";
    return;
  }

  if (count === 0) {
    statusBox.textContent = `${levelInput.value} limit: ${limit} characters. Waiting for your essay.`;
    statusBox.className = "";
  } else if (count > limit * 0.95) {
    statusBox.textContent = `Almost at the ${limit} character limit for ${levelInput.value}.`;
    statusBox.className = "warning";
  } else {
    statusBox.textContent = `Essay ready. ${levelInput.value} limit: ${limit} characters.`;
    statusBox.className = "success";
  }
}

async function safeJson(response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return { error: "Backend returned a non-JSON error page.", detail: text.slice(0, 500) };
  }
}

async function generatePrompt() {
  const limit = getCharacterLimit();

  // This makes the visible pill change immediately when New Prompt is pressed.
  updateCharacterCount("prompt");

  newPromptButton.disabled = true;

  try {
    const response = await fetch(window.ESSAY_PROMPT_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        level: levelInput.value,
        type: essayTypeInput.value,
        topic: topicInput.value.trim(),
        characterLimit: limit
      })
    });

    const result = await safeJson(response);
    if (!response.ok) throw new Error(result.detail || result.error || `Prompt backend returned ${response.status}`);

    currentPrompt = result.prompt || "";
    promptTitle.textContent = result.title || "Essay Practice Prompt";
    promptType.textContent = result.type || "Essay";
    promptText.textContent = currentPrompt;

    const skills = Array.isArray(result.skills) ? result.skills : ["Thesis", "Evidence", "Organization"];
    skillsBox.innerHTML = skills.slice(0, 3).map(skill => `<span>Skill: ${escapeHtml(skill)}</span>`).join("");

    characterCount.textContent = `${essayInput.value.length} / ${limit} characters`;
    statusBox.textContent = `New ${levelInput.value} prompt ready. Your limit is ${limit} characters.`;
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
  const limit = getCharacterLimit();

  if (!currentPrompt) return setError("Get a prompt first.");
  if (!essay) return setError("Write your essay before submitting.");
  if (essay.length > limit) {
    return setError(`Essay is over the ${limit} character limit for ${levelInput.value}. Shorten it before submitting.`);
  }

  submitEssayButton.disabled = true;
  statusBox.textContent = "AI is grading your essay...";
  statusBox.className = "";

  try {
    const response = await fetch(window.ESSAY_GRADE_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: currentPrompt,
        essay,
        level: levelInput.value,
        essayType: promptType.textContent,
        characterLimit: limit
      })
    });

    const result = await safeJson(response);
    if (!response.ok) throw new Error(result.detail || result.error || `Grading backend returned ${response.status}`);

    renderGrade(result);
    statusBox.textContent = "Essay graded by AI. Read the feedback and revise.";
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
  teacherComment.textContent = result.teacherComment || "AI grading complete. Use the feedback to improve your next draft.";
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
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

essayInput.addEventListener("input", () => updateCharacterCount());
levelInput.addEventListener("change", () => updateCharacterCount());
newPromptButton.addEventListener("click", generatePrompt);
submitEssayButton.addEventListener("click", gradeEssay);
clearEssayButton.addEventListener("click", clearEssay);

updateCharacterCount();
generatePrompt();
