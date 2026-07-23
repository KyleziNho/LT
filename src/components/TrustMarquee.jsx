import Marquee from "./Marquee";

/*
  Trusted-by strip. Coca-Cola and AXA render as real brand marks, tinted to the
  current text colour via CSS mask so they sit in the warm monochrome scheme;
  the galleries / certifier read as serif wordmarks. All items share one baseline
  height so the row feels curated rather than pasted together.
*/
// logos are normalised on HEIGHT (not width) and optically balanced — a thin
// script (Coca-Cola) needs a touch more height than a bold mark (AXA) to carry
// equal weight in the row. `ratio` = the svg's aspect so width derives cleanly.
const CLIENTS = [
  { type: "logo", name: "Coca-Cola", src: "/images/brands/cocacola.svg", ratio: "96 / 48", h: 1.22 },
  { type: "text", name: "Ogilvy" },
  { type: "logo", name: "AXA", src: "/images/brands/axa-mono.svg", ratio: "236 / 105", h: 0.8 },
  { type: "text", name: "Marsh" },
  { type: "text", name: "Sunway University" },
  { type: "text", name: "Taylor's University" },
  { type: "text", name: "HRD Corp" },
];

function Item({ c }) {
  if (c.type === "logo") {
    return (
      <span
        className="brand-logo"
        role="img"
        aria-label={c.name}
        style={{ "--brand": `url(${c.src})`, "--brand-h": c.h, aspectRatio: c.ratio }}
      />
    );
  }
  return <span className="brand-text">{c.name}</span>;
}

export default function TrustMarquee({ speed = 42, className = "" }) {
  const items = CLIENTS.map((c, i) => <Item c={c} key={i} />);
  return <Marquee items={items} speed={speed} separator="·" className={`trust ${className}`} />;
}
