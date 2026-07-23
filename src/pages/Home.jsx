import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import ShaderField from "../components/ShaderField";
import Gallery from "../components/Gallery";
import TrustMarquee from "../components/TrustMarquee";
import Magnetic from "../components/Magnetic";
import { Reveal, RevealGroup, RevealItem, LineReveal, Brush } from "../components/Reveal";
import { Button, ArrowRight } from "../components/UI";
import { series, featuredArtworks, allArtworks } from "../data/artworks";
import { pathways, stats, testimonials, blog } from "../data/site";
import { thumb } from "../lib/util";
import "../styles/home.css";
import "../styles/journal.css";

const EASE = [0.16, 1, 0.3, 1];

/* a curated, vivid set of works to open on — coral + paddy, showing range */
const HERO_WORKS = [
  allArtworks.find((a) => a.uid === "awakening-3"),      // Fullness Of Life — coral
  allArtworks.find((a) => a.uid === "paddy-series-1-8"), // Sunrise Over Paddy
  allArtworks.find((a) => a.uid === "awakening-1"),      // Source — reef
  allArtworks.find((a) => a.uid === "paddy-series-2-7"), // Purpose — paddy
].filter(Boolean);

/* cursor tints per pathway, sampled from each panel's painting */
const PATHWAY_TINT = {
  collect: "#d4562f",    // coral / reef orange
  commission: "#c5872b", // amber gold (Golden Horse)
  therapy: "#3f8f80",    // studio teal-green
};

