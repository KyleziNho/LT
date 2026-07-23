import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useDrag } from "@use-gesture/react";
import { seriesById } from "../data/artworks";
import { parseAspect, priceLabel, thumb } from "../lib/util";
import { StatusPill } from "./UI";
import { Link } from "react-router-dom";

const EASE = [0.16, 1, 0.3, 1];
const SPRING = { type: "spring", stiffness: 260, damping: 30, mass: 0.9 };

/* the "View" cursor takes the dominant colour of each series' paintings */
const SERIES_TINT = {
  awakening: "#d4562f",        // coral reef
  "paddy-series-1": "#6f9a3e", // paddy green
  "paddy-series-2": "#6f9a3e",
  mountains: "#5f8577",        // misted summit green
  commissions: "#c5872b",      // amber
};

/* ------------------------------------------------------------- one card */
function Card({ art, index, onOpen }) {
  const aspect = parseAspect(art.dimensions);
  return (
    <motion.button
      className="art-card"
      style={{ "--aspect": aspect }}
      onClick={() => onOpen(index)}
      data-cursor="View"
      data-cursor-tint={SERIES_TINT[art.seriesId] || "#7b6bd1"}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay: (index % 3) * 0.05 }}
    >
      <div className="art-card-frame">
        <motion.img
          layoutId={`art-${art.uid}`}
          src={thumb(art.image)}
          alt={art.title}
          loading="lazy"
          decoding="async"
          transition={SPRING}
          draggable="false"
        />
        <span className="art-card-glow" aria-hidden="true" />
      </div>
      <div className="art-card-meta">
        <div className="art-card-line">
          <h3 className="art-card-title">{art.title}</h3>
          <span className={`art-card-price mono ${art.status === "available" ? "is-avail" : "is-muted"}`}>{priceLabel(art)}</span>
        </div>
        <span className="art-card-sub mono">
          {art.seriesTitle} · {art.year} · {art.medium}
        </span>
      </div>
    </motion.button>
  );
}

