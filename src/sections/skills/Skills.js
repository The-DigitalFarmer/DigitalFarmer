import './Skills.css';
import { skillGroups } from './data';

const logoFiles = {
  python: '/assets/svg/python.svg',
  fastapi: '/assets/png/fastapi.png',
  postman: '/assets/svg/postman.svg',
  docker: '/assets/png/docker.png',
  git: '/assets/svg/git.svg',
  github: '/assets/svg/github.svg',
  vscode: '/assets/png/vscode.png',
  redis: '/assets/png/redis.png',
  'claude-code': '/assets/svg/claude-code.svg',
  codex: '/assets/png/codex.png',
  cursor: '/assets/svg/cursor.svg',
  'open-code': '/assets/png/open-code.png',
};
const avatarUrl = '/assets/svg/avatar.svg';

export default function Skills() {
  return (
    <section
      className="skills-section content-section section-surface"
      id="habilidades"
      aria-labelledby="skills-title"
    >
      <p className="section-kicker">SKILLS</p>
      <div className="stack-root">
        <img
          className="skills-avatar"
          src={avatarUrl}
          alt="Personaje crema con cuernos curvos y ojos negros."
          width="1000"
          height="1195"
          loading="lazy"
          decoding="async"
        />
        <h2 id="skills-title">Stack</h2>
        <p>Herramientas que convierten ideas en código</p>
      </div>
      <div className="stack-network">
        {skillGroups.map((group) => (
          <div key={group.label} className="stack-branch">
            <h3>{group.label}</h3>
            <p className="stack-description">{group.description}</p>
            <ul className="stack-tools" aria-label={group.ariaLabel}>
              {group.tools.map((tool) => (
                <li key={tool.icon} className="stack-badge">
                  <img
                    className="tool-logo"
                    src={logoFiles[tool.icon]}
                    alt=""
                    aria-hidden="true"
                    width="20"
                    height="20"
                    loading="lazy"
                    decoding="async"
                  />
                  <span>{tool.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
