import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { artistInfo } from "../data/artworks";
import { ctaForPath } from "../data/cta";
import { Reveal, LineReveal } from "./Reveal";
import { Button } from "./UI";
import "../styles/cta.css";

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

const EASE = [0.16, 1, 0.3, 1];

// The contextual closing band. Content swaps per route; the dusk aesthetic and
// structure stay constant so the change reads as intentional, not jarring.
function ContextualCTA({ cta }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={cta.id}
        className="footer-cta cta-band"
        initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <p className="eyebrow eyebrow-accent cta-eyebrow">{cta.eyebrow}</p>
        <h2 className="t-h1 footer-head cta-head">
          {cta.head.map((line, i) =>
            line.accent ? (
              <span className="cta-head-accent" key={i}>
                <LineReveal lines={[line.t]} delay={i * 0.08} />
              </span>
            ) : (
              <LineReveal lines={[line.t]} delay={i * 0.08} key={i} />
            )
          )}
        </h2>
        {cta.sub && (
          <Reveal delay={0.18}>
            <p className="cta-sub">{cta.sub}</p>
          </Reveal>
        )}
        <Reveal delay={cta.sub ? 0.28 : 0.2}>
          <Button
            to={cta.button.to}
            variant="outline"
            className="footer-btn cta-btn"
            cursor={cta.button.cursor || "true"}
          >
            {cta.button.label}
          </Button>
        </Reveal>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Footer() {
  const { pathname } = useLocation();
  const cta = ctaForPath(pathname);

  return (
    <footer className={`footer surface-dark grain${cta ? "" : " footer-nocta"}`}>
      <div className="container footer-inner">
        {cta && <ContextualCTA cta={cta} />}

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
