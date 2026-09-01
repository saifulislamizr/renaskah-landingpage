import type { SiteContent } from "@/content/schema";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import Button from "@/components/ui/Button";
import HighlightedText from "@/components/ui/HighlightedText";
import { WhatsAppIcon, ArrowRightIcon } from "@/components/ui/icons";

export default function FinalCta({ content }: { content: SiteContent }) {
  const whatsappLink = buildWhatsAppLink(content.hero.whatsappPrefill);

  return (
    <section className="bg-ink-950 py-16 text-white sm:py-24">
      <div className="container-page flex flex-col items-center text-center">
        <h2 className="max-w-2xl font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          <HighlightedText line={content.finalCta.title} />
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-300 sm:text-lg">
          {content.finalCta.body}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="#sebut-harga" variant="primary" size="lg" icon={<ArrowRightIcon className="h-5 w-5" />}>
            {content.finalCta.ctaPrimary}
          </Button>
          <Button href={whatsappLink} external variant="outlineLight" size="lg" icon={<WhatsAppIcon className="h-5 w-5" />}>
            {content.finalCta.ctaSecondary}
          </Button>
        </div>
      </div>
    </section>
  );
}
