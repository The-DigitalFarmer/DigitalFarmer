'use client';

import { useEffect, useRef } from 'react';
import './HeroAtmosphere.css';
import { renderAsciiArches } from './ascii';

export default function HeroAtmosphere() {
  const atmosphereRef = useRef(null);
  const desktopRef = useRef(null);
  const mobileRef = useRef(null);

  useEffect(() => {
    const atmosphere = atmosphereRef.current;
    const desktopField = desktopRef.current;
    const mobileField = mobileRef.current;
    if (!atmosphere || !desktopField || !mobileField) return;
    const mobile = window.matchMedia('(max-width: 760px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let animation = 0;
    let previousFrame = 0;
    let elapsed = 0;

    const renderFrame = () => {
      const field = mobile.matches ? mobileField : desktopField;
      field.textContent = renderAsciiArches(elapsed, mobile.matches);
    };
    const tick = (now) => {
      if (now - previousFrame >= 1000 / 12) {
        elapsed += Math.min(now - previousFrame, 100) / 1000;
        previousFrame = now;
        renderFrame();
      }
      animation = requestAnimationFrame(tick);
    };
    const updatePlayback = () => {
      cancelAnimationFrame(animation);
      renderFrame();
      if (visible && !document.hidden && !reducedMotion.matches) {
        previousFrame = performance.now();
        animation = requestAnimationFrame(tick);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updatePlayback();
    });
    observer.observe(atmosphere);
    mobile.addEventListener('change', updatePlayback);
    reducedMotion.addEventListener('change', updatePlayback);
    document.addEventListener('visibilitychange', updatePlayback);
    return () => {
      cancelAnimationFrame(animation);
      observer.disconnect();
      mobile.removeEventListener('change', updatePlayback);
      reducedMotion.removeEventListener('change', updatePlayback);
      document.removeEventListener('visibilitychange', updatePlayback);
    };
  }, []);

  return (
    <div ref={atmosphereRef} className="hero-atmosphere" aria-hidden="true">
      <pre
        ref={desktopRef}
        className="atmosphere-ascii atmosphere-ascii--desktop"
      >
        {renderAsciiArches()}
      </pre>
      <pre
        ref={mobileRef}
        className="atmosphere-ascii atmosphere-ascii--mobile"
      >
        {renderAsciiArches(0, true)}
      </pre>
      <div className="atmosphere-vignette"></div>
    </div>
  );
}
