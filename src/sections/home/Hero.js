import './Hero.css';
import HeroAtmosphere from './HeroAtmosphere';
import SocialLogo from '@/components/ui/SocialLogo';
const gilfoyleUrl = '/assets/svg/gilfoyle.svg';

export default function Hero() {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <HeroAtmosphere />
      <div className="hero-layout">
        <div className="hero-copy">
          <h1 id="hero-title">
            BACKEND
            <br />
            <span className="name">DEVELOPER</span>
          </h1>
          <p className="hero-subtitle">
            <span>Autodidacta</span>
          </p>
          <p className="hero-description">
            Especializado en diseñar e implementar la arquitectura
            <br />
            lógica, APIs y bases de datos que dan vida al sotware
            <br />
            Pasión por la automatización e Inteligencia Artificial
          </p>
          <div className="hero-actions">
            <a className="button primary-button" href="#proyectos">
              <span className="play-icon" aria-hidden="true"></span> Ver
              proyectos{' '}
              <span className="button-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
            <a
              className="button secondary-button"
              href="https://github.com/The-DigitalFarmer"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialLogo name="github" /> GitHub{' '}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <a className="explore-skills" href="#habilidades">
            <span aria-hidden="true">↓</span> Descubre mi stack{' '}
            <span className="explore-line" aria-hidden="true"></span>
          </a>
        </div>
        <div className="profile-area">
          <div className="profile-frame">
            <span className="frame-corner top-left"></span>
            <span className="frame-corner top-right"></span>
            <span className="frame-corner bottom-left"></span>
            <span className="frame-corner bottom-right"></span>
            <div className="profile-orbit" aria-hidden="true"></div>
            <div className="profile-bottom">
              <span className="profile-name">YERSON CABRERA LANDA</span>
            </div>
          </div>
          <img
            className="characters"
            src={gilfoyleUrl}
            width="600"
            height="820"
            alt="Gilfoyle con gafas, cabello largo y camisa a cuadros."
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
