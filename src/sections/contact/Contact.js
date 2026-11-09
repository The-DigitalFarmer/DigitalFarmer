import './Contact.css';
const adventurers = '/assets/png/adventurers.png';
import SocialLogo from '@/components/ui/SocialLogo';

export default function Contact() {
  return (
    <section
      className="contact-section section-surface"
      id="contacto"
      aria-labelledby="contact-title"
    >
      <p className="section-kicker">CONTACT</p>
      <div className="contact-layout">
        <div className="contact-scene">
          <div className="contact-speech" aria-hidden="true">
            ¡Pero si ayer funcionaba!<span>!</span>
          </div>
          <div className="contact-portal" aria-hidden="true">
            <div className="portal-grid"></div>
            <span className="portal-star">✦</span>
          </div>
          <span className="contact-spark spark-a" aria-hidden="true">
            ✦
          </span>
          <span className="contact-spark spark-b" aria-hidden="true">
            +
          </span>
          <span className="contact-spark spark-c" aria-hidden="true">
            ·
          </span>
          <div className="contact-ground" aria-hidden="true"></div>
          <img
            className="contact-characters"
            src={adventurers}
            width="1584"
            height="993"
            alt="Los dos aventureros pixel art, listos para emprender una nueva misión contigo."
            loading="lazy"
          />
          <div className="contact-party" aria-hidden="true">
            <span className="party-pixels">
              <i></i>
              <i></i>
              <i></i>
            </span>
          </div>
        </div>
        <div className="contact-copy">
          <h2 className="section-title" id="contact-title">
            <br />
            <span>NETWORKING</span>
          </h2>
          <p className="contact-description">
            ¿Tienes un proyecto en mente o un reto por resolver? Hablemos de
            cómo puedo aportar desde el backend.
          </p>
          <div className="contact-channels" aria-label="Canales de contacto">
            <a
              className="contact-channel contact-channel--gmail"
              href="mailto:cabreralandayersondimer@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escribir a Yerson en Gmail"
            >
              <span className="channel-top">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M3 5h18v14H3Zm0 1 9 7 9-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="miter"
                  />
                </svg>
                <span aria-hidden="true">↗</span>
              </span>
              <strong>Gmail</strong>
              <span className="channel-caption">Escríbeme</span>
            </a>
            <a
              className="contact-channel"
              href="https://wa.me/51980822924?text=Hola+Yerson%2C+vi+tu+portafolio+y+me+gustar%C3%ADa+conversar+sobre+una+idea."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Conversar con Yerson en WhatsApp"
            >
              <span className="channel-top">
                <SocialLogo name="whatsapp" />
                <span aria-hidden="true">↗</span>
              </span>
              <strong>WhatsApp</strong>
              <span className="channel-caption">Conversemos</span>
            </a>
            <a
              className="contact-channel"
              href="https://www.linkedin.com/in/yerson-cabrera-88439b401/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver el perfil de Yerson en LinkedIn"
            >
              <span className="channel-top">
                <SocialLogo name="linkedin" />
                <span aria-hidden="true">↗</span>
              </span>
              <strong>LinkedIn</strong>
              <span className="channel-caption">Conectemos</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
