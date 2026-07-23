// Responsive-image helper for the artwork gallery.
//
// Reads the build-time manifest (scripts/optimize-images.mjs → imgManifest.js)
// and returns srcset/sizes/blur for a given original artwork path so the
// browser only ever downloads the size a slot needs. Any image NOT in the
// manifest (e.g. the artist photos under /images/artist) degrades gracefully
// to a plain { src }, so shared components like PageHeroBg keep working
// everywhere.
import { IMG_MANIFEST } from "./imgManifest";

// `sizes` presets — the display width of each slot at each breakpoint, so the
// browser can pick the right srcset candidate before layout.
export const GRID_SIZES = "(max-width: 560px) 92vw, (max-width: 900px) 46vw, 30vw";
export const HERO_SIZES = "100vw";
export const LIGHTBOX_SIZES = "(max-width: 820px) 96vw, 60vw";

const entry = (src) => IMG_MANIFEST[src];

function srcSet(e) {
  return e.widths.map((w) => `${e.base}-${w}.webp ${w}w`).join(", ");
}

// Closest generated width to a target — used as the non-srcset fallback `src`.
function nearest(e, targetW) {
  return e.widths.reduce(
    (best, w) => (Math.abs(w - targetW) < Math.abs(best - targetW) ? w : best),
    e.widths[0]
  );
}

// The LQIP blur data URI for a painting (or null). Enables the film-develop
// blur-up while the real image decodes.
export function blurFor(src) {
  return entry(src)?.blur || null;
}

// A single URL at (about) the given width — for backgrounds like the loupe.
export function sizedSrc(src, targetW = 1400) {
  const e = entry(src);
  if (!e) return src;
  return `${e.base}-${nearest(e, targetW)}.webp`;
}

// One call → props to spread onto an <img> / motion.img.
//   imgProps(art.image, GRID_SIZES)
export function imgProps(src, sizes, { targetW = 800 } = {}) {
  const e = entry(src);
  if (!e) return { src }; // graceful fallback for non-manifest images
  return { src: `${e.base}-${nearest(e, targetW)}.webp`, srcSet: srcSet(e), sizes };
}
