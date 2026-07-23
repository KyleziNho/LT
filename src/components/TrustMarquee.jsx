import Marquee from "./Marquee";

/*
  Trusted-by strip — the real corporate client logos from lisateoart.com.
  Rendered as actual logo images in a muted grayscale so the row reads as one
  curated lockup on the light section (matches the "disciplined" restraint —
  the artwork carries colour, not the client logos), with a gentle colour +
  lift on hover. All normalised on HEIGHT, with an optical `h` multiplier so a
  tall square mark (AXA / SEGi) and a wide wordmark (Taylor's) feel balanced.
*/
const CLIENTS = [
  { name: "Coca-Cola", src: "/images/brands/cocacola.svg", h: 1 },
  { name: "AXA", src: "/images/brands/axa.svg", h: 1.5 },
  { name: "Ogilvy", src: "/images/brands/ogilvy.png", h: 0.82 },
  { name: "Marsh", src: "/images/brands/marsh.png", h: 1.55 },
  { name: "Sunway University", src: "/images/brands/sunway.png", h: 1.08 },
  { name: "Taylor's University", src: "/images/brands/taylors.png", h: 1.12 },
  { name: "SEGi University", src: "/images/brands/segi.png", h: 1.3 },
];

function Item({ c }) {
  return (
    <img
      className="brand-real"
      src={c.src}
      alt={c.name}
      loading="lazy"
      decoding="async"
      style={{ "--brand-h": c.h }}
    />
  );
}

export default function TrustMarquee({ speed = 40, className = "" }) {
  const items = CLIENTS.map((c, i) => <Item c={c} key={i} />);
  return <Marquee items={items} speed={speed} separator="·" className={`trust ${className}`} />;
}
