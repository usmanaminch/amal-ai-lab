const sections=document.querySelectorAll(".panel");const navButtons=document.querySelectorAll(".nav-button");navButtons.forEach(button=>{button.addEventListener("click",()=>{navButtons.forEach(b=>b.classList.toggle("active",b===button));sections.forEach(section=>section.classList.toggle("active",section.id===button.dataset.section));});});
const scans={xray:{icon:"🦴",title:"X-Ray",mode:"X-Ray Mode",copy:"X-rays are often used to look at bones and chest images.",why:"Bones show up clearly, so X-rays can help find fractures.",facts:["Often used for bone injuries.","Can help doctors see chest clues.","Uses a small amount of radiation, so trained teams follow safety rules."]},mri:{icon:"🧠",title:"MRI",mode:"MRI Mode",copy:"MRI uses magnets and radio waves to make detailed pictures of soft tissues.",why:"MRI is helpful for the brain, spine, joints, muscles, and other soft tissues.",facts:["Good for soft tissue details.","Does not use X-ray radiation.","People must follow MRI safety rules because of the strong magnet."]},ct:{icon:"🌀",title:"CT Scan",mode:"CT Scan Mode",copy:"CT uses many X-ray pictures to make detailed slice-like views of the body.",why:"CT can show detailed views quickly, especially when doctors need more detail than a single X-ray.",facts:["Makes cross-section or slice views.","Uses X-rays and computer processing.","Can be useful for many body areas when chosen by trained professionals."]},ultrasound:{icon:"👶",title:"Ultrasound",mode:"Ultrasound Mode",copy:"Ultrasound uses sound waves to make pictures of organs and movement inside the body.",why:"It can show movement, babies before birth, organs, and sometimes blood flow.",facts:["Uses sound waves.","Often used during pregnancy.","Can show real-time movement."]}};
function selectScan(key){const s=scans[key];document.getElementById("focus-icon").textContent=s.icon;document.getElementById("focus-title").textContent=s.title;document.getElementById("focus-copy").textContent=s.copy;document.getElementById("focus-why").textContent=s.why;document.getElementById("machine-mode").textContent=s.mode;document.getElementById("study-icon").textContent=s.icon;document.getElementById("study-title").textContent=s.title;document.getElementById("study-copy").textContent=s.copy;document.getElementById("study-list").innerHTML=s.facts.map(f=>`<li>${f}</li>`).join("");document.querySelectorAll(".scan-button").forEach(btn=>btn.classList.toggle("active",btn.dataset.scan===key));document.querySelectorAll(".study-button").forEach(btn=>btn.classList.toggle("active",btn.dataset.scan===key));const win=document.getElementById("scan-window");win.className="scan-window "+key+"-mode";}document.querySelectorAll(".scan-button, .study-button").forEach(button=>{button.addEventListener("click",()=>selectScan(button.dataset.scan));});
const cases=[{title:"A possible broken wrist",copy:"A patient fell and the doctor wants to check the bones in the wrist.",icon:"🦴",answer:"xray",why:"X-rays are commonly used to look for broken bones."},{title:"A closer look at the brain",copy:"The doctor wants a detailed picture of soft tissue in the brain.",icon:"🧠",answer:"mri",why:"MRI is very helpful for soft tissue detail."},{title:"Detailed slice pictures",copy:"The team needs detailed cross-section views quickly.",icon:"🌀",answer:"ct",why:"CT makes detailed slice-like pictures."},{title:"Watching a baby before birth",copy:"The team wants to see a baby moving before birth.",icon:"👶",answer:"ultrasound",why:"Ultrasound is often used to see babies before birth."}];let caseIndex=0;function renderCase(){const c=cases[caseIndex];document.getElementById("case-title").textContent=c.title;document.getElementById("case-copy").textContent=c.copy;document.getElementById("case-icon").textContent=c.icon;const feedback=document.getElementById("match-feedback");feedback.textContent="";feedback.className="";document.querySelectorAll(".match-button").forEach(btn=>btn.classList.remove("selected"));}document.querySelectorAll(".match-button").forEach(button=>{button.addEventListener("click",()=>{document.querySelectorAll(".match-button").forEach(btn=>btn.classList.remove("selected"));button.classList.add("selected");const c=cases[caseIndex];const ok=button.dataset.answer===c.answer;const feedback=document.getElementById("match-feedback");feedback.textContent=(ok?"Correct. ":"Not quite. ")+c.why;feedback.className=ok?"correct":"wrong";});});document.getElementById("next-case").addEventListener("click",()=>{caseIndex=(caseIndex+1)%cases.length;renderCase();});
const quiz=[{q:"What is medical imaging used for?",choices:["Helping trained teams see inside the body","Making snacks","Changing eye color","Replacing all doctors"],a:"Helping trained teams see inside the body",explain:"Medical imaging gives doctors helpful pictures and clues."},{q:"Which scan is commonly used for broken bones?",choices:["X-Ray","Only ultrasound","Only MRI","A thermometer"],a:"X-Ray",explain:"X-rays are commonly used to check bones."},{q:"Which scan uses magnets and radio waves?",choices:["MRI","X-Ray","CT only","A stethoscope"],a:"MRI",explain:"MRI uses a strong magnet and radio waves."},{q:"What does a CT scan make?",choices:["Detailed slice-like pictures","Only sound","Only temperature","A cast"],a:"Detailed slice-like pictures",explain:"CT scans use many X-ray pictures and computers to make detailed slices."},{q:"Which imaging type uses sound waves?",choices:["Ultrasound","X-Ray","MRI","CT"],a:"Ultrasound",explain:"Ultrasound uses sound waves."},{q:"Can this project diagnose real medical images?",choices:["No, it is educational only","Yes, always","Yes, instead of a doctor","Only at home"],a:"No, it is educational only",explain:"This project is only for learning basics, not diagnosis."}];let currentQuiz=0;function renderQuiz(){const item=quiz[currentQuiz];document.getElementById("quiz-number").textContent=currentQuiz+1;document.getElementById("quiz-question").textContent=item.q;const choices=document.getElementById("quiz-choices");const feedback=document.getElementById("quiz-feedback");choices.innerHTML="";feedback.textContent="";feedback.className="";item.choices.forEach(choice=>{const button=document.createElement("button");button.className="quiz-choice";button.textContent=choice;button.addEventListener("click",()=>{document.querySelectorAll(".quiz-choice").forEach(b=>b.classList.remove("selected"));button.classList.add("selected");const ok=choice===item.a;feedback.textContent=(ok?"Correct. ":"Not quite. Correct answer: "+item.a+". ")+item.explain;feedback.className=ok?"correct":"wrong";});choices.appendChild(button);});document.getElementById("next-question").textContent=currentQuiz===quiz.length-1?"Restart Study Check":"Next Question";}document.getElementById("next-question").addEventListener("click",()=>{currentQuiz=(currentQuiz+1)%quiz.length;renderQuiz();});selectScan("xray");renderCase();renderQuiz();


