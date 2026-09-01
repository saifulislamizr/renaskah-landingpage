import Image from "next/image";
import type { SiteContent } from "@/content/schema";
import SectionHeading from "@/components/ui/SectionHeading";
import HighlightedText from "@/components/ui/HighlightedText";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ProblemSection({ content }: { content: SiteContent }) {
  const { problem } = content;

  return (
    <section className="border-b border-border py-16 sm:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12">
        <div>
          <SectionHeading
            eyebrow={problem.eyebrow}
            title={<HighlightedText line={problem.title} />}
            intro={problem.intro}
          />

          <ul className="mt-10 max-w-2xl space-y-1 border-y border-border py-2">
            {problem.points.map((point, i) => (
              <ScrollReveal key={point.keyword + i} delay={i * 90}>
                <li className="border-b border-border py-4 font-serif text-xl leading-snug text-ink-900 last:border-b-0 sm:text-2xl">
                  <HighlightedText line={point} />
                </li>
              </ScrollReveal>
            ))}
          </ul>

          <ScrollReveal delay={problem.points.length * 90 + 100}>
            <p className="mt-10 max-w-2xl font-serif text-2xl leading-snug text-ink-800 sm:text-3xl">
              <HighlightedText line={problem.bridge} color="teal" />
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={150} className="order-first lg:order-none">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_20px_60px_-15px_rgba(20,20,30,0.15)]">
            <Image
              src="/images/editorial/problem-visual.jpg"
              alt=""
              aria-hidden="true"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover object-[78%_22%]"
              priority={false}
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
