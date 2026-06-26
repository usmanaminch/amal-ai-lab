const roomInput=document.getElementById("room-photo"),roomPreview=document.getElementById("room-preview"),emptyPreview=document.getElementById("empty-preview"),pasteStatus=document.getElementById("paste-status"),aiPrompt=document.getElementById("ai-prompt"),aiResult=document.getElementById("ai-result"),decorResults=document.getElementById("decor-results");let roomPhotoName="";function showRoomPhoto(file,source){if(!file)return;roomPhotoName=file.name||"pasted room photo";roomPreview.src=URL.createObjectURL(file);roomPreview.style.display="block";emptyPreview.style.display="none";pasteStatus.textContent=source==="paste"?"Pasted room photo added ✅":"Uploaded room photo added ✅";pasteStatus.classList.add("ready")}roomInput.addEventListener("change",()=>showRoomPhoto(roomInput.files[0],"upload"));document.addEventListener("paste",e=>{const items=e.clipboardData?.items||[],imageItem=[...items].find(item=>item.type.startsWith("image/"));if(!imageItem)return;showRoomPhoto(imageItem.getAsFile(),"paste")});function val(id){return document.getElementById(id).value||""}document.getElementById("create-prompt").addEventListener("click",()=>{const photoLine=roomPhotoName?`- Room photo added to website preview: ${roomPhotoName}`:"- No room photo preview added yet. The student should attach the room photo separately.";aiPrompt.value=`You are helping with an educational Decor Planner project for a student.

Act like a friendly decorator in a beautiful decor store showroom. Look at the uploaded room photo and use the student's design answers to create a practical room makeover plan.

Please do these things:
1. Identify visible room features: furniture, walls, windows, floor, storage, lighting, empty spaces, and clutter.
2. Notice colors, layout opportunities, and what should probably stay.
3. Give safe, realistic, budget-aware decor ideas.
4. Make the plan feel like walking through a decor store, with styled displays and simple "shop the look" ideas.
5. Do not suggest anything unsafe, too expensive for the budget, or requiring risky tools.
6. Create a room plan using this exact format so the website can organize it:

LAYOUT IDEAS:
- Give 3 ideas.

COLOR + STYLE:
- Give 3 ideas.

ORGANIZATION:
- Give 3 ideas.

SHOPPING OR DIY:
- Give 3 ideas.

QUICK WINS:
- Give 3 things that can be done today.

SAFETY NOTES:
- Give 2 safety notes.

Student preferences:
${photoLine}
- Room type: ${val("room-type")}
- Showroom vibe: ${val("style")}
- Budget shelf: ${val("budget")}
- Main makeover goal: ${val("priority")}
- Color samples: ${val("colors")||"not provided"}
- Pieces to keep: ${val("keep")||"not listed"}
- Store notes / cannot change: ${val("avoid")||"nothing listed"}
- Dream room notes: ${val("notes")||"none listed"}

Keep the plan age-appropriate, realistic, safe, easy to understand, and styled like a decor showroom.`});function titleCase(str){return str.toLowerCase().replace(/\b\w/g,c=>c.toUpperCase())}function addCard(title,text,index){const card=document.createElement("article");card.className="decor-card";const tag=document.createElement("span");tag.className="tag";tag.textContent=`Aisle ${index+1}`;const h=document.createElement("h3");h.textContent=title;const p=document.createElement("p");p.textContent=text.trim();card.appendChild(tag);card.appendChild(h);card.appendChild(p);decorResults.appendChild(card)}document.getElementById("make-plan").addEventListener("click",()=>{const result=aiResult.value.trim();decorResults.innerHTML="";if(!result){addCard("Paste Decorator Result First","Copy the decorator prompt into ChatGPT or Gemini with the room photo, then paste the answer here.",0);return}const sections=["LAYOUT IDEAS","COLOR + STYLE","ORGANIZATION","SHOPPING OR DIY","QUICK WINS","SAFETY NOTES"];let found=false;sections.forEach((name,i)=>{const next=sections.slice(i+1).map(s=>s.replace(/\+/g,"\\+")).join("|");const re=new RegExp(name.replace(/\+/g,"\\+")+":\\s*([\\s\\S]*?)(?="+(next?next+":|":"")+"$)","i");const m=result.match(re);if(m){found=true;addCard(titleCase(name),m[1],i)}});if(!found)addCard("Decor Plan",result,0)});