import { renderAsciiArches } from './ascii';

const atmosphere = document.querySelector<HTMLElement>('.hero-atmosphere');
const desktopField = atmosphere?.querySelector<HTMLElement>('.atmosphere-ascii--desktop');
const mobileField = atmosphere?.querySelector<HTMLElement>('.atmosphere-ascii--mobile');
if (atmosphere && desktopField && mobileField) {
  const mobile = window.matchMedia('(max-width: 760px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  let animation = 0;
  let previousFrame = 0;
  let elapsed = 0;

  const tick = (now: number) => {
    if (now - previousFrame >= 1000 / 12) {
      elapsed += Math.min(now - previousFrame, 100) / 1000;
      previousFrame = now;
      const field = mobile.matches ? mobileField : desktopField;
      field.textContent = renderAsciiArches(elapsed, mobile.matches);
    }
    animation = requestAnimationFrame(tick);
  };

  const updatePlayback = () => {
    cancelAnimationFrame(animation);
    const field = mobile.matches ? mobileField : desktopField;
    field.textContent = renderAsciiArches(elapsed, mobile.matches);
    if (visible && !document.hidden && !reducedMotion.matches) {
      previousFrame = performance.now();
      animation = requestAnimationFrame(tick);
    }
  };

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    updatePlayback();
  }).observe(atmosphere);
  mobile.addEventListener('change', updatePlayback);
  reducedMotion.addEventListener('change', updatePlayback);
  document.addEventListener('visibilitychange', updatePlayback);
}
