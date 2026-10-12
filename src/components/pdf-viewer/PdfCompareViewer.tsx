"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { BeforeAfterExample, PdfViewerChrome } from "@/content/schema";
import { usePdfDocument } from "./usePdfDocument";
import { useNearViewport } from "./useNearViewport";
import PdfPanel from "./PdfPanel";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ZoomInIcon,
  ZoomOutIcon,
  FullscreenIcon,
  FullscreenExitIcon,
  DownloadIcon,
} from "@/components/ui/icons";

const MIN_SCALE = 0.4;
const MAX_SCALE = 3;
const ZOOM_STEP = 0.15;
const PANEL_GAP = 16; // px, matches the lg:divide-x gap below
const PANEL_PADDING = 32; // px, PdfPanel's own p-4 on both sides

const toolbarButtonClass =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-700 transition-colors hover:bg-ink-900/5 disabled:opacity-30 disabled:pointer-events-none";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function PdfCompareViewer({
  example,
  viewer,
}: {
  example: BeforeAfterExample;
  viewer: PdfViewerChrome;
}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [setObserveRef, isNear] = useNearViewport<HTMLDivElement>();
  const setWrapperRef = useCallback(
    (node: HTMLDivElement | null) => {
      wrapperRef.current = node;
      setObserveRef(node);
    },
    [setObserveRef]
  );

  const beforeDoc = usePdfDocument(example.beforeHref, isNear);
  const afterDoc = usePdfDocument(example.afterHref, isNear);

  const [page, setPage] = useState(1);
  const [scale, setScale] = useState(1);
  const [activeTab, setActiveTab] = useState<"before" | "after">("before");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [panelWidth, setPanelWidth] = useState(0);
  // Determined client-side only (post-mount) so server/initial-client render
  // match — Fullscreen API support can't be feature-detected during SSR.
  const [fullscreenSupported, setFullscreenSupported] = useState(false);

  const autoFitDone = useRef(false);
  const naturalWidthRef = useRef<number | null>(null);

  const beforeScrollRef = useRef<HTMLDivElement>(null);
  const afterScrollRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const syncingRef = useRef(false);

  const maxPages = Math.max(beforeDoc.numPages, afterDoc.numPages, 1);
  const docsReady = beforeDoc.status === "ready" || afterDoc.status === "ready";

  const fitToWidth = useCallback(() => {
    const natural = naturalWidthRef.current;
    if (!natural || !panelWidth) return;
    setScale(clamp((panelWidth - PANEL_PADDING) / natural, MIN_SCALE, MAX_SCALE));
    autoFitDone.current = true;
  }, [panelWidth]);

  // Track the lg breakpoint (matches the rest of the site's Tailwind `lg:`
  // usage) so we know how much horizontal space one panel actually has.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width) setPanelWidth(isDesktop ? (width - PANEL_GAP) / 2 : width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [isDesktop]);

  // Read the first page's natural (scale = 1) size directly from pdf.js,
  // independent of whatever is currently rendered, so "fit width" and the
  // reset-zoom button both have a stable number to compute from.
  useEffect(() => {
    if (naturalWidthRef.current !== null) return;
    const doc = beforeDoc.doc ?? afterDoc.doc;
    if (!doc) return;
    let cancelled = false;
    doc.getPage(1).then((page) => {
      if (cancelled) return;
      naturalWidthRef.current = page.getViewport({ scale: 1 }).width;
      if (!autoFitDone.current) fitToWidth();
    });
    return () => {
      cancelled = true;
    };
  }, [beforeDoc.doc, afterDoc.doc, fitToWidth]);

  useEffect(() => {
    if (!autoFitDone.current && naturalWidthRef.current && panelWidth) fitToWidth();
  }, [panelWidth, fitToWidth]);

  // Reset scroll position on page/zoom change so a new page always opens
  // from the top instead of wherever the previous page happened to scroll to.
  useEffect(() => {
    beforeScrollRef.current?.scrollTo(0, 0);
    afterScrollRef.current?.scrollTo(0, 0);
    mobileScrollRef.current?.scrollTo(0, 0);
  }, [page, scale]);

  useEffect(() => {
    // Feature detection has to happen post-mount (SSR has no `document`),
    // and must run once on mount rather than in a lazy useState initializer
    // or the server/first-client-render HTML would mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFullscreenSupported(!!document.documentElement.requestFullscreen);
    function handleChange() {
      setIsFullscreen(document.fullscreenElement === wrapperRef.current);
    }
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      wrapperRef.current?.requestFullscreen?.().catch(() => {});
    }
  }

  function goPrev() {
    setPage((p) => Math.max(1, p - 1));
  }
  function goNext() {
    setPage((p) => Math.min(maxPages, p + 1));
  }
  function zoomIn() {
    setScale((s) => clamp(Math.round((s + ZOOM_STEP) * 100) / 100, MIN_SCALE, MAX_SCALE));
  }
  function zoomOut() {
    setScale((s) => clamp(Math.round((s - ZOOM_STEP) * 100) / 100, MIN_SCALE, MAX_SCALE));
  }

  function syncScroll(source: "before" | "after") {
    if (!isDesktop || syncingRef.current) return;
    const srcEl = source === "before" ? beforeScrollRef.current : afterScrollRef.current;
    const dstEl = source === "before" ? afterScrollRef.current : beforeScrollRef.current;
    if (!srcEl || !dstEl) return;

    syncingRef.current = true;
    const maxSrcY = srcEl.scrollHeight - srcEl.clientHeight;
    const maxDstY = dstEl.scrollHeight - dstEl.clientHeight;
    dstEl.scrollTop = maxDstY > 0 ? (srcEl.scrollTop / (maxSrcY || 1)) * maxDstY : 0;
    requestAnimationFrame(() => {
      syncingRef.current = false;
    });
  }

  const panelAreaClass = isFullscreen ? "min-h-0 flex-1" : "h-[65vh] max-h-[45rem] min-h-[22rem]";

  return (
    <div
      ref={setWrapperRef}
      className={
        isFullscreen
          ? "flex h-full w-full flex-col bg-surface"
          : "overflow-hidden rounded-2xl bg-surface neu-raised"
      }
    >
      {/* Toolbar — shared by both panels/tabs */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-border bg-paper-muted px-3 py-2 sm:px-4">
        <div className="flex items-center gap-1">
          <button type="button" onClick={goPrev} disabled={!docsReady || page <= 1} aria-label={viewer.previousPage} className={toolbarButtonClass}>
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <span className="flex items-center gap-1.5 px-1 text-sm text-ink-700">
            {viewer.pageLabel}
            <input
              type="number"
              min={1}
              max={maxPages}
              value={page}
              disabled={!docsReady}
              onChange={(e) => {
                const next = Number(e.target.value);
                if (Number.isFinite(next)) setPage(clamp(Math.round(next), 1, maxPages));
              }}
              className="w-11 rounded-md border border-ink-900/15 bg-surface px-1 py-0.5 text-center text-sm tabular-nums"
              aria-label={viewer.pageLabel}
            />
            {viewer.ofLabel} {maxPages}
          </span>
          <button type="button" onClick={goNext} disabled={!docsReady || page >= maxPages} aria-label={viewer.nextPage} className={toolbarButtonClass}>
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button type="button" onClick={zoomOut} disabled={scale <= MIN_SCALE} aria-label={viewer.zoomOut} className={toolbarButtonClass}>
            <ZoomOutIcon className="h-4 w-4" />
          </button>
          <span className="w-11 text-center text-xs font-medium tabular-nums text-ink-500" aria-label={viewer.zoomLevel}>
            {Math.round(scale * 100)}%
          </span>
          <button type="button" onClick={zoomIn} disabled={scale >= MAX_SCALE} aria-label={viewer.zoomIn} className={toolbarButtonClass}>
            <ZoomInIcon className="h-4 w-4" />
          </button>
          {fullscreenSupported && (
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? viewer.exitFullscreen : viewer.fullscreen}
              className={toolbarButtonClass}
            >
              {isFullscreen ? <FullscreenExitIcon className="h-4 w-4" /> : <FullscreenIcon className="h-4 w-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Before/After tab toggle */}
      <div className="flex border-b border-border lg:hidden" role="tablist">
        {(["before", "after"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
              activeTab === tab ? "border-copper-500 text-ink-950" : "border-transparent text-ink-400"
            }`}
          >
            {tab === "before" ? example.beforeLabel : example.afterLabel}
          </button>
        ))}
      </div>

      {/* Desktop: side-by-side */}
      <div className={`hidden lg:grid lg:grid-cols-2 lg:divide-x lg:divide-border ${panelAreaClass}`}>
        <div className="flex min-h-0 flex-col">
          <p className="border-b border-border px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ink-400">
            {example.beforeLabel}
          </p>
          <PdfPanel
            ref={beforeScrollRef}
            status={beforeDoc.status}
            doc={beforeDoc.doc}
            numPages={beforeDoc.numPages}
            page={page}
            scale={scale}
            label={example.beforeLabel}
            loadingLabel={viewer.loading}
            errorLabel={viewer.error}
            onScroll={() => syncScroll("before")}
          />
        </div>
        <div className="flex min-h-0 flex-col">
          <p className="border-b border-border px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ink-400">
            {example.afterLabel}
          </p>
          <PdfPanel
            ref={afterScrollRef}
            status={afterDoc.status}
            doc={afterDoc.doc}
            numPages={afterDoc.numPages}
            page={page}
            scale={scale}
            label={example.afterLabel}
            loadingLabel={viewer.loading}
            errorLabel={viewer.error}
            onScroll={() => syncScroll("after")}
          />
        </div>
      </div>

      {/* Mobile: single panel, switched by the tab toggle above */}
      <div className={`lg:hidden ${panelAreaClass}`}>
        <PdfPanel
          ref={mobileScrollRef}
          status={activeTab === "before" ? beforeDoc.status : afterDoc.status}
          doc={activeTab === "before" ? beforeDoc.doc : afterDoc.doc}
          numPages={activeTab === "before" ? beforeDoc.numPages : afterDoc.numPages}
          page={page}
          scale={scale}
          label={activeTab === "before" ? example.beforeLabel : example.afterLabel}
          loadingLabel={viewer.loading}
          errorLabel={viewer.error}
        />
      </div>

      {/* Download — kept as a clearly separate, optional action */}
      <div className="flex flex-wrap gap-4 border-t border-border px-4 py-3">
        <a
          href={example.beforeHref}
          download
          className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-500 hover:text-copper-600"
        >
          <DownloadIcon className="h-3.5 w-3.5" />
          {viewer.downloadBefore}
        </a>
        <a
          href={example.afterHref}
          download
          className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-500 hover:text-copper-600"
        >
          <DownloadIcon className="h-3.5 w-3.5" />
          {viewer.downloadAfter}
        </a>
      </div>
    </div>
  );
}
