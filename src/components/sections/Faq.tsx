"use client";

import { useState } from "react";
import type { SiteContent } from "@/content/schema";
import SectionHeading from "@/components/ui/SectionHeading";
import { ChevronDownIcon } from "@/components/ui/icons";

export default function Faq({ content }: { content: SiteContent }) {
  const { faq } = content;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 border-b border-border py-16 sm:py-24">
      <div className="container-page">
        <SectionHeading title={faq.title} />

        <div className="mt-10 max-w-3xl divide-y divide-border border-y border-border">
          {faq.items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-serif text-base font-semibold text-ink-950 sm:text-lg">
                    {item.question}
                  </span>
                  <ChevronDownIcon
                    className={`h-5 w-5 shrink-0 text-ink-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <p className="pb-5 pr-8 text-sm leading-relaxed text-ink-500 sm:text-base">{item.answer}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
