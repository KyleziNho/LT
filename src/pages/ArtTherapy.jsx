import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TrustMarquee from "../components/TrustMarquee";
import { Reveal, RevealGroup, RevealItem, LineReveal } from "../components/Reveal";
import { Button } from "../components/UI";
import { therapy, stats } from "../data/site";
import "../styles/art-therapy.css";

const EASE = [0.16, 1, 0.3, 1];
const ENQUIRY = "/contact?subject=Art%20therapy%20enquiry";

/* ---- three headline proof-points — grounded in site data ---- */
const sessionStat = stats.find((s) => s.label === "Guided Drawing sessions");
const credStats = [
  { value: sessionStat?.value || "200+", label: "Guided Drawing sessions" },
  { value: "2024", label: "HRD Corp certified" },
  { value: "25", label: "Max per session" },
];

/* real corporate-session photos scraped from lisateoart.com/art-therapy */
const gallery = [
  { src: "/images/therapy/session-2.jpg", tall: true, alt: "A participant drawing with both hands during a Guided Drawing session" },
  { src: "/images/therapy/session-1.jpg", alt: "A corporate team seated at long tables mid-session" },
  { src: "/images/therapy/method-2.jpg", alt: "Large-format paper covered in expressive marks" },
  { src: "/images/therapy/session-4.jpg", alt: "Participants reflecting on their drawings" },
  { src: "/images/therapy/method-3.jpg", tall: true, alt: "Finger-painting in colour on large-format paper" },
];

/* -------------------------------------------------------------- hero */
function TherapyHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section className="at-hero surface-dark grain accent-aqua" ref={ref}>
      <motion.div className="at-hero-bg" style={{ y, scale }}>
        <img className="at-hero-img" src="/images/artwork/paddy_series_1/03-Dawn-At-The-Paddy-Fields.png" alt="" fetchPriority="high" decoding="async" />
        <span className="at-hero-scrim" aria-hidden="true" />
      </motion.div>

      <motion.div className="at-hero-inner container" style={{ opacity: fade }}>
        <motion.p
          className="eyebrow eyebrow-row at-hero-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
        >
          {therapy.eyebrow}
        </motion.p>

        <h1 className="t-hero at-hero-head">
          <LineReveal lines={["A quieter kind"]} delay={0.12} duration={0.7} inView={false} />
          <span className="at-hero-accent">
            <LineReveal lines={["of clarity."]} delay={0.3} duration={0.7} inView={false} />
          </span>
        </h1>

        <motion.p
          className="at-hero-sub body-lg pretty"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.42 }}
        >
          {therapy.intro}
        </motion.p>

        <motion.div
          className="at-hero-cta"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
        >
          <Button to={ENQUIRY} variant="outline">Bring calm to your team</Button>
          <Button to={ENQUIRY} variant="ghost" arrow>Book an individual session</Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* --------------------------------------------------------------- lead */
