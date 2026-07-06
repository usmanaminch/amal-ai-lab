const $=id=>document.getElementById(id);
const vocab={muscle:["Muscle","Muscle tissue contracts, which means it shortens and pulls. Muscles help move bones."],fiber:["Muscle Fiber","A muscle fiber is one long muscle cell. Many fibers work together inside a muscle."],tendon:["Tendon","A tendon connects muscle to bone. It transfers pulling force from the muscle to the bone."],bone:["Bone","Bones give the body structure and act like levers when muscles pull on them."],collagen:["Collagen","Collagen is a strong protein found in tendons, ligaments, skin, and scar tissue."],inflammation:["Inflammation","Inflammation is an early healing response with swelling, immune cells, and cleanup."]};
const compare={tendon:["Tendon","A tendon connects muscle to bone. It helps transfer muscle force so the bone can move.","Tendon = muscle to bone.","A tendon connects muscle to bone."],ligament:["Ligament","A ligament connects bone to bone. It helps stabilize joints.","Ligament = bone to bone.","A ligament connects bone to bone and helps stabilize a joint."],muscle:["Muscle","A muscle contracts and pulls. It usually moves the skeleton by pulling through a tendon.","Muscle pulls; tendon transfers the pull.","A muscle is the tissue that contracts and creates force."]};
const injuries=[["strain","Muscle strain","A muscle strain means muscle fibers are stretched or partly torn.","Is the injury mild, partial, complete, or affecting movement?"],["partial","Partial tendon tear","A partial tear means some tendon fibers are damaged, but the tendon is not fully separated.","How much of the tendon is still connected?"],["complete","Complete tendon tear","A complete tear means the tendon is separated. Doctors check strength, motion, imaging, and repair options.","Has the tendon pulled away from where it should attach?"],["swelling","Inflamed tendon","Inflammation can happen when a tendon is irritated or overused.","Is this overuse, swelling, pain, or loss of function?"]];
const repair=[["Exam","🩺","exam","Step 1: Exam","Start with an exam to check pain, swelling, movement, and strength."],["Imaging","🖥️","scan","Step 2: Imaging","Use imaging in the learning model to understand the tendon or muscle injury."],["Support","🧊","support","Step 3: Support","Support the area and protect it from getting worse in this simplified model."],["Repair Choice","🧵","repair-sim","Step 4: Repair choice","Decide whether the model needs rest, therapy, or a repair plan."],["Rehab Plan","📋","rehab-plan","Step 5: Rehab plan","Plan gradual recovery so tissue can get stronger safely."]];
const stages=[["1. Inflammation","The body sends fluid and immune cells to start cleanup and protection.","Swelling is part of early healing, but doctors watch it carefully."],["2. Repair tissue","Cells begin making new collagen to patch and support the injured area.","Collagen starts as weaker repair tissue."],["3. Remodeling","Collagen fibers reorganize along the direction of stress and pulling.","Remodeling helps tissue become stronger over time."],["4. Gradual rehab","Movement and strengthening usually return slowly and carefully.","Too much too soon can stress healing tissue."]];
const quiz=[["What does a tendon connect?",["Muscle to bone","Bone to bone","Skin to hair","Blood to nerves"],"Muscle to bone","A tendon connects muscle to bone."],["What does a ligament connect?",["Bone to bone","Muscle to bone","Skin to bone","Muscle to muscle"],"Bone to bone","A ligament connects bone to bone."],["What do muscles do to help move bones?",["They contract and pull","They turn into bones","They make blood cells","They become skin"],"They contract and pull","Muscles contract, shorten, and pull."],["What protein helps build tendon and scar tissue?",["Collagen","Platelet","Oxygen","Calcium only"],"Collagen","Collagen is a strong structural protein."],["Why is rehab usually gradual?",["Healing tissue needs time to get stronger","The body heals instantly","Tendons do not need collagen","Pain means nothing"],"Healing tissue needs time to get stronger","Healing tissue can be weak at first and needs time."],["Why is this project educational only?",["Real injuries need real clinicians","Games replace hospitals","Websites can perform surgery","A quiz can diagnose injuries"],"Real injuries need real clinicians","This lab teaches ideas, but real injuries need trained medical professionals."]];
let currentInjury=injuries[0], step=0, dragging=null, currentStage=0, q=0;
document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tab").forEach(x=>x.classList.toggle("active",x===b));document.querySelectorAll(".panel").forEach(p=>p.classList.toggle("active",p.id===b.dataset.tab));});
const pictureInfo={
  muscle:["Muscle","A muscle contracts and pulls on bones to create movement."],
  fiber:["Muscle Fiber","Muscle fibers are long muscle cells bundled together inside a muscle."],
  tendon:["Tendon","A tendon is a strong cord that connects muscle to bone."],
  bone:["Bone","Bone is hard tissue that gives the body structure and acts like a lever."],
  collagen:["Collagen","Collagen is a strong rope-like protein that helps tendons and scar tissue become stronger."],
  inflammation:["Inflammation","Inflammation brings swelling, immune cells, and cleanup to the injured area."]
};

