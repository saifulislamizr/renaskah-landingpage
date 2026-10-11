"use client";

import { useId, useState } from "react";
import type { PricingContent } from "@/content/schema";
import { fieldInputClass } from "@/components/ui/Field";
import { WhatsAppIcon } from "@/components/ui/icons";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";

type Service = "formatting" | "proofreading";

/** "RM1.20" -> 1.2. Rates come from pricing-data.ts via the content files. */
function parseRate(rate: string): number {
  return Number.parseFloat(rate.replace(/[^0-9.]/g, "")) || 0;
}

function formatRm(value: number): string {
  return `RM${value.toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Instant estimate above the full pricing tables, so visitors don't
 * have to do rate x quantity in their head. Uses the same tiers the
 * tables render, so the two can never disagree.
 */
export default function PriceCalculator({ pricing }: { pricing: PricingContent }) {
  const c = pricing.calculator;
  const [service, setService] = useState<Service>("formatting");
  const [quantity, setQuantity] = useState("");
  const [tierIndex, setTierIndex] = useState(2); // 14 days, a common middle choice
  const qtyId = useId();
  const tierId = useId();

  const table = service === "formatting" ? pricing.formatting : pricing.proofreading;
  const tier = table.tiers[tierIndex] ?? table.tiers[0];
  const qty = Math.max(0, Math.floor(Number(quantity) || 0));
  const estimate = qty * parseRate(tier.rate);
  const hasEstimate = estimate > 0;

  const accent =
    service === "formatting"
      ? { tabOn: "bg-teal-600 text-white", total: "text-teal-700" }
      : { tabOn: "bg-copper-500 text-white", total: "text-copper-700" };

  const serviceName = service === "formatting" ? c.formattingTab : c.proofreadingTab;
  const qtyLabel = service === "formatting" ? c.pagesLabel : c.wordsLabel;

  function sendToWhatsApp() {
    const message = `${c.whatsappIntro}

${c.messageLabels.service}: ${serviceName}
${c.messageLabels.quantity}: ${qty.toLocaleString("en-MY")} (${qtyLabel})
${c.messageLabels.turnaround}: ${tier.turnaround}
${c.messageLabels.estimate}: ${formatRm(estimate)}`;
    track("generate_lead", { service, source: "kalkulator" });
    window.open(buildWhatsAppLink(message, "kalkulator"), "_blank", "noopener,noreferrer");
  }

  const tabBase = "flex-1 rounded-xl px-4 py-2.5 text-center text-sm font-semibold transition-colors min-h-11";

  return (
    <div className="mx-auto mt-12 max-w-4xl rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <h3 className="font-serif text-2xl font-semibold tracking-tight text-ink-950">{c.title}</h3>
      <p className="mt-1.5 text-sm text-ink-500">{c.intro}</p>

      <div className="mt-6 grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-end">
        <div className="space-y-4">
          <div role="tablist" className="flex gap-2 rounded-xl bg-paper-muted p-1.5">
            {(["formatting", "proofreading"] as const).map((s) => (
              <button
                key={s}
                type="button"
                role="tab"
                aria-selected={service === s}
                onClick={() => setService(s)}
                className={`${tabBase} ${service === s ? accent.tabOn : "text-ink-600 hover:bg-ink-900/5"}`}
              >
                {s === "formatting" ? c.formattingTab : c.proofreadingTab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor={qtyId} className="mb-1.5 block text-sm font-medium text-ink-800">
                {qtyLabel}
              </label>
              <input
                id={qtyId}
                type="number"
                inputMode="numeric"
                min={0}
                placeholder={service === "formatting" ? c.pagesPlaceholder : c.wordsPlaceholder}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className={fieldInputClass}
              />
            </div>
            <div>
              <label htmlFor={tierId} className="mb-1.5 block text-sm font-medium text-ink-800">
                {c.turnaroundLabel}
              </label>
              <select
                id={tierId}
                value={tierIndex}
                onChange={(e) => setTierIndex(Number(e.target.value))}
                className={fieldInputClass}
              >
                {table.tiers.map((t, i) => (
                  <option key={t.turnaround} value={i}>
                    {t.turnaround}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-paper-muted p-5" aria-live="polite">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">{c.estimateLabel}</p>
          {hasEstimate ? (
            <>
              <p className={`mt-1 font-serif text-4xl font-bold tabular-nums tracking-tight ${accent.total}`}>
                {formatRm(estimate)}
              </p>
              <p className="mt-1 text-xs text-ink-400">
                {qty.toLocaleString("en-MY")} x {tier.rate}
              </p>
              <p className="mt-1 text-sm text-ink-500">
                {c.depositLabel}: <span className="font-semibold tabular-nums text-ink-800">{formatRm(estimate / 2)}</span>
              </p>
            </>
          ) : (
            <p className="mt-2 text-sm text-ink-400">{c.emptyEstimate}</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink-400">{c.note}</p>
        <button
          type="button"
          onClick={sendToWhatsApp}
          disabled={!hasEstimate}
          className="inline-flex min-h-12 w-full shrink-0 items-center sm:w-auto justify-center gap-2 rounded-full bg-whatsapp px-6 text-sm font-semibold text-white transition-colors hover:bg-whatsapp-dark disabled:pointer-events-none disabled:opacity-40"
        >
          <WhatsAppIcon className="h-5 w-5" />
          {c.ctaLabel}
        </button>
      </div>
    </div>
  );
}
