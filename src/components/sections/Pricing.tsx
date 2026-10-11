import type { SiteContent } from "@/content/schema";
import SectionHeading from "@/components/ui/SectionHeading";
import HighlightedText from "@/components/ui/HighlightedText";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PricingTable from "./PricingTable";
import PriceCalculator from "./PriceCalculator";
import PricingTableCombined from "./PricingTableCombined";

export default function Pricing({ content }: { content: SiteContent }) {
  const { pricing } = content;

  return (
    <section id="harga" className="scroll-mt-20 border-b border-border py-16 sm:py-24">
      <div className="container-page">
        <SectionHeading eyebrow={pricing.eyebrow} title={<HighlightedText line={pricing.title} />} intro={pricing.intro} align="center" />

        <PriceCalculator pricing={pricing} />

        <div className="sm:hidden">
          <PricingTableCombined pricing={pricing} />
        </div>

        <div className="mx-auto mt-12 hidden max-w-4xl gap-6 sm:grid sm:grid-cols-2">
          <ScrollReveal>
            <PricingTable table={pricing.formatting} accent="teal" />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <PricingTable table={pricing.proofreading} accent="copper" />
          </ScrollReveal>
        </div>

        <div className="mx-auto mt-8 max-w-4xl space-y-1.5 text-center text-xs text-ink-400">
          <p className="font-semibold text-ink-600">{pricing.depositNote}</p>
          <p>{pricing.urgentCaveat}</p>
          <p>{pricing.currencyNote}</p>
        </div>
      </div>
    </section>
  );
}
