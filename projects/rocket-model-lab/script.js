const partLibrary=[
{id:"nose",name:"Ogive Nose Cone",icon:"🔺",label:"aerodynamics",required:true,score:12,visual:"nose",summary:"Reduces drag by helping air flow smoothly around the front.",words:"Place the pointed nose at the very top."},
{id:"payload",name:"Payload Bay",icon:"📦",label:"mission bay",required:false,score:4,visual:"payload",summary:"Adds a small mission section, but extra payload adds weight.",words:"Place the payload bay under the nose cone."},
{id:"coupler",name:"Tube Coupler",icon:"🔗",label:"connector",required:false,score:5,visual:"coupler",summary:"Connects tube sections and helps keep them lined up.",words:"Slide the coupler between body sections."},
{id:"shock",name:"Shock Cord",icon:"➰",label:"recovery",required:true,score:8,visual:"shock",summary:"Keeps recovery parts connected during descent.",words:"Connect the shock cord inside the upper body."},
{id:"airframe",name:"Airframe Tube",icon:"⬜",label:"structure",required:true,score:18,visual:"airframe",summary:"The main structure that holds the rocket straight.",words:"Place the airframe as the main body."},
{id:"rings",name:"Centering Rings",icon:"⭕",label:"alignment",required:false,score:7,visual:"rings",summary:"Keeps inner parts centered and aligned.",words:"Add centering rings near the lower body."},
{id:"mount",name:"Motor Mount Sleeve",icon:"▣",label:"mount",required:true,score:12,visual:"mount",summary:"Holds a certified motor in a real kit. This app is only a simulator.",words:"Place the mount sleeve at the bottom."},
{id:"fins",name:"Swept Fin Set",icon:"🔻",label:"stability",required:true,score:18,visual:"fins",summary:"Moves the center of pressure backward and improves stability.",words:"Attach the fin set evenly near the bottom."},
{id:"lug",name:"Launch Lug",icon:"🧷",label:"guidance",required:true,score:10,visual:"lug",summary:"Guides the rocket straight during the first moment of launch.",words:"Add the launch lug along the side."},
{id:"decal",name:"Roll Pattern Decal",icon:"🎨",label:"tracking",required:false,score:2,visual:"decal",summary:"Makes the rocket easier to see and gives it a finished look.",words:"Stick the roll pattern on the airframe."},
{id:"recovery",name:"Parachute Recovery System",icon:"🪂",label:"recovery",required:true,score:12,visual:"recovery",summary:"Slows the rocket during descent so it returns safely.",words:"Pack the parachute recovery system at the top."},
{id:"power",name:"Certified Motor Placeholder",icon:"⚡",label:"sim power",required:true,score:10,visual:"power",summary:"Represents safe launch power in this simulator only.",words:"Add the certified motor placeholder last."}
];

const starter=["nose","airframe","mount","fins","lug","shock","recovery","power"];
const order=["recovery","nose","payload","coupler","shock","airframe","rings","mount","fins","lug","decal","power"];
const $=id=>document.getElementById(id);
const stageTabs=document.querySelectorAll(".stage-tab");
const panels=document.querySelectorAll(".stage-panel");
let selected=[];
let buildOrder=[];
let placed=[];
let currentPage=0;
let draggingId=null;

function switchStage(stage){
  stageTabs.forEach(t=>t.classList.toggle("active",t.dataset.stage===stage));
  panels.forEach(p=>p.classList.toggle("active",p.id===stage));
}
stageTabs.forEach(t=>t.addEventListener("click",()=>switchStage(t.dataset.stage)));
function part(id){return partLibrary.find(p=>p.id===id);}
function selectedParts(){return order.map(id=>part(id)).filter(p=>selected.includes(p.id));}
function nextPart(){return buildOrder.find(p=>!placed.includes(p.id));}
function flightScore(){let s=0;selectedParts().forEach(p=>s+=p.score);s-=partLibrary.filter(p=>p.required&&!selected.includes(p.id)).length*12;if(selected.includes("payload")&&!selected.includes("fins"))s-=8;return Math.max(0,Math.min(100,s));}
function missingRequired(){return partLibrary.filter(p=>p.required&&!selected.includes(p.id));}
function isComplete(){return buildOrder.length>0&&placed.length===buildOrder.length;}

function renderParts(){
  const grid=$("parts-grid");
  grid.innerHTML="";
  partLibrary.forEach(p=>{
    const btn=document.createElement("button");
    btn.type="button";
    btn.className="part-card"+(selected.includes(p.id)?" selected":"");
    btn.innerHTML=`<span class="label-chip">${p.label}</span><span class="piece-icon">${p.icon}</span><strong>${p.name}</strong><small>${p.summary}</small>`;
    btn.onclick=()=>{
      selected=selected.includes(p.id)?selected.filter(x=>x!==p.id):[...selected,p.id];
      placed=[];buildOrder=[];currentPage=0;
      renderAll();
    };
    grid.appendChild(btn);
  });
}

