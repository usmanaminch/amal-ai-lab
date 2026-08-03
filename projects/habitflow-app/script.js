const STORAGE_KEY = "habitflowProfessionalV4";
const OLD_STORAGE_KEY = "habitflowProfessionalV3";
const TODAY = new Date().toISOString().slice(0, 10);

const habitName = document.getElementById("habit-name");
const habitCategory = document.getElementById("habit-category");
const habitPriority = document.getElementById("habit-priority");
const habitGoal = document.getElementById("habit-goal");
const reminderTime = document.getElementById("reminder-time");
const addHabitButton = document.getElementById("add-habit");
const habitList = document.getElementById("habit-list");
const habitTotal = document.getElementById("habit-total");
const completionRate = document.getElementById("completion-rate");
const progressFill = document.getElementById("progress-fill");
const doneCount = document.getElementById("done-count");
const doneSubtitle = document.getElementById("done-subtitle");
const longestStreak = document.getElementById("longest-streak");
const nextReminder = document.getElementById("next-reminder");
const nextReminderName = document.getElementById("next-reminder-name");
const bestCategory = document.getElementById("best-category");
const openCount = document.getElementById("open-count");
const trainerNote = document.getElementById("trainer-note");
const resetTodayButton = document.getElementById("reset-today");
const clearAllButton = document.getElementById("clear-all");
const enableNotificationsButton = document.getElementById("enable-notifications");
const notificationStatus = document.getElementById("notification-status");

let habits = loadHabits();
let activeFilter = "all";

function loadHabits() {
  try {
    const current = localStorage.getItem(STORAGE_KEY);
    const old = localStorage.getItem(OLD_STORAGE_KEY);
    return JSON.parse(current || old || "[]");
  } catch {
    return [];
  }
}

function saveHabits() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}

function makeId() {
  return crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random());
}

function addHabit({ name, category, priority, goal, time }) {
  const cleanName = name.trim();
  if (!cleanName) {
    habitName.focus();
    habitName.placeholder = "Type a habit name first";
    return;
  }

  habits.push({
    id: makeId(),
    name: cleanName,
    category,
    priority,
    goal: goal.trim() || "Daily goal",
    reminderTime: time || "",
    completedDates: [],
    notifiedDates: [],
    bestStreak: 0,
    createdAt: new Date().toISOString()
  });

  habitName.value = "";
  habitGoal.value = "";
  reminderTime.value = "";
  saveHabits();
  render();
}

function toggleHabit(id) {
  habits = habits.map(habit => {
    if (habit.id !== id) return habit;

    const dates = new Set(habit.completedDates || []);
    dates.has(TODAY) ? dates.delete(TODAY) : dates.add(TODAY);

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
    completedDates: (habit.completedDates || []).filter(date => date !== TODAY),
    notifiedDates: (habit.notifiedDates || []).filter(date => date !== TODAY)
  }));
  saveHabits();
  render();
}

function clearAll() {
  if (!confirm("Clear all habits?")) return;
  habits = [];
  saveHabits();
  render();
}

