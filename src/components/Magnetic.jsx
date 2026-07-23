import { useRef } from "react";
import { motion, useSpring } from "framer-motion";

/*
  Magnetic — wraps a child so it leans toward the pointer while hovered, then
  springs back on leave. Used for buttons, nav items, the scroll cue.
  `strength` scales the pull; content can also translate at a fraction via
  the inner span for a parallax feel.
*/
export default function Magnetic({ children, strength = 0.35, className, as = "div" }) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 180, damping: 14, mass: 0.4 });
  const y = useSpring(0, { stiffness: 180, damping: 14, mass: 0.4 });
  const M = motion[as] ?? motion.div;

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const relX = e.clientX - (r.left + r.width / 2);
    const relY = e.clientY - (r.top + r.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <M
      ref={ref}
      className={className}
      style={{ x, y, display: "inline-flex" }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </M>
  );
}
