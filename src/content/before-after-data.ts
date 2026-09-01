export interface BeforeAfterAsset {
  beforeHref: string;
  afterHref: string;
  isRealSample: boolean;
}

/**
 * Real before/after formatting sample supplied in the vault
 * (14 - Testimonials & Portfolio/Before and After.md), shipped as
 * the original PDFs since no image-cropping tool was available in
 * the build environment. Component links to these for "lihat contoh
 * penuh" rather than rendering inline page thumbnails.
 *
 * To add image-based side-by-side comparisons later (e.g. cropped
 * page screenshots of ToC, heading hierarchy, page numbering),
 * extend BeforeAfterExample entries in ms.ts/en.ts with image paths
 * — the component supports both a document sample and image pairs.
 */
export const beforeAfterAsset: BeforeAfterAsset = {
  beforeHref: "/images/before-after/before-formatting-sample.pdf",
  afterHref: "/images/before-after/after-formatting-sample.pdf",
  isRealSample: true,
};