/* --------------------------------------------------------------- lightbox */
function Lightbox({ items, index, setIndex, onClose }) {
  const art = items[index];
  const hasPrev = index > 0;
  const hasNext = index < items.length - 1;
  const go = useCallback(
    (dir) => {
      setIndex((i) => {
        const n = i + dir;
        return n < 0 || n > items.length - 1 ? i : n;
      });
    },
    [items.length, setIndex]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    // lock scroll
    window.__lenis?.stop();
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      window.__lenis?.start();
      document.body.style.overflow = "";
    };
  }, [go, onClose]);

  // drag to dismiss / navigate
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const bind = useDrag(
    ({ last, movement: [mx, my], velocity: [vx], direction: [dx] }) => {
      if (last) {
        if (Math.abs(my) > 140 && Math.abs(my) > Math.abs(mx)) return onClose();
        if ((Math.abs(mx) > 120 || vx > 0.5) && Math.abs(mx) > Math.abs(my)) {
          if (dx < 0 && hasNext) go(1);
          else if (dx > 0 && hasPrev) go(-1);
        }
        setDrag({ x: 0, y: 0 });
      } else {
        setDrag({ x: mx, y: my });
      }
    },
    { filterTaps: true, pointer: { touch: true } }
  );

  const series = seriesById[art.seriesId];

  // desktop magnifier — hover the artwork to inspect the palette-knife detail
  const imgRef = useRef(null);
  const loupeRef = useRef(null);
  const [loupeOn, setLoupeOn] = useState(false);
  const moveLoupe = (e) => {
    const img = imgRef.current, lp = loupeRef.current;
    if (!img || !lp) return;
    const r = img.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    if (x < 0 || y < 0 || x > r.width || y > r.height) { if (loupeOn) setLoupeOn(false); return; }
    if (!loupeOn) setLoupeOn(true);
    lp.style.left = `${x}px`;
    lp.style.top = `${y}px`;
    lp.style.backgroundPosition = `${(x / r.width) * 100}% ${(y / r.height) * 100}%`;
    lp.style.backgroundSize = `${r.width * 2.2}px ${r.height * 2.2}px`;
  };
  // reset the magnifier whenever the artwork changes
  useEffect(() => { setLoupeOn(false); }, [art.uid]);

  return (
    <motion.div className="lb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <motion.div
        className="lb-scrim"
        onClick={onClose}
        style={{ opacity: 1 - Math.min(Math.abs(drag.y) / 400, 0.6) }}
      />

      <button className="lb-close" onClick={onClose} data-cursor="true" aria-label="Close">
        <svg width="20" height="20" viewBox="0 0 20 20"><path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
      </button>

      <div className="lb-counter mono">
        {String(index + 1).padStart(2, "0")} <span>/ {String(items.length).padStart(2, "0")}</span>
      </div>

      {/* tapping the empty stage (anywhere but the image/controls) closes */}
      <div className="lb-stage" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        {hasPrev && (
          <button className="lb-nav lb-prev" onClick={() => go(-1)} data-cursor="true" aria-label="Previous">
            <svg width="26" height="26" viewBox="0 0 26 26"><path d="M16 4L7 13l9 9" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        )}

        <AnimatePresence mode="popLayout" initial={false}>
          <motion.figure
            key={art.uid}
            className="lb-figure"
            {...bind()}
            onMouseMove={moveLoupe}
            onMouseLeave={() => setLoupeOn(false)}
            data-cursor-hide="true"
            style={{ x: drag.x, y: drag.y, touchAction: "none" }}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 - Math.min(Math.abs(drag.y) / 2000, 0.06) }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <motion.img ref={imgRef} layoutId={`art-${art.uid}`} src={art.image} alt={art.title} transition={SPRING} draggable="false" />
            <div
              ref={loupeRef}
              className={`lb-loupe ${loupeOn ? "is-on" : ""}`}
              style={{ backgroundImage: `url("${art.image}")` }}
              aria-hidden="true"
            />
            <span className="lb-hint mono">Hover to inspect</span>
          </motion.figure>
        </AnimatePresence>

        {hasNext && (
          <button className="lb-nav lb-next" onClick={() => go(1)} data-cursor="true" aria-label="Next">
            <svg width="26" height="26" viewBox="0 0 26 26"><path d="M10 4l9 9-9 9" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        )}
      </div>

      <motion.aside
        className="lb-panel"
        key={`panel-${art.uid}`}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
      >
        <div className="lb-panel-top">
          <div>
            <p className="mono lb-series">{art.seriesTitle}</p>
            <h2 className="t-h3 lb-title">{art.title}</h2>
          </div>
          <StatusPill status={art.status} />
        </div>
        <p className="lb-story pretty">{art.story}</p>
        <dl className="lb-specs">
          <div><dt className="mono">Year</dt><dd>{art.year}</dd></div>
          <div><dt className="mono">Medium</dt><dd>{art.medium}</dd></div>
          <div><dt className="mono">Size</dt><dd>{art.dimensions}</dd></div>
          <div><dt className="mono">Price</dt><dd>{priceLabel(art)}</dd></div>
        </dl>
        <div className="lb-actions">
          {art.status === "available" ? (
            <Link
              to={`/contact?subject=${encodeURIComponent(`Purchase enquiry — ${art.title}`)}`}
              className="btn"
              data-cursor="true"
              onClick={onClose}
            >
              <span>Enquire to purchase</span>
            </Link>
          ) : (
            <Link
              to={`/commissions?subject=${encodeURIComponent(`Commission like ${art.title}`)}`}
              className="btn btn-outline"
              data-cursor="true"
              onClick={onClose}
            >
              <span>Commission something similar</span>
            </Link>
          )}
          {series && (
            <Link to={`/series/${art.seriesId}`} className="link lb-series-link" data-cursor="true" onClick={onClose}>
              View the {series.title} series →
            </Link>
          )}
        </div>
      </motion.aside>
    </motion.div>
  );
}

/* --------------------------------------------------------------- gallery */
export default function Gallery({ items, columns = 3 }) {
  const [index, setIndex] = useState(null);
  const open = index !== null;

  return (
    <>
      <div className="art-grid" style={{ "--cols": columns }}>
        {items.map((art, i) => (
          <Card key={art.uid} art={art} index={i} onOpen={setIndex} />
        ))}
      </div>

      {createPortal(
        <AnimatePresence>
          {open && (
            <Lightbox items={items} index={index} setIndex={setIndex} onClose={() => setIndex(null)} />
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
