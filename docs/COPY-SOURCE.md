# Where every word on this site comes from

The client's rule: **all user-facing copy must be Lisa's own text, taken from
lisateoart.com. Nothing is written on her behalf.** This file records where each
block came from, so any future edit can be checked against the source.

Scraped 30 July 2026 from every URL in `https://www.lisateoart.com/sitemap.xml`
(90 pages: home, about, artist statement, art therapy, corporate art wellness,
commissions, paintings + 47 painting detail pages, exhibitions, contact,
book a call, 6 featured projects, 11 blog posts, 8 testimonial pages).

## Page by page

| Our page | Source on lisateoart.com |
| --- | --- |
| Home hero, intro, art-therapy band, quote, closing | `/` (home) |
| Home "Paintings · Commissions · Art Therapy" panels | `/` (paintings + art therapy blurbs), `/commissions` (intro) |
| Home "Available Artworks" | `/paintings/available-artwork` |
| Home "Featured Projects" | `/featured-projects` |
| `/works` hero + filters | `/paintings` ("Browse All Paintings") |
| `/series/*` narratives | `/paddyfields`, `/corals`, `/mountains`, `/commissions` |
| Painting titles, years, media, sizes, prices, availability, stories | `/paintings/p/<slug>` + the series pages |
| `/commissions` intro, process, FAQ, painting stories | `/commissions` + the FAQ on `/paintings` |
| `/art-therapy` (all sections) | `/art-therapy` |
| `/art-therapy` client roster | `/corporate-art-wellness` |
| `/art-therapy` "Schedule a Call" | `/book-a-call` |
| `/about` (title, opening, quotes, work, reach, therapy, closing) | `/about` |
| `/about` Artist Statement section | `/artiststatement` |
| `/about` exhibitions | `/exhibitions` |
| `/projects` (6 write-ups) | `/featured-projects/*` |
| `/journal` + all 11 posts | `/blog/*` |
| `/contact` | `/contact` |
| Testimonials | `/testimonials-*` (8 pages) |
| Per-page browser titles | each page's own `<title>` |
| Footer / closing CTAs per route | the closing line of the equivalent page |

## Rules applied

1. **Verbatim, including her punctuation and spellings** (`Ogivly`, `an continued
   state of growth`, the hyphen in `Nature is my enduring muse - whether…`,
   her em dashes in the artist statement). Nothing was "tidied".
2. **Quoting a subset is allowed; rewriting is not.** Some testimonials are long,
   so a page shows a continuous verbatim extract, never a paraphrase.
3. **No source, no text.** Where Lisa publishes no description for a painting,
   the `story` field is absent and the card/lightbox simply shows title, year,
   medium, size and price.
4. Structural labels that her site also uses are reused as-is ("Who is this
   for?", "Session Details", "Selected Exhibitions", "Browse All Paintings",
   "Read More", "Enquire", "Sold Out", "Contact Me", "Book a Discovery Call").

## Known inconsistencies on the live site (left as-is, flagged to Lisa)

- **Group size:** "Session Details" says a maximum of **25** participants;
  the FAQ on the same page says a maximum of **20**. Both are reproduced.
- **Availability:** the shop (`/paintings`) marks everything Sold Out except
  Paddy Grains, Euphoria IV, Lionfish and Orange Fan Coral, while the series
  pages still show prices and an "Enquire" button for Purpose, Euphoria III,
  Euphoria V, Harmony and Inner Joy (coral). **The shop wins** (Lisa: "a lot of
  my paintings are now sold, the real website must be correct"), so those five
  read Sold Out here and exactly four works are for sale.
- **Solo exhibition names:** `/about` calls the 2023 Singapore solo show
  *Inbound*; `/exhibitions` calls it *Awakening*. Both appear on their own page.
- **Gallery name:** the Featured Projects write-up says *Gallery 1891*,
  `/exhibitions` says *Gallery 1819*.

## Works with no counterpart on lisateoart.com

These eight are in the catalogue (images came from Lisa's own asset folder) but
do not appear anywhere on the live site, so their AI-written descriptions were
removed rather than replaced:

Dawn At The Paddy Fields · Banana Trees By The Paddy Fields · Sunrise Over
Paddy · Double Harvest · Source · Fullness Of Life · Orange Coral · Plate Corals

All eight are marked **Sold Out** and carry no price: her live site is the
catalogue of what is for sale, and it does not offer them. If any is in fact
still available, set `status: "available"` and add its `price` in
`src/data/artworks.js`. If Lisa has descriptions for them, drop those in too.

## Typography rules this copy needs

Her sentences are long, so the display scale the layout was first tuned for
(2-3 word headings) breaks them into ragged fragments. Two utilities in
`components.css` handle it:

- `.head-long` — sentence-length headings (sizes down, caps the measure at 22ch,
  `text-wrap: balance`). `.head-wide` widens the measure to 32ch.
- `.head-compact` — the same, one step smaller, for a sentence heading sitting in
  a narrow grid column (FAQ rails, split section heads).

Body copy uses `.pretty` (no orphans) and a 44-48ch measure. Avoid forcing line
breaks with `LineReveal lines={[...]}` on anything longer than a short phrase —
the authored breaks fall apart at other widths. Long quotes use the fluid
`.quote-text` scale rather than the fixed display size.
