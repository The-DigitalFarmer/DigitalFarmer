document.querySelector('#year').textContent = new Date().getFullYear();

// A low-resolution canvas keeps the landscape crisp at every screen size.
const canvas = document.querySelector('#landscape');
const context = canvas.getContext('2d');
function drawLandscape() {
  document.documentElement.style.setProperty('--page-viewport-width', `${document.documentElement.clientWidth}px`);
  const height = document.querySelector('.header').offsetHeight + document.querySelector('.hero').offsetHeight + document.querySelector('.chapter-strip').offsetHeight + 90;
  document.querySelector('.landscape').style.height = `${height}px`;
  const width = Math.ceil(window.innerWidth / 4);
  const h = Math.ceil(height / 4);
  canvas.width = width; canvas.height = h;
  let seed = 124;
  const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const horizon = Math.floor(h * (window.innerWidth <= 760 ? .76 : .74));
  for (let i = 0; i < 53; i++) {
    const x = Math.floor(random() * width), y = Math.floor(random() * horizon * .9);
    context.fillStyle = ['#cca2b24a','#edbca55a','#a484a72c'][i % 3];
    context.fillRect(x, y, 1, 1);
    if (i % 11 === 0) { context.fillRect(x - 1, y, 3, 1); context.fillRect(x, y - 1, 1, 3); }
  }
  const layers = [{y:.79,color:'#39182f',step:8,variance:7},{y:.86,color:'#261429',step:5,variance:5},{y:.94,color:'#181020',step:6,variance:4}];
  for (const layer of layers) {
    context.fillStyle = layer.color;
    for (let x = 0; x < width; x += layer.step) {
      const y = Math.floor(h * layer.y - random() * layer.variance);
      context.fillRect(x,y,layer.step,h-y);
    }
  }
  for (let i = 0; i < width * 1.5; i++) {
    const x = Math.floor(random() * width), y = Math.floor(h * .81 + random() * h * .19);
    context.fillStyle = ['#74304c66','#94375155','#bd4c6555','#3b203e'][i%4];
    context.fillRect(x,y,1+Math.floor(random()*4),1);
    if (i%9 === 0) context.fillRect(x,y-1,1,2);
  }
}
drawLandscape();
window.addEventListener('resize', drawLandscape);
document.fonts.ready.then(drawLandscape);

