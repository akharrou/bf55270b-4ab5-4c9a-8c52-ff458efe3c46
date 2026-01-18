(function(){if(window.__kmsAlgoInitialized)return;window.__kmsAlgoInitialized=!0;const LANG_LABELS={'pseudo':'Pseudocode','python':'Python','typescript':'TypeScript','clang':'C','cpp':'C++','javascript':'JavaScript','java':'Java','go':'Go','rust':'Rust','html':'HTML','css':'CSS'};const ICON_SPLIT=`<svg viewBox="0 0 24 24"><path d="M4 4h16v6H4V4zm0 10h16v6H4v-6z"/></svg>`;const ICON_COPY=`<svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>`;const ICON_CHECK=`<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`;window.toggleAlgoMenu=function(btn){const container=btn.closest('.algo-dropdown-container');document.querySelectorAll('.algo-dropdown-container').forEach(c=>{if(c!==container)c.classList.remove('open');});container.classList.toggle('open')};window.switchAlgo=function(lang,item,viewType){const wrapper=item.closest('object[id^="kms://info.algo"]');const container=item.closest('.algo-dropdown-container');const btnText=container.querySelector('.curr-lang');btnText.textContent=item.textContent;container.querySelectorAll('.algo-dropdown-item').forEach(i=>i.classList.remove('active'));item.classList.add('active');container.classList.remove('open');const viewContainer=wrapper.querySelector(`.algo-container.${viewType}`);viewContainer.querySelectorAll('object').forEach(obj=>obj.style.display='none');const targetObj=viewContainer.querySelector(`object[data-lang="${lang}"]`);if(targetObj)targetObj.style.display='block';if(viewType==='primary'){updateTheme(wrapper,lang)}};window.toggleSplitView=function(btn){const wrapper=btn.closest('object[id^="kms://info.algo"]');const primaryContainer=wrapper.querySelector('.algo-container.primary');const secondaryContainer=wrapper.querySelector('.algo-container.secondary');const secDropdown=wrapper.querySelector('.algo-dropdown-container.secondary');if(!secondaryContainer.innerHTML.trim()){const contentToClone=Array.from(primaryContainer.children).filter(el=>!el.classList.contains('algo-controls'));contentToClone.forEach(node=>{secondaryContainer.appendChild(node.cloneNode(!0))});secondaryContainer.querySelectorAll('object').forEach(obj=>obj.style.display='none')}
const isOpening=!btn.classList.contains('active-btn');btn.classList.toggle('active-btn');if(isOpening){const currentPrimaryObj=primaryContainer.querySelector('object[style*="display: block"]');const currentLang=currentPrimaryObj?currentPrimaryObj.getAttribute('data-lang'):'pseudo';algoStates.set(wrapper.id,currentLang);wrapper.classList.add('side-by-side');secondaryContainer.style.display='block';secDropdown.classList.add('visible');const dropdownItems=wrapper.querySelectorAll('.algo-dropdown-container.secondary .algo-dropdown-item');if(currentLang==='pseudo'&&dropdownItems.length>1){window.switchAlgo('python',dropdownItems[1],'secondary')}else{window.switchAlgo(dropdownItems[0].getAttribute('data-lang-id'),dropdownItems[0],'secondary')}}else{wrapper.classList.remove('side-by-side');secondaryContainer.style.display='none';secDropdown.classList.remove('visible');const savedLang=algoStates.get(wrapper.id);if(savedLang){const item=wrapper.querySelector(`.algo-dropdown-container.primary .algo-dropdown-item[data-lang-id="${savedLang}"]`);if(item)window.switchAlgo(savedLang,item,'primary');}}};window.copyAlgoCode=function(btn){const container=btn.closest('.algo-container');const targetContainer=container||btn.closest('object[id^="kms://info.algo"]').querySelector('.algo-container.primary');const visibleObj=Array.from(targetContainer.querySelectorAll('object')).find(obj=>obj.style.display!=='none');if(!visibleObj)return;navigator.clipboard.writeText(visibleObj.innerText.trim()).then(()=>{const originalIcon=btn.innerHTML;btn.classList.add('copied');btn.innerHTML=ICON_CHECK;setTimeout(()=>{btn.classList.remove('copied');btn.innerHTML=originalIcon},2000)})};const algoStates=new Map();function updateTheme(wrapper,lang){const controls=wrapper.querySelector('.algo-controls');if(lang==='pseudo')controls.classList.remove('dark-mode');else controls.classList.add('dark-mode')}
function generateMenuItems(langs,activeId,type){return langs.map(l=>`
            <div class="algo-dropdown-item ${l.id === activeId ? 'active' : ''}"
                 data-lang-id="${l.id}"
                 onclick="switchAlgo('${l.id}', this, '${type}')">
                 ${l.name}
            </div>
        `).join('')}
function initAlgoWrapper(wrapper){const rawObjects=Array.from(wrapper.querySelectorAll('object'));if(rawObjects.length===0)return;const availableLangs=rawObjects.map(obj=>{const langKey=obj.getAttribute('data-lang');return{id:langKey,name:LANG_LABELS[langKey]||langKey.charAt(0).toUpperCase()+langKey.slice(1)}});const defaultLang=availableLangs[0];const controls=document.createElement('div');controls.className='algo-controls';const primaryContainer=document.createElement('div');primaryContainer.className='algo-container primary';const secondaryContainer=document.createElement('div');secondaryContainer.className='algo-container secondary';controls.innerHTML=`
            <div class="algo-dropdown-container primary">
                <div class="algo-btn algo-dropdown-btn" onclick="toggleAlgoMenu(this)">
                    <span class="curr-lang">${defaultLang.name}</span>
                    <span class="arrow">▼</span>
                </div>
                <div class="algo-dropdown-menu">
                    ${generateMenuItems(availableLangs, defaultLang.id, 'primary')}
                </div>
            </div>
            <div class="algo-dropdown-container secondary">
                <div class="algo-btn algo-dropdown-btn" onclick="toggleAlgoMenu(this)">
                    <span class="curr-lang">${availableLangs[1]?.name || availableLangs[0].name}</span>
                    <span class="arrow">▼</span>
                </div>
                <div class="algo-dropdown-menu">
                    ${generateMenuItems(availableLangs, availableLangs[1]?.id || availableLangs[0].id, 'secondary')}
                </div>
            </div>
            <button class="algo-btn algo-icon-btn algo-split-btn" onclick="toggleSplitView(this)" title="Toggle Split View">
                ${ICON_SPLIT}
            </button>
            <button class="algo-btn algo-icon-btn algo-copy-btn" onclick="copyAlgoCode(this)" title="Copy Code">
                ${ICON_COPY}
            </button>
        `;rawObjects.forEach((obj,index)=>{obj.removeAttribute('style');obj.style.display=index===0?'block':'none';primaryContainer.appendChild(obj)});wrapper.innerHTML='';primaryContainer.insertBefore(controls,primaryContainer.firstChild);wrapper.appendChild(primaryContainer);wrapper.appendChild(secondaryContainer);updateTheme(wrapper,defaultLang.id)}
function runAlgoInit(){document.querySelectorAll('object[id^="kms://info.algo"]').forEach(wrapper=>{if(wrapper.getAttribute('data-init')==='true')return;wrapper.setAttribute('data-init','true');initAlgoWrapper(wrapper)})}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',runAlgoInit)}else{runAlgoInit()}
const observer=new MutationObserver(()=>runAlgoInit());observer.observe(document.body,{childList:!0,subtree:!0});document.addEventListener('click',e=>{if(!e.target.closest('.algo-dropdown-container')){document.querySelectorAll('.algo-dropdown-container').forEach(c=>c.classList.remove('open'))}})})()
