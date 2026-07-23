/*
  Lisa's real brand lockup — the LT monogram in a leaf/vesica enclosure beside
  the "Lisa Teo" signature script. Delivered as background-removed transparent
  PNGs (see public/images/logos/), in two colourways:
    · ink  (lt-*-dark.png)  — for light surfaces (the default glass nav pill)
    · white (lt-*-light.png) — for dark, full-bleed painting heroes

  We stack both and cross-fade between them via CSS, driven by `.nav.is-dark`
  (or `.curtain`, which always shows the white mark over its coloured blades).
  `height` sets the lockup height in px; width follows the artwork's aspect.
*/

const LOCKUP = {
  ink: "/images/logos/lt-lockup-dark.png",
  white: "/images/logos/lt-lockup-light.png",
};
const MARK = {
  ink: "/images/logos/lt-mark-dark.png",
  white: "/images/logos/lt-mark-light.png",
};

// just the monogram — used by the route curtain and anywhere a compact mark fits
export function LogoMark({ height = 58, className = "" }) {
  return (
    <span className={`logo-lockup logo-lockup--mark ${className}`} style={{ "--logo-h": `${height}px` }}>
      <img className="logo-ink" src={MARK.ink} alt="Lisa Teo" />
      <img className="logo-white" src={MARK.white} alt="" aria-hidden="true" />
    </span>
  );
}

// the full monogram + wordmark lockup (nav)
export default function Logo({ height = 30, className = "" }) {
  return (
    <span className={`logo-lockup ${className}`} style={{ "--logo-h": `${height}px` }}>
      <img className="logo-ink" src={LOCKUP.ink} alt="Lisa Teo" />
      <img className="logo-white" src={LOCKUP.white} alt="" aria-hidden="true" />
    </span>
  );
}
