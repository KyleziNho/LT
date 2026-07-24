import { Fragment, useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { Reveal } from "../components/Reveal";
import { ArrowRight } from "../components/UI";
import { useReveal } from "../hooks/useReveal";
import { useJournalPost } from "../data/journal";
import "../styles/journal.css";

/* Portable Text -> the same markup the post body has always used, so the
   drop-cap, reading measure and inline-gallery weave keep working. A "normal"
   block becomes a <p class="post-para">; headings and quotes are supported too,
   plus bold / italic / links from the editor. */
const PT_COMPONENTS = {
  block: {
    normal: ({ children }) => <p className="post-para pretty">{children}</p>,
    h2: ({ children }) => <h2 className="post-h2">{children}</h2>,
    blockquote: ({ children }) => <blockquote className="post-quote">{children}</blockquote>,
  },
  marks: {
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="link">
        {children}
      </a>
    ),
  },
};

/* per-tag tint — matches the Journal index so a post keeps its colour
   signature through the eyebrow, drop-cap, progress bar and "next" link. */
const TINT = {
  "Art therapy": "#2f8079",
  "The work":    "#c85f92",
  Feature:       "#5a49ac",
  Studio:        "#9c5a84",
};

/* Figure — mask-reveals up out of a slow zoom as it enters the reading flow. */
function Figure({ src, alt, className = "", eager = false }) {
  const [ref, shown] = useReveal({ amount: 0.25 });
  return (
    <figure ref={ref} className={`post-figure ${className} ${shown ? "is-in" : ""}`}>
      <img
        src={src}
        alt={alt}
        fetchPriority={eager ? "high" : undefined}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
    </figure>
  );
}

export default function JournalPost() {
  const { slug } = useParams();
  const bodyRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: bodyRef,
    offset: ["start 12%", "end 85%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  const { post, next, loading, notFound } = useJournalPost(slug);

  if (notFound) return <Navigate to="/journal" replace />;

  if (loading || !post) {
    return (
      <article className="post post--loading">
        <div className="post-head container">
          <div className="post-head-text">
            <Link to="/journal" className="post-back mono" data-cursor="true">← Journal</Link>
            <div className="jsk jsk-line" style={{ width: "9rem" }} />
            <div className="jsk jsk-line jsk-line--lg" />
          </div>
          <div className="post-head-media"><div className="jsk jsk-figure" /></div>
        </div>
      </article>
    );
  }

  const gallery = post.gallery || [];
  const tint = TINT[post.tag] || TINT.Feature;
  // weave the extra images into the article at even points, not the bottom
  const insertAfter = gallery.map((_, k) =>
    Math.floor((post.body.length * (k + 1)) / (gallery.length + 1))
  );

  return (
    <article className="post" style={{ "--accent-deep": tint }}>
      <motion.div className="post-progress" aria-hidden="true" style={{ scaleX: progress }} />

      <header className="post-head container">
        <div className="post-head-text">
          <Link to="/journal" className="post-back mono" data-cursor="true">← Journal</Link>
          <Reveal>
            <p className="eyebrow eyebrow-row post-eyebrow">{post.tag} · {post.date}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="post-title">{post.title}</h1>
          </Reveal>
        </div>
        <Reveal delay={0.12} y={30} className="post-head-media">
          <Figure src={post.cover} alt={post.title} eager />
        </Reveal>
      </header>

      <div className="post-body container" ref={bodyRef}>
        {post.body.map((block, i) => (
          <Fragment key={block._key || i}>
            <Reveal delay={0.03}>
              <PortableText value={[block]} components={PT_COMPONENTS} />
            </Reveal>
            {gallery.map((src, k) =>
              insertAfter[k] === i ? (
                <Reveal key={src} delay={0.04}>
                  <Figure src={src} alt={`${post.title} — figure ${k + 1}`} className="post-figure--inline" />
                </Reveal>
              ) : null
            )}
          </Fragment>
        ))}

        <div className="post-foot">
          {post.source && (
            <a href={post.source} target="_blank" rel="noopener noreferrer" className="link" data-cursor="true">
              View the original <ArrowRight />
            </a>
          )}
          {next && (
            <Link to={`/journal/${next.slug}`} className="post-next" data-cursor="true">
              <span className="mono">Next in the journal</span>
              <span className="post-next-title">{next.title}</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
