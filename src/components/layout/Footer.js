import './Footer.css';
const ornitorrincoImage = '/assets/png/ornitorrinco.png';
const avatarUrl = '/assets/svg/avatar.svg';

const sections = [
  { href: '#habilidades', label: 'Skills' },
  { href: '#sobre-mi', label: 'About' },
  { href: '#proyectos', label: 'Projects' },
  { href: '#experiencia', label: 'Experience' },
];
const channels = [
  { href: 'mailto:cabreralandayersondimer@gmail.com', label: 'Gmail' },
  { href: 'https://wa.me/51980822924', label: 'WhatsApp' },
  {
    href: 'https://www.linkedin.com/in/yerson-cabrera-88439b401/',
    label: 'LinkedIn',
  },
  { href: 'https://github.com/The-DigitalFarmer', label: 'GitHub' },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <a href="#inicio" aria-label="DigitalFarmer, inicio">
            <img src={avatarUrl} alt="" width="44" height="44" />
            <strong>DigitalFarmer</strong>
          </a>
          <p>Python, APIs y automatización</p>
        </div>
        <nav className="footer-column" aria-label="Explorar el portafolio">
          <h3>EXPLORAR</h3>
          {sections.map((section) => (
            <a key={section.href} href={section.href}>
              {section.label}
            </a>
          ))}
        </nav>
        <nav className="footer-column" aria-label="Canales de contacto">
          <h3>CONECTEMOS</h3>
          {channels.map((channel) => (
            <a
              key={channel.href}
              href={channel.href}
              target={channel.href.startsWith('https:') ? '_blank' : undefined}
              rel={
                channel.href.startsWith('https:')
                  ? 'noopener noreferrer'
                  : undefined
              }
            >
              {channel.label}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
      </div>
      <div className="footer-meta" id="footer-meta">
        <span className="footer-name">OrnitorCode Foundation</span>
        <span className="footer-copyright">
          © <span id="year">{new Date().getFullYear()}</span>
        </span>
        <a className="footer-back-top" href="#inicio">
          <img
            className="footer-ornitorrinco"
            src={ornitorrincoImage}
            alt=""
            width="32"
            height="24"
            loading="lazy"
            decoding="async"
          />
          <span>
            Volver al inicio <span aria-hidden="true">↑</span>
          </span>
        </a>
      </div>
    </footer>
  );
}
