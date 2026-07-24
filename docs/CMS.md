# Content editing (Sanity CMS)

Lisa edits the site's content herself — no code changes, no redeploy. Content
lives in **Sanity**; the site fetches it at runtime, so published edits appear
within seconds.

Phase 1 (done) covers the **Journal**. The painting catalogue is Phase 2.

## Where Lisa logs in

**https://lisateo.sanity.studio/**

She signs in with the account invited to the project (Sanity project
`xy8xfu7q`, dataset `production`). From there she can add / edit / publish
journal posts: title, date, tag, cover image, excerpt, body, and an optional
gallery. Images she uploads are stored and served by Sanity's image CDN.

To invite Lisa: Studio → **Manage** (or https://sanity.io/manage → project
`xy8xfu7q`) → **Members** → invite her email as an **Editor**.

## How the site reads content

- `src/lib/sanity.js` — the read client (project id, dataset, read token,
  `perspective: 'published'`).
- `src/lib/sanityImage.js` — responsive `srcset`/`sizes` off Sanity's image CDN.
- `src/data/journal.js` — GROQ queries + hooks (`useJournalPosts`,
  `useJournalPost`) that map Sanity docs into the shape the pages use.
- Pages: `pages/Journal.jsx`, `pages/JournalPost.jsx`, and the Home teaser in
  `pages/Home.jsx`.

The Studio project + schema live in `studio-lisateo/` (its own package;
Vercel does not build it).

## Read token

This Sanity project uses the newer content-access model, so anonymous reads are
gated. The site uses a **read-only (viewer) token** to fetch published content.

- Local dev/build: `.env.local` → `VITE_SANITY_READ_TOKEN=...` (gitignored).
- The token is read-only (writes return 403) and only returns **published**
  content. It is inlined into the built bundle, which is acceptable because it
  reads public website content.

## Production checklist (Vercel)

Both are required for the live site to show Lisa's content:

1. **Add the read token env var.** In the Vercel project → Settings →
   Environment Variables, add `VITE_SANITY_READ_TOKEN` (value from `.env.local`)
   for Production (and Preview). Redeploy.
2. **Whitelist the production domain in Sanity CORS.** From `studio-lisateo/`:
   ```
   npx sanity cors add https://<your-domain> --no-credentials
   ```
   (Add both the apex and any `www.`/`*.vercel.app` origins the site serves from.)

Without these, the live site degrades gracefully to an empty state
("The first entries are on their way.") — it does not error.

## Common tasks

Run these with Node 22 (`nvm use 22`) and from `website/`.

- **Re-deploy the Studio after a schema change:**
  ```
  cd studio-lisateo && npx sanity deploy
  ```
- **Run the Studio locally:**
  ```
  cd studio-lisateo && npx sanity dev   # http://localhost:3333
  ```
- **Re-run the blog migration** (idempotent; skips existing posts, `--force` to overwrite):
  ```
  node scripts/migrate-blog.mjs
  ```
