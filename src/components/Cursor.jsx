import { useEffect, useRef } from "react";

/*
  Custom cursor. Two parts:
    • dot  — glued to the pointer with ZERO latency (written straight from the
             pointermove event, so it never feels laggy even with the native
             cursor hidden).
    • ring — trails with a light spring in a single rAF loop.
  Grows + labels over [data-cursor], collapses over links/inputs. Only mounts
  on fine-pointer devices.
*/
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    document.body.classList.add("has-cursor");
    const d = dot.current;
    const r = ring.current;
    const lbl = labelRef.current;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf = 0;
    let visible = false;

    const move = (e) => {
      mx = e.clientX;
      my = e.clientY;
      // dot: write immediately — no easing, no perceptible lag
      d.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      if (!visible) {
        visible = true;
        d.style.opacity = "";
        r.style.opacity = "";
      }
    };
    window.addEventListener("pointermove", move, { passive: true });

    const loop = () => {
      // ring trails with a light lead so it feels alive but never sluggish
      rx += (mx - rx) * 0.22;
      ry += (my - ry) * 0.22;
      r.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const setState = (state, label) => {
      r.dataset.state = state;
      if (label) { lbl.textContent = label; r.dataset.hasLabel = "true"; }
      else r.dataset.hasLabel = "false";
    };

    const over = (e) => {
      // a custom interaction (the brushwork loupe) borrows the pointer — fully
      // hide our cursor so the two never stack
      const hideEl = e.target.closest("[data-cursor-hide]");
      document.body.classList.toggle("cursor-hidden", !!hideEl);

      // let the ring adopt the colour of whatever art it is over
      const tintEl = e.target.closest("[data-cursor-tint]");
      r.style.setProperty("--cursor-accent", tintEl ? tintEl.getAttribute("data-cursor-tint") : "");

      const t = e.target.closest("[data-cursor], a, button, input, textarea, [role='button']");
      if (!t) return setState("default", "");
      const label = t.getAttribute("data-cursor");
      if (label && label !== "true") setState("label", label);
      else if (t.matches("input, textarea")) setState("text", "");
      else setState("link", "");
    };
    document.addEventListener("pointerover", over, { passive: true });

    const down = () => (r.dataset.press = "true");
    const up = () => (r.dataset.press = "false");
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);

    const leave = () => { r.style.opacity = "0"; d.style.opacity = "0"; visible = false; };
    document.addEventListener("mouseleave", leave);

    return () => {
      document.body.classList.remove("has-cursor");
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" style={{ opacity: 0 }} aria-hidden="true" />
      <div ref={ring} className="cursor-ring" data-state="default" style={{ opacity: 0 }} aria-hidden="true">
        <span ref={labelRef} className="cursor-label" />
      </div>
    </>
  );
}
