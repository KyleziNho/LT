import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, useAnimationControls } from "framer-motion";
import { LogoMark } from "./Logo";

/*
  RouteCurtain — "The Fold". Two deep-dusk panels glide in to meet at the
  horizontal centre-line, the WHITE LT monogram breathes at the seam over a
  thin luminous hairline, then the panels part — top rising, bottom sinking —
  to reveal the new page. A clean, symmetric, editorial wipe. Decoupled from
  the router's AnimatePresence so it never fights the shared-element lightbox.

  Per-destination colour is a single committed hue (set via data-theme in CSS),
  in keeping with the site's "one confident colour at a time" restraint.
*/
const COVER = [0.76, 0, 0.24, 1]; // strong ease for the panel glide
const OUT = [0.65, 0, 0.35, 1];

function themeFor(path) {
  if (path.startsWith("/works")) return "reef";
  if (path.startsWith("/series")) return "reef";
  if (path.startsWith("/commissions")) return "sapphire";
  if (path.startsWith("/art-therapy")) return "blossom";
  if (path.startsWith("/about")) return "violet";
  if (path.startsWith("/journal")) return "violet";
  return "dusk";
}

/* the curtain is a moment, not a toll booth — only play it when ARRIVING at an
   immersive, art-led page. Home and Contact swap instantly. */
function shouldPlay(path) {
  return (
    path === "/works" ||
    path.startsWith("/series") ||
    path === "/commissions" ||
    path === "/art-therapy" ||
    path === "/about" ||
    path === "/journal" // index only — individual posts swap instantly for reading flow
  );
}

export default function RouteCurtain() {
  const { pathname } = useLocation();
  const top = useAnimationControls();
  const bottom = useAnimationControls();
  const mark = useAnimationControls();
  const seam = useAnimationControls();
  const [active, setActive] = useState(false);
  const prevPath = useRef(pathname);

  useEffect(() => {
    // only play on a real path change — survives StrictMode's dev double-mount
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!shouldPlay(pathname)) return; // instant swap for home / contact

    let cancelled = false;
    (async () => {
      setActive(true);
      mark.set({ opacity: 0, scale: 0.86, filter: "blur(6px)" });
      seam.set({ scaleX: 0, opacity: 0 });
      top.set({ y: "-101%" });
      bottom.set({ y: "101%" });

      // COVER — the two panels glide in to meet at the centre seam
      await Promise.all([
        top.start({ y: "0%", transition: { duration: 0.56, ease: COVER } }),
        bottom.start({ y: "0%", transition: { duration: 0.56, ease: COVER } }),
      ]);
      if (cancelled) return;

      // the hairline draws across the seam, then the white mark settles in
      seam.start({ scaleX: 1, opacity: 1, transition: { duration: 0.5, ease: OUT } });
      await mark.start({
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
      });
      if (cancelled) return;
      await new Promise((r) => setTimeout(r, 240));

      // mark & seam fade before the split so nothing tears at the centre
      mark.start({ opacity: 0, scale: 1.04, transition: { duration: 0.3, ease: "easeIn" } });
      seam.start({ opacity: 0, transition: { duration: 0.25 } });

      // REVEAL — panels part, unveiling the page beneath
      await Promise.all([
        top.start({ y: "-101%", transition: { duration: 0.6, ease: OUT, delay: 0.08 } }),
        bottom.start({ y: "101%", transition: { duration: 0.6, ease: OUT, delay: 0.08 } }),
      ]);
      if (cancelled) return;
      setActive(false);
    })();

    return () => { cancelled = true; };
  }, [pathname, top, bottom, mark, seam]);

  return (
    <div className={`curtain ${active ? "is-active" : ""}`} data-theme={themeFor(pathname)} aria-hidden="true">
      <motion.div className="curtain-panel curtain-panel--top" initial={{ y: "-101%" }} animate={top} />
      <motion.div className="curtain-panel curtain-panel--bottom" initial={{ y: "101%" }} animate={bottom} />
      <div className="curtain-stage">
        <motion.span className="curtain-seam" initial={{ scaleX: 0, opacity: 0 }} animate={seam} />
        <motion.div className="curtain-mark" initial={{ opacity: 0, scale: 0.86 }} animate={mark}>
          <LogoMark height={76} className="curtain-mark-lt" />
        </motion.div>
      </div>
    </div>
  );
}
