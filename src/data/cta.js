// Per-route contextual closing CTA for the global Footer.
//
// Each page should end on a line that speaks to *where you are* — the same dark
// dusk band, but the copy changes so the close reads as considered, not as a
// template footer. Headlines keep the house signature: a Fraunces display line
// with one italic accent word (mark a line `accent: true`).
//
// `head` is an array of lines; each line is `{ t: "text" }`, optionally with
// `accent: true` for the italic Fraunces accent line. `button.cursor` is the
// label the custom magnetic cursor shows on hover.

// The home / default close — the original "wall, story, team" line, kept as the
// site's baseline invitation.
export const HOME_CTA = {
  id: "home",
  eyebrow: "Let's begin",
  head: [{ t: "Have a wall," }, { t: "a story, or a" }, { t: "team in mind?" }],
  sub: null,
  button: { label: "Start a conversation", to: "/contact", cursor: "Begin" },
};

// Ordered by match specificity — first matching prefix wins. `/series/*` sits
// before `/works` conceptually but both resolve to the same "live with it" close.
const ROUTES = [
  {
    id: "works",
    match: ["/works", "/series"],
    eyebrow: "Take one home",
    head: [{ t: "See something" }, { t: "you'd want to" }, { t: "live with?", accent: true }],
    sub: "Each painting ships worldwide, fully insured — and settles into a room as though it had always been there.",
    button: { label: "Enquire about a work", to: "/contact", cursor: "Enquire" },
  },
  {
    id: "commissions",
    match: ["/commissions"],
    eyebrow: "Made for you",
    head: [{ t: "Let's paint" }, { t: "your story.", accent: true }],
    sub: "A piece made for your space and the life inside it — from first conversation to the wall in two to four weeks.",
    button: { label: "Begin a commission", to: "/contact", cursor: "Begin" },
  },
  {
    id: "art-therapy",
    match: ["/art-therapy"],
    eyebrow: "For your team",
    head: [{ t: "Give your team" }, { t: "an hour of" }, { t: "stillness.", accent: true }],
    sub: "A breath-led reset for teams in high-stress work, HRDC-claimable and led on-site by Lisa. No skill required, only willingness.",
    button: { label: "Plan a session", to: "/contact", cursor: "Plan" },
  },
  {
    id: "about",
    match: ["/about"],
    eyebrow: "Keep looking",
    head: [{ t: "Now, come see" }, { t: "the work.", accent: true }],
    sub: "The rest of the story lives in the paintings — inner landscapes charted across three continents.",
    button: { label: "View the collection", to: "/works", cursor: "Explore" },
  },
  {
    id: "journal",
    match: ["/journal"],
    eyebrow: "Keep reading",
    head: [{ t: "Words are one" }, { t: "thing — paint" }, { t: "is another.", accent: true }],
    sub: "Come see the paintings breathe in person, or carry on through the studio notes.",
    button: { label: "See the paintings", to: "/works", cursor: "Explore" },
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
