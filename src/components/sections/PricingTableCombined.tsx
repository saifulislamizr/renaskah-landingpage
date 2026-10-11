import type { PricingContent } from "@/content/schema";
import Button from "@/components/ui/Button";

/**
 * Mobile-only view of the same full price list: one table with a
 * column per service instead of two stacked cards, so every rate stays
 * visible at roughly half the scroll height. Desktop keeps the two
 * PricingTable cards side by side.
 */
export default function PricingTableCombined({ pricing }: { pricing: PricingContent }) {
  const { formatting, proofreading } = pricing;
  const rows = formatting.tiers.map((tier, i) => ({
    turnaround: tier.turnaround,
    group: tier.group,
    formattingRate: tier.rate,
    proofreadingRate: proofreading.tiers[i]?.rate ?? "",
  }));
  const groups = [
    { key: "standard", label: formatting.standardGroupLabel },
    { key: "urgent", label: formatting.urgentGroupLabel },
  ] as const;

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="grid grid-cols-[1fr_1fr_1fr] gap-2 bg-ink-950 px-4 py-3 text-white">
        <span className="text-xs font-semibold uppercase tracking-wide text-white/70">{formatting.turnaroundLabel}</span>
        <span className="text-right">
          <span className="block text-sm font-semibold text-teal-200">{formatting.serviceLabel}</span>
          <span className="block text-[11px] text-white/60">{formatting.unitLabel}</span>
        </span>
        <span className="text-right">
          <span className="block text-sm font-semibold text-copper-200">{proofreading.serviceLabel}</span>
          <span className="block text-[11px] text-white/60">{proofreading.unitLabel}</span>
        </span>
      </div>

      <div className="px-4 pb-2">
        {groups.map((group) => (
          <div key={group.key}>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-ink-400">{group.label}</p>
            <ul>
              {rows
                .filter((row) => row.group === group.key)
                .map((row) => (
                  <li
                    key={row.turnaround}
                    className="grid grid-cols-[1fr_1fr_1fr] gap-2 border-b border-border py-2 text-sm last:border-b-0"
                  >
                    <span className="text-ink-600">{row.turnaround}</span>
                    <span className="text-right font-semibold tabular-nums text-teal-700">{row.formattingRate}</span>
                    <span className="text-right font-semibold tabular-nums text-copper-700">{row.proofreadingRate}</span>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="grid gap-2 border-t border-border p-4">
        <Button href="#sebut-harga" variant="secondary" size="md" className="w-full">
          {formatting.ctaLabel}
        </Button>
        <Button href="#sebut-harga" variant="primary" size="md" className="w-full">
          {proofreading.ctaLabel}
        </Button>
      </div>
    </div>
  );
}
