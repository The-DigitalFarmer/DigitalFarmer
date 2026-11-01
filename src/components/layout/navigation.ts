const sectionLinks = [...document.querySelectorAll<HTMLAnchorElement>('.header nav a[href^="#"]')];
const sectionIds = ['contacto', 'experiencia', 'proyectos', 'sobre-mi', 'habilidades', 'inicio'];
const header = document.querySelector<HTMLElement>('.header');
const menuToggle = header?.querySelector<HTMLButtonElement>('.nav-toggle');

if (header && menuToggle) {
  const setMenuOpen = (open: boolean) => {
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', `${open ? 'Cerrar' : 'Abrir'} menú de navegación`);
  };

  menuToggle.addEventListener('click', () => {
    setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  header.querySelectorAll<HTMLAnchorElement>('a').forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });

  document.addEventListener('click', event => {
    if (event.target instanceof Node && !header.contains(event.target)) setMenuOpen(false);
  });

  window.matchMedia('(max-width: 760px)').addEventListener('change', () => setMenuOpen(false));
}

function updateNavigation() {
  const activeSection = sectionIds.find(id => {
    const section = document.getElementById(id);
    return section && section.getBoundingClientRect().top <= window.innerHeight * .45;
  }) ?? 'inicio';

  sectionLinks.forEach(link => {
    const active = link.hash === `#${activeSection}`;
    link.classList.toggle('nav-active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

window.addEventListener('scroll', updateNavigation, { passive: true });
window.addEventListener('resize', updateNavigation);
updateNavigation();
