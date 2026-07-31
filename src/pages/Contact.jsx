import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, LineReveal } from "../components/Reveal";
import { Button } from "../components/UI";
import { artistInfo } from "../data/artworks";
import { contact } from "../data/site";
import "../styles/contact.css";

const EASE = [0.16, 1, 0.3, 1];

const ENQUIRY_TYPES = ["Purchase a work", "Commission", "Art therapy", "Something else"];

/* Map an incoming ?subject= string to the most likely enquiry chip. */
function matchEnquiryType(subject) {
  const s = subject.toLowerCase();
  if (s.includes("purchase") || s.includes("buy") || s.includes("collect")) return "Purchase a work";
  if (s.includes("commission")) return "Commission";
  if (s.includes("therapy") || s.includes("workshop") || s.includes("guided drawing")) return "Art therapy";
  return null;
}

/* -------- enquiry form (client-side only, mailto fallback) -------- */
function EnquiryForm() {
  const [searchParams] = useSearchParams();
  const initialSubject = searchParams.get("subject") ?? "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [enquiryType, setEnquiryType] = useState(() =>
    initialSubject ? matchEnquiryType(initialSubject) : null
  );
  const [subject, setSubject] = useState(initialSubject);
  const [message, setMessage] = useState("");
  const [hint, setHint] = useState("");
  const [sent, setSent] = useState(false);

  const toggleType = (t) => setEnquiryType((prev) => (prev === t ? null : t));

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setHint("Please add your name, email, and a short message so Lisa can reply.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email.trim())) {
      setHint("That email doesn't look quite right — mind checking it?");
      return;
    }
    setHint("");

    const finalSubject =
      subject.trim() || (enquiryType ? `${enquiryType} — enquiry` : "Enquiry via lisateo.art");
    const bodyLines = [
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      enquiryType ? `Enquiry: ${enquiryType}` : null,
      "",
      message.trim(),
    ].filter((l) => l !== null);
    const mailtoLink = `mailto:${artistInfo.email}?subject=${encodeURIComponent(
      finalSubject
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    // Graceful fallback — opens their mail client with everything pre-filled.
    window.location.href = mailtoLink;
    setSent(true);
  };

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div
          key="sent"
          className="form-sent"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="form-sent-mark">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
              <path
                d="M5.5 13.5l5 5 10-11"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="t-h3 balance">Thank you, your message is on its way.</h3>
          <p className="form-note pretty">
            Your mail app has opened with everything filled in, addressed to {artistInfo.email}.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          className="form"
          onSubmit={onSubmit}
          noValidate
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="form-row">
            <div className="field">
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                data-cursor="true"
              />
            </div>
            <div className="field">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-cursor="true"
              />
            </div>
          </div>

          <div className="field">
            <span className="field-label" id="contact-type-label">
              This is about
            </span>
            <div className="field-chips" role="group" aria-labelledby="contact-type-label">
              {ENQUIRY_TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  className="chip"
                  aria-pressed={enquiryType === t}
                  onClick={() => toggleType(t)}
                  data-cursor="true"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <label htmlFor="contact-subject">Subject</label>
            <input
              id="contact-subject"
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              data-cursor="true"
            />
          </div>

          <div className="field">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              rows={5}
              placeholder="Your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              data-cursor="true"
            />
          </div>

          <AnimatePresence>
            {hint && (
              <motion.p
                className="form-note contact-hint"
                role="alert"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                {hint}
              </motion.p>
            )}
          </AnimatePresence>

          <div className="contact-submit">
            <Button type="submit">Send message</Button>
            <p className="form-note">
              Your mail app opens with everything filled in. Nothing is stored here.
            </p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

/* -------- details column -------- */
function Details() {
  const { email, phone, location, social } = artistInfo;
  const tel = `+${phone.replace(/\D/g, "")}`;
  const socials = [
    ["Instagram", social.instagram],
    ["Facebook", social.facebook],
    ["LinkedIn", social.linkedin],
    ["YouTube", social.youtube],
  ];

  return (
    <div className="contact-details">
      <h1 className="t-h1 contact-head">
        <LineReveal lines={["Get in Touch"]} delay={0.1} inView={false} />
      </h1>

      <Reveal delay={0.28}>
        <p className="lede pretty">{contact.note}</p>
      </Reveal>

      <Reveal delay={0.36}>
        <ul className="contact-list">
          <li>
            <span className="mono contact-list-label">Email</span>
            <a className="link" href={`mailto:${email}`} data-cursor="true">
              {email}
            </a>
          </li>
          <li>
            <span className="mono contact-list-label">Phone</span>
            <a className="link" href={`tel:${tel}`} data-cursor="true">
              {phone}
            </a>
          </li>
          <li>
            <span className="mono contact-list-label">Studio</span>
            <span className="contact-list-value">{location}</span>
          </li>
        </ul>
      </Reveal>

      <Reveal delay={0.44}>
        <ul className="contact-social">
          {socials.map(([label, href]) => (
            <li key={label}>
              <a
                className="link contact-social-link"
                href={href}
                target="_blank"
                rel="noreferrer"
                data-cursor="true"
              >
                {label}
                <span className="contact-social-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

    </div>
  );
}

export default function Contact() {
  return (
    <>
      <section className="page-hero contact-hero">
        <div className="container">
          <Reveal y={14} duration={0.8}>
            <p className="eyebrow eyebrow-row page-hero-eyebrow">
              Contact Lisa Teo
            </p>
          </Reveal>

          <div className="split split-narrow contact-split">
            <Details />
            <Reveal delay={0.2} className="contact-form-col">
              <EnquiryForm />
            </Reveal>
          </div>
        </div>
      </section>

    </>
  );
}
