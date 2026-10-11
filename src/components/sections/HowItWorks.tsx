import type { SiteContent } from "@/content/schema";
import SectionHeading from "@/components/ui/SectionHeading";
import HighlightedText from "@/components/ui/HighlightedText";

export default function HowItWorks({ content }: { content: SiteContent }) {
  const { howItWorks: h } = content;

  return (
    <section id="cara-kerja" className="scroll-mt-20 border-b border-border bg-paper-muted py-16 sm:py-24">
      <div className="container-page">
        <SectionHeading title={<HighlightedText line={h.title} />} intro={h.intro} align="center" />

        <ol className="mx-auto mt-10 grid max-w-md gap-5 sm:mt-14 sm:max-w-none sm:grid-cols-2 sm:gap-8 lg:grid-cols-5 lg:gap-4">
          {h.steps.map((step, i) => (
            <li key={step.title} className="relative flex items-start gap-4 text-left sm:flex-col sm:items-center sm:gap-0 sm:text-center">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:h-12 sm:w-12 bg-ink-950 font-serif text-lg font-semibold text-white">
                {i + 1}
              </span>
              {i < h.steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-6 hidden h-px w-full -translate-y-1/2 bg-border lg:block"
                  style={{ left: "calc(50% + 24px)", width: "calc(100% - 24px)" }}
                />
              )}
              <div>
                <h3 className="font-serif text-base font-semibold text-ink-950 sm:mt-4">{step.title}</h3>
                <p className="mt-1 max-w-[16rem] text-sm leading-relaxed text-ink-500 sm:mt-2">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
