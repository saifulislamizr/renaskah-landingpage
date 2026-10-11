"use client";

import { useRef } from "react";
import Image from "next/image";
import type { SiteContent } from "@/content/schema";
import SectionHeading from "@/components/ui/SectionHeading";
import HighlightedText from "@/components/ui/HighlightedText";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";

/**
 * "Why clients come back" and the testimonial screenshots in one
 * section: the question as the headline, the screenshots as the proof,
 * then the four reasons. Keeps the #testimoni anchor the nav links to.
 */
export default function Testimonials({ content }: { content: SiteContent }) {
  const { testimonials: t, whyRenaskah: why } = content;
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = (card?.offsetWidth ?? 280) + 20;
    el.scrollBy({ left: amount * direction, behavior: "smooth" });
  }

  return (
    <section id="testimoni" className="scroll-mt-20 border-b border-border py-16 sm:py-24">
      <div className="container-page">
        <SectionHeading eyebrow={t.eyebrow} title={<HighlightedText line={why.title} />} intro={why.intro} />

        <div className="mt-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h3 className="font-serif text-2xl font-semibold tracking-tight text-ink-950 sm:text-3xl">
              <HighlightedText line={t.title} />
            </h3>
            <p className="mt-2 text-sm text-ink-500 sm:text-base">{t.intro}</p>
          </div>

          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-ink-700 hover:bg-ink-900/5"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-ink-700 hover:bg-ink-900/5"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {t.items.map((item, i) => (
            <ScrollReveal
              key={item.src}
              delay={Math.min(i, 4) * 80}
              className="w-[78%] shrink-0 snap-start sm:w-[42%] lg:w-[27%]"
            >
              <figure data-card className="overflow-hidden rounded-2xl border border-border bg-surface">
                <Image
                  src={item.src}
                  alt={t.imageAlt}
                  width={item.width}
                  height={item.height}
                  className="h-auto w-full"
                  sizes="(min-width: 1024px) 27vw, (min-width: 640px) 42vw, 78vw"
                />
              </figure>
            </ScrollReveal>
          ))}
        </div>

        <p className="mt-4 text-xs text-ink-400">{t.disclaimer}</p>

        <div className="mt-12 grid gap-x-8 gap-y-7 border-t border-border pt-10 sm:mt-14 sm:grid-cols-2 sm:gap-y-10">
          {why.points.map((point, i) => (
            <div key={point.title} className="flex gap-4">
              <span className="font-serif text-2xl font-semibold text-copper-300">{String(i + 1).padStart(2, "0")}</span>
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