function currentStreak(dates) {
  const set = new Set(dates || []);
  let streak = 0;
  const cursor = new Date();

  while (true) {
    const key = cursor.toISOString().slice(0, 10);
    if (!set.has(key)) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

function isDoneToday(habit) {
  return (habit.completedDates || []).includes(TODAY);
}

function priorityClass(priority) {
  return String(priority || "").toLowerCase();
}

function formatTime(time) {
  if (!time) return "No reminder";
  const [hourText, minute] = time.split(":");
  let hour = Number(hourText);
  const suffix = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${suffix}`;
}

function getFilteredHabits() {
  return habits.filter(habit => {
    if (activeFilter === "open") return !isDoneToday(habit);
    if (activeFilter === "done") return isDoneToday(habit);
    if (activeFilter === "high") return habit.priority === "High";
    return true;
  });
}

function renderHabits() {
  const visible = getFilteredHabits();

  if (visible.length === 0) {
    habitList.innerHTML = `<div class="empty-state"><strong>Nothing here yet</strong><p>Add a habit or change your filter.</p></div>`;
    return;
  }

  habitList.innerHTML = visible.map(habit => {
    const done = isDoneToday(habit);
    const streak = currentStreak(habit.completedDates);

    return `
      <article class="habit-card ${done ? "done" : ""}">
        <button class="check" data-action="toggle" data-id="${habit.id}">${done ? "✓" : ""}</button>
        <div class="habit-main">
          <div class="habit-title-row">
            <div>
              <h4>${escapeHtml(habit.name)}</h4>
              <p>${escapeHtml(habit.goal)} · ${escapeHtml(habit.category)} · Reminder: ${formatTime(habit.reminderTime)}</p>
            </div>
            <span class="priority ${priorityClass(habit.priority)}">${escapeHtml(habit.priority)}</span>
          </div>
          <div class="habit-meta">
            <span>Current streak: ${streak} day${streak === 1 ? "" : "s"}</span>
            <span>Best streak: ${habit.bestStreak || 0}</span>
            <span>${done ? "Complete today" : "Open today"}</span>
          </div>
        </div>
        <button class="delete" data-action="delete" data-id="${habit.id}">×</button>
      </article>
    `;
  }).join("");
}

function renderMetrics() {
  const total = habits.length;
  const done = habits.filter(isDoneToday).length;
  const percent = total ? Math.round((done / total) * 100) : 0;
  const longest = habits.reduce((max, habit) => Math.max(max, habit.bestStreak || 0, currentStreak(habit.completedDates)), 0);
  const open = total - done;

  completionRate.textContent = `${percent}%`;
  progressFill.style.width = `${percent}%`;
  doneCount.textContent = done;
  doneSubtitle.textContent = total ? `${done} of ${total} completed` : "No habits yet";
  longestStreak.textContent = longest;
  habitTotal.textContent = `${total} habit${total === 1 ? "" : "s"}`;
  openCount.textContent = open;

  const next = getNextReminder();
  if (next) {
    nextReminder.textContent = formatTime(next.reminderTime);
    nextReminderName.textContent = next.name;
  } else {
    nextReminder.textContent = "—";
    nextReminderName.textContent = "No reminders set";
  }

  bestCategory.textContent = getBestCategory();
  trainerNote.textContent = getTrainerNote(percent, total, done);
}

function getNextReminder() {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const upcoming = habits
    .filter(habit => habit.reminderTime && !isDoneToday(habit))
    .map(habit => {
      const [hour, minute] = habit.reminderTime.split(":").map(Number);
      return { ...habit, minutes: hour * 60 + minute };
    })
    .filter(habit => habit.minutes >= currentMinutes)
    .sort((a, b) => a.minutes - b.minutes);

  return upcoming[0] || null;
}

function getBestCategory() {
  const completed = habits.filter(isDoneToday);
  if (!completed.length) return "—";

  const counts = {};
  completed.forEach(habit => {
    counts[habit.category] = (counts[habit.category] || 0) + 1;
  });

  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

function getTrainerNote(percent, total, done) {
  if (!total) return "Add your first habit to begin.";
  if (percent === 100) return "Excellent. You completed the whole routine today.";
  if (percent >= 70) return "Strong progress. You are close to finishing today.";
  if (percent >= 40) return "Good momentum. Pick one more open habit.";
  if (done > 0) return "Nice start. Keep the next step small.";
  return "Choose the easiest habit and get one quick win.";
}

function renderFilters() {
  document.querySelectorAll(".filter").forEach(button => {
    button.classList.toggle("active", button.dataset.filter === activeFilter);
  });
}

function switchTab(tabName) {
  document.querySelectorAll(".tab-button").forEach(button => {
    button.classList.toggle("active", button.dataset.tab === tabName);
  });

  document.querySelectorAll(".tab-panel").forEach(panel => {
    panel.classList.toggle("active", panel.id === `tab-${tabName}`);
  });
}

function updateNotificationStatus() {
  if (!("Notification" in window)) {
    notificationStatus.textContent = "This browser does not support notifications.";
    enableNotificationsButton.disabled = true;
    return;
  }

  if (Notification.permission === "granted") {
    notificationStatus.textContent = "Notifications enabled while app is open.";
    enableNotificationsButton.textContent = "Notifications Enabled";
    enableNotificationsButton.disabled = true;
  } else if (Notification.permission === "denied") {
    notificationStatus.textContent = "Notifications are blocked in browser settings.";
  } else {
    notificationStatus.textContent = "Enable reminder popups.";
  }
}

async function enableNotifications() {
  if (!("Notification" in window)) {
    updateNotificationStatus();
    return;
  }

  const permission = await Notification.requestPermission();
  updateNotificationStatus();

  if (permission === "granted") {
    new Notification("HabitFlow", {
      body: "Notifications are enabled. Reminder popups can appear while this app is open."
    });
  }
}

function checkReminders() {
  if (!("Notification" in window) || Notification.permission !== "granted") return;

  const currentTime = new Date().toTimeString().slice(0, 5);
  let changed = false;

  habits = habits.map(habit => {
    if (!habit.reminderTime || habit.reminderTime !== currentTime || isDoneToday(habit)) return habit;

    const notifiedDates = new Set(habit.notifiedDates || []);
    if (notifiedDates.has(TODAY)) return habit;

    new Notification("HabitFlow Reminder", {
      body: `${habit.name} · ${habit.goal}`,
      tag: habit.id
    });

    notifiedDates.add(TODAY);
    changed = true;

    return { ...habit, notifiedDates: Array.from(notifiedDates).sort() };
  });

  if (changed) saveHabits();
}

function render() {
  renderHabits();
  renderMetrics();
  renderFilters();
  updateNotificationStatus();
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
  addHabit({
    name: habitName.value,
    category: habitCategory.value,
    priority: habitPriority.value,
    goal: habitGoal.value,
    time: reminderTime.value
  });
});

habitName.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    addHabit({
      name: habitName.value,
      category: habitCategory.value,
      priority: habitPriority.value,
      goal: habitGoal.value,
      time: reminderTime.value
    });
  }
});

document.querySelectorAll(".template").forEach(button => {
  button.addEventListener("click", () => {
    addHabit({
      name: button.dataset.name,
      category: button.dataset.category,
      priority: button.dataset.priority,
      goal: button.dataset.goal,
      time: button.dataset.time
    });
  });
});

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    render();
  });
});

document.querySelectorAll(".tab-button").forEach(button => {
  button.addEventListener("click", () => switchTab(button.dataset.tab));
});

habitList.addEventListener("click", event => {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.action === "toggle") toggleHabit(button.dataset.id);
  if (button.dataset.action === "delete") deleteHabit(button.dataset.id);
});

enableNotificationsButton.addEventListener("click", enableNotifications);
resetTodayButton.addEventListener("click", resetToday);
clearAllButton.addEventListener("click", clearAll);

setInterval(checkReminders, 30000);
render();
checkReminders();
