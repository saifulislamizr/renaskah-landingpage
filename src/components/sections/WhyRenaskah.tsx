import type { SiteContent } from "@/content/schema";
import SectionHeading from "@/components/ui/SectionHeading";
import HighlightedText from "@/components/ui/HighlightedText";

export default function WhyRenaskah({ content }: { content: SiteContent }) {
  return (
    <section className="border-b border-border py-16 sm:py-24">
      <div className="container-page">
        <SectionHeading
          title={<HighlightedText line={content.whyRenaskah.title} />}
          intro={content.whyRenaskah.intro}
        />

        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {content.whyRenaskah.points.map((point, i) => (
            <div key={point.title} className="flex gap-4">
              <span className="font-serif text-2xl font-semibold text-copper-300">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-serif text-lg font-semibold text-ink-950">{point.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
