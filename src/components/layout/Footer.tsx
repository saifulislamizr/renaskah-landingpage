import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/locale";
import type { SiteContent } from "@/content/schema";
import { WHATSAPP_DISPLAY_NUMBER, buildWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/icons";
import HashLink from "@/components/ui/HashLink";

export default function Footer({ locale, content }: { locale: Locale; content: SiteContent }) {
  const year = new Date().getFullYear();
  const whatsappLink = buildWhatsAppLink(
    locale === "ms"
      ? "Hai Renaskah, saya ingin bertanya tentang servis anda."
      : "Hi Renaskah, I'd like to ask about your services."
  );

  return (
    <footer className="border-t border-border bg-ink-950 text-ink-300">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href={`/${locale}`} prefetch={false} className="inline-block">
            <Image
              src="/images/logo/renaskah-wordmark-white.png"
              alt="Renaskah, Proofreading & Formatting"
              width={1692}
              height={525}
              className="h-9 w-auto sm:h-10"
            />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-300">{content.footer.description}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-400">{content.footer.servicesTitle}</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><HashLink href="#formatting" className="hover:text-white">{content.footer.services[0]}</HashLink></li>
            <li><HashLink href="#proofreading" className="hover:text-white">{content.footer.services[1]}</HashLink></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-400">{content.footer.quickLinksTitle}</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {content.footer.quickLinks.map((link) => (
              <li key={link.href}>
                <HashLink href={link.href} className="hover:text-white">{link.label}</HashLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-400">{content.footer.contactTitle}</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
                <WhatsAppIcon className="h-4 w-4 text-whatsapp" />
                {WHATSAPP_DISPLAY_NUMBER}
              </a>
            </li>
            <li>renaskah.com</li>
            <li>{content.footer.languagesLabel}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {content.footer.copyright}
          </p>
          <p>
            {content.footer.legalName} · {content.footer.regNo}
          </p>
        </div>
      </div>
    </footer>
  );
}
