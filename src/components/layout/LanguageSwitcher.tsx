"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeShortLabels, type Locale } from "@/lib/locale";

export default function LanguageSwitcher({
  locale,
  label,
  className = "",
}: {
  locale: Locale;
  label: string;
  className?: string;
}) {
  const pathname = usePathname() ?? `/${locale}`;
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <div className={`flex items-center gap-1 rounded-full border border-ink-900/15 p-1 text-sm ${className}`} aria-label={label}>
      {locales.map((l) => {
        const href = `/${l}${rest ? `/${rest}` : ""}`;
        const active = l === locale;
        return (
          <Link
            key={l}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex min-h-11 items-center justify-center rounded-full px-3.5 font-medium transition-colors ${
              active ? "bg-ink-900 text-white" : "text-ink-500 hover:bg-ink-900/5"
            }`}
          >
            {localeShortLabels[l]}
          </Link>
        );
      })}
    </div>
  );
}
