import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/*
  Brush — a word wrapped in a hand-painted highlight stroke that draws itself
  on (left→right) the first time it scrolls into view.
*/
export function Brush({ children, color = "brush-lilac", className = "", amount = 0.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount });
  return (
    <em ref={ref} className={`brush brush-anim ${color} ${className} ${inView ? "is-drawn" : ""}`}>
      {children}
    </em>
  );
}

/*
  Reveal — scroll-triggered entrance. Wraps children in a motion element that
  fades + rises into place once, with a spring-ish custom ease. Use `as` to
  change the tag, `delay`/`y` to tune, `stagger` on a container to cascade
  direct children that use <RevealItem>.
*/
const EASE = [0.16, 1, 0.3, 1];

export function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 26,
  blur = false,
  once = true,
  amount = 0.3,
  duration = 0.9,
  className,
  style,
}) {
  const M = motion[as] ?? motion.div;
  return (
    <M
      className={className}
      style={style}
      initial={{ opacity: 0, y, filter: blur ? "blur(8px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}

export function RevealGroup({ children, as = "div", stagger = 0.08, delay = 0, className, style, amount = 0.25, once = true }) {
  const M = motion[as] ?? motion.div;
  return (
    <M
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{ show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </M>
  );
}

export function RevealItem({ children, as = "div", y = 24, className, style, duration = 0.85 }) {
  const M = motion[as] ?? motion.div;
  return (
    <M
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration, ease: EASE } },
      }}
    >
      {children}
    </M>
  );
}

/*
  LineReveal — for display headings. Pass an array of lines; each rises out of
  an overflow-hidden mask with a stagger, the classic editorial curtain lift.
*/
export function LineReveal({ lines, className = "", delay = 0, once = true, duration = 1, stagger = 0.09, inView = true }) {
  // The observed element must be the UNCLIPPED parent — observing the clipped
  // inner deadlocks (it starts outside its own mask, so it never enters view).
  // `inView={false}` reveals on mount instead — use it for above-the-fold
  // headings (e.g. the hero) so they never wait on a scroll-observer race,
  // which would otherwise leave the top empty while lower lines pop in first.
  const trigger = inView
    ? { whileInView: "show", viewport: { once, amount: 0.2 } }
    : { animate: "show" };
  return (
    <motion.span
      className={`line-reveal ${className}`}
      aria-label={lines.join(" ")}
      initial="hidden"
      {...trigger}
      variants={{ show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {lines.map((line, i) => (
        <span className="line-reveal-mask" key={i} aria-hidden="true">
          <motion.span
            className="line-reveal-inner"
            variants={{
              hidden: { y: "110%" },
              show: { y: "0%", transition: { duration, ease: EASE } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
