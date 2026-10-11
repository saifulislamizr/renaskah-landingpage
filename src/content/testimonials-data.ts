import type { TestimonialItem } from "./schema";

/**
 * Real WhatsApp testimonial screenshots, consent obtained from each
 * client. Shared between locales because the images themselves aren't
 * translated content.
 *
 * All 17 screenshots are pre-blurred by the business (contact name and
 * avatar covered in every header/quoted-reply occurrence) and supplied
 * as a finished, ready-to-use set, no name is displayed anywhere in
 * the UI (see Testimonials.tsx, no figcaption). To replace or add one,
 * drop the new file in public/images/testimonials/ and add/update its
 * entry here, width/height should match the actual image so layout
 * doesn't shift while it loads.
 *
 * Order matters: the carousel opens on the strongest outcome proof
 * (12 and 02: the postgraduate office approved the format, 05: "settled
 * my whole PhD", 09: referral intent). 15 repeats 05's chat, so it
 * stays far from it.
 */
export const testimonialItems: TestimonialItem[] = [
  { src: "/images/testimonials/testimonial-12.png", width: 299, height: 531 },
  { src: "/images/testimonials/testimonial-02.jpg", width: 607, height: 1080 },
  { src: "/images/testimonials/testimonial-05.jpg", width: 607, height: 1080 },
  { src: "/images/testimonials/testimonial-09.png", width: 334, height: 593 },
  { src: "/images/testimonials/testimonial-01.png", width: 339, height: 603 },
  { src: "/images/testimonials/testimonial-03.jpg", width: 607, height: 1080 },
  { src: "/images/testimonials/testimonial-04.jpg", width: 607, height: 1080 },
  { src: "/images/testimonials/testimonial-06.jpg", width: 607, height: 1080 },
  { src: "/images/testimonials/testimonial-07.jpg", width: 607, height: 1080 },
  { src: "/images/testimonials/testimonial-08.jpg", width: 607, height: 1080 },
  { src: "/images/testimonials/testimonial-10.png", width: 334, height: 593 },
  { src: "/images/testimonials/testimonial-11.png", width: 299, height: 531 },
  { src: "/images/testimonials/testimonial-13.png", width: 299, height: 531 },
  { src: "/images/testimonials/testimonial-14.png", width: 299, height: 531 },
  { src: "/images/testimonials/testimonial-15.png", width: 299, height: 531 },
  { src: "/images/testimonials/testimonial-16.png", width: 299, height: 531 },
  { src: "/images/testimonials/testimonial-17.png", width: 299, height: 531 },
];
