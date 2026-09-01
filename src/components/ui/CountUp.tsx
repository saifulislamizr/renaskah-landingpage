"use client";

import { useEffect, useState } from "react";
import { useInView } from "./useInView";

/**
 * Animated count-up for a single important statistic (e.g. "300+").
 * Runs once when scrolled into view and never restarts on subsequent
 * scrolling. Reduced-motion users see the final number immediately.
 *
 * Not meant for every number on the page, reserved for the one or two
 * stats where counting up actually communicates scale.
 */
export default function CountUp({
  to,
  duration = 1200,
  prefix = "",
  suffix = "",
  className = "",
}: {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const reduceMotion =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(to);
      return;
    }

    let raf = 0;
    const start = performance.now();
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3; // ease-out cubic
      setValue(Math.round(eased * to));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={`stat-number tabular-nums ${className}`}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
