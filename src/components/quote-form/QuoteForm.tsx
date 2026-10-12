"use client";

import { useId, useState, type FormEvent } from "react";
import type { SiteContent } from "@/content/schema";
import {
  buildFormattingMessage,
  buildProofreadingMessage,
  buildWhatsAppLink,
} from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import Assurances from "@/components/ui/Assurances";
import Field, { fieldInputClass } from "@/components/ui/Field";
import HighlightedText from "@/components/ui/HighlightedText";
import { ArrowRightIcon } from "@/components/ui/icons";

type Service = "proofreading" | "formatting";

interface FormValues {
  name: string;
  documentType: string;
  language: string;
  wordCount: string;
  pageCount: string;
  institution: string;
  guideline: string;
  dueDate: string;
  notes: string;
}

const emptyValues: FormValues = {
  name: "",
  documentType: "",
  language: "",
  wordCount: "",
  pageCount: "",
  institution: "",
  guideline: "",
  dueDate: "",
  notes: "",
};

export default function QuoteForm({ content }: { content: SiteContent }) {
  const { quoteForm: qf, documentTypeOptions } = content;
  const datalistId = useId();

  const [service, setService] = useState<Service>("proofreading");
  const [values, setValues] = useState<FormValues>({
    ...emptyValues,
    language: qf.fields.language.options[0] ?? "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, boolean>>>({});

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: false }));
  }

  function getRequiredKeys(): (keyof FormValues)[] {
    const common: (keyof FormValues)[] = ["name", "documentType", "dueDate"];
    return service === "proofreading"
      ? [...common, "language", "wordCount"]
      : [...common, "pageCount", "institution", "guideline"];
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const required = getRequiredKeys();
    const nextErrors: Partial<Record<keyof FormValues, boolean>> = {};
    for (const key of required) {
      if (!values[key].trim()) nextErrors[key] = true;
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstKey = required.find((key) => nextErrors[key]);
      if (firstKey) {
        document.getElementById(`qf-${firstKey}`)?.focus();
      }
      return;
    }

    const message =
      service === "proofreading"
        ? buildProofreadingMessage({
            name: values.name,
            documentType: values.documentType,
            language: values.language,
            wordCount: values.wordCount,
            dueDate: values.dueDate,
            notes: values.notes,
          })
        : buildFormattingMessage({
            name: values.name,
            documentType: values.documentType,
            pageCount: values.pageCount,
            institution: values.institution,
            guideline: values.guideline,
            dueDate: values.dueDate,
            notes: values.notes,
          });

    track("generate_lead", { service });
    window.open(buildWhatsAppLink(message, service === "proofreading" ? "borang-proofreading" : "borang-formatting"), "_blank", "noopener,noreferrer");
  }

  const tabBase =
    "flex-1 rounded-xl px-4 py-3 text-center text-sm font-semibold transition-colors min-h-12";

  return (
    <section id="sebut-harga" className="scroll-mt-20 bg-paper-muted py-16 sm:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-ink-950 sm:text-4xl">
            <HighlightedText line={qf.title} />
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-500">{qf.intro}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mx-auto mt-10 max-w-2xl rounded-3xl bg-surface p-6 neu-raised sm:p-8"
        >
          <fieldset>
            <legend className="mb-2 block text-sm font-medium text-ink-800">{qf.serviceToggleLabel}</legend>
            <div role="tablist" className="flex gap-2 rounded-xl bg-paper-muted p-1.5 neu-inset-sm">
              <button
                type="button"
                role="tab"
                aria-selected={service === "proofreading"}
                onClick={() => setService("proofreading")}
                className={`${tabBase} ${
                  service === "proofreading" ? "bg-ink-950 text-white" : "text-ink-600 hover:bg-ink-900/5"
                }`}
              >
                {qf.proofreadingTab}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={service === "formatting"}
                onClick={() => setService("formatting")}
                className={`${tabBase} ${
                  service === "formatting" ? "bg-ink-950 text-white" : "text-ink-600 hover:bg-ink-900/5"
                }`}
              >
                {qf.formattingTab}
              </button>
            </div>
          </fieldset>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field id="qf-name" label={qf.fields.name.label} required error={errors.name ? qf.requiredError : undefined}>
              <input
                id="qf-name"
                type="text"
                autoComplete="name"
                placeholder={qf.fields.name.placeholder}
                value={values.name}
                onChange={(e) => update("name", e.target.value)}
                aria-invalid={!!errors.name}
                className={fieldInputClass}
              />
            </Field>

            <Field
              id="qf-documentType"
              label={qf.fields.documentType.label}
              required
              error={errors.documentType ? qf.requiredError : undefined}
            >
              <input
                id="qf-documentType"
                type="text"
                list={datalistId}
                placeholder={qf.fields.documentType.placeholder}
                value={values.documentType}
                onChange={(e) => update("documentType", e.target.value)}
                aria-invalid={!!errors.documentType}
                className={fieldInputClass}
              />
              <datalist id={datalistId}>
                {documentTypeOptions.map((item) => (
                  <option key={item} value={item} />
                ))}
              </datalist>
            </Field>

            {service === "proofreading" ? (
              <>
                <Field id="qf-language" label={qf.fields.language.label} required>
                  <select
                    id="qf-language"
                    value={values.language}
                    onChange={(e) => update("language", e.target.value)}
                    className={`${fieldInputClass} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%235c6478%22 stroke-width=%221.8%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[right_1rem_center] bg-no-repeat pr-10`}
                  >
                    {qf.fields.language.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  id="qf-wordCount"
                  label={qf.fields.wordCount.label}
                  required
                  helper={qf.fields.wordCount.helper}
                  error={errors.wordCount ? qf.requiredError : undefined}
                >
                  <input
                    id="qf-wordCount"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    placeholder={qf.fields.wordCount.placeholder}
                    value={values.wordCount}
                    onChange={(e) => update("wordCount", e.target.value)}
                    aria-invalid={!!errors.wordCount}
                    className={fieldInputClass}
                  />
                </Field>
              </>
            ) : (
              <>
                <Field
                  id="qf-pageCount"
                  label={qf.fields.pageCount.label}
                  required
                  helper={qf.fields.pageCount.helper}
                  error={errors.pageCount ? qf.requiredError : undefined}
                >
                  <input
                    id="qf-pageCount"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    placeholder={qf.fields.pageCount.placeholder}
                    value={values.pageCount}
                    onChange={(e) => update("pageCount", e.target.value)}
                    aria-invalid={!!errors.pageCount}
                    className={fieldInputClass}
                  />
                </Field>

                <Field
                  id="qf-institution"
                  label={qf.fields.institution.label}
                  required
                  error={errors.institution ? qf.requiredError : undefined}
                >
                  <input
                    id="qf-institution"
                    type="text"
                    placeholder={qf.fields.institution.placeholder}
                    value={values.institution}
                    onChange={(e) => update("institution", e.target.value)}
                    aria-invalid={!!errors.institution}
                    className={fieldInputClass}
                  />
                </Field>

                <Field
                  id="qf-guideline"
                  label={qf.fields.guideline.label}
                  required
                  error={errors.guideline ? qf.requiredError : undefined}
                >
                  <input
                    id="qf-guideline"
                    type="text"
                    placeholder={qf.fields.guideline.placeholder}
                    value={values.guideline}
                    onChange={(e) => update("guideline", e.target.value)}
                    aria-invalid={!!errors.guideline}
                    className={fieldInputClass}
                  />
                </Field>
              </>
            )}

            <Field
              id="qf-dueDate"
              label={qf.fields.dueDate.label}
              required
              helper={qf.fields.dueDate.helper}
              error={errors.dueDate ? qf.requiredError : undefined}
            >
              <input
                id="qf-dueDate"
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={values.dueDate}
                onChange={(e) => update("dueDate", e.target.value)}
                aria-invalid={!!errors.dueDate}
                className={fieldInputClass}
              />
            </Field>

            <div className="sm:col-span-2">
              <Field id="qf-notes" label={qf.fields.notes.label}>
                <textarea
                  id="qf-notes"
                  rows={3}
                  placeholder={qf.fields.notes.placeholder}
                  value={values.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  className={`${fieldInputClass} min-h-24 resize-y py-3`}
                />
              </Field>
            </div>
          </div>

          <button
            type="submit"
            className="mt-7 flex w-full min-h-13 items-center justify-center gap-2 rounded-full bg-whatsapp px-6 text-base font-semibold text-white transition-colors hover:bg-whatsapp-dark"
          >
            {qf.submitLabel}
            <ArrowRightIcon className="h-5 w-5" />
          </button>

          <p className="mt-4 text-center text-xs text-ink-400">{qf.privacyNote}</p>
        </form>

        <Assurances content={content.assurances} className="mx-auto mt-6 max-w-2xl" />
      </div>
    </section>
  );
}
