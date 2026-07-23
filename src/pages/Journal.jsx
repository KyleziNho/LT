import { Link } from "react-router-dom";
import { Reveal, RevealGroup, RevealItem, LineReveal } from "../components/Reveal";
import { ArrowRight } from "../components/UI";
import { useReveal } from "../hooks/useReveal";
import { blog } from "../data/site";
import "../styles/journal.css";

/* per-tag colour signature — a quiet tint for the cursor ring, the tag,
   the hover hairline and the title shift. Legible ink tones on paper. */
const TINT = {
  "Art therapy": { deep: "#2f8079", ring: "#46a8a0" },
  "The work":    { deep: "#c85f92", ring: "#e487b1" },
  Feature:       { deep: "#5a49ac", ring: "#7b6bd1" },
  Studio:        { deep: "#9c5a84", ring: "#c07aa2" },
};
const tintOf = (tag) => TINT[tag] || TINT.Feature;

/* Cover — a print developing: the media wipes up from the base and settles
   out of a slow zoom the first time it scrolls into frame. The reveal lives on
   the container (clip + scale) so the img's own transform is free for the
   pure-CSS hover zoom underneath. */
function Cover({ src, alt, eager = false, className = "" }) {
  const [ref, shown] = useReveal({ amount: 0.28 });
  return (
    <div ref={ref} className={`jcover ${className} ${shown ? "is-in" : ""}`}>
      <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" />
    </div>
  );
}

function Meta({ post }) {
  return (
    <span className="jcard-meta mono">
      <span className="jcard-tag">{post.tag}</span>
      {post.date}
    </span>
  );
}

function Card({ post }) {
  const t = tintOf(post.tag);
  return (
    <Link
      to={`/journal/${post.slug}`}
      className="jcard"
      data-cursor="Read"
      data-cursor-tint={t.ring}
      style={{ "--jtint": t.deep, "--jring": t.ring }}
    >
      <Cover className="jcard-media" src={post.cover} alt={post.title} />
      <Meta post={post} />
      <h3 className="jcard-title">{post.title}</h3>
      <p className="jcard-excerpt pretty">{post.excerpt}</p>
      <span className="jcard-line" aria-hidden="true" />
    </Link>
  );
}

export default function Journal() {
  const featured = blog[0];
  const closer = blog[blog.length - 1];
  const middle = blog.slice(1, -1);
  const ft = tintOf(featured.tag);
  const ct = tintOf(closer.tag);
  const closerImg = (closer.gallery && closer.gallery[0]) || closer.cover;

  return (
    <div className="journal">
      <header className="page-hero container">
        <Reveal className="page-hero-eyebrow">
          <p className="eyebrow eyebrow-row">Journal · Writing &amp; press</p>
        </Reveal>
        <h1 className="t-h1">
          <LineReveal lines={["Notes from", "the studio."]} inView={false} />
        </h1>
        <Reveal delay={0.15} className="page-hero-lede">
          <p className="lede">
            Essays, films, and features — on the paddy fields and the coral, on Guided
            Drawing, and on the life of leaving law for the canvas.
          </p>
        </Reveal>
      </header>

      <section className="section-tight container">
        <Reveal>
          <Link
            to={`/journal/${featured.slug}`}
            className="jfeature"
            data-cursor="Read"
            data-cursor-tint={ft.ring}
            style={{ "--jtint": ft.deep, "--jring": ft.ring }}
          >
            <Cover className="jfeature-media" src={featured.cover} alt={featured.title} eager />
            <div className="jfeature-body">
              <Meta post={featured} />
              <h2 className="jfeature-title">{featured.title}</h2>
              <p className="jfeature-excerpt pretty">{featured.excerpt}</p>
              <span className="journal-more">Read the piece <ArrowRight /></span>
            </div>
          </Link>
        </Reveal>

        <RevealGroup className="journal-grid" stagger={0.08}>
          {middle.map((p) => (
            <RevealItem key={p.slug}><Card post={p} /></RevealItem>
          ))}
        </RevealGroup>

        <Reveal>
          <Link
            to={`/journal/${closer.slug}`}
            className="jfeature jfeature--closer"
            data-cursor="Read"
            data-cursor-tint={ct.ring}
            style={{ "--jtint": ct.deep, "--jring": ct.ring }}
          >
            <div className="jfeature-body">
              <Meta post={closer} />
              <h2 className="jfeature-title">{closer.title}</h2>
              <p className="jfeature-excerpt pretty">{closer.excerpt}</p>
              <span className="journal-more">Read the piece <ArrowRight /></span>
            </div>
            <Cover className="jfeature-media" src={closerImg} alt={closer.title} />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
