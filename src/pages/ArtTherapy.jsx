import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TrustMarquee from "../components/TrustMarquee";
import { Reveal, RevealGroup, RevealItem } from "../components/Reveal";
import { Button } from "../components/UI";
import { therapy, stats } from "../data/site";
import "../styles/art-therapy.css";

const EASE = [0.16, 1, 0.3, 1];
const ENQUIRY = "/contact?subject=Art%20therapy%20enquiry";
const pad = (n) => String(n).padStart(2, "0");

/* three honest proof-points — none of them repeats the HRD seal or the logo
   strip below, so nothing on the page is said twice */
const sessionStat = stats.find((s) => s.label === "Guided Drawing sessions");
const proofStats = [
  { value: sessionStat?.value || "200+", label: "Sessions guided" },
  { value: "25", label: "People per session" },
  { value: "2h", label: "Per guided session" },
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

        <motion.h1
          className="t-hero at-hero-head"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.12 }}
        >
          Take a moment from your daily stress to reconnect with your{" "}
          <span className="at-hero-accent">inner balance and peace.</span>
        </motion.h1>

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
          <Button to={ENQUIRY} variant="outline">Book a discovery call</Button>
          <Button to={ENQUIRY} variant="ghost" arrow>Enquire about a session</Button>
        </motion.div>
      </motion.div>

      <span className="at-hero-cue" aria-hidden="true">
        <span className="at-hero-cue-line" />
      </span>
    </section>
  );
}

/* --------------------------------------------------------------- lead */
/* the payoff and the distinction the live site leads with, plus the words
   people use for how they leave a session */