/* Day 20 v2: replace scanner artwork for each imaging type */
const scanVisualHTML = {
  xray: `
    <div class="scan-visual xray-visual">
      <div class="scan-title-badge">X-RAY VIEW</div>
      <div class="xray-skeleton">
        <span class="xray-skull"></span>
        <span class="xray-spine"></span>
        <span class="xray-ribs"></span>
        <span class="xray-arm left"></span>
        <span class="xray-arm right"></span>
      </div>
      <div class="xray-scan-line"></div>
    </div>
  `,
  mri: `
    <div class="scan-visual mri-visual">
      <div class="scan-title-badge">MRI SOFT-TISSUE VIEW</div>
      <div class="mri-brain">
        <span class="mri-fold f1"></span>
        <span class="mri-fold f2"></span>
        <span class="mri-fold f3"></span>
        <span class="mri-fold f4"></span>
        <span class="mri-fold f5"></span>
      </div>
      <div class="mri-labels">
        <span>brain</span>
        <span>soft tissue</span>
        <span>magnet</span>
      </div>
      <div class="mri-scan-line"></div>
    </div>
  `,
  ct: `
    <div class="scan-visual ct-visual">
      <div class="scan-title-badge">CT SLICE VIEW</div>
      <div class="ct-spokes"></div>
      <div class="ct-ring"></div>
      <div class="ct-slice"></div>
      <div class="ct-scan-line"></div>
    </div>
  `,
  ultrasound: `
    <div class="scan-visual ultrasound-visual">
      <div class="scan-title-badge">ULTRASOUND VIEW</div>
      <div class="ultrasound-noise"></div>
      <div class="ultrasound-cone"></div>
      <div class="ultrasound-baby"></div>
      <div class="ultra-scan-line"></div>
    </div>
  `
};

const originalSelectScan = selectScan;

