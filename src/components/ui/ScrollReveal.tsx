"use client";

import type { ReactNode } from "react";
import { useInView } from "./useInView";

/**
 * Fade-and-rise reveal on scroll entry. Pass `delay` (ms) to stagger a
 * list of these, e.g. delay={i * 120} for the problem-section pain
 * points or a row of testimonial cards. Fires once, respects
 * prefers-reduced-motion via the duration override in globals.css.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