function showAnatomyPicture(term){
  document.querySelectorAll(".pic").forEach(p=>p.classList.remove("active"));
  const map={
    muscle:".pic-muscle",
    fiber:".pic-fiber",
    tendon:".pic-tendon-view",
    bone:".pic-bone-view",
    collagen:".pic-collagen",
    inflammation:".pic-inflammation"
  };
  const pic=document.querySelector(map[term]);
  if(pic) pic.classList.add("active");
  const info=pictureInfo[term];
  if(info){
    $("picture-title").textContent=info[0];
    $("picture-caption").textContent=info[1];
  }
}

document.querySelectorAll("[data-term]").forEach(b=>b.onclick=()=>{
  const v=vocab[b.dataset.term];
  $("vocab-title").textContent=v[0];
  $("vocab-copy").textContent=v[1];
  showAnatomyPicture(b.dataset.term);
});
$("contract-btn").onclick=()=>{$("moving-muscle").classList.toggle("contract");$("contract-btn").textContent=$("moving-muscle").classList.contains("contract")?"Relax Muscle":"Contract Muscle";};
document.querySelectorAll(".next").forEach(b=>b.onclick=()=>{const t=document.querySelector(`.tab[data-tab="${b.dataset.next}"]`);if(t){t.click();scrollTo({top:0,behavior:"smooth"});}});
function showComparePicture(term){
  document.querySelectorAll(".compare-view").forEach(v=>v.classList.remove("active"));
  const map={tendon:".compare-view-tendon",ligament:".compare-view-ligament",muscle:".compare-view-muscle"};
  const view=document.querySelector(map[term]);
  if(view) view.classList.add("active");
  const c=compare[term];
  if(c){
    $("compare-picture-title").textContent=c[0];
    $("compare-picture-caption").textContent=c[3];
  }
}

