"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Reports true once the observed element has scrolled near the viewport,
 * and stays true afterwards. Used to defer loading/parsing the PDFs until
 * the comparison section is actually about to be seen, instead of on
 * initial page load.
 *
 * Returns a callback ref to attach to the element to observe, plus the
 * "near viewport" flag. A callback ref (rather than a plain ref object) is
 * used deliberately — it re-renders when React attaches the DOM node, so
 * the observer effect below reliably gets a real element to watch even on
 * the very first render.
 */
export function useNearViewport<T extends Element>(): [(node: T | null) => void, boolean] {
  const [node, setNode] = useState<T | null>(null);
  const [isNear, setIsNear] = useState(false);
  const observedRef = useRef(false);

  const setRef = useCallback((el: T | null) => setNode(el), []);

  useEffect(() => {
    if (!node || observedRef.current) return;
    if (typeof IntersectionObserver === "undefined") {
      // No observer support (very old browser) — fail open and load
      // immediately rather than never loading at all.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsNear(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observedRef.current = true;
          setIsNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [node]);

  return [setRef, isNear];
}
