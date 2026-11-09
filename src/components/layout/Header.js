'use client';

import { useEffect, useRef, useState } from 'react';
import './Header.css';

const sections = [
  { id: 'inicio', label: 'Home' },
  { id: 'habilidades', label: 'Skills' },
  { id: 'sobre-mi', label: 'About' },
  { id: 'proyectos', label: 'Projects' },
  { id: 'experiencia', label: 'Experience' },
  { id: 'contacto', label: 'Contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const headerRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const updateNavigation = () => {
      const active = [...sections].reverse().find(({ id }) => {
        const section = document.getElementById(id);
        return (
          section &&
          section.getBoundingClientRect().top <= window.innerHeight * 0.45
        );
      });
      setActiveSection(active?.id ?? 'inicio');
    };
    const closeMenu = () => setMenuOpen(false);
    const handleKeyDown = (event) => {
      if (
        event.key === 'Escape' &&
        toggleRef.current?.getAttribute('aria-expanded') === 'true'
      ) {
        closeMenu();
        toggleRef.current.focus();
      }
    };
    const handleClick = (event) => {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      )
        closeMenu();
    };
    const mobile = window.matchMedia('(max-width: 760px)');
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClick);
    mobile.addEventListener('change', closeMenu);
    window.addEventListener('scroll', updateNavigation, { passive: true });
    window.addEventListener('resize', updateNavigation);
    updateNavigation();
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClick);
      mobile.removeEventListener('change', closeMenu);
      window.removeEventListener('scroll', updateNavigation);
      window.removeEventListener('resize', updateNavigation);
    };
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <div className="header-inner">
        <a
          className="brand"
          href="#inicio"
          aria-label="DigitalFarmer, inicio"
          onClick={() => setMenuOpen(false)}
        >
          <img src="/assets/svg/avatar.svg" alt="" width="32" height="32" />
          <span>TheCode</span>
        </a>
        <button
          ref={toggleRef}
          className="nav-toggle"
          type="button"
          aria-label={`${menuOpen ? 'Cerrar' : 'Abrir'} menú de navegación`}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
        <nav id="main-navigation" aria-label="Navegación principal">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              className={activeSection === id ? 'nav-active' : undefined}
              href={`#${id}`}
              aria-current={activeSection === id ? 'location' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
