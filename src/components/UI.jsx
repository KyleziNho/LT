import { Link } from "react-router-dom";
import Magnetic from "./Magnetic";

export function Arrow({ className = "" }) {
  return (
    <svg className={`btn-arrow ${className}`} width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path d="M3 12L12 3M12 3H5M12 3V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRight({ className = "" }) {
  return (
    <svg className={className} width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
      <path d="M1 6H15M15 6L10 1M15 6L10 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/*
  Button — resolves to <Link>, <a>, or <button>. Magnetic by default, with a
  trailing arrow. Variants: solid (default), outline, ghost.
*/
export function Button({
  to,
  href,
  children,
  variant = "solid",
  arrow = true,
  magnetic = true,
  className = "",
  cursor = "true",
  ...rest
}) {
  const cls = `btn ${variant === "outline" ? "btn-outline" : variant === "ghost" ? "btn-ghost" : ""} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <Arrow />}
    </>
  );

  let el;
  if (to) el = <Link to={to} className={cls} data-cursor={cursor} {...rest}>{inner}</Link>;
  else if (href) el = <a href={href} className={cls} data-cursor={cursor} target={rest.target ?? "_blank"} rel="noreferrer" {...rest}>{inner}</a>;
  else el = <button className={cls} data-cursor={cursor} {...rest}>{inner}</button>;

  return magnetic ? <Magnetic strength={0.28}>{el}</Magnetic> : el;
}

export function StatusPill({ status }) {
  const map = {
    available: ["pill-available", "Available"],
    sold: ["pill-sold", "Sold"],
    commission: ["pill-commission", "Commissioned"],
  };
  const [cls, label] = map[status] ?? ["", status];
  return <span className={`pill ${cls}`}>{label}</span>;
}
