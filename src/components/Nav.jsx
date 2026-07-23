import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useSearchParams } from "react-router-dom";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import Magnetic from "./Magnetic";
import { Arrow } from "./UI";
import Logo from "./Logo";
import { worksFilters } from "../data/artworks";

const LINKS = [
  { to: "/works", label: "Works" },
  { to: "/commissions", label: "Commissions" },
  { to: "/art-therapy", label: "Art Therapy" },
  { to: "/journal", label: "Journal" },
  { to: "/about", label: "About" },
];

const EASE = [0.16, 1, 0.3, 1];

// the active chip carries a small dot in its series' colour (chromatic system)
const WORKS_TINT = {
  all: "#7b6bd1", available: "#46a8a0",
  awakening: "#d4562f", "paddy-series-1": "#6f9a3e",
  "paddy-series-2": "#6f9a3e", mountains: "#5f8577",
  commissions: "#c5872b",
};

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const [params, setParams] = useSearchParams();

  // Works filter lives in the URL and is housed in an expanding nav "shelf"
  const activeFilter = params.get("f") || "all";
  const setFilter = (id) => setParams(id === "all" ? {} : { f: id }, { replace: true });
  const showTier = pathname === "/works" && scrolled && !open;

  // slider position: the first chip ("All works") rests left-aligned at the
  // start; selecting any other chip slides it to the middle
  const trackRef = useRef(null);
  useEffect(() => {
    if (!showTier) return;
    const track = trackRef.current;
    const chip = track?.querySelector(".nav-filter.is-active");
    if (!track || !chip) return;
    const isFirst = activeFilter === worksFilters[0]?.id;
    const target = isFirst ? 0 : chip.offsetLeft - (track.clientWidth - chip.offsetWidth) / 2;
    const max = track.scrollWidth - track.clientWidth;
    track.scrollTo({ left: Math.max(0, Math.min(target, max)), behavior: "smooth" });
  }, [activeFilter, showTier]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  // pages that open on a dark, full-bleed painting hero — invert the nav there
  // until the user scrolls past it (then the glass pill takes over).
  const darkHero =
    pathname === "/" ||
    pathname === "/works" ||
    pathname === "/commissions" ||
    pathname === "/art-therapy" ||
    pathname === "/about" ||
    pathname.startsWith("/series/");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className={`nav ${scrolled ? "is-scrolled" : ""} ${(darkHero && !scrolled) || open ? "is-dark" : ""} ${showTier ? "has-tier" : ""}`}>
        <div className="nav-inner">
          <div className="nav-row">
            <Link to="/" className="nav-logo" data-cursor="Home" aria-label="Lisa Teo — home">
              <Logo height={34} />
            </Link>

            <nav className="nav-links" aria-label="Primary">
              {LINKS.map((l) => (
                <Magnetic key={l.to} strength={0.2}>
                  <NavLink
                    to={l.to}
                    className={({ isActive }) => `nav-link ${isActive ? "is-active" : ""}`}
                    data-cursor="true"
                  >
                    <span>{l.label}</span>
                  </NavLink>
                </Magnetic>
              ))}
            </nav>

            <div className="nav-right">
              <Magnetic strength={0.25}>
                <Link to="/contact" className="nav-cta" data-cursor="true">
                  <span>Enquire</span>
                  <Arrow />
                </Link>
              </Magnetic>
              <button
                className={`nav-burger ${open ? "is-open" : ""}`}
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                <span /><span />
              </button>
            </div>
          </div>

          {/* the shelf — grows out of the pill to house the Works filters */}
          <AnimatePresence initial={false}>
            {showTier && (
              <motion.div
                className="nav-tier"
                key="tier"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ height: { duration: 0.48, ease: EASE }, opacity: { duration: 0.28, delay: 0.06 } }}
              >
                <LayoutGroup id="works-filters">
                  <motion.div
                    className="nav-tier-row"
                    ref={trackRef}
                    role="group"
                    aria-label="Filter works"
                    initial="hide"
                    animate="show"
                    variants={{ show: { transition: { staggerChildren: 0.03, delayChildren: 0.14 } } }}
                  >
                    {worksFilters.map((f) => {
                      const on = activeFilter === f.id;
                      return (
                        <motion.button
                          key={f.id}
                          className={`nav-filter ${on ? "is-active" : ""}`}
                          onClick={() => setFilter(f.id)}
                          data-cursor="true"
                          aria-pressed={on}
                          variants={{ hide: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}
                        >
                          {on && (
                            <motion.span
                              className="nav-filter-pill"
                              layoutId="works-filter-ink"
                              transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.8 }}
                            />
                          )}
                          <span className="nav-filter-label">
                            {on && <span className="nav-filter-dot" style={{ background: WORKS_TINT[f.id] }} />}
                            {f.label}
                          </span>
                        </motion.button>
                      );
                    })}
                  </motion.div>
                </LayoutGroup>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu surface-dark grain"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="menu-inner">
              <nav className="menu-links">
                {[{ to: "/", label: "Home" }, ...LINKS, { to: "/contact", label: "Contact" }].map((l, i) => (
                  <Link key={l.to} to={l.to} className="menu-link" data-cursor="true">
                    <motion.span
                      className="menu-link-inner"
                      initial={{ y: "120%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "120%" }}
                      transition={{ duration: 0.7, ease: EASE, delay: 0.12 + i * 0.06 }}
                    >
                      <span className="menu-index mono">0{i + 1}</span>
                      {l.label}
                    </motion.span>
                  </Link>
                ))}
              </nav>
              <motion.div
                className="menu-foot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <a href="mailto:lisateo@gmail.com" className="link">lisateo@gmail.com</a>
                <span className="mono">Kuala Lumpur · MY</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
