export const locales = ["ms", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ms";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Human-readable label for the language switcher. */
export const localeLabels: Record<Locale, string> = {
  ms: "Bahasa Melayu",
  en: "English",
};

/** Short label used inside the switcher control itself (e.g. "BM" / "EN"). */
export const localeShortLabels: Record<Locale, string> = {
  ms: "BM",
  en: "EN",
};
