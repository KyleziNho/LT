import { Link } from "react-router-dom";
import { Reveal, RevealGroup, RevealItem, LineReveal } from "../components/Reveal";
import { Button, ArrowRight } from "../components/UI";
import PageHeroBg from "../components/PageHeroBg";
import { artistInfo } from "../data/artworks";
import { journey, exhibitions, pillars, voiceLines } from "../data/site";
import { thumb } from "../lib/util";
import "../styles/about.css";

const PILLAR_TINT = { Body: "#6f9a3e", Mind: "#d4562f", Spirit: "#7b6bd1" };

/* -------- hero — the artist among her own work (full-bleed) -------- */
function AboutHero() {
  return (
    <section className="page-hero page-hero--image about-hero">
      <PageHeroBg image={thumb("/images/artist/Lisa-Teo-1.jpg")} tint="#2a2036" position="center 30%" />
      <div className="container">
        <p className="eyebrow eyebrow-row page-hero-eyebrow">The artist · Lisa Teo Cheng Yen</p>
        <h1 className="t-hero about-hero-head">
          <LineReveal lines={["From the courtroom"]} delay={0.15} inView={false} />
          <span className="about-hero-accent">
            <LineReveal lines={["to the canvas."]} delay={0.28} inView={false} />
          </span>
        </h1>
        <p className="about-hero-statement">
          &ldquo;My art is to be <em>felt</em>, not just seen.&rdquo;
        </p>
        <p className="mono about-hero-meta">{artistInfo.location} &middot; Full-time artist since 2020</p>
      </div>
    </section>
  );
}

/* -------- the turn (concise) -------- */
function Journey() {
  return (
    <section className="section about-journey">
      <div className="container">
        <div className="about-journey-grid">
          <div className="about-journey-media">
            <Reveal y={34}>
              <div className="frame frame-tall">
                <img src={thumb("/images/artist/Lisa-Teo-4.jpg")} alt="Lisa Teo at work on a painting" loading="lazy" decoding="async" />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mono faint about-caption">Sekinchan fields to coral reefs</p>
            </Reveal>
          </div>

          <div className="about-journey-copy">
            <Reveal><p className="eyebrow eyebrow-row">The turn</p></Reveal>
            <Reveal delay={0.08}>
              <p className="about-journey-lead balance">{journey[0]}</p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="about-journey-para muted pretty">{journey[1]}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <figure className="about-journey-quote">
                <blockquote className="pretty">&ldquo;{voiceLines[0]}&rdquo;</blockquote>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------- body · mind · spirit -------- */
function Pillars() {
  return (
    <section className="section about-pillars">
      <div className="container">
        <div className="section-head-row">
          <div className="section-head wide">
            <Reveal><p className="eyebrow eyebrow-row">Body &middot; Mind &middot; Spirit</p></Reveal>
            <Reveal delay={0.05}>
              <h2 className="t-h1 balance">Three landscapes, one enquiry.</h2>
            </Reveal>
          </div>
        </div>

        <RevealGroup className="pillar-grid" stagger={0.12}>
          {pillars.map((p) => (
            <RevealItem key={p.key}>
              <Link to={p.to} className={`pillar accent-${p.accent}`} data-cursor="View" data-cursor-tint={PILLAR_TINT[p.key]}>
                <div className="pillar-media">
                  <img src={thumb(p.image)} alt={p.series} loading="lazy" decoding="async" />
                </div>
                <div className="pillar-body">
                  <span className="pillar-key">{p.key}</span>
                  <h3 className="pillar-series">{p.series}</h3>
                  <p className="pillar-text pretty">{p.text}</p>
                  <span className="pillar-cta">Enter the series <ArrowRight /></span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* -------- exhibitions timeline (dusk band) -------- */
function Exhibitions() {
  return (
    <section className="section about-exhibitions surface-dusk grain">
      <div className="container about-exhibitions-inner">
        <div className="section-head-row">
          <div className="section-head">
            <Reveal><p className="eyebrow eyebrow-row eyebrow-accent">Selected record</p></Reveal>
            <Reveal delay={0.05}><h2 className="t-h1">A decade in the making.</h2></Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="mono about-exhibit-range">2019 &mdash; 2025</p>
          </Reveal>
        </div>

        <RevealGroup as="ol" className="timeline" stagger={0.07}>
          {exhibitions.map((e, i) => (
            <RevealItem as="li" className="timeline-row" key={`${e.year}-${i}`}>
              <span className="mono timeline-year">{e.year}</span>
              <span className="timeline-dot" aria-hidden="true" />
              <p className="timeline-text pretty">{e.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* -------- closing invitation -------- */
function Invitation() {
  return (
    <section className="section about-cta">
      <div className="container">
        <p className="divider-label mono about-cta-divider">Where to next</p>
        <div className="about-cta-grid">
          <div className="about-cta-copy">
            <h2 className="t-h1">
              <LineReveal lines={["The story continues", "on the canvas."]} />
            </h2>
            <Reveal delay={0.15}>
              <p className="lede about-cta-lede pretty">
                See the paintings this journey produced &mdash; or begin a quieter
                conversation of your own.
              </p>
            </Reveal>
          </div>

          <div className="about-cta-actions">
            <Reveal><Button to="/works">See the work</Button></Reveal>
            <Reveal delay={0.08}>
              <Link to="/art-therapy" className="link about-cta-link" data-cursor="true">
                Guided Drawing art therapy <ArrowRight />
              </Link>
            </Reveal>
            <Reveal delay={0.14}>
              <Link to="/contact" className="link about-cta-link" data-cursor="true">
                Get in touch <ArrowRight />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <>
      <AboutHero />
      <Journey />
      <Pillars />
      <Exhibitions />
      <Invitation />
    </>
  );
}
