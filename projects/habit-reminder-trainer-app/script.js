const STORAGE_KEY="amalHabitReminderTrainerV2";
const TODAY=new Date().toISOString().slice(0,10);

const habitName=document.getElementById("habit-name");
const habitCategory=document.getElementById("habit-category");
const habitGoal=document.getElementById("habit-goal");
const reminderTime=document.getElementById("reminder-time");
const addHabitButton=document.getElementById("add-habit");
const habitList=document.getElementById("habit-list");
const habitCount=document.getElementById("habit-count");
const scoreNumber=document.getElementById("score-number");
const progressFill=document.getElementById("progress-fill");
const trainerTitle=document.getElementById("trainer-title");
const trainerMessage=document.getElementById("trainer-message");
const resetTodayButton=document.getElementById("reset-today");
const clearAllButton=document.getElementById("clear-all");
const enableNotificationsButton=document.getElementById("enable-notifications");
const notificationStatus=document.getElementById("notification-status");

let habits=loadHabits();

function loadHabits(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]")}catch{return[]}}
function saveHabits(){localStorage.setItem(STORAGE_KEY,JSON.stringify(habits))}
function makeId(){return crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random())}

function addHabit(name,category,goal,time){
  const clean=name.trim();
  if(!clean){habitName.focus();habitName.placeholder="Type a habit first";return}
  habits.push({id:makeId(),name:clean,category,goal:goal.trim()||"Daily goal",reminderTime:time||"",completedDates:[],notifiedDates:[],bestStreak:0});
  habitName.value=""; habitGoal.value=""; reminderTime.value="";
  saveHabits(); render();
}

function toggleHabit(id){
  habits=habits.map(h=>{
    if(h.id!==id)return h;
    const dates=new Set(h.completedDates||[]);
    dates.has(TODAY)?dates.delete(TODAY):dates.add(TODAY);
    const updated={...h,completedDates:Array.from(dates).sort()};
    updated.bestStreak=Math.max(updated.bestStreak||0,currentStreak(updated.completedDates));
    return updated;
  });
  saveHabits(); render();
}

function deleteHabit(id){habits=habits.filter(h=>h.id!==id);saveHabits();render()}
function resetToday(){habits=habits.map(h=>({...h,completedDates:(h.completedDates||[]).filter(d=>d!==TODAY),notifiedDates:(h.notifiedDates||[]).filter(d=>d!==TODAY)}));saveHabits();render()}
function clearAll(){if(confirm("Clear all habits from the app?")){habits=[];saveHabits();render()}}

function currentStreak(dates){
  const set=new Set(dates||[]); let streak=0; const d=new Date();
  while(true){const key=d.toISOString().slice(0,10); if(!set.has(key))break; streak++; d.setDate(d.getDate()-1)}
  return streak;
}

function emoji(category){
  return {"Home":"🏡","Health":"💧","Faith / Reflection":"🤲","School / Study":"✏️","Work":"💼","Fitness":"🏃","Reading":"📚","Chores":"🧺","Creative":"🎨","Kindness":"💛"}[category]||"🌟";
}

function isDoneToday(h){return (h.completedDates||[]).includes(TODAY)}
function formatTime(time){if(!time)return"No reminder";let [h,m]=time.split(":");h=Number(h);const s=h>=12?"PM":"AM";h=h%12||12;return`${h}:${m} ${s}`}
function escapeHtml(v){return String(v).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}

function renderList(){
  if(!habits.length){habitList.innerHTML=`<div class="empty-state"><span>🌱</span><h3>No habits yet</h3><p>Add a habit or use a quick-start button.</p></div>`;return}
  habitList.innerHTML=habits.map(h=>{
    const done=isDoneToday(h), streak=currentStreak(h.completedDates);
    return `<article class="habit-card ${done?"done":""}">
      <button class="check" data-action="toggle" data-id="${h.id}">${done?"✓":""}</button>
      <div>
        <div class="habit-row"><h3>${emoji(h.category)} ${escapeHtml(h.name)}</h3><span>${escapeHtml(h.category)}</span></div>
        <p>${escapeHtml(h.goal)} · Reminder: ${formatTime(h.reminderTime)}</p>
        <div class="stats"><strong>Streak: ${streak}</strong><strong>Best: ${h.bestStreak||0}</strong><strong>${done?"Done today":"Not done yet"}</strong></div>
      </div>
      <button class="delete" data-action="delete" data-id="${h.id}">×</button>
    </article>`;
  }).join("");
}

