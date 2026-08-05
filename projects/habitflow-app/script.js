const {
  TODAY,
  load,
  save,
  isDoneToday,
  currentStreak,
  formatTime,
  metrics,
  escapeHtml
} = window.HabitFlowStore;

const habitName = document.getElementById("habit-name");
const habitCategory = document.getElementById("habit-category");
const habitPriority = document.getElementById("habit-priority");
const habitGoal = document.getElementById("habit-goal");
const reminderTime = document.getElementById("reminder-time");
const addHabitButton = document.getElementById("add-habit");
const habitList = document.getElementById("habit-list");
const habitTotal = document.getElementById("habit-total");
const resetTodayButton = document.getElementById("reset-today");
const clearAllButton = document.getElementById("clear-all");
const enableNotificationsButton = document.getElementById("enable-notifications");
const notificationStatus = document.getElementById("notification-status");

let habits = load();
let activeFilter = "all";

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
  save(habits);
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

  save(habits);
  render();
}

function deleteHabit(id) {
  habits = habits.filter(habit => habit.id !== id);
  save(habits);
  render();
}

function resetToday() {
  habits = habits.map(habit => ({
    ...habit,
    completedDates: (habit.completedDates || []).filter(date => date !== TODAY),
    notifiedDates: (habit.notifiedDates || []).filter(date => date !== TODAY)
  }));
  save(habits);
  render();
}

function clearAll() {
  if (!confirm("Clear all habits?")) return;
  habits = [];
  save(habits);
  render();
}

function priorityClass(priority) {
  return String(priority || "").toLowerCase();
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
    habitTotal.textContent = `${habits.length} habit${habits.length === 1 ? "" : "s"}`;
    return;
  }

  habitTotal.textContent = `${habits.length} habit${habits.length === 1 ? "" : "s"}`;

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

function renderFilters() {
  document.querySelectorAll(".filter").forEach(button => {
    button.classList.toggle("active", button.dataset.filter === activeFilter);
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

  if (changed) save(habits);
}

function render() {
  habits = load();
  renderHabits();
  renderFilters();
  updateNotificationStatus();
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

habitList.addEventListener("click", event => {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.action === "toggle") toggleHabit(button.dataset.id);
  if (button.dataset.action === "delete") deleteHabit(button.dataset.id);
});

enableNotificationsButton.addEventListener("click", enableNotifications);
resetTodayButton.addEventListener("click", resetToday);
clearAllButton.addEventListener("click", clearAll);
window.addEventListener("storage", render);

setInterval(checkReminders, 30000);
render();
checkReminders();
