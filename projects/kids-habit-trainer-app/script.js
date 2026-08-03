const STORAGE_KEY = "amalKidsHabitTrainerV1";
const TODAY = new Date().toISOString().slice(0, 10);

const habitName = document.getElementById("habit-name");
const habitCategory = document.getElementById("habit-category");
const habitGoal = document.getElementById("habit-goal");
const addHabitButton = document.getElementById("add-habit");
const habitList = document.getElementById("habit-list");
const habitCount = document.getElementById("habit-count");
const scoreNumber = document.getElementById("score-number");
const progressFill = document.getElementById("progress-fill");
const trainerTitle = document.getElementById("trainer-title");
const trainerMessage = document.getElementById("trainer-message");
const resetTodayButton = document.getElementById("reset-today");
const clearAllButton = document.getElementById("clear-all");

let habits = loadHabits();

function loadHabits() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveHabits() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}

function makeId() {
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return String(Date.now() + Math.random());
}

function addHabit(name, category, goal) {
  const cleanName = name.trim();
  if (!cleanName) {
    habitName.focus();
    habitName.placeholder = "Type a habit first";
    return;
  }

  habits.push({
    id: makeId(),
    name: cleanName,
    category,
    goal: goal.trim() || "Daily goal",
    completedDates: [],
    bestStreak: 0
  });

  habitName.value = "";
  habitGoal.value = "";
  saveHabits();
  render();
}

function toggleHabit(id) {
  habits = habits.map(habit => {
    if (habit.id !== id) return habit;

    const dates = new Set(habit.completedDates);
    if (dates.has(TODAY)) {
      dates.delete(TODAY);
    } else {
      dates.add(TODAY);
    }

    const updated = { ...habit, completedDates: Array.from(dates).sort() };
    updated.bestStreak = Math.max(updated.bestStreak || 0, currentStreak(updated.completedDates));
    return updated;
  });

  saveHabits();
  render();
}

function deleteHabit(id) {
  habits = habits.filter(habit => habit.id !== id);
  saveHabits();
  render();
}

function resetToday() {
  habits = habits.map(habit => ({
    ...habit,
    completedDates: habit.completedDates.filter(date => date !== TODAY)
  }));
  saveHabits();
  render();
}

function clearAll() {
  if (!confirm("Clear all habits from the app?")) return;
  habits = [];
  saveHabits();
  render();
}

function currentStreak(dates) {
  const set = new Set(dates);
  let streak = 0;
  const date = new Date();

  while (true) {
    const key = date.toISOString().slice(0, 10);
    if (!set.has(key)) break;
    streak++;
    date.setDate(date.getDate() - 1);
  }

  return streak;
}

function emoji(category) {
  return {
    Reading: "📚",
    Homework: "✏️",
    Exercise: "🏃",
    Water: "💧",
    Kindness: "💛",
    Chores: "🧺",
    Creative: "🎨",
    "Prayer / Reflection": "🤲"
  }[category] || "🌟";
}

function isDoneToday(habit) {
  return habit.completedDates.includes(TODAY);
}

function renderList() {
  if (habits.length === 0) {
    habitList.innerHTML = `
      <div class="empty-state">
        <span>🌱</span>
        <h3>No habits yet</h3>
        <p>Add a habit or use a quick-start button.</p>
      </div>
    `;
    return;
  }

  habitList.innerHTML = habits.map(habit => {
    const done = isDoneToday(habit);
    const streak = currentStreak(habit.completedDates);

    return `
      <article class="habit-card ${done ? "done" : ""}">
        <button class="check" data-action="toggle" data-id="${habit.id}">${done ? "✓" : ""}</button>
        <div>
          <div class="habit-row">
            <h3>${emoji(habit.category)} ${escapeHtml(habit.name)}</h3>
            <span>${escapeHtml(habit.category)}</span>
          </div>
          <p>${escapeHtml(habit.goal)}</p>
          <div class="stats">
            <strong>Streak: ${streak}</strong>
            <strong>Best: ${habit.bestStreak || 0}</strong>
          </div>
        </div>
        <button class="delete" data-action="delete" data-id="${habit.id}">×</button>
      </article>
    `;
  }).join("");
}

function renderScore() {
  const total = habits.length;
  const done = habits.filter(isDoneToday).length;
  const percent = total ? Math.round((done / total) * 100) : 0;

  scoreNumber.textContent = `${percent}%`;
  progressFill.style.width = `${percent}%`;
  habitCount.textContent = `${total} habit${total === 1 ? "" : "s"}`;

  if (total === 0) {
    trainerTitle.textContent = "Ready to train?";
    trainerMessage.textContent = "Add a habit to start your training journey.";
  } else if (percent === 100) {
    trainerTitle.textContent = "Perfect day!";
    trainerMessage.textContent = "You completed every habit. Your habit trainer is impressed.";
  } else if (percent >= 50) {
    trainerTitle.textContent = "Halfway hero!";
    trainerMessage.textContent = "You are building momentum. Finish strong.";
  } else if (done > 0) {
    trainerTitle.textContent = "Nice first win!";
    trainerMessage.textContent = `You completed ${done} of ${total} habits today.`;
  } else {
    trainerTitle.textContent = "Training time!";
    trainerMessage.textContent = "Pick one easy habit and get your first check.";
  }

  setBadge("badge-first", done >= 1);
  setBadge("badge-half", total > 0 && percent >= 50);
  setBadge("badge-perfect", total > 0 && percent === 100);
  setBadge("badge-streak", habits.some(habit => currentStreak(habit.completedDates) >= 3 || (habit.bestStreak || 0) >= 3));
}

function setBadge(id, unlocked) {
  const badge = document.getElementById(id);
  badge.classList.toggle("locked", !unlocked);
  badge.classList.toggle("unlocked", unlocked);
}

function render() {
  renderList();
  renderScore();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

addHabitButton.addEventListener("click", () => {
  addHabit(habitName.value, habitCategory.value, habitGoal.value);
});

habitName.addEventListener("keydown", event => {
  if (event.key === "Enter") addHabit(habitName.value, habitCategory.value, habitGoal.value);
});

document.querySelectorAll(".quick").forEach(button => {
  button.addEventListener("click", () => {
    const exists = habits.some(habit => habit.name.toLowerCase() === button.dataset.name.toLowerCase());
    if (!exists) addHabit(button.dataset.name, button.dataset.category, button.dataset.goal);
  });
});

habitList.addEventListener("click", event => {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.action === "toggle") toggleHabit(button.dataset.id);
  if (button.dataset.action === "delete") deleteHabit(button.dataset.id);
});

resetTodayButton.addEventListener("click", resetToday);
clearAllButton.addEventListener("click", clearAll);

render();