function renderScore(){
  const total=habits.length, done=habits.filter(isDoneToday).length, percent=total?Math.round(done/total*100):0;
  scoreNumber.textContent=`${percent}%`; progressFill.style.width=`${percent}%`; habitCount.textContent=`${total} habit${total===1?"":"s"}`;
  if(!total){trainerTitle.textContent="Ready to train?";trainerMessage.textContent="Add a habit or reminder to start your routine."}
  else if(percent===100){trainerTitle.textContent="Perfect day!";trainerMessage.textContent="You completed every habit. Your routine is getting stronger."}
  else if(percent>=50){trainerTitle.textContent="Halfway hero!";trainerMessage.textContent="You are building momentum. Finish strong."}
  else if(done>0){trainerTitle.textContent="Nice first win!";trainerMessage.textContent=`You completed ${done} of ${total} habits today.`}
  else{trainerTitle.textContent="Reminder ready!";trainerMessage.textContent="Choose one easy habit and get your first check."}
  setBadge("badge-first",done>=1); setBadge("badge-half",total>0&&percent>=50); setBadge("badge-perfect",total>0&&percent===100);
  setBadge("badge-streak",habits.some(h=>currentStreak(h.completedDates)>=3||(h.bestStreak||0)>=3));
}

function setBadge(id,unlocked){const b=document.getElementById(id);b.classList.toggle("locked",!unlocked);b.classList.toggle("unlocked",unlocked)}

function updateNotificationStatus(){
  if(!("Notification" in window)){notificationStatus.textContent="This browser does not support notifications."; enableNotificationsButton.disabled=true; return}
  if(Notification.permission==="granted"){notificationStatus.textContent="Notifications are on. Keep this app open for reminder alerts.";enableNotificationsButton.textContent="Notifications Enabled";enableNotificationsButton.disabled=true}
  else if(Notification.permission==="denied"){notificationStatus.textContent="Notifications are blocked. Change browser settings to allow them."}
  else{notificationStatus.textContent="Click Enable Notifications so the app can remind you."}
}

async function enableNotifications(){
  if(!("Notification" in window)){updateNotificationStatus();return}
  const permission=await Notification.requestPermission(); updateNotificationStatus();
  if(permission==="granted"){new Notification("Habit Reminder Trainer",{body:"Notifications are ready. Your reminders can now pop up while the app is open."})}
}

function checkReminders(){
  if(!("Notification" in window)||Notification.permission!=="granted")return;
  const currentTime=new Date().toTimeString().slice(0,5); let changed=false;
  habits=habits.map(h=>{
    if(!h.reminderTime||h.reminderTime!==currentTime||isDoneToday(h))return h;
    const notified=new Set(h.notifiedDates||[]);
    if(notified.has(TODAY))return h;
    new Notification(`Reminder: ${h.name}`,{body:`It's time to ${h.name.toLowerCase()}. Goal: ${h.goal}`,tag:h.id});
    notified.add(TODAY); changed=true;
    return {...h,notifiedDates:Array.from(notified).sort()};
  });
  if(changed)saveHabits();
}

function render(){renderList();renderScore();updateNotificationStatus()}

addHabitButton.addEventListener("click",()=>addHabit(habitName.value,habitCategory.value,habitGoal.value,reminderTime.value));
habitName.addEventListener("keydown",e=>{if(e.key==="Enter")addHabit(habitName.value,habitCategory.value,habitGoal.value,reminderTime.value)});
document.querySelectorAll(".quick").forEach(b=>b.addEventListener("click",()=>{if(!habits.some(h=>h.name.toLowerCase()===b.dataset.name.toLowerCase()))addHabit(b.dataset.name,b.dataset.category,b.dataset.goal,b.dataset.time)}));
habitList.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;if(b.dataset.action==="toggle")toggleHabit(b.dataset.id);if(b.dataset.action==="delete")deleteHabit(b.dataset.id)});
enableNotificationsButton.addEventListener("click",enableNotifications);
resetTodayButton.addEventListener("click",resetToday);
clearAllButton.addEventListener("click",clearAll);

setInterval(checkReminders,30000);
render(); checkReminders();
