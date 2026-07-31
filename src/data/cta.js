// Per-route contextual closing CTA for the global Footer.
//
// Every line here is Lisa's own closing line from the equivalent page on
// lisateoart.com:
//   home        -> "Have a query about my paintings or art therapy?" / "Contact Me"
//   paintings   -> "Have more questions?" / "Contact Me"
//   commissions -> "Have a question or looking to commission a unique painting?
//                   I'd love to hear from you." / "Get In Touch"
//   art therapy -> "Interested in exploring whether this is suitable for your
//                   organisation?" / "Book a Discovery Call"
//
// `head` is an array of lines; each line is `{ t: "text" }`, optionally with
// `accent: true` for the italic Fraunces accent line. `button.cursor` is the
// label the custom magnetic cursor shows on hover.

export const HOME_CTA = {
  id: "home",
  eyebrow: "Get in Touch",
  head: [{ t: "Have a query about my" }, { t: "paintings or art therapy?", accent: true }],
  sub: null,
  button: { label: "Contact Me", to: "/contact", cursor: "Contact" },
};

// Ordered by match specificity — first matching prefix wins.
const ROUTES = [
  {
    id: "works",
    match: ["/works", "/series"],
    eyebrow: "Paintings",
    head: [{ t: "Have more" }, { t: "questions?", accent: true }],
    sub: null,
    button: { label: "Contact Me", to: "/contact", cursor: "Contact" },
  },
  {
    id: "commissions",
    match: ["/commissions"],
    eyebrow: "Made to order",
    head: [
      { t: "Have a question or looking" },
      { t: "to commission a" },
      { t: "unique painting?", accent: true },
    ],
    sub: "I’d love to hear from you.",
    button: { label: "Get In Touch", to: "/contact?subject=Commission%20enquiry", cursor: "Enquire" },
  },
  {
    id: "art-therapy",
    match: ["/art-therapy"],
    eyebrow: "Art Therapy",
    head: [
      { t: "Interested in exploring" },
      { t: "whether this is suitable" },
      { t: "for your organisation?", accent: true },
    ],
    sub: null,
    button: {
      label: "Book a Discovery Call",
      to: "/contact?subject=Art%20therapy%20enquiry",
      cursor: "Book",
    },
  },
  {
    id: "projects",
    match: ["/projects"],
    eyebrow: "Featured Projects",
    head: [{ t: "Have a query about my" }, { t: "paintings or art therapy?", accent: true }],
    sub: null,
    button: { label: "Contact Me", to: "/contact", cursor: "Contact" },
  },
  {
    id: "about",
    match: ["/about"],
    eyebrow: "Paintings",
    head: [{ t: "My art is to be felt," }, { t: "not just seen.", accent: true }],
    sub: null,
    button: { label: "View My Paintings", to: "/works", cursor: "View" },
  },
  {
    id: "journal",
    match: ["/journal"],
    eyebrow: "Journal",
    head: [{ t: "Have a query about my" }, { t: "paintings or art therapy?", accent: true }],
    sub: null,
    button: { label: "Contact Me", to: "/contact", cursor: "Contact" },
  },
];

// Routes where the big CTA band is suppressed — the contact page already *is*
// the conversation, so doubling up would read as a template.
const SUPPRESS = ["/contact"];

/**
 * Resolve the CTA for a pathname by prefix match, so nested routes like
 * `/series/awakening` and `/journal/the-gift` inherit their section's close.
 * Returns `null` where the band should be suppressed, else the matching CTA
 * (falling back to the home invitation).
 */
export function ctaForPath(pathname = "/") {
  const path = (pathname || "/").replace(/\/+$/, "") || "/";
  if (SUPPRESS.some((p) => path === p || path.startsWith(p + "/"))) return null;
  const hit = ROUTES.find((r) => r.match.some((p) => path === p || path.startsWith(p + "/")));
  return hit || HOME_CTA;
}