function Lead() {
  return (
    <section className="section-tight at-lead accent-aqua">
      <div className="container at-lead-inner">
        <Reveal><p className="eyebrow eyebrow-row">The practice</p></Reveal>
        <Reveal delay={0.06}>
          <p className="t-h2 balance at-lead-head">{therapy.introMore}</p>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="at-lead-note pretty">{therapy.distinction}</p>
        </Reveal>
        <Reveal delay={0.18} className="at-outcomes">
          <span className="mono at-outcomes-label">Participants leave feeling</span>
          <span className="at-outcomes-row">
            {therapy.outcomes.map((w, i) => (
              <span className="at-outcome" style={{ "--i": i }} key={w}>{w}</span>
            ))}
          </span>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ method */
/* "What is Guided Drawing?" — a two-column head (words + the room, shot for
   real) over a 2x2 grid of the four verbatim components */
function Method() {
  return (
    <section className="section at-method accent-aqua" id="method">
      <div className="container">
        <div className="at-method-head">
          <div className="at-method-headline">
            <Reveal><p className="eyebrow eyebrow-row">The method</p></Reveal>
            <Reveal delay={0.05}>
              <h2 className="t-h1 balance at-method-title">What is Guided Drawing?</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="at-method-lede-wrap">
            <p className="at-method-lede pretty">
              A sensory-based method. You draw on large sheets of paper with both
              hands and your eyes closed, in a rhythm that follows the breath, then
              pause to notice what shifts. No skill is needed, only a willingness to begin.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="at-move-grid" stagger={0.1}>
          {therapy.method.map((m, i) => (
            <RevealItem className="at-move" key={m.step}>
              <div className="at-move-media">
                <img src={m.img} alt={m.alt} loading="lazy" decoding="async" />
                <span className="at-move-num">{pad(i + 1)}</span>
              </div>
              <div className="at-move-body">
                <span className="at-move-seam" aria-hidden="true" />
                <h3 className="at-move-title">{m.step}</h3>
                <p className="at-move-text pretty">{m.text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- who it's for */
function Audiences() {
  return (
    <section className="section at-audience accent-aqua">
      <div className="container at-audience-grid">
        <div className="at-audience-head">
          <Reveal><p className="eyebrow eyebrow-row">The right fit</p></Reveal>
          <Reveal delay={0.05}><h2 className="t-h1 balance">Who is this for?</h2></Reveal>
        </div>

        <RevealGroup as="ul" className="at-aud-list" stagger={0.09}>
          {therapy.audiences.map((a, i) => (
            <RevealItem as="li" className="at-aud-row" key={a}>
              <span className="at-aud-idx mono">{pad(i + 1)}</span>
              <span className="at-aud-text">{a}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ---------------------------------------------- session details + pricing */
function Pricing() {
  const { pricing, session } = therapy;
  return (
    <section className="section at-pricing accent-aqua" id="pricing">
      <div className="container">
        <div className="section-head">
          <Reveal><p className="eyebrow eyebrow-row">Sessions and pricing</p></Reveal>
          <Reveal delay={0.05}>
            <h2 className="t-h1 balance at-pricing-head">Simple, transparent rates.</h2>
          </Reveal>
        </div>

        <div className="at-pricing-grid">
          <div className="at-session">
            <RevealGroup as="dl" className="at-session-list" stagger={0.07}>
              {session.map((d) => (
                <RevealItem as="div" className="at-session-row" key={d.label}>
                  <dt className="mono at-session-label">{d.label}</dt>
                  <dd className="at-session-value">{d.value}</dd>
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal delay={0.1}>
              <p className="at-pricing-note pretty">{pricing.custom}</p>
            </Reveal>
          </div>

          <RevealGroup className="at-tiers" stagger={0.1}>
            <RevealItem className="at-tiers-cap mono">Corporate rate, per participant</RevealItem>
            {pricing.tiers.map((t, i) => (
              <RevealItem className={`at-tier${i === pricing.tiers.length - 1 ? " is-best" : ""}`} key={t.range}>
                {i === pricing.tiers.length - 1 && <span className="at-tier-flag mono">Best value</span>}
                <span className="at-tier-range mono">{t.range}</span>
                <span className="at-tier-price">
                  <span className="at-tier-cur">MYR</span>
                  <span className="at-tier-num">{t.price}</span>
                  <span className="at-tier-per mono">/ pax</span>
                </span>
              </RevealItem>
            ))}
            <Reveal delay={0.1} className="at-tier-cta">
              <Button to={ENQUIRY} arrow>Book a discovery call</Button>
            </Reveal>
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- proof — credentials · seal · stats · logos */
function Proof() {
  return (
    <section className="section at-proof accent-aqua">
      <div className="container">
        <div className="at-proof-top">
          <Reveal className="at-proof-figure">
            <div className="frame frame-tall">
              <img src="/images/artist/Lisa-Teo-Session.jpg" alt="Lisa Teo leading a live corporate Guided Drawing session" loading="lazy" decoding="async" />
            </div>
            <p className="mono at-proof-caption">Lisa, guiding a live corporate session</p>
          </Reveal>

          <div className="at-proof-copy">
            <Reveal><p className="eyebrow eyebrow-row">Why Lisa</p></Reveal>
            <Reveal delay={0.05}>
              <h2 className="t-h2 balance at-proof-head">Certified, and quietly experienced.</h2>
            </Reveal>
            <RevealGroup as="ul" className="checklist at-proof-list" stagger={0.09}>
              {therapy.credentials.map((c) => (
                <RevealItem as="li" key={c}>{c}</RevealItem>
              ))}
            </RevealGroup>

            {/* the ONE place HRD is mentioned: the seal carries it, the copy
                only explains what it means for a Malaysian company */}
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
                  <span className="at-hrd-badge mono">Claimable</span>
                  <span className="at-hrd-note-text">
                    A registered training provider, so Malaysian companies can fund
                    these programmes from an existing training budget.
                  </span>
                </span>
              </aside>
            </Reveal>
          </div>
        </div>

        <RevealGroup className="at-proof-stats" stagger={0.1}>
          {proofStats.map((s) => (
            <RevealItem className="at-stat" key={s.label}>
              <span className="at-stat-value">{s.value}</span>
              <span className="at-stat-label">{s.label}</span>
            </RevealItem>
          ))}
        </RevealGroup>
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
          </div>
        </div>

        <RevealGroup className="at-voice-grid" stagger={0.1}>
          {therapy.testimonials.map((t) => (
            <RevealItem className="at-voice" key={t.name}>
              <span className="at-voice-mark" aria-hidden="true">&ldquo;</span>
              <p className="at-voice-quote">{t.quote}</p>
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
      <Audiences />
      <Pricing />
      <Proof />
      <Voices />
    </>
  );
}
