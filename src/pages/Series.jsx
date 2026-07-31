import { useRef } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Gallery from "../components/Gallery";
import { Reveal, LineReveal } from "../components/Reveal";
import { ArrowRight } from "../components/UI";
import { series, artworks, seriesById, allArtworks } from "../data/artworks";
import { thumb } from "../lib/util";
import "../styles/series.css";

export default function Series() {
  const { seriesId } = useParams();
  const meta = seriesById[seriesId];
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);

  if (!meta) return <Navigate to="/works" replace />;

  const items = (artworks[seriesId] || []).map((a) => ({
    ...a,
    seriesId,
    seriesTitle: meta.title,
    uid: `${seriesId}-${a.id}`,
  }));
  const available = items.filter((a) => a.status === "available").length;

  const idx = series.findIndex((s) => s.id === seriesId);
  const next = series[(idx + 1) % series.length];

  return (
    <div className="series-page" style={{ "--series": meta.color }}>
      <header className="series-hero" ref={heroRef}>
        <motion.div className="series-hero-media" style={{ y, scale }}>
          <img src={meta.coverImage} alt={meta.title} />
          <span className="series-hero-scrim" />
        </motion.div>
        <div className="series-hero-inner container">
          <Reveal><p className="eyebrow eyebrow-row series-hero-eyebrow">{meta.year} · {items.length} works · {available} available</p></Reveal>
          <h1 className="t-hero series-hero-title">
            <LineReveal lines={meta.title.split(" ")} delay={0.2} inView={false} />
          </h1>
          <Reveal delay={0.4}><p className="series-hero-sub">{meta.subtitle}</p></Reveal>
        </div>
      </header>

      <section className="section series-intro">
        <div className="container">
          <div className="series-intro-grid">
            <Reveal><p className="eyebrow eyebrow-row">{meta.title}</p></Reveal>
            <div className="series-intro-copy">
              {(meta.narrative || []).map((para, i) => (
                <Reveal delay={0.1 + i * 0.05} key={para.slice(0, 30)}>
                  <p className={i === 0 ? "t-h3 series-intro-text balance" : "series-intro-para pretty"}>{para}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight container">
        <Gallery items={items} columns={3} />
      </section>

      <section className="section series-next surface-dark grain">
        <Link to={`/series/${next.id}`} className="container series-next-link" data-cursor="View">
          <div className="series-next-inner">
            <span className="mono series-next-label">Next series</span>
            <h2 className="t-h1 series-next-title">{next.title} <ArrowRight /></h2>
            <span className="series-next-sub">{next.subtitle}</span>
          </div>
          <div className="series-next-media">
            <img src={thumb(next.coverImage)} alt={next.title} loading="lazy" decoding="async" />
          </div>
        </Link>
      </section>
    </div>
  );
}
