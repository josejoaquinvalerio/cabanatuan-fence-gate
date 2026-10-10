let sheets=[];
let selectedSheet=1;
const byId=id=>document.getElementById(id);
const sheetButtons=[...document.querySelectorAll('[data-sheet]')];
function selectSheet(i){
 const sheet=sheets[i];if(!sheet)return;selectedSheet=i;
 sheetButtons.forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.sheet)===i)));
 byId('sheet-label').textContent=`${sheet.code} / ${sheet.title}`;
 byId('sheet-image').src=sheet.src;byId('sheet-image').alt=sheet.alt;
 byId('sheet-page').textContent=`SHEET ${i+1} OF ${sheets.length}`;
}
fetch('sheets.json?v=20261010').then(r=>{if(!r.ok)throw new Error('Drawing index unavailable');return r.json()}).then(data=>{sheets=data;selectSheet(1)}).catch(()=>{byId('sheet-label').textContent='Drawing navigation unavailable. Please refresh.'});
sheetButtons.forEach(b=>b.addEventListener('click',()=>selectSheet(Number(b.dataset.sheet))));
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{
 const filter=b.dataset.filter;
 document.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
 sheetButtons.forEach(x=>x.hidden=filter!=='all'&&x.dataset.discipline!==filter);
 if(sheetButtons[selectedSheet].hidden){const first=sheetButtons.find(x=>!x.hidden);if(first)selectSheet(Number(first.dataset.sheet));}
}));
const views={
 render:{src:'assets/review-perspective.webp?v=20261010',title:'Revit perspective',alt:'Perspective of the steel garage, open upper floor, existing house and wood-look fence',caption:'A-01 · Revit perspective from the draft drawing set.'},
 plan:{src:'assets/review-floorplan.webp?v=20261010',title:'Ground & upper floor plans',alt:'Ground and upper floor plans showing the garage, open upper floor and rear stair',caption:'A-02 · Ground and upper floor arrangement.'},
 elevation:{src:'assets/review-elevation.webp?v=20261010',title:'Front elevation',alt:'Front elevation of the proposed steel extension and existing house',caption:'A-02 · Front elevation from the draft drawing set.'}
};
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>{
 const v=views[b.dataset.view];document.querySelectorAll('[data-view]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
 byId('view-image').src=v.src;byId('view-image').alt=v.alt;byId('view-title').textContent=v.title;byId('view-caption').textContent=v.caption;
}));
const dialog=byId('sheet-dialog');
byId('expand-sheet').addEventListener('click',()=>{
 const sheet=sheets[selectedSheet];if(!sheet)return;
 byId('dialog-title').textContent=`${sheet.code} / ${sheet.title}`;byId('dialog-image').src=sheet.src;byId('dialog-image').alt=sheet.alt;
 document.querySelector('.dialog-image-area').classList.remove('zoomed');byId('zoom-sheet').textContent='Zoom in';byId('zoom-sheet').setAttribute('aria-pressed','false');dialog.showModal();
});
byId('close-dialog').addEventListener('click',()=>dialog.close());
byId('zoom-sheet').addEventListener('click',()=>{const on=document.querySelector('.dialog-image-area').classList.toggle('zoomed');byId('zoom-sheet').textContent=on?'Zoom out':'Zoom in';byId('zoom-sheet').setAttribute('aria-pressed',String(on))});
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
document.querySelectorAll('img').forEach(img=>{img.addEventListener('contextmenu',e=>e.preventDefault());img.addEventListener('dragstart',e=>e.preventDefault())});
