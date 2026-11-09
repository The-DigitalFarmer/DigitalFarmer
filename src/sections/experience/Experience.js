import './Experience.css';
import { experiences } from './data';

export default function Experience() {
  return (
    <section
      className="experience-section content-section section-surface"
      id="experiencia"
      aria-labelledby="experience-title"
    >
      <p className="section-kicker">EXPERIENCE</p>
      <div className="section-header">
        <h2 className="content-title" id="experience-title">
          I was born programming
        </h2>
        <span className="caption">DISPONIBLE</span>
      </div>
      <div className="content-grid">
        {experiences.map((experience) => (
          <article key={experience.title} className="experience-entry">
            <header className="entry-summary">
              <span className="caption">{experience.dates}</span>
              <h3>{experience.title}</h3>
              <span className="entry-company">
                {experience.company} <span>{experience.arrangement}</span>
              </span>
            </header>
            <div className="entry-detail">
              <p className="body-copy">{experience.summary}</p>
              <ul
                className="tag-list"
                aria-label={experience.technologiesLabel}
              >
                {experience.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
