"use client";

import type { SiteContent } from "@/content/schema";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/icons";

/**
 * Fixed WhatsApp CTA. Bottom-right, offset enough on mobile to avoid
 * covering form submit buttons or the bottom nav of a phone browser.
 */
export default function FloatingWhatsApp({ content }: { content: SiteContent }) {
  const link = buildWhatsAppLink(
    "Hai Renaskah, saya ingin bertanya tentang servis Proofreading/Formatting."
  );

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={content.misc.whatsappFloatingLabel}
      className="fixed bottom-5 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon className="h-7 w-7" />
      <span className="sr-only">{content.misc.whatsappFloatingLabel}</span>
    </a>
  );
}