document.querySelectorAll("[data-compare]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-compare]").forEach(x=>x.classList.remove("active"));b.classList.add("active");const c=compare[b.dataset.compare];$("compare-title").textContent=c[0];$("compare-copy").textContent=c[1];$("compare-note").textContent=c[2];showComparePicture(b.dataset.compare);});
const compareContractBtn=$("compare-contract-btn");
const compareMovingMuscle=$("compare-moving-muscle");
if(compareContractBtn&&compareMovingMuscle){compareContractBtn.onclick=()=>{compareMovingMuscle.classList.toggle("contract");compareContractBtn.textContent=compareMovingMuscle.classList.contains("contract")?"Relax":"Contract";};}
showComparePicture("tendon");
function renderInjuries(){const box=$("injury-buttons");box.innerHTML="";injuries.forEach(i=>{const b=document.createElement("button");b.className="choice "+(i[0]===currentInjury[0]?"active":"");b.textContent=i[1];b.onclick=()=>{currentInjury=i;$("scan-model").className="scan-model "+i[0];$("injury-title").textContent=i[1];$("injury-copy").textContent=i[2];$("injury-question").textContent=i[3];renderInjuries();};box.appendChild(b);});}
function renderRepair(){const s=repair[step];$("step-title").textContent=s?s[3]:"Repair plan complete";$("step-copy").textContent=s?s[4]:"You finished the simplified sports medicine plan.";const list=$("step-list");list.innerHTML="";repair.forEach((r,i)=>{const d=document.createElement("div");d.className="care-step "+(i<step?"done":i===step?"active":"");d.textContent=(i+1)+". "+r[0];list.appendChild(d);});const tray=$("tool-tray");tray.innerHTML="";repair.forEach((r,i)=>{const t=document.createElement("div");t.className="tool "+(i!==step?"inactive":"");t.dataset.index=i;t.innerHTML=`<span class="tool-icon">${r[1]}</span><strong>${r[0]}</strong><small>${i<step?"Done":i===step?"Use now":"Later"}</small>`;t.addEventListener("pointerdown",startDrag);tray.appendChild(t);});const board=$("repair-board");board.className="repair-board";repair.forEach((r,i)=>{if(i<step)board.classList.add(r[2]);});updateProgress();}
function startDrag(e){const src=e.currentTarget;if(src.classList.contains("inactive"))return;e.preventDefault();dragging={source:src,index:Number(src.dataset.index),parent:src.parentElement,next:src.nextSibling};src.classList.add("dragging");document.body.appendChild(src);moveDrag(e);}
function moveDrag(e){if(!dragging)return;dragging.source.style.left=e.clientX+"px";dragging.source.style.top=e.clientY+"px";dragging.source.style.display="none";const target=document.elementFromPoint(e.clientX,e.clientY);dragging.source.style.display="";$("repair-board").classList.toggle("ready",!!(target&&target.closest&&target.closest("#repair-board")));}
function endDrag(e){if(!dragging)return;dragging.source.style.display="none";const target=document.elementFromPoint(e.clientX,e.clientY);dragging.source.style.display="";const ok=target&&target.closest&&target.closest("#repair-board")&&dragging.index===step;if(ok){$("repair-effect").innerHTML='<div class="success">✓</div>';setTimeout(()=>$("repair-effect").innerHTML="",700);step++;$("feedback").textContent=step>=repair.length?"Repair plan complete. Now study healing and rehab.":"Good. Move to the next step.";renderRepair();}else{$("repair-board").classList.add("wrong");$("feedback").textContent="Try dragging the current step's tool onto the repair board.";setTimeout(()=>$("repair-board").classList.remove("wrong"),400);}dragging.source.classList.remove("dragging");dragging.source.style.left="";dragging.source.style.top="";if(dragging.next)dragging.parent.insertBefore(dragging.source,dragging.next);else dragging.parent.appendChild(dragging.source);$("repair-board").classList.remove("ready");dragging=null;}
window.addEventListener("pointermove",moveDrag);window.addEventListener("pointerup",endDrag);
function updateProgress(){const pct=Math.round(step/repair.length*100);$("progress-title").textContent=pct+"%";$("progress-fill").style.width=pct+"%";if(pct===0)$("feedback").textContent="Start with the exam.";if(pct===100)$("feedback").textContent="Repair plan complete. Now study healing and rehab.";}
$("reset").onclick=()=>{step=0;renderRepair();};
function renderStages(){const box=$("stage-buttons");box.innerHTML="";stages.forEach((s,i)=>{const b=document.createElement("button");b.className="timeline-button "+(i===currentStage?"active":"");b.textContent=s[0];b.onclick=()=>{currentStage=i;$("rehab-model").className="rehab-model stage"+i;$("stage-title").textContent=s[0];$("stage-copy").textContent=s[1];$("stage-note").textContent=s[2];renderStages();};box.appendChild(b);});}
function renderQuiz(){const item=quiz[q];$("quiz-number").textContent=q+1;$("quiz-question").textContent=item[0];$("quiz-feedback").textContent="";$("quiz-feedback").className="";$("quiz-choices").innerHTML="";item[1].forEach(choice=>{const b=document.createElement("button");b.className="quiz-choice";b.textContent=choice;b.onclick=()=>{document.querySelectorAll(".quiz-choice").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");const ok=choice===item[2];$("quiz-feedback").textContent=(ok?"Correct! ":"Not quite. Correct answer: "+item[2]+". ")+item[3];$("quiz-feedback").className=ok?"correct":"wrong";};$("quiz-choices").appendChild(b);});$("next-question").textContent=q===quiz.length-1?"Restart Quiz":"Next Question";}
$("next-question").onclick=()=>{q=(q+1)%quiz.length;renderQuiz();};
renderInjuries();renderRepair();renderStages();renderQuiz();
