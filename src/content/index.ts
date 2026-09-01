import type { Locale } from "@/lib/locale";
import type { SiteContent } from "./schema";
import { ms } from "./ms";
import { en } from "./en";

const contentByLocale: Record<Locale, SiteContent> = { ms, en };

export function getContent(locale: Locale): SiteContent {
  return contentByLocale[locale];
}

export type { SiteContent } from "./schema";