/* the distinction the live site leads with + the words people leave feeling */
function Lead() {
  return (
    <section className="section-tight at-lead accent-aqua">
      <div className="container at-lead-inner">
        <Reveal><p className="eyebrow eyebrow-row">The practice</p></Reveal>
        <Reveal delay={0.06}>
          <p className="t-h2 balance at-lead-head">{therapy.distinction}</p>
        </Reveal>
        <Reveal delay={0.14} className="at-outcomes">
          <span className="mono at-outcomes-label">Participants leave feeling</span>
          <span className="at-outcomes-row">
            {therapy.outcomes.map((w) => (
              <span className="at-outcome" key={w}>{w}</span>
            ))}
          </span>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ method */
function Method() {
  return (
    <section className="section at-method accent-aqua" id="method">
      <div className="container">
        <div className="section-head-row">
          <div className="section-head wide">
            <Reveal><p className="eyebrow eyebrow-row">The method</p></Reveal>
            <Reveal delay={0.05}>
              <h2 className="t-h1 balance">Two hands, eyes closed, following the breath.</h2>
            </Reveal>
          </div>
        </div>

        <div className="split split-narrow at-method-split">
          <RevealGroup className="steps at-steps" stagger={0.1}>
            {therapy.method.map((m, i) => (
              <RevealItem className="step" key={m.step}>
                <span className="step-num">0{i + 1}</span>
                <h3 className="step-title">{m.step}</h3>
                <p className="step-text pretty">{m.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.15} className="at-method-media">
            <div className="frame frame-tall">
              <img src="/images/artist/Lisa-Teo-Session.jpg" alt="Lisa Teo leading a corporate Guided Drawing art therapy session" />
            </div>
            <p className="mono at-method-caption">Guided Drawing · a live corporate session</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------- session gallery */
function SessionGallery() {
  return (
    <section className="at-gallery accent-aqua">
      <div className="container">
        <div className="section-head-row">
          <div className="section-head">
            <Reveal><p className="eyebrow eyebrow-row">In the room</p></Reveal>
            <Reveal delay={0.05}><h2 className="t-h2">What a session looks like.</h2></Reveal>
          </div>
        </div>
      </div>
      <RevealGroup className="at-gallery-strip" stagger={0.08}>
        {gallery.map((g) => (
          <RevealItem className={`at-gallery-item${g.tall ? " is-tall" : ""}`} key={g.src}>
            <img src={g.src} alt={g.alt} loading="lazy" decoding="async" />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}

/* ------------------------------------------------------- who it's for */
function Audiences() {
  return (
    <section className="section at-audience accent-aqua">
      <div className="container">
        <div className="section-head-row">
          <div className="section-head">
            <Reveal><p className="eyebrow eyebrow-row">Who it&rsquo;s for</p></Reveal>
            <Reveal delay={0.05}><h2 className="t-h1">Three ways to sit down.</h2></Reveal>
          </div>
        </div>

        <RevealGroup className="cards" stagger={0.1}>
          {therapy.audiences.map((a, i) => (
            <RevealItem className="card" key={a.title}>
              <span className="card-index">0{i + 1}</span>
              <h3 className="card-title">{a.title}</h3>
              <p className="card-text pretty">{a.text}</p>
              <p className="mono at-card-note">{a.note}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ pricing */
function Pricing() {
  const { pricing } = therapy;
  return (
    <section className="section at-pricing accent-aqua" id="pricing">
      <div className="container">
        <div className="split at-pricing-split">
          <div className="at-pricing-copy">
            <Reveal><p className="eyebrow eyebrow-row">Pricing</p></Reveal>
            <Reveal delay={0.05}>
              <h2 className="t-h1 balance at-pricing-head">Simple, transparent rates.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="at-pricing-lede body-lg pretty">
                Corporate sessions are priced per participant, and scale down as
                your group grows. Everything on the page is included — no add-ons.
              </p>
            </Reveal>

            <RevealGroup as="ul" className="checklist at-pricing-list" stagger={0.08}>
              {pricing.includes.map((it) => (
                <RevealItem as="li" key={it}>{it}</RevealItem>
              ))}
            </RevealGroup>
            <Reveal delay={0.1}>
              <p className="mono at-pricing-provide">{pricing.provides}</p>
            </Reveal>
          </div>

          <RevealGroup className="at-tiers" stagger={0.1}>
            {pricing.tiers.map((t, i) => (
              <RevealItem className={`at-tier${i === pricing.tiers.length - 1 ? " is-best" : ""}`} key={t.range}>
                {i === pricing.tiers.length - 1 && <span className="at-tier-flag mono">Best value</span>}
                <span className="at-tier-range mono">{t.range}</span>
                <span className="at-tier-price">
                  <span className="at-tier-cur">MYR</span>
                  <span className="at-tier-num">{t.price}</span>
                </span>
                <span className="at-tier-unit mono">per participant</span>
              </RevealItem>
            ))}
            <Reveal delay={0.1} className="at-tier-cta">
              <Button to={ENQUIRY} arrow>Request a quote</Button>
            </Reveal>
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

/* ------------------------ proof — credentials · stats · logos · HRD */
function Proof() {
  return (
    <section className="section at-proof accent-aqua">
      <div className="container">
        <div className="at-proof-top">
          <div className="at-proof-copy">
            <Reveal><p className="eyebrow eyebrow-row">Why Lisa</p></Reveal>
            <Reveal delay={0.05}>
              <h2 className="t-h2 balance at-proof-head">Certified, and quietly experienced.</h2>
            </Reveal>
            <RevealGroup as="ul" className="checklist at-proof-list" stagger={0.09}>
              {therapy.credentials.slice(0, 3).map((c) => (
                <RevealItem as="li" key={c}>{c}</RevealItem>
              ))}
            </RevealGroup>
            <Reveal delay={0.1}>
              <aside className="at-hrd-note">
                <img
                  className="at-hrd-seal"
                  src="/images/therapy/hrd-corp.png"
                  alt="HRD Corp Registered Training Provider"
                  loading="lazy"
                  decoding="async"
                />
                <span className="at-hrd-note-body">
                  <span className="at-hrd-badge mono">HRD Corp claimable</span>
                  <span className="at-hrd-note-text">
                    An HRD Corp Registered Training Provider — for Malaysian companies,
                    corporate programmes fit inside your existing training budget.
                  </span>
                </span>
              </aside>
            </Reveal>
          </div>

          <RevealGroup className="at-proof-stats" stagger={0.1}>
            {credStats.map((s) => (
              <RevealItem className="at-stat" key={s.label}>
                <span className="at-stat-value">{s.value}</span>
                <span className="at-stat-label">{s.label}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>

      <Reveal className="at-proof-marquee">
        <p className="divider-label mono at-trust-label">Trusted by teams at</p>
        <TrustMarquee speed={40} />
      </Reveal>
    </section>
  );
}

/* --------------------------------------------------------- testimonials */
function Voices() {
  return (
    <section className="section at-voices accent-aqua">
      <div className="container">
        <div className="section-head-row">
          <div className="section-head">
            <Reveal><p className="eyebrow eyebrow-row">In their words</p></Reveal>
            <Reveal delay={0.05}><h2 className="t-h2">Before, during, and after.</h2></Reveal>
          </div>
        </div>

        <RevealGroup className="at-voice-grid" stagger={0.1}>
          {therapy.testimonials.map((t) => (
            <RevealItem className="at-voice" key={t.name}>
              <p className="at-voice-quote">&ldquo;{t.quote}&rdquo;</p>
              <p className="mono at-voice-name">{t.name}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export default function ArtTherapy() {
  return (
    <>
      <TherapyHero />
      <Lead />
      <Method />
      <SessionGallery />
      <Audiences />
      <Pricing />
      <Proof />
      <Voices />
    </>
  );
}
