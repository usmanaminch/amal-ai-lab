const photoInput=document.getElementById('plant-photo');const plantPreview=document.getElementById('plant-preview');const emptyPreview=document.getElementById('empty-preview');const createPromptButton=document.getElementById('create-prompt');const aiPrompt=document.getElementById('ai-prompt');const aiResult=document.getElementById('ai-result');const makeReportButton=document.getElementById('make-report');const careReport=document.getElementById('care-report');const plantLocation=document.getElementById('plant-location');const sunlight=document.getElementById('sunlight');const soil=document.getElementById('soil');
photoInput.addEventListener('change',()=>{const file=photoInput.files[0];if(!file)return;plantPreview.src=URL.createObjectURL(file);plantPreview.style.display='block';emptyPreview.style.display='none';});
function getObservations(){return[...document.querySelectorAll("input[type='checkbox']:checked")].map(box=>box.value)}
function createVisionPrompt(){const observations=getObservations();aiPrompt.value=`You are helping with an educational plant-care project for a student.

Look at the uploaded plant photo and answer in simple, careful language.

Please provide:
1. Likely plant name, with confidence level.
2. Visible strengths, such as healthy leaves, new growth, strong stems, or good color.
3. Visible weaknesses or concerns, such as yellow leaves, brown tips, drooping, spots, bugs, dry soil, or soggy soil.
4. What the plant may need next: water, less water, more light, less direct sun, better drainage, pest check, pruning, or patience.
5. A 7-day care plan.
6. One safety note saying this is not a professional diagnosis.

Extra context from the user:
- Location: ${plantLocation.value}
- Light: ${sunlight.value}
- Soil: ${soil.value}
- Observations selected: ${observations.length?observations.join(', '):'none selected'}

Do not pretend to be 100% certain. If unsure, say what details would help identify the plant better.`}
function addReportCard(title,text){const card=document.createElement('div');card.className='report-card';const heading=document.createElement('h3');heading.textContent=title;const body=document.createElement('p');body.textContent=text;card.appendChild(heading);card.appendChild(body);careReport.appendChild(card)}
function makeCareReport(){const result=aiResult.value.trim();careReport.innerHTML='';if(!result){addReportCard('Paste AI result first','Send the prompt and photo to ChatGPT or Gemini, then paste the result here.');return}addReportCard('Plant AI Vision Result',result);addReportCard('Student Summary','This report is based on the AI response plus the user observations. The next step is to compare the plant again in a few days.');addReportCard('Safety Note','This is an educational helper. It is not a professional plant diagnosis.')}
createPromptButton.addEventListener('click',createVisionPrompt);makeReportButton.addEventListener('click',makeCareReport);