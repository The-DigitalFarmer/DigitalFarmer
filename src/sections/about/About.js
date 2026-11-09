import './About.css';
import { cvUrl, focusAreas } from './data';

export default function About() {
  return (
    <section
      className="about-section content-section section-surface"
      id="sobre-mi"
      aria-labelledby="about-title"
    >
      <p className="section-kicker">ABOUT</p>
      <div className="focus-grid">
        <header className="focus-intro">
          <h2 id="about-title">
            <span>Deep</span> <span>Focus</span>
          </h2>
          <p className="focus-intro-copy">
            Del problema al código: así pienso, construyo y sigo aprendiendo.
          </p>
          {cvUrl ? (
            <a
              className="cv-button"
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver CV
            </a>
          ) : (
            <button className="cv-button" type="button" disabled>
              Ver CV
            </button>
          )}
        </header>

        {focusAreas.map((area) => (
          <article key={area.title} className="focus-card">
            <p className="focus-label">{area.label}</p>
            <h3>{area.title}</h3>
            <p className="focus-description">{area.description}</p>
            <ul
              className="focus-tags"
              aria-label={`Enfoques de ${area.title.toLowerCase()}`}
            >
              {area.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </article>
        ))}

        <nav className="focus-links" aria-label="Explorar el portafolio">
          <a href="#habilidades">
            Explora mi stack <span aria-hidden="true">↗</span>
          </a>
          <a href="#proyectos">
            Ver proyectos <span aria-hidden="true">↗</span>
          </a>
          <a href="#contacto">
            Conversemos <span aria-hidden="true">→</span>
          </a>
        </nav>
      </div>
    </section>
  );
}
