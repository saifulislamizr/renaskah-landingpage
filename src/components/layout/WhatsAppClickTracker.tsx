"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";
import { whatsAppSourceFromLink } from "@/lib/whatsapp";

/**
 * One delegated listener for every wa.me link on the page, so buttons
 * don't each need their own tracking code. The quote form opens
 * WhatsApp with window.open instead of a link, and tracks itself.
 */
export default function WhatsAppClickTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as Element | null)?.closest?.('a[href*="wa.me"]');
      if (!link) return;
      track("whatsapp_click", { source: whatsAppSourceFromLink(link.getAttribute("href") ?? "") });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
