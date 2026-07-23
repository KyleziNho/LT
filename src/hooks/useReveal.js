import { useEffect, useRef, useState } from "react";

/*
  useReveal — a tiny, self-contained scroll-into-view latch. Returns
  [ref, shown]; `shown` flips true once and stays true the first time the
  element scrolls into frame. Decoupled from framer's variant tree (which
  swallows nested whileInView).

  Why rect-polling instead of IntersectionObserver: the elements this drives
  carry `clip-path: inset(... 100% ...)` in their hidden state, and an IO that
  observes a fully-clipped node never reports `isIntersecting` — it deadlocks
  (the same lesson LineReveal learned). `getBoundingClientRect()` ignores
  clip-path and returns the true layout box, so it's immune. We listen to both
  native scroll (Lenis drives real window scroll) and Lenis's own scroll event,
  with a safety timeout so a cover is NEVER left hidden.
*/
export function useReveal({ amount = 0.25 } = {}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(true);
      return;
    }

    let done = false;
    const check = () => {
      if (done) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // reveal once a sliver has entered the viewport from either edge
      const margin = Math.min(r.height * amount, vh * 0.12);
      if (r.top < vh - margin && r.bottom > margin) {
        done = true;
        setShown(true);
        cleanup();
      }
    };

    const lenis = typeof window !== "undefined" ? window.__lenis : null;
    const cleanup = () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      lenis?.off?.("scroll", check);
      clearTimeout(safety);
    };

    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    lenis?.on?.("scroll", check);

    // initial checks after layout settles (rAF can run pre-layout on mount)
    const r1 = requestAnimationFrame(check);
    const t1 = setTimeout(check, 250);
    // ultimate safety net — nothing stays hidden even if every scroll signal fails
    const safety = setTimeout(() => {
      if (!done) {
        done = true;
        setShown(true);
      }
      cleanup();
    }, 2200);

    return () => {
      cancelAnimationFrame(r1);
      clearTimeout(t1);
      cleanup();
    };
  }, [amount, shown]);

  return [ref, shown];
}
