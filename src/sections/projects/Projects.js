import './Projects.css';
import { projects } from './data';
import ProjectCard from './ProjectCard';

export default function Projects() {
  return (
    <section
      className="projects-section content-section section-surface"
      id="proyectos"
      aria-labelledby="projects-title"
    >
      <p className="section-kicker">PROJECTS</p>
      <div className="section-header">
        <h2 className="content-title" id="projects-title">
          Projects in Production
        </h2>
        <a
          className="projects-all"
          href="https://github.com/The-DigitalFarmer?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver todos <span aria-hidden="true">→</span>
        </a>
      </div>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
