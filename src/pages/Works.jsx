import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Gallery from "../components/Gallery";
import PageHeroBg from "../components/PageHeroBg";
import { Reveal, LineReveal } from "../components/Reveal";
import { allArtworks, availableArtworks } from "../data/artworks";
import "../styles/works.css";

export default function Works() {
  // filter lives in the URL so the nav tier and the gallery share it (and it's
  // deep-linkable, e.g. /works?f=awakening)
  const [params] = useSearchParams();
  const filter = params.get("f") || "all";

  const items = useMemo(() => {
    if (filter === "all") return allArtworks;
    if (filter === "available") return availableArtworks;
    return allArtworks.filter((a) => a.seriesId === filter);
  }, [filter]);

  const availableCount = availableArtworks.length;

  return (
    <div className="works">
      <header className="page-hero page-hero--image">
        <PageHeroBg image="/images/artwork/awakening/05-Red-Coral-I.jpg" tint="#12202a" position="center" />
        <div className="container">
          <Reveal className="page-hero-eyebrow"><p className="eyebrow eyebrow-row">The Collection · {allArtworks.length} works</p></Reveal>
          <h1 className="t-h1">
            <LineReveal lines={["Every piece,", "in one gallery."]} inView={false} />
          </h1>
          <Reveal delay={0.15} className="page-hero-lede">
            <p className="lede">
              Oils and acrylics across four series — paddy fields, coral reefs, and
              commissions. {availableCount} originals are available now and ship worldwide.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="section-tight container works-gallery">
        <p className="eyebrow eyebrow-row works-count-line">
          {items.length} {items.length === 1 ? "work" : "works"}
          {filter === "all" ? ` · ${availableCount} available` : ""}
        </p>
        <motion.div key={filter} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
          <Gallery items={items} columns={3} />
        </motion.div>
      </section>
    </div>
  );
}
