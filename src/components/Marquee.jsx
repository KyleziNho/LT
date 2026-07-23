/*
  Marquee — seamless infinite scroll strip. CSS-animated, duplicated content
  for a gapless loop. Used for exhibition credits / client names.
*/
export default function Marquee({ items, speed = 34, separator = "✳", className = "" }) {
  const run = (
    <div className="marquee-run" aria-hidden="true">
      {items.map((it, i) => (
        <span className="marquee-item" key={i}>
          {it}
          <span className="marquee-sep">{separator}</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`marquee ${className}`} style={{ "--marquee-speed": `${speed}s` }}>
      <div className="marquee-track">
        {run}
        {run}
      </div>
    </div>
  );
}
