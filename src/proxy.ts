import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/locale";

/**
 * Locale routing.
 *
 * The site has no bare "/" page — the root layout lives at
 * app/[locale]/layout.tsx, so every request needs a locale prefix.
 * This proxy sends "/" (and any path missing a known locale prefix)
 * to the default locale, and never bypasses /ms or /en once present.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Skip proxy for API routes, Next.js internals, and any request for a
     * file with an extension (favicons, sitemap.xml, robots.txt, every
     * asset under public/, the pdf.js worker, etc.) — matched generically
     * by "contains a dot" so newly added static assets never need to be
     * listed here one by one. Only real page navigations get redirected.
     */
    "/((?!api|_next/static|_next/image)(?!.*\\.).*)",
  ],
};
