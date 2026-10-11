/**
 * Single source of truth for the Renaskah WhatsApp number and the
 * quotation message builders. Keep this file free of any pricing
 * data — quotation happens over WhatsApp, never on the site.
 */

/** Human-readable number shown in the UI. */
export const WHATSAPP_DISPLAY_NUMBER = "010-316 5172";

/** International-format target used to build wa.me links. */
export const WHATSAPP_TARGET_NUMBER = "60103165172";

/**
 * Where on the site a WhatsApp enquiry started. It is appended to the
 * message as "(Ref: web-<source>)" so staff can see which button
 * brought the lead in, and analytics reads it back from the link.
 */
export type WhatsAppSource =
  | "navbar"
  | "floating"
  | "footer"
  | "final-cta"
  | "borang-proofreading"
  | "borang-formatting"
  | "kalkulator";

const REF_PATTERN = /\(Ref: web-([a-z-]+)\)/;

export function buildWhatsAppLink(message: string, source?: WhatsAppSource): string {
  const text = source ? `${message}\n\n(Ref: web-${source})` : message;
  return `https://wa.me/${WHATSAPP_TARGET_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** Reads the source tag back out of a wa.me link, or "unknown". */
export function whatsAppSourceFromLink(href: string): string {
  try {
    const text = new URL(href).searchParams.get("text") ?? "";
    return REF_PATTERN.exec(text)?.[1] ?? "unknown";
  } catch {
    return "unknown";
  }
}

export interface ProofreadingQuoteInput {
  name: string;
  documentType: string;
  language: string;
  wordCount: string;
  dueDate: string;
  notes: string;
}

export interface FormattingQuoteInput {
  name: string;
  documentType: string;
  pageCount: string;
  institution: string;
  guideline: string;
  dueDate: string;
  notes: string;
}

/**
 * Message templates are intentionally bilingual-neutral (Bahasa
 * Melayu), matching the vault's canonical WhatsApp & Quote Flow
 * script, regardless of which site locale the enquiry was sent
 * from — this keeps the format Renaskah's staff can parse consistently.
 */
export function buildProofreadingMessage(input: ProofreadingQuoteInput): string {
  const notes = input.notes.trim() || "-";
  return `Hai Renaskah, saya ingin mendapatkan sebut harga untuk Proofreading.

Nama: ${input.name}
Dokumen: ${input.documentType}
Bahasa: ${input.language}
Jumlah perkataan: ${input.wordCount}
Tarikh perlu siap: ${input.dueDate}

Catatan:
${notes}`;
}

export function buildFormattingMessage(input: FormattingQuoteInput): string {
  const notes = input.notes.trim() || "-";
  return `Hai Renaskah, saya ingin mendapatkan sebut harga untuk Formatting.

Nama: ${input.name}
Dokumen: ${input.documentType}
Jumlah muka surat: ${input.pageCount}
Universiti/Jurnal: ${input.institution}
Guideline: ${input.guideline}
Tarikh perlu siap: ${input.dueDate}

Catatan:
${notes}`;
}