function renderSelected(){
  const list=$("selected-list");
  list.innerHTML="";
  if(!selected.length){list.innerHTML='<p class="empty">No pieces selected yet.</p>';return;}
  selectedParts().forEach(p=>{
    const row=document.createElement("div");
    row.className="selected-item";
    row.textContent=`${p.icon} ${p.name} — ${p.label}`;
    list.appendChild(row);
  });
}

function renderScore(){
  const s=flightScore();
  $("readiness-score").textContent=s;
  $("readiness-message").textContent=s>=85?"Strong kit. Good structure, stability, guidance, recovery, and simulated power.":s>=65?"Pretty good kit. It may fly, but check missing systems.":s>=40?"Needs more important rocket systems before launch.":"Not launch ready yet. Add structure, stability, recovery, guidance, and power.";
}

function openBuilder(){
  if(!selected.length){$("builder-status").textContent="Choose at least one rocket part first.";switchStage("choose");return;}
  buildOrder=selectedParts();
  placed=[];
  currentPage=0;
  renderBuildStage();
  switchStage("build");
  $("builder-status").textContent="Builder tray opened. Drag the highlighted loose piece into the glowing outline.";
}

function renderLooseParts(){
  const tray=$("loose-parts");
  tray.innerHTML="";
  if(!buildOrder.length){tray.innerHTML='<p class="empty">Your loose pieces will appear here.</p>';return;}
  const next=nextPart();
  buildOrder.forEach(p=>{
    const isPlaced=placed.includes(p.id);
    const isNext=next&&next.id===p.id;
    const card=document.createElement("div");
    card.className="loose-part"+(isPlaced?" placed":"")+(isNext?" next draggable":" locked");
    card.draggable=isNext&&!isPlaced;
    card.dataset.id=p.id;
    card.innerHTML=`<span class="piece-icon">${p.icon}</span><strong>${p.name}</strong><small>${isPlaced?"Already placed":isNext?"Drag this piece to the glowing outline":"Locked until earlier pieces are placed"}</small>`;
    card.addEventListener("dragstart",e=>{
      if(!isNext||isPlaced){e.preventDefault();return;}
      draggingId=p.id;
      e.dataTransfer.setData("text/plain",p.id);
      card.classList.add("drag-ghost");
    });
    card.addEventListener("dragend",()=>card.classList.remove("drag-ghost"));
    tray.appendChild(card);
  });
}

function renderDropBoard(){
  const board=$("drop-board");
  board.innerHTML="";
  buildOrder.forEach(p=>{
    const slot=document.createElement("div");
    slot.className=`drop-slot slot-${p.visual}`;
    slot.dataset.id=p.id;
    const isPlaced=placed.includes(p.id);
    const next=nextPart();
    if(isPlaced)slot.classList.add("filled");
    if(next&&next.id===p.id)slot.classList.add("next");
    slot.textContent=isPlaced?"":p.name;
    slot.addEventListener("dragover",e=>{
      const next=nextPart();
      if(next&&next.id===p.id&&!placed.includes(p.id))e.preventDefault();
    });
    slot.addEventListener("drop",e=>{
      e.preventDefault();
      const dragged=e.dataTransfer.getData("text/plain")||draggingId;
      placePiece(dragged,p.id);
    });
    board.appendChild(slot);
  });
  buildOrder.forEach(p=>{
    if(placed.includes(p.id)){
      board.insertAdjacentHTML("beforeend",pieceMarkup(p,"rocket-piece"));
    }
  });
}

function pieceMarkup(p,cls){
  const label=p.visual==="decal"?"RX-9":"";
  return `<div class="${cls} piece-${p.visual}">${label}</div>`;
}

function placePiece(dragged,target){
  const next=nextPart();
  if(!next||dragged!==target||target!==next.id){
    $("builder-status").textContent="That piece does not go there yet. Check the instruction book.";
    return;
  }
  placed.push(target);
  currentPage=Math.min(placed.length,Math.max(0,buildOrder.length-1));
  $("builder-status").textContent=`Placed ${part(target).name}. Nice build step.`;
  if(isComplete()){
    $("builder-status").textContent="Rocket complete! Part Summary and Launch are unlocked.";
    renderSummary();
    renderFlightChecks();
    renderLaunchRocket();
  }
  renderBuildStage();
}

function renderBook(){
  const total=buildOrder.length;
  $("book-page-number").textContent=`Page ${total?currentPage+1:0}/${total}`;
  $("step-count").textContent=`${placed.length}/${total} placed`;
  $("step-fill").style.width=`${total?placed.length/total*100:0}%`;
  const p=buildOrder[currentPage];
  const pic=$("book-picture");
  pic.innerHTML="";
  if(!p){
    $("book-title").textContent="No step yet";
    $("book-words").textContent="Choose pieces and open the builder tray.";
    pic.innerHTML='<p class="empty">Open builder tray first.</p>';
    return;
  }
  $("book-title").textContent=p.name;
  $("book-words").textContent=p.words;
  const mini=document.createElement("div");
  mini.className="book-mini";
  mini.innerHTML=pieceMarkup(p,"book-piece");
  pic.appendChild(mini);
}

