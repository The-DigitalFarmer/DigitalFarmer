import './SocialLogo.css';
const github = '/assets/svg/github.svg';
const linkedin = '/assets/svg/linkedin.svg';
const whatsapp = '/assets/svg/whatsapp.svg';

const logos = { github, linkedin, whatsapp };

export default function SocialLogo({ name }) {
  return (
    <img
      className="social-logo"
      src={logos[name]}
      alt=""
      aria-hidden="true"
      width="24"
      height="24"
      decoding="async"
    />
  );
}
