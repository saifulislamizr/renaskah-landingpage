"use client";

import { useState } from "react";
import type { SiteContent } from "@/content/schema";
import SectionHeading from "@/components/ui/SectionHeading";
import HighlightedText from "@/components/ui/HighlightedText";
import { ChevronDownIcon } from "@/components/ui/icons";
import PdfCompareSlider from "@/components/pdf-viewer/PdfCompareSlider";
import PdfCompareViewer from "@/components/pdf-viewer/PdfCompareViewer";

export default function BeforeAfter({ content }: { content: SiteContent }) {
  const { beforeAfter: ba } = content;
  const [showFull, setShowFull] = useState(false);
  const example = ba.examples[0];

  return (
    <section id="before-after" className="scroll-mt-20 border-b border-border bg-paper-muted py-12 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow={ba.eyebrow}
          title={<HighlightedText line={ba.title} />}
          intro={ba.intro}
        />

        {example && (
          <div className="mt-8 sm:mt-10">
            <PdfCompareSlider
              example={example}
              pages={ba.pages}
              beforeLabel={ba.sliderBeforeLabel}
              afterLabel={ba.sliderAfterLabel}
              jumpToLabel={ba.jumpToLabel}
              dragHandleLabel={ba.dragHandleLabel}
              loadingLabel={ba.viewer.loading}
            />

            {example.isRealSample && <p className="mx-auto mt-4 max-w-2xl text-center text-xs text-ink-400">{ba.disclaimer}</p>}

            <div className="mx-auto mt-6 max-w-2xl">
              <button
                type="button"
                onClick={() => setShowFull((v) => !v)}
                aria-expanded={showFull}
                className="mx-auto flex w-fit items-center gap-1.5 text-sm font-semibold text-copper-600 hover:text-copper-700"
              >
                {ba.fullViewerToggleLabel}
                <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${showFull ? "rotate-180" : ""}`} />
              </button>

              {showFull && (
                <div className="mt-5">
                  <PdfCompareViewer example={example} viewer={ba.viewer} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
