"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import type { BeforeAfterExample, BeforeAfterPage } from "@/content/schema";
import { usePdfDocument } from "./usePdfDocument";
import { useNearViewport } from "./useNearViewport";
import PdfPageCanvas from "./PdfPageCanvas";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * The headline proof moment: a draggable before/after comparison at a
 * chosen page, rendered live from the real PDFs via pdf.js (not static
 * exported images). Kept separate from PdfCompareViewer, which stays
 * available underneath for anyone who wants to page through the whole
 * document.
 */
export default function PdfCompareSlider({
  example,
  pages,
  beforeLabel,
  afterLabel,
  jumpToLabel,
  dragHandleLabel,
  loadingLabel,
}: {
  example: BeforeAfterExample;
  pages: BeforeAfterPage[];
  beforeLabel: string;
  afterLabel: string;
  jumpToLabel: string;
  dragHandleLabel: string;
  loadingLabel: string;
}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [setObserveRef, isNear] = useNearViewport<HTMLDivElement>();
  const setWrapperRef = (node: HTMLDivElement | null) => {
    wrapperRef.current = node;
    setObserveRef(node);
  };

  const beforeDoc = usePdfDocument(example.beforeHref, isNear);
  const afterDoc = usePdfDocument(example.afterHref, isNear);
  const docsReady = beforeDoc.status === "ready" && afterDoc.status === "ready";

  const [page, setPage] = useState(pages[0]?.pageNumber ?? 1);
  const [position, setPosition] = useState(50);
  const [scale, setScale] = useState(1);
  const naturalWidthRef = useRef<number | null>(null);
  const draggingRef = useRef(false);

  // Fit the page width to the container, computed once per document load.
  useEffect(() => {
    if (!docsReady || naturalWidthRef.current !== null) return;
    let cancelled = false;
    beforeDoc.doc?.getPage(1).then((p) => {
      if (cancelled) return;
      naturalWidthRef.current = p.getViewport({ scale: 1 }).width;
      const containerWidth = wrapperRef.current?.clientWidth;
      if (containerWidth) setScale(clamp(containerWidth / naturalWidthRef.current, 0.3, 3));
    });
    return () => {
      cancelled = true;
    };
  }, [docsReady, beforeDoc.doc]);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      const natural = naturalWidthRef.current;
      if (width && natural) setScale(clamp(width / natural, 0.3, 3));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function updatePositionFromClientX(clientX: number) {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(clamp(pct, 0, 100));
  }

  function handlePointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    draggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePositionFromClientX(e.clientX);
  }
  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    updatePositionFromClientX(e.clientX);
  }
  function handlePointerUp(e: ReactPointerEvent<HTMLDivElement>) {
    draggingRef.current = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  }
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") setPosition((p) => clamp(p - 3, 0, 100));
    if (e.key === "ArrowRight") setPosition((p) => clamp(p + 3, 0, 100));
  }

  return (
    <div>
      {pages.length > 1 && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-ink-400">{jumpToLabel}</span>
          {pages.map((p) => (
            <button
              key={p.pageNumber}
              type="button"
              onClick={() => setPage(p.pageNumber)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                page === p.pageNumber
                  ? "border-copper-500 bg-copper-500 text-white"
                  : "border-border bg-surface text-ink-600 hover:border-copper-300"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      <div
        ref={setWrapperRef}
        className="relative mx-auto max-w-2xl select-none overflow-hidden rounded-2xl border border-border bg-ink-950/[0.03]"
      >
        {!docsReady && (
          <div className="flex aspect-[210/297] w-full items-center justify-center">
            <span className="flex items-center gap-2 text-sm text-ink-400">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink-300 border-t-copper-500" />
              {loadingLabel}
            </span>
          </div>
        )}

        {docsReady && afterDoc.doc && beforeDoc.doc && (
          <div className="relative">
            {/* Base layer: after, always fully visible */}
            <PdfPageCanvas doc={afterDoc.doc} pageNumber={Math.min(page, afterDoc.numPages)} scale={scale} />

            {/* Overlay layer: before, clipped to the left `position`% */}
            <div
              className="pointer-events-none absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <PdfPageCanvas doc={beforeDoc.doc} pageNumber={Math.min(page, beforeDoc.numPages)} scale={scale} />
            </div>

            <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink-950/80 px-2.5 py-1 text-xs font-semibold text-white">
              {beforeLabel}
            </span>
            <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-copper-500/90 px-2.5 py-1 text-xs font-semibold text-white">
              {afterLabel}
            </span>

            {/* Draggable divider */}
            <div
              role="slider"
              tabIndex={0}
              aria-label={dragHandleLabel}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(position)}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onKeyDown={handleKeyDown}
              className="absolute inset-y-0 flex w-6 -translate-x-1/2 cursor-ew-resize touch-none items-center justify-center focus-visible:outline-none"
              style={{ left: `${position}%` }}
            >
              <span className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)]" />
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink-700 shadow-lg ring-1 ring-black/10">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
                </svg>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
