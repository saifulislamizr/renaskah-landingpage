import Image from "next/image";
import type { SiteContent } from "@/content/schema";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import Button from "@/components/ui/Button";
import HashLink from "@/components/ui/HashLink";
import SlideReveal from "@/components/ui/SlideReveal";
import HighlightedText from "@/components/ui/HighlightedText";
import { WhatsAppIcon, ArrowRightIcon, ChevronRightIcon } from "@/components/ui/icons";

export default function Hero({ content }: { content: SiteContent }) {
  const whatsappLink = buildWhatsAppLink(content.hero.whatsappPrefill);

  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Subtle brand watermark, the logo's ink identity used sparingly, not scattered */}
      <Image
        src="/images/logo/renaskah-monogram.png"
        alt=""
        aria-hidden="true"
        width={900}
        height={750}
        className="pointer-events-none absolute -right-40 -top-24 hidden w-[36rem] opacity-[0.05] sm:block lg:w-[42rem]"
      />

      <div className="container-page relative grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12 lg:py-28">
        <div className="animate-fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-copper-600">{content.hero.eyebrow}</p>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-ink-950 sm:text-5xl lg:text-[3.4rem]">
            <HighlightedText line={content.hero.headline} />
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-500">{content.hero.body}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#sebut-harga" variant="primary" size="lg" icon={<ArrowRightIcon className="h-5 w-5" />}>
              {content.hero.ctaPrimary}
            </Button>
            <Button href={whatsappLink} external variant="secondary" size="lg" icon={<WhatsAppIcon className="h-5 w-5" />}>
              {content.hero.ctaSecondary}
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative rounded-3xl border border-border bg-surface p-8 shadow-[0_20px_60px_-15px_rgba(20,20,30,0.15)] sm:p-10">
            <SlideReveal direction="left">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/images/hero/thesis-stack.jpg"
                  alt="Tesis siap dijilid, sedia untuk dihantar"
                  fill
                  sizes="(min-width: 1024px) 35vw, 85vw"
                  className="object-cover"
                  priority
                />
              </div>
            </SlideReveal>
            <HashLink
              href="#before-after"
              className="mt-8 flex items-center justify-between rounded-xl border border-copper-200 bg-copper-50 px-4 py-3 text-sm font-semibold text-copper-700 transition-colors hover:bg-copper-100"
            >
              {content.hero.visualBadge}
              <ChevronRightIcon className="h-4 w-4 shrink-0" />
            </HashLink>
          </div>
        </div>
      </div>
    </section>
  );
}
