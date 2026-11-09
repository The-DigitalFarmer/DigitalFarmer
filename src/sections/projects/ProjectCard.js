import './ProjectCard.css';

export default function ProjectCard({ project }) {
  return (
    <article className="project-card" aria-labelledby={project.id}>
      <div className="project-visual">
        <img
          src={project.preview.image.src}
          alt={project.preview.alt}
          width={project.preview.image.width}
          height={project.preview.image.height}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="project-copy">
        <p className="project-kind">{project.kind}</p>
        <h3 id={project.id}>
          {project.name}
          {project.suffix && <span>{project.suffix}</span>}
        </h3>
        <p className="body-copy">{project.description}</p>
        <div className="project-actions">
          {[
            { label: 'Repositorio', url: project.repositoryUrl },
            { label: 'Ver web', url: project.websiteUrl },
          ].map(({ label, url }) => (
            <a
              key={label}
              className="project-link"
              href={url || undefined}
              target={url ? '_blank' : undefined}
              rel={url ? 'noopener noreferrer' : undefined}
              role={url ? undefined : 'link'}
              aria-disabled={url ? undefined : 'true'}
              tabIndex={url ? undefined : -1}
              aria-label={`${label} de ${project.name}${url ? '' : ' (enlace pendiente)'}`}
            >
              {label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
