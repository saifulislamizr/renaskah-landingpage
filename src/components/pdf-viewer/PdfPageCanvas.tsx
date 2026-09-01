"use client";

import { useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy, RenderTask } from "pdfjs-dist";

/**
 * Renders a single PDF page into a canvas at the given scale — one page
 * at a time, on demand. Cancels any in-flight render when the page/scale
 * changes or the component unmounts, which pdf.js requires to avoid
 * "cannot render while another render is in progress" errors.
 */
export default function PdfPageCanvas({
  doc,
  pageNumber,
  scale,
}: {
  doc: PDFDocumentProxy;
  pageNumber: number;
  scale: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const taskRef = useRef<RenderTask | null>(null);
  const [rendering, setRendering] = useState(true);

  useEffect(() => {
    let cancelled = false;
    taskRef.current?.cancel();
    // Re-show the spinner immediately whenever page/scale/doc changes and a
    // new render starts — the standard "reset to loading on new fetch" shape.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRendering(true);

    (async () => {
      const pdfjsLib = await import("pdfjs-dist");
      const page = await doc.getPage(pageNumber);
      if (cancelled) return;

      const viewport = page.getViewport({ scale });
      const canvas = canvasRef.current;
      if (!canvas) return;

      const outputScale = new pdfjsLib.OutputScale();
      canvas.width = Math.floor(viewport.width * outputScale.sx);
      canvas.height = Math.floor(viewport.height * outputScale.sy);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;

      const transform = outputScale.scaled ? [outputScale.sx, 0, 0, outputScale.sy, 0, 0] : undefined;
      const task = page.render({ canvas, viewport, transform });
      taskRef.current = task;

      try {
        await task.promise;
        if (!cancelled) setRendering(false);
      } catch (err) {
        if (!(err instanceof pdfjsLib.RenderingCancelledException)) throw err;
      }
    })();

    return () => {
      cancelled = true;
      taskRef.current?.cancel();
    };
  }, [doc, pageNumber, scale]);

  return (
    <div className="relative inline-block">
      <canvas ref={canvasRef} className="block" />
      {rendering && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface/60">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-ink-300 border-t-copper-500" />
        </div>
      )}
    </div>
  );
}