function changePage(delta){
  if(!buildOrder.length)return;
  currentPage=Math.max(0,Math.min(buildOrder.length-1,currentPage+delta));
  renderBook();
}

function renderSummary(){
  const grid=$("summary-grid");
  grid.innerHTML="";
  if(!isComplete()){
    grid.innerHTML='<article class="summary-card placeholder"><h3>Locked</h3><p>Build your rocket in the Drag Builder first.</p></article>';
    return;
  }
  buildOrder.forEach(p=>{
    const card=document.createElement("article");
    card.className="summary-card";
    card.innerHTML=`<h3>${p.icon} ${p.name}</h3><p>${p.summary}</p>`;
    grid.appendChild(card);
  });
}

function renderFlightChecks(){
  const box=$("flight-checks");
  box.innerHTML="";
  if(!isComplete()){
    box.innerHTML='<p class="empty">Build your rocket to unlock flight checks.</p>';
    return;
  }
  const checks=[
    ["Airframe structure",selected.includes("airframe")&&selected.includes("nose")],
    ["Stability system",selected.includes("fins")],
    ["Launch guidance",selected.includes("lug")],
    ["Recovery system",selected.includes("recovery")&&selected.includes("shock")],
    ["Simulated power placeholder",selected.includes("power")&&selected.includes("mount")]
  ];
  checks.forEach(([name,good])=>{
    const div=document.createElement("div");
    div.className="check "+(good?"good":"bad");
    div.textContent=`${good?"✅":"⚠️"} ${name}`;
    box.appendChild(div);
  });
}

function renderLaunchRocket(){
  const rocket=$("launch-rocket-model");
  rocket.innerHTML="";
  if(!isComplete())return;
  buildOrder.forEach(p=>{
    if(placed.includes(p.id))rocket.insertAdjacentHTML("beforeend",pieceMarkup(p,"launch-piece"));
  });
}

function launchRocket(){
  const rocket=$("launch-rocket-model");
  const smoke=$("launch-smoke");
  rocket.classList.remove("flying","crash");
  if(smoke){smoke.classList.remove("active"); void smoke.offsetWidth;}
  if(!isComplete()){
    $("launch-result").textContent="Build your rocket in the Drag Builder before launch.";
    return;
  }
  renderLaunchRocket();
  const s=flightScore();
  const missing=missingRequired().map(p=>p.name);
  if(smoke){smoke.classList.add("active");}
  setTimeout(()=>{
    if(s>=82&&missing.length===0){
      rocket.classList.add("flying");
      $("launch-result").textContent="Launch success! Your dragged-and-built rocket flew because it had structure, stability, guidance, recovery, and simulated power.";
    }else if(s>=62){
      rocket.classList.add("flying");
      $("launch-result").textContent=`Wobbly launch. It got off the pad, but improve this: ${missing.join(", ")||"balance, stability, or extra weight"}.`;
    }else{
      rocket.classList.add("crash");
      $("launch-result").textContent=`Launch failed in the simulator. Missing important systems: ${missing.join(", ")||"better stability and recovery"}.`;
    }
  },120);
}

function resetBuild(){
  placed=[];
  currentPage=0;
  $("builder-status").textContent="Build reset. Drag the first highlighted piece again.";
  $("launch-result").textContent="Build your rocket before launch.";
  $("launch-rocket-model").className="launch-rocket-model";
  const smoke=$("launch-smoke");
  if(smoke)smoke.className="launch-smoke";
  renderBuildStage();
  renderSummary();
  renderFlightChecks();
}

function clearKit(){
  selected=[];buildOrder=[];placed=[];currentPage=0;
  $("builder-status").textContent="Open the builder tray to begin.";
  $("launch-result").textContent="Build your rocket before launch.";
  $("launch-rocket-model").className="launch-rocket-model";
  const smoke=$("launch-smoke");
  if(smoke)smoke.className="launch-smoke";
  renderAll();
}

function selectStarter(){
  selected=[...starter];
  buildOrder=[];placed=[];currentPage=0;
  renderAll();
}

function renderBuildStage(){
  renderLooseParts();
  renderDropBoard();
  renderBook();
  renderLaunchRocket();
}

function renderAll(){
  renderParts();
  renderSelected();
  renderScore();
  renderBuildStage();
  renderSummary();
  renderFlightChecks();
}

$("open-builder").addEventListener("click",openBuilder);
$("select-starter-kit").addEventListener("click",selectStarter);
$("clear-kit").addEventListener("click",clearKit);
$("reset-build").addEventListener("click",resetBuild);
$("prev-step").addEventListener("click",()=>changePage(-1));
$("next-step").addEventListener("click",()=>changePage(1));
$("launch-rocket").addEventListener("click",launchRocket);
renderAll();
