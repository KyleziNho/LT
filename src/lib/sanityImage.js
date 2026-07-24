// Responsive-image helpers for Sanity-hosted images, mirroring the srcset/sizes
// approach in src/lib/img.js but backed by Sanity's on-demand image CDN (so we
// never ship full-res originals — the browser downloads only the size it needs).
import {urlFor} from './sanity'

// `sizes` presets — display width of a slot at each breakpoint (match img.js).
export const GRID_SIZES = '(max-width: 560px) 92vw, (max-width: 900px) 46vw, 30vw'
export const HERO_SIZES = '100vw'
export const CONTENT_SIZES = '(max-width: 820px) 96vw, 52rem'

const WIDTHS = [400, 700, 1000, 1400, 2000]

// True if this is a usable Sanity image object (has an asset reference).
export const hasImage = (image) => Boolean(image?.asset?._ref || image?.asset?._id)

// A single URL at a target width — used as the non-srcset `src` fallback.
export function src(image, width = 1000) {
  if (!hasImage(image)) return undefined
  return urlFor(image).width(width).auto('format').quality(72).url()
}

// A srcset string across WIDTHS for use with a `sizes` preset above.
export function srcSet(image, widths = WIDTHS) {
  if (!hasImage(image)) return undefined
  return widths
    .map((w) => `${urlFor(image).width(w).auto('format').quality(72).url()} ${w}w`)
    .join(', ')
}

// Everything a responsive <img> needs, in one call.
export function responsive(image, {width = 1000, sizes = GRID_SIZES} = {}) {
  if (!hasImage(image)) return null
  return {src: src(image, width), srcSet: srcSet(image), sizes}
}
