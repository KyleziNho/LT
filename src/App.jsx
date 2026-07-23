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

import "./styles/components.css";

const EASE = [0.16, 1, 0.3, 1];

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
