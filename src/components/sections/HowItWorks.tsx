import type { SiteContent } from "@/content/schema";
import SectionHeading from "@/components/ui/SectionHeading";
import HighlightedText from "@/components/ui/HighlightedText";

export default function HowItWorks({ content }: { content: SiteContent }) {
  const { howItWorks: h } = content;

  return (
    <section id="cara-kerja" className="scroll-mt-20 border-b border-border bg-paper-muted py-16 sm:py-24">
      <div className="container-page">
        <SectionHeading title={<HighlightedText line={h.title} />} intro={h.intro} align="center" />

        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {h.steps.map((step, i) => (
            <li key={step.title} className="relative flex flex-col items-center text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-950 font-serif text-lg font-semibold text-white">
                {i + 1}
              </span>
              {i < h.steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-6 hidden h-px w-full -translate-y-1/2 bg-border lg:block"
                  style={{ left: "calc(50% + 24px)", width: "calc(100% - 24px)" }}
                />
              )}
              <h3 className="mt-4 font-serif text-base font-semibold text-ink-950">{step.title}</h3>
              <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-ink-500">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
