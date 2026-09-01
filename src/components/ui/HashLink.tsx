"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { handleHashClick } from "@/lib/scrollToHash";

/**
 * A plain internal "#anchor" link (nav items, footer links) that
 * always scrolls on click, see scrollToHash.ts for why this is
 * needed over a bare <a href="#...">.
 */
export default function HashLink({
  href,
  onClick,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  function onAnchorClick(e: MouseEvent<HTMLAnchorElement>) {
    if (href.startsWith("#")) handleHashClick(e, href);
    onClick?.(e);
  }

  return <a href={href} onClick={onAnchorClick} {...rest} />;
}
