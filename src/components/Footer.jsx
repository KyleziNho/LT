import { Link } from "react-router-dom";
import { artistInfo } from "../data/artworks";
import { Reveal, LineReveal } from "./Reveal";
import { Button } from "./UI";
import { LogoMark } from "./Logo";

const NAV = [
  { to: "/works", label: "Works" },
  { to: "/commissions", label: "Commissions" },
  { to: "/art-therapy", label: "Art Therapy" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const SOCIAL = [
  ["Instagram", artistInfo.social.instagram],
  ["Facebook", artistInfo.social.facebook],
  ["LinkedIn", artistInfo.social.linkedin],
  ["YouTube", artistInfo.social.youtube],
];

export default function Footer() {
  return (
    <footer className="footer surface-dark grain">
      <div className="container footer-inner">
        <div className="footer-cta">
          <p className="eyebrow eyebrow-accent">Let's begin</p>
          <h2 className="t-h1 footer-head">
            <LineReveal lines={["Have a wall,", "a story, or a", "team in mind?"]} />
          </h2>
          <Reveal delay={0.2}>
            <Button to="/contact" variant="outline" className="footer-btn">Start a conversation</Button>
          </Reveal>
        </div>

        <div className="footer-grid">
          <div className="footer-col">
            <span className="mono footer-label">Explore</span>
            <ul>
              {NAV.map((l) => (
                <li key={l.to}><Link to={l.to} className="footer-link" data-cursor="true">{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <span className="mono footer-label">Elsewhere</span>
            <ul>
              {SOCIAL.map(([label, href]) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noreferrer" className="footer-link" data-cursor="true">{label} ↗</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <span className="mono footer-label">Studio</span>
            <ul>
              <li><a href="mailto:lisateo@gmail.com" className="footer-link" data-cursor="true">lisateo@gmail.com</a></li>
              <li><a href="tel:+60123086220" className="footer-link" data-cursor="true">(60) 12 3086 220</a></li>
              <li className="footer-muted">Kuala Lumpur, Malaysia</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-base">
        <div className="container footer-base-inner">
          <span className="footer-wordmark">Lisa Teo</span>
        </div>
      </div>

      <div className="footer-legal container">
        <span className="mono tiny faint">© {new Date().getFullYear()} Lisa Teo Art</span>
        <span className="mono tiny faint">Fine Art · Commissions · Art Therapy</span>
      </div>
    </footer>
  );
}
