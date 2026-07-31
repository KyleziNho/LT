// Parse "120cm x 80cm" / "30.5 x 92cm (2 canvases)" → aspect ratio (w / h).
export function parseAspect(dimensions, fallback = 1) {
  if (!dimensions) return fallback;
  const nums = dimensions.replace(/,/g, "").match(/\d+(\.\d+)?/g);
  if (!nums || nums.length < 2) return fallback;
  const w = parseFloat(nums[0]);
  const h = parseFloat(nums[1]);
  if (!w || !h) return fallback;
  const r = w / h;
  // clamp extremes so nothing breaks the grid rhythm
  return Math.min(2.4, Math.max(0.5, r));
}

// Map a full-size image path to its 900px thumbnail (mirrored under
// /images/thumbs/, always JPEG). Used for grid cards, previews and pathway
// panels; lightboxes and hero frames keep the full-resolution original.
export function thumb(src) {
  if (!src || !/\.(jpe?g|png)$/i.test(src)) return src;
  return src.replace("/images/", "/images/thumbs/").replace(/\.(jpe?g|png)$/i, ".jpg");
}

// Human price / status helpers
export function priceLabel(art) {
  if (art.price) return art.price;
  if (art.status === "sold") return "Sold Out";
  if (art.status === "commission") return "Commissioned";
  return "Enquire";
}
