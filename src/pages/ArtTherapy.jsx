import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import TrustMarquee from "../components/TrustMarquee";
import { Reveal, RevealGroup, RevealItem } from "../components/Reveal";
import { Button } from "../components/UI";
import { therapy, corporateWellness, corporateSessions, bookACall } from "../data/site";
import "../styles/art-therapy.css";

/* Every line on this page is Lisa's own, from lisateoart.com/art-therapy,
   /corporate-art-wellness and /book-a-call. */

const EASE = [0.16, 1, 0.3, 1];
const ENQUIRY = "/contact?subject=Art%20therapy%20enquiry";
const pad = (n) => String(n).padStart(2, "0");

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
          <Button to={ENQUIRY} variant="outline">Book a Discovery Call</Button>
          <Button to="/contact" variant="ghost" arrow>Contact Me</Button>
        </motion.div>
      </motion.div>

      <span className="at-hero-cue" aria-hidden="true">
        <span className="at-hero-cue-line" />
      </span>
    </section>
  );
}

/* --------------------------------------------------------------- lead */
function Lead() {
  return (
    <section className="section-tight at-lead accent-aqua">
      <div className="container at-lead-inner">
        <Reveal delay={0.06}>
          <p className="t-h2 head-long head-wide at-lead-head">{therapy.introMore}</p>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="at-lead-note pretty">
            <span className="at-lead-note-label">{therapy.distinctionLabel}</span> {therapy.distinction}
          </p>
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
              It is a sensory-based method whereby the participants draw on large pieces of
              paper (stuck to the tables) in a rhythmic manner, using both their hands and
              with their eyes closed.
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
          <Reveal><p className="eyebrow eyebrow-row">Session Details</p></Reveal>
          <Reveal delay={0.05}>
            <h2 className="t-h1 head-long at-pricing-head">{pricing.heading}</h2>
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
              <p className="at-pricing-note pretty">
                <span className="at-lead-note-label">{pricing.customLabel}</span> {pricing.custom}
              </p>
            </Reveal>
          </div>

          <RevealGroup className="at-tiers" stagger={0.1}>
            {pricing.tiers.map((t) => (
              <RevealItem className="at-tier" key={t.range}>
                <span className="at-tier-range mono">{t.range}</span>
                <span className="at-tier-price">
                  <span className="at-tier-cur">MYR</span>
                  <span className="at-tier-num">{t.price}</span>
                  <span className="at-tier-per mono">/ pax</span>
                </span>
              </RevealItem>
            ))}
            <Reveal delay={0.1} className="at-tier-cta">
              <Button to={ENQUIRY} arrow>{pricing.cta}</Button>
            </Reveal>
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- proof — credentials, seal, client roster */
function Proof() {
  return (
    <section className="section at-proof accent-aqua">
      <div className="container">
        <div className="at-proof-top">
          <Reveal className="at-proof-figure">
            <div className="frame frame-tall">
              <img src="/images/artist/Lisa-Teo-Session.jpg" alt="Lisa Teo leading a corporate Guided Drawing session" loading="lazy" decoding="async" />
            </div>
          </Reveal>

          <div className="at-proof-copy">
            <Reveal><p className="eyebrow eyebrow-row">Why Lisa</p></Reveal>
            <Reveal delay={0.05}>
              <h2 className="t-h2 head-long at-proof-head">
                I am a HRDC accredited corporate trainer and I run HRDC-claimable programs.
              </h2>
            </Reveal>
            <RevealGroup as="ul" className="checklist at-proof-list" stagger={0.09}>
              {therapy.credentials.map((c) => (
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
                  <span className="at-hrd-badge mono">HRDC-claimable</span>
                  <span className="at-hrd-note-text">{therapy.audiences[1]}</span>
                </span>
              </aside>
            </Reveal>
          </div>
        </div>
      </div>

      <Reveal className="at-proof-marquee">
        <p className="divider-label mono at-trust-label">{therapy.trustLabel}</p>
        <TrustMarquee speed={40} />
      </Reveal>
    </section>
  );
}

/* -------------------------- corporate art wellness sessions (her roster) */
function Roster() {
  return (
    <section className="section at-roster accent-aqua">
      <div className="container">
        <div className="at-roster-head">
          <Reveal><p className="eyebrow eyebrow-row">Corporate Art Wellness</p></Reveal>
          <Reveal delay={0.05}>
            <h2 className="t-h1 head-long">{corporateWellness.heading}</h2>
          </Reveal>
          {corporateWellness.intro.map((para, i) => (
            <Reveal delay={0.1 + i * 0.05} key={para.slice(0, 30)}>
              <p className="at-roster-para pretty">{para}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <p className="mono at-roster-label">{corporateWellness.rosterLabel}</p>
        </Reveal>
        <RevealGroup as="ul" className="at-roster-list" stagger={0.05}>
          {corporateSessions.map((c, i) => (
            <RevealItem as="li" className="at-roster-row" key={`${c.name}-${i}`}>
              <span className="at-roster-name">{c.name}</span>
              <span className="mono at-roster-meta">{c.year}・{c.people}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ------------------------------------------------- schedule a call (book-a-call) */
function ScheduleCall() {
  return (
    <section className="section-tight at-call surface-dark grain accent-aqua">
      <div className="container at-call-inner">
        <Reveal><p className="eyebrow eyebrow-row eyebrow-accent">Book a Discovery Call</p></Reveal>
        <Reveal delay={0.05}><h2 className="t-h1 at-call-head head-long">{bookACall.heading}</h2></Reveal>
        {bookACall.text.map((para, i) => (
          <Reveal delay={0.1 + i * 0.05} key={para.slice(0, 30)}>
            <p className="at-call-para pretty">{para}</p>
          </Reveal>
        ))}
        <Reveal delay={0.22}>
          <Button to={ENQUIRY} variant="outline">{therapy.pricing.cta}</Button>
        </Reveal>
      </div>
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

/* ------------------------------------------------- frequently asked questions */
function FaqItem({ item, open, onToggle }) {
  return (
    <div className="faq-item" data-open={open ? "true" : "false"}>
      <button className="faq-q" onClick={onToggle} data-cursor="true" aria-expanded={open}>
        <span className="pretty">{item.q}</span>
        <span className="faq-icon" aria-hidden="true" />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="faq-a"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <p className="faq-a-inner pretty">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Faq() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="section at-faq accent-aqua">
      <div className="container">
        <div className="at-faq-grid">
          <div className="section-head">
            <Reveal><p className="eyebrow eyebrow-row">FAQ</p></Reveal>
            <Reveal delay={0.05}>
              <h2 className="t-h2 head-compact">Frequently Asked Questions</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="muted at-faq-note pretty">{therapy.ctaQuestion}</p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="faq">
            {therapy.faqs.map((item, i) => (
              <FaqItem
                key={item.q}
                item={item}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </Reveal>
        </div>
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
      <Roster />
      <ScheduleCall />
      <Voices />
      <Faq />
    </>
  );
}
