import type { MouseEvent } from "react";

/**
 * On-page "#anchor" links must always scroll on click, even when the
 * URL hash is already that anchor (e.g. the visitor clicked one CTA,
 * scrolled back up to read a section, then clicked another link
 * pointing at the same anchor). A plain <a href="#..."> / next/link
 * only scrolls when the hash actually changes, so a repeat click
 * silently does nothing without this. Shared by Button and HashLink
 * so every internal anchor on the site behaves the same way.
 */
export function handleHashClick(e: MouseEvent<HTMLAnchorElement>, hash: string) {
  const id = hash.slice(1);
  const el = document.getElementById(id);
  if (!el) return; // let the browser fall back to native hash navigation

  e.preventDefault();
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Wait two frames so anything the click closes (the mobile menu sits
  // inside the sticky header) has collapsed before the target position
  // is measured, otherwise the scroll overshoots by the menu's height.
  requestAnimationFrame(() =>
    requestAnimationFrame(() =>
      el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" })
    )
  );
  if (window.location.hash !== hash) {
    window.history.pushState(null, "", hash);
  }
}
