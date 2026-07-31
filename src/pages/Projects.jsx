import { Reveal, RevealGroup, RevealItem, LineReveal } from "../components/Reveal";
import { featuredProjects, home } from "../data/site";
import "../styles/projects.css";

/* Featured Projects — the six write-ups from lisateoart.com/featured-projects,
   reproduced word for word. */
export default function Projects() {
  return (
    <div className="projects-page">
      <header className="page-hero projects-hero">
        <div className="container">
          <Reveal><p className="eyebrow eyebrow-row page-hero-eyebrow">Commissions · Exhibitions · Wellness</p></Reveal>
          <h1 className="t-h1">
            <LineReveal lines={[home.featuredProjectsTitle]} inView={false} />
          </h1>
        </div>
      </header>

      <section className="section-tight container">
        <RevealGroup as="ol" className="fp-articles" stagger={0.08}>
          {featuredProjects.map((p, i) => (
            <RevealItem as="li" className="fp-article" id={p.slug} key={p.slug}>
              <span className="mono fp-article-index">{String(i + 1).padStart(2, "0")}</span>
              <div className="fp-article-body">
                <p className="mono fp-article-date">{p.date}</p>
                <h2 className="t-h2 fp-article-title balance">{p.title}</h2>
                {p.body.map((para) => (
                  <p className="fp-article-para pretty" key={para.slice(0, 40)}>{para}</p>
                ))}
                {p.list && (
                  <ul className="fp-article-list">
                    {p.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {p.after?.map((para) => (
                  <p className="fp-article-para pretty" key={para.slice(0, 40)}>{para}</p>
                ))}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
    </div>
  );
}
