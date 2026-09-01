/**
 * Single source of truth for the Renaskah WhatsApp number and the
 * quotation message builders. Keep this file free of any pricing
 * data — quotation happens over WhatsApp, never on the site.
 */

/** Human-readable number shown in the UI. */
export const WHATSAPP_DISPLAY_NUMBER = "010-316 5172";

/** International-format target used to build wa.me links. */
export const WHATSAPP_TARGET_NUMBER = "60103165172";

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_TARGET_NUMBER}?text=${encodeURIComponent(message)}`;
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
