// Sanity read client for the live site.
//
// Content (journal posts, and later the painting catalogue) is authored by
// Lisa in Sanity Studio and fetched here at runtime, so her edits go live
// without a code push or redeploy.
//
// projectId/dataset are public (not secrets); we default them so the site
// works even if the Vite env vars are not set. Override via
// VITE_SANITY_PROJECT_ID / VITE_SANITY_DATASET if needed.
import {createClient} from '@sanity/client'
import createImageUrlBuilder from '@sanity/image-url'

export const sanity = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'xy8xfu7q',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // served from Sanity's CDN; published edits appear within seconds
  // This project uses Sanity's content-access model, so anonymous reads are
  // gated. A read-only (viewer) token lets the public site fetch content.
  // `perspective: 'published'` ensures only published documents are returned,
  // so unpublished drafts never reach the site.
  perspective: 'published',
  token: import.meta.env.VITE_SANITY_READ_TOKEN || undefined,
})

const builder = createImageUrlBuilder(sanity)

// urlFor(imageObject).width(800).url() — build a transformed image URL.
export const urlFor = (source) => builder.image(source)
