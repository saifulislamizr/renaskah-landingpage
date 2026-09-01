/**
 * Public pricing, sourced verbatim from the vault's internal pricing
 * table (15 - Pricing/Renaskah Pricing - INTERNAL.md). That document is
 * marked confidential and previously instructed against public display,
 * a later, explicit instruction overrode that specifically for this
 * page. Rates are kept as exact pre-formatted strings (not computed
 * from a float) so the displayed figures always match the vault
 * source exactly, no rounding or formatting-function edge cases.
 *
 * Single source of truth shared by both locale content files, each
 * locale only supplies its own turnaround-label wording (see
 * formatTurnaroundMs / formatTurnaroundEn below).
 */

export type PricingGroup = "standard" | "urgent";

export interface PricingRow {
  value: number;
  unit: "day" | "hour";
  group: PricingGroup;
  proofreadingRate: string;
  formattingRate: string;
}

export const pricingTable: PricingRow[] = [
  { value: 30, unit: "day", group: "standard", proofreadingRate: "RM0.020", formattingRate: "RM1.20" },
  { value: 20, unit: "day", group: "standard", proofreadingRate: "RM0.024", formattingRate: "RM1.50" },
  { value: 14, unit: "day", group: "standard", proofreadingRate: "RM0.032", formattingRate: "RM1.80" },
  { value: 10, unit: "day", group: "standard", proofreadingRate: "RM0.040", formattingRate: "RM2.00" },
  { value: 7, unit: "day", group: "urgent", proofreadingRate: "RM0.048", formattingRate: "RM2.50" },
  { value: 5, unit: "day", group: "urgent", proofreadingRate: "RM0.060", formattingRate: "RM3.00" },
  { value: 4, unit: "day", group: "urgent", proofreadingRate: "RM0.072", formattingRate: "RM4.50" },
  { value: 2, unit: "day", group: "urgent", proofreadingRate: "RM0.088", formattingRate: "RM6.00" },
  { value: 1, unit: "day", group: "urgent", proofreadingRate: "RM0.108", formattingRate: "RM10.00" },
  { value: 12, unit: "hour", group: "urgent", proofreadingRate: "RM0.132", formattingRate: "RM15.00" },
  { value: 6, unit: "hour", group: "urgent", proofreadingRate: "RM0.164", formattingRate: "RM20.00" },
  { value: 3, unit: "hour", group: "urgent", proofreadingRate: "RM0.200", formattingRate: "RM25.00" },
];

export function formatTurnaroundMs(row: PricingRow): string {
  return row.unit === "day" ? `${row.value} hari` : `${row.value} jam`;
}

export function formatTurnaroundEn(row: PricingRow): string {
  if (row.unit === "day") return `${row.value} ${row.value === 1 ? "day" : "days"}`;
  return `${row.value} ${row.value === 1 ? "hour" : "hours"}`;
}
