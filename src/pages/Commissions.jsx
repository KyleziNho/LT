import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Gallery from "../components/Gallery";
import PageHeroBg from "../components/PageHeroBg";
import { Reveal, RevealGroup, RevealItem, LineReveal } from "../components/Reveal";
import { Button, ArrowRight } from "../components/UI";
import { commissionProcess, commissionFaqs, testimonials } from "../data/site";
import { allArtworks } from "../data/artworks";
import "../styles/commissions.css";

const EASE = [0.16, 1, 0.3, 1];

const commissionItems = allArtworks.filter((a) => a.seriesId === "commissions");
const commissionVoice = testimonials[2];

/* -------- hero -------- */
function Hero() {
  return (
    <section className="page-hero page-hero--image accent-rose comm-hero">
      <PageHeroBg image="/images/artwork/made_to_order/01-Golden-Horse.jpg" tint="#241708" position="center" />
      <div className="container">
        <motion.p
          className="eyebrow eyebrow-row page-hero-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
        >
          Commissions · Made to order
        </motion.p>

        <h1 className="t-h1 balance">
          <LineReveal lines={["A painting made", "for your story."]} delay={0.3} inView={false} />
        </h1>

        <motion.p
          className="lede page-hero-lede pretty"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
        >
          Original works created for your space and the meaning you want it to
          hold — portraits, landscapes, and feng-shui compositions, painted in
          the Kuala Lumpur studio and completed in two to four weeks.
        </motion.p>

        <motion.div
          className="comm-hero-cta"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.75 }}
        >
          <Button to="/contact?subject=Commission%20enquiry" variant="outline">Start a commission</Button>
          <a href="#process" className="link" data-cursor="true">
            How it works <ArrowRight />
          </a>
        </motion.div>

        <motion.ul
          className="comm-hero-facts"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.95 }}
        >
          <li className="mono">Portraits</li>
          <li className="mono">Landscapes</li>
          <li className="mono">Feng-shui compositions</li>
          <li className="mono">2–4 weeks · ships worldwide</li>
        </motion.ul>
      </div>
    </section>
  );
}

/* -------- process -------- */
function Process() {
  return (
    <section className="section accent-rose" id="process">
      <div className="container">
        <div className="section-head-row">
          <div className="section-head">
            <Reveal><p className="eyebrow eyebrow-row">The process</p></Reveal>
            <Reveal delay={0.05}>
              <h2 className="t-h1 balance">From first note to your wall.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="mono faint">Four steps · Deposit reserves your place</p>
          </Reveal>
        </div>

        <RevealGroup className="steps" stagger={0.1}>
          {commissionProcess.map((s) => (
            <RevealItem className="step" key={s.step}>
              <span className="step-num">{s.step}</span>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-text pretty">{s.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* -------- recent commissions -------- */
function Recent() {
  return (
    <section className="section accent-rose">
      <div className="container">
        <div className="section-head-row">
          <div className="section-head wide">
            <Reveal><p className="eyebrow eyebrow-row">Recent commissions</p></Reveal>
            <Reveal delay={0.05}>
              <h2 className="t-h1 balance">Recently made to order.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link
              to="/contact?subject=Commission%20enquiry"
              className="link comm-recent-link"
              data-cursor="true"
            >
              Start yours <ArrowRight />
            </Link>
          </Reveal>
        </div>

        <Gallery items={commissionItems} columns={3} />
      </div>
    </section>
  );
}

/* -------- testimonial -------- */
function Voice() {
  return (
    <section className="section-tight accent-rose comm-voice-section">
      <div className="container">
        <div className="comm-voice">
          <Reveal>
            <p className="divider-label mono">From a commission client</p>
          </Reveal>
          <Reveal delay={0.1}>
            <figure className="quote comm-voice-quote">
              <span className="quote-mark" aria-hidden="true">&ldquo;</span>
              <blockquote className="quote-text pretty">{commissionVoice.quote}</blockquote>
              <figcaption className="quote-cite">
                <span className="quote-name">{commissionVoice.name}</span>
                <span className="quote-detail">{commissionVoice.detail}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------- faq -------- */
function FaqItem({ item, open, onToggle }) {
  return (
    <div className="faq-item" data-open={open ? "true" : "false"}>
      <button
        className="faq-q"
        onClick={onToggle}
        data-cursor="true"
        aria-expanded={open}
      >
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
    <section className="section accent-rose">
      <div className="container">
        <div className="comm-faq-grid">
          <div className="section-head">
            <Reveal><p className="eyebrow eyebrow-row">What to expect</p></Reveal>
            <Reveal delay={0.05}>
              <h2 className="t-h2 balance">Questions, answered.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="muted comm-faq-note pretty">
                Something more particular in mind? Every commission begins with a
                conversation —{" "}
                <Link
                  to="/contact?subject=Commission%20enquiry"
                  className="link"
                  data-cursor="true"
                >
                  write to Lisa
                </Link>
                .
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="faq">
            {commissionFaqs.map((item, i) => (
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

/* -------- closing cta -------- */
function Closing() {
  return (
    <section className="section surface-dark grain accent-rose">
      <div className="container">
        <div className="comm-cta">
          <Reveal>
            <p className="eyebrow eyebrow-accent comm-cta-eyebrow">Made to order</p>
          </Reveal>
          <h2 className="t-h1 comm-cta-head balance">
            <LineReveal lines={["The next painting", "could be yours."]} />
          </h2>
          <Reveal delay={0.15}>
            <p className="lede comm-cta-lede pretty">
              Share the space, the subject, and the feeling you're after — and
              receive a painting that belongs nowhere else.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <Button to="/contact?subject=Commission%20enquiry" variant="outline">
              Begin your commission
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function Commissions() {
  return (
    <>
      <Hero />
      <Process />
      <Recent />
      <Voice />
      <Faq />
      <Closing />
    </>
  );
}
