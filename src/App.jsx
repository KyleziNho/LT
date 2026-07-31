import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import SmoothScroll from "./components/SmoothScroll";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import RouteCurtain from "./components/RouteCurtain";

import Home from "./pages/Home";
import Works from "./pages/Works";
import Series from "./pages/Series";
import Commissions from "./pages/Commissions";
import ArtTherapy from "./pages/ArtTherapy";
import About from "./pages/About";
import Journal from "./pages/Journal";
import JournalPost from "./pages/JournalPost";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";

import "./styles/components.css";

const EASE = [0.16, 1, 0.3, 1];

// Page titles, verbatim from the equivalent pages on lisateoart.com.
const TITLES = [
  ["/works", "Original Contemporary Paintings for Sale | Lisa Teo"],
  ["/series", "Original Contemporary Paintings for Sale | Lisa Teo"],
  ["/commissions", "Commissioned Art & Custom Paintings by Lisa Teo"],
  ["/art-therapy", "Corporate Art Therapy with Guided Drawing | Art Wellness Programme"],
  ["/about", "About Lisa Teo | Artist & Certified Guided Drawing Art Therapist"],
  ["/projects", "Featured Art Commissions, Exhibitions & Corporate Wellness Projects | Lisa Teo Art"],
  ["/journal", "Art, Healing & Creative Insights | Lisa Teo's Blog"],
  ["/contact", "Contact Lisa Teo"],
];
const HOME_TITLE = "Lisa Teo | Fine Art and Art Therapy";

function DocumentTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    const hit = TITLES.find(([p]) => pathname === p || pathname.startsWith(p + "/"));
    document.title = hit ? hit[1] : HOME_TITLE;
  }, [pathname]);
  return null;
}

function PageWrap({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <PageWrap key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<Works />} />
          <Route path="/series/:seriesId" element={<Series />} />
          <Route path="/commissions" element={<Commissions />} />
          <Route path="/art-therapy" element={<ArtTherapy />} />
          <Route path="/about" element={<About />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/:slug" element={<JournalPost />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </PageWrap>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <DocumentTitle />
        <Cursor />
        <ScrollProgress />
        <RouteCurtain />
        <Nav />
        <main>
          <AnimatedRoutes />
        </main>
        <Footer />
      </SmoothScroll>
    </BrowserRouter>
  );
}
