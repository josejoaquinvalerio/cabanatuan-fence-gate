const sheets = [
  {code:'A-01',title:'Site & perspective',alt:'A-01 architectural drawing: perspective and site development plan; vicinity map omitted'},
  {code:'A-02',title:'Gate & fence',alt:'A-02 architectural drawing: gate and fence details, road elevation and perspective'},
  {code:'S-01',title:'Foundation plan',alt:'S-01 structural drawing: general construction notes and foundation plan'},
  {code:'S-02',title:'Structural details',alt:'S-02 structural drawing: column footing, CHB, wall footing details and typical elevation'}
];
let selectedSheet = 0;
const byId = id => document.getElementById(id);
document.querySelectorAll('[data-sheet]').forEach(button => button.addEventListener('click', () => {
  selectedSheet = Number(button.dataset.sheet);
  const sheet = sheets[selectedSheet];
  document.querySelectorAll('[data-sheet]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  byId('sheet-label').textContent = `${sheet.code} / ${sheet.title}`;
  byId('sheet-image').src = `review-sheet-${selectedSheet + 1}.webp?v=3`;
  byId('sheet-image').alt = sheet.alt;
  byId('sheet-page').textContent = `SHEET ${selectedSheet + 1} OF 4`;
}));
const views = {
  render:{src:'review-perspective.webp?v=3',title:'Rendered perspective',alt:'Rendered street perspective of the proposed gate and fence',caption:'Perspective from architectural sheet A-01.'},
  model:{src:'review-model.webp?v=3',title:'Revit model perspective',alt:'Annotated Revit perspective showing the steel framing, black angle bars and white fence finish',caption:'Annotated model perspective from architectural sheet A-02.'}
};
document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
  const view = views[button.dataset.view];
  document.querySelectorAll('[data-view]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  byId('view-image').src = view.src;
  byId('view-image').alt = view.alt;
  byId('view-title').textContent = view.title;
  byId('view-caption').textContent = view.caption;
}));
const dialog = byId('sheet-dialog');
byId('expand-sheet').addEventListener('click', () => {
  const sheet = sheets[selectedSheet];
  byId('dialog-title').textContent = `${sheet.code} / ${sheet.title}`;
  byId('dialog-image').src = `review-sheet-${selectedSheet + 1}.webp?v=3`;
  byId('dialog-image').alt = sheet.alt;
  document.querySelector('.dialog-image-area').classList.remove('zoomed');
  byId('zoom-sheet').textContent = 'Zoom in';
  byId('zoom-sheet').setAttribute('aria-pressed', 'false');
  dialog.showModal();
});
byId('close-dialog').addEventListener('click', () => dialog.close());
byId('zoom-sheet').addEventListener('click', () => {
  const zoomed = document.querySelector('.dialog-image-area').classList.toggle('zoomed');
  byId('zoom-sheet').textContent = zoomed ? 'Zoom out' : 'Zoom in';
  byId('zoom-sheet').setAttribute('aria-pressed', String(zoomed));
});
dialog.addEventListener('click', event => { if(event.target === dialog) dialog.close(); });
