"use client";

import { useId, useState } from "react";
import type { ServiceContent } from "@/content/schema";
import Button from "@/components/ui/Button";
import HighlightedText from "@/components/ui/HighlightedText";
import { CheckIcon, XMarkIcon, ChevronDownIcon } from "@/components/ui/icons";

/**
 * Shared layout for the Formatting and Proofreading sections. Outcome
 * copy leads, the scope/excluded/extra lists are real but demoted to a
 * collapsed disclosure rather than dominating the section, per the
 * "sell the outcome, features are supporting details" brief.
 */
export default function ServiceSection({
  content,
  tags,
}: {
  content: ServiceContent;
  tags: string[];
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const accent: "copper" | "teal" = content.id === "formatting" ? "teal" : "copper";

  const accentClasses =
    accent === "teal"
      ? { pill: "bg-teal-50 text-teal-700", chip: "border-teal-200 text-teal-700" }
      : { pill: "bg-copper-50 text-copper-700", chip: "border-copper-200 text-copper-700" };

  return (
    <section id={content.id} className="scroll-mt-20 border-b border-border py-16 sm:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-ink-950 sm:text-4xl">
            <HighlightedText line={content.headline} color={accent} />
          </h2>
          <p className={`mt-4 inline-block rounded-full px-4 py-1.5 text-sm font-semibold ${accentClasses.pill}`}>
            {content.unitLabel}
          </p>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-500">{content.outcome}</p>

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-ink-800">{content.tagsLabel}</h3>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className={`rounded-full border bg-surface px-3 py-1 text-xs font-medium ${accentClasses.chip}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <Button href="#sebut-harga" variant="primary" size="lg">
              {content.ctaLabel}
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
          >
            <span className="font-serif text-lg font-semibold text-ink-950">{content.scopeToggleLabel}</span>
            <ChevronDownIcon className={`h-5 w-5 shrink-0 text-ink-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </button>

          {open && (
            <div id={panelId} className="grid gap-6 border-t border-border p-6 sm:grid-cols-2">
              <div>
                <h4 className="text-sm font-semibold text-ink-800">{content.scopeTitle}</h4>
                <ul className="mt-3 space-y-2">
                  {content.scopeItems.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-ink-700">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {content.extraItems && content.extraTitle && (
                  <div className="mt-5">
                    <h4 className="text-sm font-semibold text-ink-800">{content.extraTitle}</h4>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {content.extraItems.map((item) => (
                        <span key={item} className="rounded-full border border-border bg-paper-muted px-3 py-1 text-xs font-medium text-ink-700">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-sm font-semibold text-ink-800">{content.excludedTitle}</h4>
                <ul className="mt-3 space-y-2">
                  {content.excludedItems.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-ink-500">
                      <XMarkIcon className="mt-0.5 h-4 w-4 shrink-0 text-ink-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {content.note && <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-ink-400">{content.note}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
