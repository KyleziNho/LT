import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useGesture } from "@use-gesture/react";
import { seriesById } from "../data/artworks";
import { parseAspect, priceLabel } from "../lib/util";
import { imgProps, blurFor, sizedSrc, GRID_SIZES, LIGHTBOX_SIZES } from "../lib/img";
import { StatusPill } from "./UI";
import { Link } from "react-router-dom";
import "../styles/gallery.css";

const EASE = [0.16, 1, 0.3, 1];
// a slightly softer, weightier spring than before — the shared-element painting
// should settle like a hung canvas, not snap.
const SPRING = { type: "spring", stiffness: 220, damping: 27, mass: 1 };

/* the "View" cursor + card glow take the dominant colour of each series */
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
  const tint = SERIES_TINT[art.seriesId] || "#7b6bd1";
  const blur = blurFor(art.image);
  const [loaded, setLoaded] = useState(false);
  return (
    <motion.button
      className="art-card"
      style={{ "--aspect": aspect, "--accent": tint }}
      onClick={() => onOpen(index)}
      data-cursor="View"
      data-cursor-tint={tint}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay: (index % 3) * 0.05 }}
    >
      <div className={`art-card-frame ${loaded ? "is-loaded" : ""}`}>
        {blur && <img className="art-lqip" src={blur} alt="" aria-hidden="true" draggable="false" />}
        <motion.img
          className="art-real"
          layoutId={`art-${art.uid}`}
          {...imgProps(art.image, GRID_SIZES)}
          alt={art.title}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
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

/* ------------------------------------------------- lightbox figure (loupe) */
/* A clean cross-dissolve between paintings — a gentle fade + a whisper of scale,
   NOT a horizontal slide (on mobile the figure is full-width, so an x-slide made
   the next canvas fly in from half a screen away — the "strange" motion). It's
   non-directional, so tap and swipe read identically. NB: no layoutId here —
   tying the lightbox image to its grid card made navigation fly the next
   painting in from wherever its card sat in the scrolled grid. */
const slideVariants = {
  enter: { opacity: 0, scale: 1.035 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.02 },
};

function LightboxFigure({ art, zoom, panning, imgRef }) {
  const loupeRef = useRef(null);
  const [loupeOn, setLoupeOn] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const blur = blurFor(art.image);

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

  const z = zoom || { s: 1, x: 0, y: 0 };
  return (
    <motion.figure
      className={`lb-figure ${loaded ? "is-loaded" : ""} ${z.s > 1 ? "is-zoomed" : ""}`}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        opacity: { duration: 0.34, ease: EASE },
        scale: { duration: 0.5, ease: EASE },
      }}
      onMouseMove={moveLoupe}
      onMouseLeave={() => setLoupeOn(false)}
      data-cursor-hide="true"
    >
      {blur && <img className="lb-lqip" src={blur} alt="" aria-hidden="true" draggable="false" />}
      <img
        ref={imgRef}
        className="lb-img"
        {...imgProps(art.image, LIGHTBOX_SIZES, { targetW: 1400 })}
        alt={art.title}
        decoding="async"
        onLoad={() => setLoaded(true)}
        draggable="false"
        style={{
          transform: `translate3d(${z.x}px, ${z.y}px, 0) scale(${z.s})`,
          transition: panning ? "none" : "transform 0.32s cubic-bezier(0.16,1,0.3,1)",
          willChange: z.s > 1 ? "transform" : "auto",
        }}
      />
      <div
        ref={loupeRef}
        className={`lb-loupe ${loupeOn ? "is-on" : ""}`}
        style={{ backgroundImage: `url("${sizedSrc(art.image, 2000)}")` }}
        aria-hidden="true"
      />
      <span className="lb-hint mono">Hover to inspect</span>
    </motion.figure>
  );
}

/* narrow = the mobile lightbox layout (the story is clamped + expandable there;
   on desktop the side panel has room, so the full story just shows) */
