window.HabitFlowStore = (() => {
  const STORAGE_KEY = "habitflowProfessionalSharedV5";
  const OLD_KEYS = ["habitflowProfessionalV4", "habitflowProfessionalV3"];
  const TODAY = new Date().toISOString().slice(0, 10);

  function load() {
    try {
      const current = localStorage.getItem(STORAGE_KEY);
      if (current) return JSON.parse(current);

      for (const key of OLD_KEYS) {
        const old = localStorage.getItem(key);
        if (old) {
          const parsed = JSON.parse(old);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
          return parsed;
        }
      }

      return [];
    } catch {
      return [];
    }
  }

  function save(habits) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  }

  function isDoneToday(habit) {
    return (habit.completedDates || []).includes(TODAY);
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

  function formatTime(time) {
    if (!time) return "No reminder";
    const [hourText, minute] = time.split(":");
    let hour = Number(hourText);
    const suffix = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${suffix}`;
  }

  function getNextReminder(habits) {
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

  function getBestCategory(habits) {
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

  function metrics(habits) {
    const total = habits.length;
    const done = habits.filter(isDoneToday).length;
    const percent = total ? Math.round((done / total) * 100) : 0;
    const longest = habits.reduce((max, habit) => Math.max(max, habit.bestStreak || 0, currentStreak(habit.completedDates)), 0);
    const next = getNextReminder(habits);

    return {
      total,
      done,
      open: total - done,
      percent,
      longest,
      next,
      bestCategory: getBestCategory(habits),
      trainerNote: getTrainerNote(percent, total, done)
    };
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  return {
    TODAY,
    load,
    save,
    isDoneToday,
    currentStreak,
    formatTime,
    metrics,
    escapeHtml
  };
})();
