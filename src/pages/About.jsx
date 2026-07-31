import { Link } from "react-router-dom";
import { Reveal, RevealGroup, RevealItem, LineReveal } from "../components/Reveal";
import { Button, ArrowRight } from "../components/UI";
import PageHeroBg from "../components/PageHeroBg";
import { artistInfo } from "../data/artworks";
import { about, artistStatement, exhibitions, exhibitionsIntro, pillars } from "../data/site";
import { thumb } from "../lib/util";
import "../styles/about.css";

const PILLAR_TINT = { Body: "#6f9a3e", Mind: "#d4562f", Spirit: "#7b6bd1" };

/* -------- hero — the artist among her own work (full-bleed) --------
   Title and quote verbatim from lisateoart.com/about. */
function AboutHero() {
  return (
    <section className="page-hero page-hero--image about-hero">
      <PageHeroBg image={thumb("/images/artist/Lisa-Teo-1.jpg")} tint="#2a2036" position="center 30%" />
      <div className="container">
        <p className="eyebrow eyebrow-row page-hero-eyebrow">{about.intro}</p>
        <h1 className="t-hero about-hero-head head-long head-wide">
          <LineReveal lines={["From Law to Art:"]} delay={0.15} inView={false} />
          <span className="about-hero-accent">
            <LineReveal lines={["Nature, Healing and the Journey Within"]} delay={0.28} inView={false} />
          </span>
        </h1>
        <p className="mono about-hero-meta">{artistInfo.location}</p>
      </div>
    </section>
  );
}

/* -------- the turn — her opening paragraphs, in her order -------- */
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
          </div>

          <div className="about-journey-copy">
            <Reveal><p className="eyebrow eyebrow-row">{about.intro}</p></Reveal>
            <Reveal delay={0.08}>
              <p className="about-journey-lead balance">{about.opening[0]}</p>
            </Reveal>
            {about.opening.slice(1).map((para, i) => (
              <Reveal delay={0.14 + i * 0.06} key={para.slice(0, 30)}>
                <p className="about-journey-para muted pretty">{para}</p>
              </Reveal>
            ))}
            <Reveal delay={0.26}>
              <figure className="about-journey-quote">
                <blockquote className="pretty">&ldquo;{about.museQuote}&rdquo;</blockquote>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------- the work: paddy, ocean, mountains -------- */
function Work() {
  return (
    <section className="section-tight about-work">
      <div className="container about-work-inner">
        {about.work.map((para) => (
          <Reveal key={para.slice(0, 30)}>
            <p className="about-work-para pretty">{para}</p>
          </Reveal>
        ))}
        <Reveal delay={0.1}>
          <figure className="about-journey-quote about-work-quote">
            <blockquote className="pretty">&ldquo;{about.collectedQuote}&rdquo;</blockquote>
          </figure>
        </Reveal>
        {about.reach.map((para) => (
          <Reveal key={para.slice(0, 30)}>
            <p className="about-work-para pretty">{para}</p>
          </Reveal>
        ))}
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
              <h2 className="t-h1 head-long head-wide">Each series reflecting different aspects of our human experience</h2>
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
                  <span className="pillar-cta">View My Paintings <ArrowRight /></span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* -------- art therapy, in her words -------- */
function Therapy() {
  return (
    <section className="section-tight about-therapy">
      <div className="container about-work-inner">
        <Reveal><p className="eyebrow eyebrow-row">Art therapy</p></Reveal>
        {about.therapy.map((para) => (
          <Reveal key={para.slice(0, 30)}>
            <p className="about-work-para pretty">{para}</p>
          </Reveal>
        ))}
        <Reveal delay={0.1}>
          <figure className="about-journey-quote about-work-quote">
            <blockquote className="pretty">&ldquo;{about.therapyQuote}&rdquo;</blockquote>
          </figure>
        </Reveal>
        {about.closing.map((para) => (
          <Reveal key={para.slice(0, 30)}>
            <p className="about-work-para pretty">{para}</p>
          </Reveal>
        ))}
        <Reveal delay={0.12}>
          <p className="about-signoff">{artistInfo.name}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------- artist statement (lisateoart.com/artiststatement) -------- */
function Statement() {
  return (
    <section className="section about-statement">
      <div className="container about-statement-inner">
        <Reveal><p className="eyebrow eyebrow-row eyebrow-accent">Artist Statement</p></Reveal>
        <Reveal delay={0.05}>
          <h2 className="t-h1 about-statement-head head-long head-wide">{artistStatement.heading}</h2>
        </Reveal>
        {artistStatement.body.map((para) => (
          <Reveal delay={0.1} key={para.slice(0, 30)}>
            <p className="about-statement-para pretty">{para}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* -------- exhibitions (lisateoart.com/exhibitions) -------- */
function Exhibitions() {
  return (
    <section className="section about-exhibitions surface-dusk grain">
      <div className="container about-exhibitions-inner">
        <div className="section-head-row">
          <div className="section-head">
            <Reveal><p className="eyebrow eyebrow-row eyebrow-accent">Exhibitions</p></Reveal>
            <Reveal delay={0.05}><h2 className="t-h1">Selected Exhibitions</h2></Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="about-exhibit-intro pretty">{exhibitionsIntro}</p>
          </Reveal>
        </div>

        <RevealGroup as="ol" className="timeline" stagger={0.07}>
          {exhibitions.map((e, i) => (
            <RevealItem as="li" className="timeline-row" key={`${e.year}-${i}`}>
              <span className="mono timeline-year">{e.year}</span>
              <span className="timeline-dot" aria-hidden="true" />
              <p className="timeline-text pretty">
                {e.text}
                <span className="mono timeline-kind">{e.kind}</span>
              </p>
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
        <div className="about-cta-grid">
          <div className="about-cta-copy">
            <Reveal>
              <h2 className="t-h1 head-long head-wide">Have a query about my paintings or art therapy?</h2>
            </Reveal>
          </div>

          <div className="about-cta-actions">
            <Reveal><Button to="/works">View My Paintings</Button></Reveal>
            <Reveal delay={0.08}>
              <Link to="/art-therapy" className="link about-cta-link" data-cursor="true">
                Learn More About Art Therapy <ArrowRight />
              </Link>
            </Reveal>
            <Reveal delay={0.14}>
              <Link to="/contact" className="link about-cta-link" data-cursor="true">
                Contact Me <ArrowRight />
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
      <Work />
      <Pillars />
      <Therapy />
      <Statement />
      <Exhibitions />
      <Invitation />
    </>
  );
}