function useIsNarrow() {
  const [narrow, setNarrow] = useState(
    typeof window !== "undefined" ? window.matchMedia("(max-width: 820px)").matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 820px)");
    const on = () => setNarrow(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return narrow;
}

/* ---------------------------------------------------- expandable story block */
/* On mobile the story is clamped to 3 lines with a soft fade + a "Read more"
   toggle. Expanding animates the REAL height (not a scale transform, which
   would smear the text) with a gentle spring; because the sheet is flex, the
   painting above rebalances in the same motion. The chevron morphs, the fade
   dissolves. On desktop (enabled=false) the full story just renders. */
const STORY_SPRING = { type: "spring", stiffness: 260, damping: 32, mass: 0.9 };

function StoryBlock({ story, enabled }) {
  const ref = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [m, setM] = useState({ collapsed: 0, full: 0, long: false });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const lh = parseFloat(getComputedStyle(el).lineHeight) || 20;
    const collapsed = Math.round(lh * 3);
    const full = el.scrollHeight;
    setM({ collapsed, full, long: full > collapsed + 4 });
  }, []);

  // measure before paint (no flash), then again once web fonts settle / on resize
  useLayoutEffect(() => { setExpanded(false); measure(); }, [story, enabled, measure]);
  useEffect(() => {
    if (!enabled) return;
    let live = true;
    document.fonts?.ready.then(() => { if (live) measure(); });
    const onR = () => measure();
    window.addEventListener("resize", onR);
    return () => { live = false; window.removeEventListener("resize", onR); };
  }, [enabled, measure]);

  if (!enabled) return <p className="lb-story pretty">{story}</p>;

  const clamped = m.long && !expanded;
  return (
    <div className="lb-story-block">
      <motion.div
        className={`lb-story-clip ${clamped ? "is-clamped" : ""}`}
        initial={false}
        animate={{ height: m.long ? (expanded ? m.full : m.collapsed) : "auto" }}
        transition={STORY_SPRING}
      >
        <p ref={ref} className="lb-story pretty">{story}</p>
      </motion.div>
      {m.long && (
        <button
          className="lb-more"
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          data-cursor="true"
        >
          <span className="lb-more-label">{expanded ? "Show less" : "Read more"}</span>
          <motion.span
            className="lb-more-chev"
            aria-hidden="true"
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 26 }}
          >
            <svg width="11" height="11" viewBox="0 0 12 12">
              <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.span>
        </button>
      )}
    </div>
  );
}

/* --------------------------------------------------------------- lightbox */
function Lightbox({ items, index, setIndex, onClose }) {
  const art = items[index];
  const len = items.length;
  const go = useCallback(
    (d) => {
      setIndex((i) => (i + d + len) % len); // wrap: past the end loops to the start
    },
    [len, setIndex]
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

  const imgRef = useRef(null);
  const narrow = useIsNarrow();

  // ── zoom / pan ──────────────────────────────────────────────────────────
  // Pinch or double-tap to zoom the painting; drag to pan while zoomed. Resets
  // whenever the painting changes. `panning` kills the CSS transition so the
  // image tracks the fingers 1:1 during a gesture, then eases on double-tap.
  const [zoom, setZoom] = useState({ s: 1, x: 0, y: 0 });
  const [panning, setPanning] = useState(false);
  const lastTap = useRef(0);
  // reset before paint so a newly-navigated painting never flashes zoomed
  useLayoutEffect(() => { setZoom({ s: 1, x: 0, y: 0 }); setPanning(false); }, [art.uid]);

  const clampPan = useCallback((s, x, y) => {
    const img = imgRef.current;
    if (!img) return { x, y };
    const maxX = Math.max(0, (img.offsetWidth * (s - 1)) / 2);
    const maxY = Math.max(0, (img.offsetHeight * (s - 1)) / 2);
    return { x: Math.max(-maxX, Math.min(maxX, x)), y: Math.max(-maxY, Math.min(maxY, y)) };
  }, []);

  // drag to dismiss (vertical) / navigate (horizontal) at 1×; pan while zoomed.
  // The nav offset lives on the track so on release it eases back while the next
  // painting cross-dissolves in.
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const dragging = drag.x !== 0 || drag.y !== 0;
  const bind = useGesture(
    {
      onDrag: ({ pinching, cancel, first, last, tap, movement: [mx, my], velocity: [vx], direction: [dx], memo }) => {
        if (pinching) { cancel(); return; }
        if (tap) {
          if (!narrow) return;                 // desktop uses the hover loupe, not tap-zoom
          const now = performance.now();
          if (now - lastTap.current < 300) {   // double-tap → toggle zoom
            lastTap.current = 0;
            setPanning(false);
            setZoom((z) => (z.s > 1 ? { s: 1, x: 0, y: 0 } : { s: 2.5, x: 0, y: 0 }));
          } else {
            lastTap.current = now;
          }
          return;
        }
        if (zoom.s > 1) {                       // pan the zoomed canvas
          if (first) setPanning(true);
          const base = memo || { x: zoom.x, y: zoom.y };
          const p = clampPan(zoom.s, base.x + mx, base.y + my);
          setZoom((z) => ({ ...z, x: p.x, y: p.y }));
          if (last) setPanning(false);
          return base;
        }
        if (last) {                             // 1×: navigate / dismiss
          if (Math.abs(my) > 130 && Math.abs(my) > Math.abs(mx)) return onClose();
          if ((Math.abs(mx) > 60 || vx > 0.35) && Math.abs(mx) > Math.abs(my)) go(dx < 0 ? 1 : -1);
          setDrag({ x: 0, y: 0 });
        } else {
          setDrag({ x: mx, y: my });
        }
      },
      onPinch: ({ first, last, offset: [s] }) => {
        if (first) setPanning(true);
        setZoom((z) => {
          if (s <= 1.02) return { s: 1, x: 0, y: 0 };
          const p = clampPan(s, z.x, z.y);
          return { s, x: p.x, y: p.y };
        });
        if (last) setPanning(false);
      },
    },
    {
      drag: { filterTaps: true, pointer: { touch: true } },
      pinch: { scaleBounds: { min: 1, max: 4 }, rubberband: true, pointer: { touch: true } },
    }
  );

  const series = seriesById[art.seriesId];

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
        <button className="lb-nav lb-prev" onClick={() => go(-1)} data-cursor="true" aria-label="Previous">
          <svg width="26" height="26" viewBox="0 0 26 26"><path d="M16 4L7 13l9 9" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>

        {/* the clip lives on this inner viewport (not the stage), so the slide
            never spills sideways while the arrows — siblings of it — stay whole */}
        <div className="lb-viewport">
          <motion.div
            className="lb-track"
            {...bind()}
            style={{ touchAction: "none" }}
            animate={{ x: drag.x, y: drag.y, scale: 1 - Math.min(Math.abs(drag.y) / 2200, 0.05) }}
            transition={dragging
              ? { type: "tween", duration: 0 }
              : { type: "spring", stiffness: 340, damping: 38, mass: 0.9 }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <LightboxFigure key={art.uid} art={art} zoom={zoom} panning={panning} imgRef={imgRef} />
            </AnimatePresence>
          </motion.div>
        </div>

        <button className="lb-nav lb-next" onClick={() => go(1)} data-cursor="true" aria-label="Next">
          <svg width="26" height="26" viewBox="0 0 26 26"><path d="M10 4l9 9-9 9" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
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
        <StoryBlock story={art.story} enabled={narrow} />
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
              <span>Enquire</span>
            </Link>
          ) : (
            <Link
              to={`/commissions?subject=${encodeURIComponent(`Commission like ${art.title}`)}`}
              className="btn btn-outline"
              data-cursor="true"
              onClick={onClose}
            >
              <span>Make An Enquiry</span>
            </Link>
          )}
          {series && (
            <Link to={`/series/${art.seriesId}`} className="link lb-series-link" data-cursor="true" onClick={onClose}>
              View the {series.title} series →
            </Link>
          )}
        </div>
      </motion.aside>

      {/* mobile-only control bar — thumb-reachable prev/next + counter, so you
          never depend on an undiscoverable swipe to move between paintings */}
      <div className="lb-navbar" role="group" aria-label="Gallery navigation">
        <button
          className="lb-navbar-btn"
          onClick={() => go(-1)}
          data-cursor="true"
          aria-label="Previous painting"
        >
          <svg width="22" height="22" viewBox="0 0 26 26"><path d="M16 4L7 13l9 9" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <span className="lb-navbar-count mono">
          {String(index + 1).padStart(2, "0")} <span>/ {String(items.length).padStart(2, "0")}</span>
        </span>
        <button
          className="lb-navbar-btn"
          onClick={() => go(1)}
          data-cursor="true"
          aria-label="Next painting"
        >
          <svg width="22" height="22" viewBox="0 0 26 26"><path d="M10 4l9 9-9 9" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </motion.div>
  );
}

