import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { imgProps, HERO_SIZES } from "../lib/img";

/*
  PageHeroBg — a full-bleed painting behind a page hero, echoing the home hero.
  A solid `tint` paints first so the hero is never blank while the image loads;
  the artwork fades in over it (fetchPriority high) with a slow ken-burns drift.
  Content should follow this element inside a `.container`, above the scrim.
*/
const EASE = [0.16, 1, 0.3, 1];

export default function PageHeroBg({ image, tint = "#171027", position = "center" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <motion.div className="page-hero-bg" ref={ref} style={{ y, background: tint }} aria-hidden="true">
      <motion.img
        {...imgProps(image, HERO_SIZES, { targetW: 2000 })}
        alt=""
        fetchPriority="high"
        decoding="async"
        style={{ objectPosition: position }}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1.12 }}
        transition={{ opacity: { duration: 1.1, ease: EASE }, scale: { duration: 9, ease: "easeOut" } }}
      />
      <span className="page-hero-scrim" />
    </motion.div>
  );
}
