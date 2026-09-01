"use client";

import { useEffect, useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";

export type PdfDocStatus = "idle" | "loading" | "ready" | "error";

interface PdfDocState {
  doc: PDFDocumentProxy | null;
  numPages: number;
  status: PdfDocStatus;
}

// Cache in-flight/loaded documents by URL so the desktop (side-by-side)
// and mobile (tabbed) layouts — which both mount their own panels for
// responsive CSS switching — never fetch or parse the same PDF twice.
const docCache = new Map<string, Promise<PDFDocumentProxy>>();
let workerConfigured = false;

async function loadPdfjs() {
  const pdfjsLib = await import("pdfjs-dist");
  if (!workerConfigured) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
    workerConfigured = true;
  }
  return pdfjsLib;
}

/**
 * Lazily loads a PDF document with pdf.js. Loading only starts once
 * `enabled` is true, so callers can gate it behind an IntersectionObserver
 * and avoid paying for PDF parsing before the viewer is ever scrolled to.
 */
export function usePdfDocument(url: string, enabled: boolean): PdfDocState {
  const [state, setState] = useState<PdfDocState>({ doc: null, numPages: 0, status: "idle" });

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    // Reset to "loading" as soon as `url`/`enabled` changes and a new fetch
    // starts — the standard "reset to loading on new fetch" shape.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState((s) => (s.status === "ready" ? s : { doc: null, numPages: 0, status: "loading" }));

    (async () => {
      try {
        const pdfjsLib = await loadPdfjs();
        let loadPromise = docCache.get(url);
        if (!loadPromise) {
          loadPromise = pdfjsLib.getDocument({ url }).promise;
          docCache.set(url, loadPromise);
        }
        const doc = await loadPromise;
        if (!cancelled) setState({ doc, numPages: doc.numPages, status: "ready" });
      } catch {
        docCache.delete(url);
        if (!cancelled) setState({ doc: null, numPages: 0, status: "error" });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [url, enabled]);

  return state;
}
