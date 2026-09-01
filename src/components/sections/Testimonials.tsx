"use client";

import { useRef } from "react";
import Image from "next/image";
import type { SiteContent } from "@/content/schema";
import SectionHeading from "@/components/ui/SectionHeading";
import HighlightedText from "@/components/ui/HighlightedText";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";

export default function Testimonials({ content }: { content: SiteContent }) {
  const { testimonials: t } = content;
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
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={t.eyebrow} title={<HighlightedText line={t.title} />} intro={t.intro} />

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
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
      </div>
    </section>
  );
}
