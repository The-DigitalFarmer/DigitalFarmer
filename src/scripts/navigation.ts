const sectionLinks = [...document.querySelectorAll<HTMLAnchorElement>('.header nav a[href^="#"]')];
const sectionIds = ['contacto', 'experiencia', 'proyectos', 'sobre-mi', 'habilidades', 'inicio'];

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
