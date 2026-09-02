"use client";

import type { ReactNode } from "react";
import { useInView } from "./useInView";

/**
 * True scroll-triggered slide-in for a single image: stays at
 * opacity:0 / translateX (offset smaller on mobile) until roughly
 * 25-30% of the element has crossed into the viewport, then animates
 * once to opacity:1 / translateX(0) over ~0.8s ease-out. Reuses the
 * shared useInView IntersectionObserver hook (fires once, never
 * resets) so this behaves exactly like ScrollReveal, just horizontal —
 * and yields the end state immediately under prefers-reduced-motion
 * via the global transition-duration override in globals.css.
 *
 * Content that starts inside the initial viewport (e.g. the Hero
 * image) will still animate in right on mount — it's already
 * intersecting before any scroll happens, which is how "on view"
 * triggers are supposed to work (Framer Motion's whileInView does the
 * same for above-the-fold content).
 */
export default function SlideReveal({
  children,
  direction,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  direction: "left" | "right";
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.28);
  const hiddenOffset =
    direction === "left" ? "-translate-x-12 sm:-translate-x-20" : "translate-x-12 sm:translate-x-20";

  return (
    <div
      ref={ref}
      className={`transition-all duration-[800ms] ease-out ${
        inView ? "opacity-100 translate-x-0" : `opacity-0 ${hiddenOffset}`
      } ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
