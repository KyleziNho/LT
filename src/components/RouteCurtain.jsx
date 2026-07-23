import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, useAnimationControls } from "framer-motion";
import { LogoMark } from "./Logo";

/*
  RouteCurtain — a liquid wipe that plays on every route change. Three deep
  indigo-dusk blades sweep up to cover the screen (organic rounded leading
  edge, echoing a watercolour wash), the "Lisa Teo" signature breathes at
  center in white with a soft halo in the page's art hue, then the blades
  lift away to reveal the new page. Decoupled from the router's
  AnimatePresence so it never interferes with the shared-element lightbox
  (portaled to <body>).
*/
const EASE = [0.76, 0, 0.24, 1];
const BLADES = 3;

/*
  The blades wipe in the COMPLEMENT of the destination's hero art; the signature
  glows in the art's own hue (halo set per-theme in CSS). So the reveal always
  frames, rather than fights, the page you're arriving at.
    works   → coral art     → teal blades  + coral halo
    series  → mixed         → teal blades  + coral halo
    commissions → gold horse → blue blades + gold halo
    art-therapy → green paddy → rose blades + mint halo
    about   → mixed vibrant → violet blades + gold halo
*/
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
  const controls = useAnimationControls();
  const markControls = useAnimationControls();
  const [active, setActive] = useState(false);
  const prevPath = useRef(pathname);

  useEffect(() => {
    // only play on a real path change — this survives StrictMode's double-mount
    // (which would otherwise fire a spurious curtain on initial load in dev)
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!shouldPlay(pathname)) return; // instant swap for home / contact

    let cancelled = false;
    (async () => {
      setActive(true);
      // cover — blades rise from below with a slight per-blade stagger
      markControls.set({ opacity: 0, scale: 0.9 });
      await controls.start((i) => ({
        y: "0%",
        transition: { duration: 0.62, ease: EASE, delay: i * 0.06 },
      }));
      if (cancelled) return;
      await markControls.start({ opacity: 1, scale: 1, transition: { duration: 0.28 } });
      await new Promise((r) => setTimeout(r, 240));
      markControls.start({ opacity: 0, transition: { duration: 0.25 } });
      // reveal — blades continue upward off-screen
      await controls.start((i) => ({
        y: "-100%",
        transition: { duration: 0.6, ease: EASE, delay: i * 0.06 },
      }));
      if (cancelled) return;
      controls.set({ y: "100%" });
      setActive(false);
    })();

    return () => { cancelled = true; };
  }, [pathname, controls, markControls]);

  return (
    <div className={`curtain ${active ? "is-active" : ""}`} data-theme={themeFor(pathname)} aria-hidden="true">
      <div className="curtain-blades">
        {Array.from({ length: BLADES }).map((_, i) => (
          <motion.div key={i} className="curtain-blade" custom={i} initial={{ y: "100%" }} animate={controls} />
        ))}
      </div>
      <motion.div className="curtain-mark" initial={{ opacity: 0 }} animate={markControls}>
        <LogoMark height={60} className="curtain-mark-lt" />
      </motion.div>
    </div>
  );
}
