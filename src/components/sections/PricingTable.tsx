import type { PricingTableContent } from "@/content/schema";
import Button from "@/components/ui/Button";

const accentStyles = {
  copper: {
    border: "border-copper-200",
    header: "bg-copper-500",
    groupLabel: "text-copper-600",
    rate: "text-copper-700",
  },
  teal: {
    border: "border-teal-200",
    header: "bg-teal-600",
    groupLabel: "text-teal-600",
    rate: "text-teal-700",
  },
} as const;

/**
 * One full pricing card (Proofreading or Formatting). Reused for both so
 * the two tables always stay structurally identical, only the accent
 * colour and data differ.
 */
export default function PricingTable({
  table,
  accent,
}: {
  table: PricingTableContent;
  accent: "copper" | "teal";
}) {
  const styles = accentStyles[accent];
  const standardRows = table.tiers.filter((t) => t.group === "standard");
  const urgentRows = table.tiers.filter((t) => t.group === "urgent");

  return (
    <div className={`overflow-hidden rounded-2xl bg-surface neu-raised`}>
      <div className={`${styles.header} px-6 py-6 text-white`}>
        <p className="text-sm font-semibold uppercase tracking-wide text-white/80">{table.serviceLabel}</p>
        <p className="mt-1 font-serif text-3xl font-bold tracking-tight sm:text-4xl">{table.unitLabel}</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-2 border-b border-border pb-2 text-xs font-semibold uppercase tracking-wide text-ink-400">
          <span>{table.turnaroundLabel}</span>
          <span className="text-right">{table.rateLabel}</span>
        </div>

        <p className={`mt-3 text-xs font-semibold uppercase tracking-wide ${styles.groupLabel}`}>{table.standardGroupLabel}</p>
        <ul>
          {standardRows.map((tier) => (
            <li key={tier.turnaround} className="grid grid-cols-2 gap-2 border-b border-border py-2.5 text-sm">
              <span className="text-ink-600">{tier.turnaround}</span>
              <span className={`text-right font-semibold tabular-nums ${styles.rate}`}>{tier.rate}</span>
            </li>
          ))}
        </ul>

        <p className={`mt-4 text-xs font-semibold uppercase tracking-wide ${styles.groupLabel}`}>{table.urgentGroupLabel}</p>
        <ul>
          {urgentRows.map((tier) => (
            <li key={tier.turnaround} className="grid grid-cols-2 gap-2 border-b border-border py-2.5 text-sm last:border-b-0">
              <span className="text-ink-600">{tier.turnaround}</span>
              <span className={`text-right font-semibold tabular-nums ${styles.rate}`}>{tier.rate}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <Button href="#sebut-harga" variant={accent === "teal" ? "secondary" : "primary"} size="lg" className="w-full">
            {table.ctaLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
