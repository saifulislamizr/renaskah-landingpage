"use client";

import { forwardRef } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";
import type { PdfDocStatus } from "./usePdfDocument";
import PdfPageCanvas from "./PdfPageCanvas";

interface PdfPanelProps {
  status: PdfDocStatus;
  doc: PDFDocumentProxy | null;
  numPages: number;
  page: number;
  scale: number;
  label: string;
  loadingLabel: string;
  errorLabel: string;
  onScroll?: () => void;
}

/**
 * One scrollable PDF surface — used twice side-by-side on desktop, and
 * once (swapped between Before/After) on mobile.
 */
const PdfPanel = forwardRef<HTMLDivElement, PdfPanelProps>(function PdfPanel(
  { status, doc, numPages, page, scale, label, loadingLabel, errorLabel, onScroll },
  scrollRef
) {
  // Page numbers can differ between the two documents (formatting can add
  // front matter). Clamp to this panel's own last page rather than erroring.
  const effectivePage = Math.min(Math.max(page, 1), Math.max(numPages, 1));

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="flex min-h-0 flex-1 items-start justify-center overflow-auto rounded-b-xl bg-ink-950/[0.03] p-4"
      >
        {status === "loading" && (
          <div className="flex h-full min-h-[16rem] w-full items-center justify-center">
            <span className="flex items-center gap-2 text-sm text-ink-400">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink-300 border-t-copper-500" />
              {loadingLabel}
            </span>
          </div>
        )}
        {status === "error" && (
          <div className="flex h-full min-h-[16rem] w-full items-center justify-center px-6 text-center text-sm text-ink-400">
            {errorLabel}
          </div>
        )}
        {status === "ready" && doc && <PdfPageCanvas doc={doc} pageNumber={effectivePage} scale={scale} />}
      </div>
      <span className="sr-only">{label}</span>
    </div>
  );
});

export default PdfPanel;