/* --------------------------------------------------- responsive column count */
function useColumnCount() {
  const [cols, setCols] = useState(3);
  useEffect(() => {
    const mq2 = window.matchMedia("(max-width: 900px)");
    const mq1 = window.matchMedia("(max-width: 560px)");
    const update = () => setCols(mq1.matches ? 1 : mq2.matches ? 2 : 3);
    update();
    mq1.addEventListener("change", update);
    mq2.addEventListener("change", update);
    return () => {
      mq1.removeEventListener("change", update);
      mq2.removeEventListener("change", update);
    };
  }, []);
  return cols;
}

/* --------------------------------------------------------------- gallery */
export default function Gallery({ items, columns = 3 }) {
  const [index, setIndex] = useState(null);
  const open = index !== null;
  const auto = useColumnCount();
  const cols = Math.min(columns, auto);

  // Distribute cards shortest-column-first so the wall has even feet and a
  // deliberate rhythm (CSS multicol balances poorly / leaves ragged bottoms).
  const buckets = useMemo(() => {
    const b = Array.from({ length: cols }, () => ({ items: [], h: 0 }));
    items.forEach((art, i) => {
      const aspect = parseAspect(art.dimensions);
      const h = 1 / aspect + 0.34; // frame height (1/aspect) + ~caption height
      let t = 0;
      for (let k = 1; k < b.length; k++) if (b[k].h < b[t].h) t = k;
      b[t].items.push({ art, i });
      b[t].h += h;
    });
    return b;
  }, [items, cols]);

  return (
    <>
      <div className="art-grid" style={{ "--cols": cols }}>
        {buckets.map((col, ci) => (
          <div className="art-col" key={ci}>
            {col.items.map(({ art, i }) => (
              <Card key={art.uid} art={art} index={i} onOpen={setIndex} />
            ))}
          </div>
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
