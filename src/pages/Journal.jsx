import { Link } from "react-router-dom";
import { Reveal, RevealGroup, RevealItem, LineReveal } from "../components/Reveal";
import { ArrowRight } from "../components/UI";
import { blog } from "../data/site";
import "../styles/journal.css";

function Meta({ post }) {
  return (
    <span className="jcard-meta mono">
      <span className="jcard-tag">{post.tag}</span>
      {post.date}
    </span>
  );
}

function Card({ post }) {
  return (
    <Link to={`/journal/${post.slug}`} className="jcard" data-cursor="Read" data-cursor-tint="#7b6bd1">
      <div className="jcard-media">
        <img src={post.cover} alt={post.title} loading="lazy" decoding="async" />
      </div>
      <Meta post={post} />
      <h3 className="jcard-title">{post.title}</h3>
      <p className="jcard-excerpt pretty">{post.excerpt}</p>
    </Link>
  );
}

export default function Journal() {
  const [featured, ...rest] = blog;
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
          <Link to={`/journal/${featured.slug}`} className="jfeature" data-cursor="Read" data-cursor-tint="#7b6bd1">
            <div className="jfeature-media">
              <img src={featured.cover} alt={featured.title} loading="eager" decoding="async" />
            </div>
            <div className="jfeature-body">
              <Meta post={featured} />
              <h2 className="jfeature-title">{featured.title}</h2>
              <p className="jfeature-excerpt pretty">{featured.excerpt}</p>
              <span className="journal-more">Read the piece <ArrowRight /></span>
            </div>
          </Link>
        </Reveal>

        <RevealGroup className="journal-grid" stagger={0.08}>
          {rest.map((p) => (
            <RevealItem key={p.slug}><Card post={p} /></RevealItem>
          ))}
        </RevealGroup>
      </section>
    </div>
  );
}
