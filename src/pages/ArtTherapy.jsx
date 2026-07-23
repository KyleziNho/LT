import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TrustMarquee from "../components/TrustMarquee";
import { Reveal, RevealGroup, RevealItem, LineReveal } from "../components/Reveal";
import { Button } from "../components/UI";
import { therapy, stats } from "../data/site";
import "../styles/art-therapy.css";

const EASE = [0.16, 1, 0.3, 1];
const ENQUIRY = "/contact?subject=Art%20therapy%20enquiry";

/* ---- stats shown in the credibility split — grounded in site data ---- */
const sessionStat = stats.find((s) => s.label === "Guided Drawing sessions");
const credStats = [
  sessionStat,
  { value: "2024", label: "HRD Corp certified trainer" },
  { value: "30", label: "Participants per group session" },
  { value: "12+", label: "Ages welcomed one-to-one" },
].filter(Boolean);

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
          <RevealGroup className="steps at-steps" stagger={0.12}>
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

/* -------------------------------------------------------- credibility */
function Credibility() {
  return (
    <section className="section at-cred accent-aqua">
      <div className="container">
        <div className="split at-cred-split">
          <div className="at-cred-copy">
            <Reveal><p className="eyebrow eyebrow-row">Credentials</p></Reveal>
            <Reveal delay={0.05}>
              <h2 className="t-h2 balance at-cred-head">Certified, and quietly experienced.</h2>
            </Reveal>
            <RevealGroup as="ul" className="checklist at-cred-list" stagger={0.09}>
              {therapy.credentials.map((c) => (
                <RevealItem as="li" key={c}>{c}</RevealItem>
              ))}
            </RevealGroup>
          </div>

          <RevealGroup className="stat-row at-cred-stats" stagger={0.1}>
            {credStats.map((s) => (
              <RevealItem className="stat" key={s.label}>
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------- trusted by + HRD Corp note */
function Trust() {
  return (
    <section className="section-tight at-trust accent-aqua">
      <div className="container">
        <Reveal>
          <p className="divider-label mono at-trust-label">Trusted by</p>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="at-trust-marquee">
        <TrustMarquee speed={38} />
      </Reveal>

      <div className="container">
        <Reveal delay={0.1}>
          <aside className="at-hrd">
            <div className="at-hrd-body">
              <p className="eyebrow eyebrow-accent">HRD Corp claimable</p>
              <p className="at-hrd-text pretty">
                Lisa is an HRD Corp certified trainer (2024). For Malaysian companies,
                corporate Guided Drawing programmes are claimable through the HRD Corp
                levy — a wellness session that fits inside your existing training budget.
              </p>
            </div>
            <span className="at-hrd-mark mono">Certified trainer · 2024</span>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ cta band */
function BookingCta() {
  return (
    <section className="section at-cta surface-dark grain accent-aqua">
      <div className="container at-cta-inner">
        <Reveal><p className="eyebrow eyebrow-row at-cta-eyebrow">Begin here</p></Reveal>
        <h2 className="t-h1 at-cta-head balance">
          <LineReveal lines={["Give your team an", "hour of stillness."]} />
        </h2>
        <Reveal delay={0.15}>
          <p className="at-cta-sub body-lg pretty">
            Sessions run in Kuala Lumpur and on-site at your office — no artistic
            skill required, only willingness. Share a few details and Lisa will
            shape a session around your people.
          </p>
        </Reveal>
        <Reveal delay={0.22} className="at-cta-actions">
          <Button to={ENQUIRY} variant="outline">Enquire about a session</Button>
          <span className="mono at-cta-note">Corporate · Groups · One-to-one</span>
        </Reveal>
      </div>
    </section>
  );
}

export default function ArtTherapy() {
  return (
    <>
      <TherapyHero />
      <Method />
      <Audiences />
      <Credibility />
      <Trust />
      <BookingCta />
    </>
  );
}