// Keep the navigation in sync with the section being explored.
const sectionLinks = [...document.querySelectorAll('nav a[href^="#"]')];
function updateNavigation() {
  const activeSection = ['contacto', 'experiencia', 'proyectos', 'habilidades', 'inicio'].find(id => document.getElementById(id).getBoundingClientRect().top <= window.innerHeight * .45) || 'inicio';
  sectionLinks.forEach(link => {
    const active = link.hash === `#${activeSection}`;
    link.classList.toggle('nav-active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
window.addEventListener('scroll', updateNavigation, {passive:true});
window.addEventListener('resize', updateNavigation);
updateNavigation();

// Keep the neural connections in the empty space around the text, at any width.
const neuralField = document.querySelector('.neural-field');
const neuralSvg = neuralField.querySelector('.approach-network');
const svgNamespace = 'http://www.w3.org/2000/svg';
function drawApproachNetwork() {
  const bounds = neuralField.getBoundingClientRect();
  if (!bounds.width) return;
  neuralSvg.setAttribute('viewBox', `0 0 ${bounds.width} ${bounds.height}`);
  const fragments = document.createDocumentFragment();
  const add = (tag, attributes) => {
    const element = document.createElementNS(svgNamespace, tag);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    fragments.append(element);
    return element;
  };
  const link = (d, branch = false) => add('path', {d, class: `neural-link${branch ? ' neural-link--branch' : ''}`});
  const node = (x, y, core = false, index = 0) => add('circle', {
    cx: x, cy: y, r: core ? 3 : 2.3,
    class: `neural-node${core ? ' neural-node--core' : ''} neural-node--pulse`,
    style: `--neural-delay:-${index * 1.3}s`
  });
  const rows = [...neuralField.querySelectorAll('.approach-row')].map(row => {
    const box = row.getBoundingClientRect();
    const title = row.querySelector('dt').getBoundingClientRect();
    return {x: title.left - bounds.left - 14, y: title.top - bounds.top + 9, bottom: box.bottom - bounds.top, top: box.top - bounds.top};
  });
  rows.forEach((row, i) => {
    node(row.x, row.y, true, i);
    if (!rows[i + 1]) return;
    const next = rows[i + 1];
    const y = (row.bottom + next.top) / 2;
    const right = bounds.width - 4;
    const middle = bounds.width * .64;
    link(`M ${row.x} ${row.y} C 3 ${row.y + 24}, 4 ${y - 20}, 8 ${y} S ${next.x} ${next.y - 20}, ${next.x} ${next.y}`);
    const branch = bounds.width * .34;
    link(`M 8 ${y} Q ${branch * .5} ${y - 10}, ${branch} ${y + 12} T ${middle} ${y - 9} T ${right} ${y + 5}`, true);
    link(`M 8 ${y} L 26 ${y + 14} L ${middle} ${y - 9}`, true);
    link(`M ${branch} ${y + 12} L ${right} ${y + 5}`, true);
    node(8, y, false, i + 3);
    node(26, y + 14, false, i + 5);
    node(branch, y + 12, false, i + 6);
    node(middle, y - 9, false, i + 7);
    node(right, y + 5, false, i + 9);
  });
  neuralSvg.replaceChildren(fragments);
}
new ResizeObserver(drawApproachNetwork).observe(neuralField);
document.fonts.ready.then(drawApproachNetwork);
drawApproachNetwork();

// One project at a time, changed only with the centered arrow controls.
const projectsSection = document.querySelector('#proyectos');
const projectCards = [...projectsSection.querySelectorAll('[data-project]')];
const previousProject = projectsSection.querySelector('[data-project-previous]');
const nextProject = projectsSection.querySelector('[data-project-next]');
const projectCounter = projectsSection.querySelector('[data-project-current]');
let activeProject = -1;

function showProject(index) {
  index = Math.max(0, Math.min(index, projectCards.length - 1));
  if (index === activeProject) return;
  const focusedCard = document.activeElement.closest('[data-project]');
  if (focusedCard && focusedCard !== projectCards[index]) {
    const focusTarget = index === projectCards.length - 1 ? previousProject : nextProject;
    focusTarget.focus({preventScroll: true});
  }
  activeProject = index;
  projectCards.forEach((card, i) => {
    const active = i === index;
    card.classList.toggle('is-active', active);
    card.inert = !active;
    card.setAttribute('aria-hidden', String(!active));
  });
  previousProject.disabled = index === 0;
  nextProject.disabled = index === projectCards.length - 1;
  projectCounter.textContent = String(index + 1).padStart(2, '0');
}
previousProject.addEventListener('click', () => showProject(activeProject - 1));
nextProject.addEventListener('click', () => showProject(activeProject + 1));
showProject(0);

// The sample projects have an expandable concept preview, ready for real links.
const projectDialog = document.querySelector('.project-dialog');
document.querySelectorAll('[data-project-open]').forEach(button => button.addEventListener('click', () => {
  const card = button.closest('[data-project]');
  projectDialog.querySelector('h2').textContent = card.querySelector('h3').textContent;
  projectDialog.querySelector('.project-dialog-description').textContent = card.querySelector('.project-detail').textContent;
  projectDialog.querySelector('.project-dialog-preview').replaceChildren(card.querySelector('.project-visual').cloneNode(true));
  projectDialog.showModal();
}));
projectDialog.querySelector('.project-dialog-close').addEventListener('click', () => projectDialog.close());
projectDialog.addEventListener('click', event => {
  if (event.target !== projectDialog) return;
  const bounds = projectDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) projectDialog.close();
});
