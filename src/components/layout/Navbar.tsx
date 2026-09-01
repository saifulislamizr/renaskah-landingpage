"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/locale";
import type { SiteContent } from "@/content/schema";
import { buildWhatsAppLink, WHATSAPP_DISPLAY_NUMBER } from "@/lib/whatsapp";
import Button from "@/components/ui/Button";
import HashLink from "@/components/ui/HashLink";
import { MenuIcon, CloseIcon, WhatsAppIcon } from "@/components/ui/icons";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar({ locale, content }: { locale: Locale; content: SiteContent }) {
  const [open, setOpen] = useState(false);
  const whatsappLink = buildWhatsAppLink(
    locale === "ms"
      ? "Hai Renaskah, saya ada soalan tentang servis Proofreading/Formatting."
      : "Hi Renaskah, I have a question about your Proofreading/Formatting service."
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/80">
      <nav className="container-page flex h-16 items-center justify-between gap-6 sm:h-20 lg:gap-4 xl:gap-10" aria-label="Main">
        <Link href={`/${locale}`} className="flex shrink-0 items-center">
          <Image
            src="/images/logo/renaskah-navbar-mark.png"
            alt="Renaskah, Proofreading & Formatting"
            width={957}
            height={912}
            className="h-11 w-auto sm:h-13"
            priority
          />
        </Link>

        <div className="hidden items-center gap-4 xl:gap-8 lg:flex">
          {content.nav.links.map((link) => (
            <HashLink
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm font-medium text-ink-700 transition-colors hover:text-copper-600"
            >
              {link.label}
            </HashLink>
          ))}
        </div>

        <div className="hidden items-center gap-2 xl:gap-3 lg:flex">
          <LanguageSwitcher locale={locale} label={content.misc.languageSwitcherLabel} />
          <Button
            href={whatsappLink}
            external
            variant="secondary"
            size="md"
            icon={<WhatsAppIcon className="h-4 w-4" />}
            aria-label={WHATSAPP_DISPLAY_NUMBER}
          >
            <span className="hidden xl:inline">{WHATSAPP_DISPLAY_NUMBER}</span>
          </Button>
          <Button href="#sebut-harga" variant="primary" size="md">
            {content.nav.ctaLabel}
          </Button>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full text-ink-900 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-paper lg:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {content.nav.links.map((link) => (
              <HashLink
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-ink-800 hover:bg-ink-900/5"
              >
                {link.label}
              </HashLink>
            ))}
            <div className="mt-2 flex items-center justify-between px-3">
              <LanguageSwitcher locale={locale} label={content.misc.languageSwitcherLabel} />
            </div>
            <div className="mt-3 flex flex-col gap-2 px-3">
              <Button
                href={whatsappLink}
                external
                variant="secondary"
                size="lg"
                icon={<WhatsAppIcon className="h-5 w-5" />}
                className="w-full"
              >
                {WHATSAPP_DISPLAY_NUMBER}
              </Button>
              <Button href="#sebut-harga" variant="primary" size="lg" className="w-full" onClick={() => setOpen(false)}>
                {content.nav.ctaLabel}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
