import type { MetadataRoute } from "next";
import { locales } from "@/lib/locale";

const SITE_URL = "https://renaskah.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}`]));

  return locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === "ms" ? 1 : 0.9,
    alternates: { languages },
  }));
}