selectScan = function(key){
  originalSelectScan(key);
  const win = document.getElementById("scan-window");
  if(win && scanVisualHTML[key]){
    win.innerHTML = scanVisualHTML[key];
    win.className = "scan-window " + key + "-mode";
  }
};

selectScan("xray");


/* Day 20 v3: more realistic scan-art replacement */
const realisticScanVisualHTML = {
  xray: `
    <div class="real-scan real-xray">
      <div class="real-badge">XR CHEST AP</div>
      <div class="real-data"><span>kVp 70</span><span>mAs 2.5</span><span>Learning View</span></div>
      <div class="xray-chest">
        <span class="neck"></span>
        <span class="clavicle left"></span>
        <span class="clavicle right"></span>
        <span class="lung left"></span>
        <span class="lung right"></span>
        <span class="spine-real"></span>
        <span class="rib-line r1"></span>
        <span class="rib-line r2"></span>
        <span class="rib-line r3"></span>
        <span class="rib-line r4"></span>
        <span class="rib-line r5"></span>
        <span class="heart-shadow"></span>
      </div>
    </div>
  `,
  mri: `
    <div class="real-scan real-mri">
      <div class="real-badge">MRI BRAIN T2</div>
      <div class="real-data"><span>AXIAL</span><span>Slice 12/28</span><span>Learning View</span></div>
      <div class="mri-frame">
        <div class="brain-slice">
          <span class="ventricle left"></span>
          <span class="ventricle right"></span>
          <span class="fold-real f1"></span>
          <span class="fold-real f2"></span>
          <span class="fold-real f3"></span>
          <span class="fold-real f4"></span>
          <span class="fold-real f5"></span>
          <span class="fold-real f6"></span>
        </div>
      </div>
    </div>
  `,
  ct: `
    <div class="real-scan real-ct">
      <div class="real-badge">CT AXIAL SLICE</div>
      <div class="real-data"><span>Window: Soft</span><span>Slice 18/40</span><span>Learning View</span></div>
      <div class="ct-table-ring"></div>
      <div class="ct-crosshair"></div>
      <div class="ct-body-slice"></div>
      <div class="ct-spine-dot"></div>
    </div>
  `,
  ultrasound: `
    <div class="real-scan real-ultrasound">
      <div class="real-badge">ULTRASOUND</div>
      <div class="real-data"><span>Gain 62</span><span>Depth 10cm</span><span>Learning View</span></div>
      <div class="speckle"></div>
      <div class="sonar-cone"></div>
      <div class="sono-baby"></div>
      <div class="ultra-sweep-real"></div>
      <div class="ultra-depth"><span>2</span><span>4</span><span>6</span><span>8</span><span>10</span></div>
    </div>
  `
};

const previousSelectScanForRealistic = selectScan;
selectScan = function(key){
  previousSelectScanForRealistic(key);
  const win = document.getElementById("scan-window");
  if(win && realisticScanVisualHTML[key]){
    win.innerHTML = realisticScanVisualHTML[key];
    win.className = "scan-window " + key + "-mode realistic-mode";
  }
};

selectScan("xray");


/* Day 20 v4: realistic ultrasound image button view */
const realisticUltrasoundHTML = `
  <div class="ultrasound-website-visual">
    <img src="assets/website-vibe-ultrasound.png" alt="Website-style educational ultrasound learning panel">
  </div>
`;

(function(){
  const previousSelectScan = selectScan;

  selectScan = function(key){
    previousSelectScan(key);

    const win = document.getElementById("scan-window");
    if(!win) return;

    if(key === "ultrasound"){
      win.innerHTML = realisticUltrasoundHTML;
      win.className = "scan-window ultrasound-mode";
    }
  };

  document.querySelectorAll(".scan-button, .study-button").forEach(button => {
    button.addEventListener("click", () => {
      if(button.dataset.scan === "ultrasound"){
        setTimeout(() => selectScan("ultrasound"), 0);
      }
    });
  });
})();


/* Day 20 v5: use the website-vibe ultrasound panel by default for Ultrasound */
(function(){
  const selectScanBeforeV5 = selectScan;
  selectScan = function(key){
    selectScanBeforeV5(key);
    const win = document.getElementById("scan-window");
    if(key === "ultrasound" && win){
      win.innerHTML = realisticUltrasoundHTML;
      win.className = "scan-window ultrasound-mode website-ultrasound-mode";
    }
  };
})();
