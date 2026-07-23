import { Fragment } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import { ArrowRight } from "../components/UI";
import { blog } from "../data/site";
import "../styles/journal.css";

export default function JournalPost() {
  const { slug } = useParams();
  const idx = blog.findIndex((p) => p.slug === slug);
  if (idx === -1) return <Navigate to="/journal" replace />;

  const post = blog[idx];
  const next = blog[(idx + 1) % blog.length];
  const gallery = post.gallery || [];
  // weave the extra images into the article at even points, not the bottom
  const insertAfter = gallery.map((_, k) =>
    Math.floor((post.body.length * (k + 1)) / (gallery.length + 1))
  );

  return (
    <article className="post">
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
          <figure className="post-figure">
            <img src={post.cover} alt={post.title} fetchPriority="high" decoding="async" />
          </figure>
        </Reveal>
      </header>

      <div className="post-body container">
        {post.body.map((para, i) => (
          <Fragment key={i}>
            <Reveal delay={0.03}>
              <p className="post-para pretty">{para}</p>
            </Reveal>
            {gallery.map((src, k) =>
              insertAfter[k] === i ? (
                <Reveal key={src} delay={0.04}>
                  <figure className="post-figure post-figure--inline">
                    <img src={src} alt={`${post.title} — figure ${k + 1}`} loading="lazy" decoding="async" />
                  </figure>
                </Reveal>
              ) : null
            )}
          </Fragment>
        ))}

        <div className="post-foot">
          <a href={post.source} target="_blank" rel="noopener noreferrer" className="link" data-cursor="true">
            View the original <ArrowRight />
          </a>
          <Link to={`/journal/${next.slug}`} className="post-next" data-cursor="true">
            <span className="mono">Next in the journal</span>
            <span className="post-next-title">{next.title}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