/* -------- hero — full-bleed gallery -------- */
function Hero() {
  const ref = useRef(null);
  const [idx, setIdx] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % HERO_WORKS.length), 6500);
    return () => clearInterval(t);
  }, []);

  const current = HERO_WORKS[idx];

  return (
    <section className="hero" ref={ref}>
      <motion.div className="hero-stage" style={{ y }}>
        {HERO_WORKS.map((w, i) => (
          <motion.div
            key={w.uid}
            className={`hero-slide ${i === idx ? "is-active" : ""}`}
            initial={false}
            animate={{ opacity: i === idx ? 1 : 0 }}
            transition={{ duration: 1.5, ease: EASE }}
          >
            <img src={w.image} alt={w.title} loading={i === 0 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : "low"} decoding="async" />
          </motion.div>
        ))}
        <span className="hero-scrim" aria-hidden="true" />
      </motion.div>

      <motion.div className="hero-inner container" style={{ opacity: fade }}>
        <motion.p
          className="eyebrow eyebrow-row hero-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
        >
          Fine Art &amp; Guided Drawing · Kuala Lumpur
        </motion.p>

        <h1 className="t-hero hero-head">
          <LineReveal lines={["Painting the", "quiet between"]} delay={0.3} duration={0.75} stagger={0.08} inView={false} />
          <span className="hero-head-accent">
            <LineReveal lines={["breaths."]} delay={0.52} duration={0.75} inView={false} />
          </span>
        </h1>

        <motion.p
          className="hero-sub body-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.7 }}
        >
          Original paintings of paddy fields and coral reefs, commissions made for
          your walls, and Guided Drawing art therapy for teams and individuals.
        </motion.p>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.82 }}
        >
          <Button to="/works" variant="outline">View the collection</Button>
          <Button to="/art-therapy" variant="ghost" arrow>Art therapy for teams</Button>
        </motion.div>
      </motion.div>

      {/* gallery caption + slide controls, bottom-right */}
      <div className="hero-plate">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.uid}
            className="hero-plate-text"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span className="hero-plate-title">{current.title}</span>
            <span className="hero-plate-meta mono">{current.seriesTitle} · {current.year}</span>
          </motion.div>
        </AnimatePresence>
        <div className="hero-dots">
          {HERO_WORKS.map((w, i) => (
            <button
              key={w.uid}
              className={`hero-dot ${i === idx ? "is-active" : ""}`}
              onClick={() => setIdx(i)}
              data-cursor="true"
              aria-label={`Show ${w.title}`}
            >
              <span style={{ animationPlayState: i === idx ? "running" : "paused" }} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- statement + stats -------- */
function Statement() {
  return (
    <section className="section statement" id="statement">
      <div className="container">
        <div className="statement-lead">
          <div className="statement-copy">
            <Reveal><p className="eyebrow eyebrow-row">Since 2014</p></Reveal>
            <h2 className="statement-text">
              <LineReveal
                lines={["A former lawyer", "who traded the", "courtroom for", "the canvas."]}
              />
            </h2>
            <Reveal delay={0.2}>
              <p className="statement-note pretty">
                Now a full-time artist and certified art therapist — drawing from nature,
                water, and the stillness of being present.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <Link to="/about" className="link statement-link" data-cursor="true">
                Read her story <ArrowRight />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="statement-media">
            <div className="statement-frame">
              <img src={thumb("/images/artist/Lisa-Teo-2.jpg")} alt="Lisa Teo in her Kuala Lumpur studio" loading="lazy" decoding="async" />
            </div>
            <span className="statement-cap mono">Lisa Teo · her Kuala Lumpur studio</span>
          </Reveal>
        </div>

        <RevealGroup className="stat-row statement-stats" stagger={0.1}>
          {stats.map((s) => (
            <RevealItem className="stat" key={s.label}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* -------- pathways (revenue streams) — image-driven panels -------- */
function Pathways() {
  return (
    <section className="section pathways">
      <div className="container">
        <div className="section-head-row">
          <div className="section-head wide">
            <Reveal><p className="eyebrow eyebrow-row">Three ways in</p></Reveal>
            <Reveal delay={0.05}><h2 className="t-h1">Collect, commission, or bring <Brush color="brush-teal" className="t-serif-it">calm</Brush> to your team.</h2></Reveal>
          </div>
        </div>

        <RevealGroup className="pathway-grid" stagger={0.12}>
          {pathways.map((p) => (
            <RevealItem key={p.id}>
              <Link to={p.to} className={`pathway accent-${p.accent}`} data-cursor="View" data-cursor-tint={PATHWAY_TINT[p.id]}>
                <div className="pathway-media">
                  <img src={thumb(p.image)} alt={p.title} loading="lazy" decoding="async" />
                  <span className="pathway-scrim" aria-hidden="true" />
                </div>
                <div className="pathway-content">
                  <div className="pathway-top">
                    <span className="pathway-index mono">{p.index}</span>
                    <span className="pathway-sub mono">{p.subtitle}</span>
                  </div>
                  <div className="pathway-foot">
                    <h3 className="pathway-title">{p.title}</h3>
                    <p className="pathway-blurb">{p.blurb}</p>
                    <span className="pathway-cta">
                      {p.cta} <ArrowRight />
                    </span>
                  </div>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* -------- featured works -------- */
function Featured() {
  return (
    <section className="section featured">
      <div className="container">
        <div className="section-head-row">
          <div className="section-head wide">
            <Reveal><p className="eyebrow eyebrow-row">Selected works</p></Reveal>
            <Reveal delay={0.05}><h2 className="t-h1">Pieces currently <em className="t-serif-it">breathing</em> in the studio.</h2></Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link to="/works" className="link featured-all" data-cursor="true">
              All {allArtworks.length} works <ArrowRight />
            </Link>
          </Reveal>
        </div>

        <Gallery items={featuredArtworks} columns={3} />
      </div>
    </section>
  );
}

/* -------- series index with cursor-following preview -------- */
function SeriesIndex() {
  const [active, setActive] = useState(null);
  const wrapRef = useRef(null);
  const previewRef = useRef(null);

  const onMove = (e) => {
    const el = previewRef.current;
    const wrap = wrapRef.current;
    if (!el || !wrap) return;
    const r = wrap.getBoundingClientRect();
    el.style.transform = `translate(${e.clientX - r.left}px, ${e.clientY - r.top}px)`;
  };

  return (
    <section className="section series-index surface-dusk grain" onMouseMove={onMove} ref={wrapRef}>
      <div className="series-shader" aria-hidden="true">
        <ShaderField palette="dusk" />
      </div>
      <div className="container">
        <div className="section-head-row">
          <div className="section-head">
            <Reveal><p className="eyebrow eyebrow-row eyebrow-accent">The series</p></Reveal>
            <Reveal delay={0.05}><h2 className="t-h1">Four bodies of work.</h2></Reveal>
          </div>
        </div>

        <ul className="series-list">
          {series.map((s, i) => (
            <li key={s.id}>
              <Link
                to={`/series/${s.id}`}
                className="series-row"
                data-cursor="true"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                <Reveal className="series-row-inner">
                  <span className="series-row-index mono">0{i + 1}</span>
                  <span className="series-row-title">{s.title}</span>
                  <span className="series-row-sub">{s.subtitle}</span>
                  <span className="series-row-year mono">{s.year}</span>
                  <ArrowRight className="series-row-arrow" />
                </Reveal>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div
        ref={previewRef}
        className={`series-preview ${active !== null ? "is-active" : ""}`}
        aria-hidden="true"
      >
        {series.map((s, i) => (
          <img key={s.id} src={thumb(s.coverImage)} alt="" className={active === i ? "is-shown" : ""} loading="lazy" decoding="async" />
        ))}
      </div>
    </section>
  );
}

/* -------- art therapy highlight -------- */
function TherapyStrip() {
  return (
    <section className="section therapy-strip accent-aqua">
      <div className="container">
        <div className="split split-narrow">
          <div className="therapy-copy">
            <Reveal><p className="eyebrow eyebrow-row">Art therapy for teams</p></Reveal>
            <Reveal delay={0.05}>
              <h2 className="t-h1 therapy-head">
                Guided Drawing that lowers stress and rebuilds connection.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="lede therapy-lede">
                A body-based art therapy method — two hands, eyes closed, following the
                breath. HRD Corp certified and trusted by Coca-Cola and AXA. No artistic
                skill required; only willingness.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <Button to="/art-therapy" className="therapy-btn">Explore art therapy</Button>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="therapy-media">
            <div className="frame frame-tall">
              <img src={thumb("/images/artist/Lisa-Teo-Session.jpg")} alt="Lisa Teo leading an art therapy session" loading="lazy" decoding="async" />
            </div>
            <div className="therapy-badge">
              <span className="stat-value">200+</span>
              <span className="stat-label">sessions delivered</span>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="therapy-marquee">
        <p className="eyebrow center therapy-marquee-label">Trusted by</p>
        <TrustMarquee speed={40} />
      </div>
    </section>
  );
}

/* -------- testimonials -------- */
function Voices() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  return (
    <section className="section voices">
      <div className="container">
        <div className="voices-grid">
          <div className="section-head">
            <Reveal><p className="eyebrow eyebrow-row">In their words</p></Reveal>
            <Reveal delay={0.05}><h2 className="t-h2">Collectors &amp; <Brush color="brush-gold" className="t-serif-it">clients.</Brush></h2></Reveal>
            <Reveal delay={0.1}>
              <div className="voices-nav">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    className={`voices-dot ${idx === i ? "is-active" : ""}`}
                    onClick={() => setI(idx)}
                    data-cursor="true"
                    aria-label={`Testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            </Reveal>
          </div>

          <motion.figure
            className="quote voices-quote"
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="quote-mark" aria-hidden="true">&ldquo;</span>
            <blockquote className="quote-text pretty">{t.quote}</blockquote>
            <figcaption className="quote-cite">
              <span className="quote-name">{t.name}</span>
              <span className="quote-detail">{t.detail}</span>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}

/* -------- from the journal -------- */
function FromJournal() {
  const posts = blog.slice(0, 3);
  return (
    <section className="section from-journal">
      <div className="container">
        <div className="section-head-row">
          <div className="section-head wide">
            <Reveal><p className="eyebrow eyebrow-row">From the journal</p></Reveal>
            <Reveal delay={0.05}><h2 className="t-h1 balance">Words from the studio.</h2></Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link to="/journal" className="link" data-cursor="true">All writing <ArrowRight /></Link>
          </Reveal>
        </div>

        <RevealGroup className="home-journal-grid" stagger={0.1}>
          {posts.map((p) => (
            <RevealItem key={p.slug}>
              <Link to={`/journal/${p.slug}`} className="jcard" data-cursor="Read" data-cursor-tint="#7b6bd1">
                <div className="jcard-media">
                  <img src={p.cover} alt={p.title} loading="lazy" decoding="async" />
                </div>
                <span className="jcard-meta mono"><span className="jcard-tag">{p.tag}</span>{p.date}</span>
                <h3 className="jcard-title">{p.title}</h3>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <Pathways />
      <Featured />
      <SeriesIndex />
      <TherapyStrip />
      <FromJournal />
      <Voices />
    </>
  );
}
