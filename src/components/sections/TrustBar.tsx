import type { SiteContent } from "@/content/schema";
import CountUp from "@/components/ui/CountUp";

export default function TrustBar({ content }: { content: SiteContent }) {
  const { trustBar: t } = content;

  return (
    <section className="bg-paper-muted">
      <div className="container-page py-7 sm:py-8">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center">
          <span className="text-sm font-medium text-ink-700 sm:text-base">{t.sinceLabel}</span>

          <span className="flex items-baseline gap-1.5">
            <CountUp to={t.countValue} suffix={t.countSuffix} className="text-3xl text-ink-950 sm:text-4xl" />
            <span className="text-sm font-medium text-ink-700 sm:text-base">{t.countLabel}</span>
          </span>

          <span className="text-sm font-medium text-ink-700 sm:text-base">{t.languagesLabel}</span>

          <span className="flex items-baseline gap-1.5 text-sm font-medium text-ink-700 sm:text-base">
            {t.urgentLabel}
            <span className="text-xs font-normal text-ink-400">({t.urgentNote})</span>
          </span>
        </div>
        <p className="mt-3 text-center text-xs text-ink-400">{t.urgentDisclaimer}</p>
      </div>
    </section>
  );
}
