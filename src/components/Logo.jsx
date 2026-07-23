import { motion } from "framer-motion";

/*
  LT monogram — "the looped signature".

  A hand-drawn evolution of Lisa's original mark: the pen circles TWICE —
  two imperfect, offset rings, the way a hand loops when signing — and
  inside, the L and T are written as flowing rounded lines that cross and
  overshoot each other, never quite geometric. No hard corners, no dot:
  everything reads as one unhurried gesture of the artist's hand.

  Colour: a pale pencil ghost of the mark sits underneath; the brand colour
  (rose→violet-deep gradient) rises up through the strokes on load — like the
  tide colouring in a paddy reflection. The wordmark stays ink.

  Animation: on mount a clip-rect climbs from the baseline to the crown, so
  the mark fills with colour from the bottom up (respects reduced-motion).
*/

const EASE = [0.16, 1, 0.3, 1];

const PATHS = [
  { d: "M31.6 5.9 A19.4 19.4 0 1 0 42.2 14.6", w: 1.9 },                                  // outer loop
  { d: "M28.4 8.9 A16.2 16.6 0 1 0 38.6 16.9", w: 1.7 },                                  // inner loop
  { d: "M18.2 12.6 Q17.2 12.9 17.2 14.4 V27.4 Q17.2 30.4 20.2 30.4 H30.4", w: 2.1 },      // L
  { d: "M20.6 17 H32.6 Q34 17 34 15.7", w: 2.1 },                                          // T crossbar
  { d: "M26.9 17 V33 Q26.9 35.2 24.9 35.2", w: 2.1 },                                      // T stem
];

export function LogoMark({ size = 34, gradient = false, animate = false, className = "", id = "lt" }) {
  const paint = gradient ? `url(#${id}-grad)` : "currentColor";
  const base = { fill: "none", strokeLinecap: "round", strokeLinejoin: "round" };
  const Rect = animate ? motion.rect : "rect";

  return (
    <svg
      className={`logo-mark ${className}`}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      role="img"
      aria-label="Lisa Teo"
    >
      <defs>
        {gradient && (
          <linearGradient id={`${id}-grad`} x1="7" y1="7" x2="41" y2="41" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="var(--rose-ink, #b3517f)" />
            <stop offset="1" stopColor="var(--violet-deep, #5a49ac)" />
          </linearGradient>
        )}
        {/* the rising fill — colour climbs from the baseline (bottom) upward */}
        <clipPath id={`${id}-fill`}>
          <Rect
            x="-2"
            width="52"
            {...(animate
              ? {
                  initial: { y: 50, height: 0 },
                  animate: { y: -2, height: 52 },
                  transition: { duration: 1.05, ease: EASE, delay: 0.25 },
                }
              : { y: -2, height: 52 })}
          />
        </clipPath>
      </defs>

      {/* pencil ghost — the uncoloured mark, waiting to be washed in */}
      <g className="logo-ghost">
        {PATHS.map((p, i) => (
          <path key={i} d={p.d} {...base} stroke="currentColor" strokeOpacity="0.22" strokeWidth={p.w} />
        ))}
      </g>
      {/* the colour, rising up to fill the mark */}
      <g clipPath={`url(#${id}-fill)`}>
        {PATHS.map((p, i) => (
          <path key={i} d={p.d} {...base} stroke={paint} strokeWidth={p.w} />
        ))}
      </g>
    </svg>
  );
}

/*
  Full lockup: the drawn monogram + a signature-script wordmark that "writes"
  itself in left-to-right on mount, echoing Lisa's hand-lettered original.
*/
export default function Logo({ size = 34, gradient = false, wordmark = true, animate = true, className = "" }) {
  return (
    <span className={`logo ${className}`}>
      <LogoMark size={size} gradient={gradient} animate={animate} />
      {wordmark && (
        <motion.span
          className="logo-word"
          initial={animate ? { clipPath: "inset(0 100% 0 0)" } : false}
          animate={animate ? { clipPath: "inset(0 0% 0 0)" } : false}
          transition={{ duration: 0.95, ease: EASE, delay: 0.75 }}
        >
          Lisa&nbsp;Teo
        </motion.span>
      )}
    </span>
  );
}
