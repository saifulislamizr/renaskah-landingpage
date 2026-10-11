/**
 * Conversion tracking. GA4 only loads when NEXT_PUBLIC_GA_ID is set at
 * build time (see app/[locale]/layout.tsx); without it `track` is a
 * silent no-op, so the site works the same with or without analytics.
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

type Gtag = (command: "event", name: string, params?: Record<string, string>) => void;

export function track(name: string, params: Record<string, string> = {}): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") gtag("event", name, params);
}
