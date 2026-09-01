"use client";

import type { ReactNode } from "react";
import { useInView } from "./useInView";

/**
 * Marker-style keyword highlight. The background "draws in" like a
 * highlighter stroke the first time it scrolls into view (see .mark in
 * globals.css), then stays filled. Reduced-motion users see the filled
 * state immediately, no draw-in, handled entirely in CSS.
 *
 * Used sparingly, 1 to 3 phrases per section, never whole sentences.
 */
export default function Highlight({
  children,
  color = "copper",
  className = "",
}: {
  children: ReactNode;
  color?: "copper" | "teal";
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();

  return (
    <span
      ref={ref}
      className={`mark ${color === "teal" ? "mark-teal" : "mark-copper"} ${inView ? "is-visible" : ""} ${className}`}
    >
      {children}
    </span>
  );
}
