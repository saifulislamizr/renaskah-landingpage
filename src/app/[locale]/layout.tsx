import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { locales, isLocale, type Locale } from "@/lib/locale";
import { getContent } from "@/content";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import WhatsAppClickTracker from "@/components/layout/WhatsAppClickTracker";
import Script from "next/script";
import { GA_ID } from "@/lib/analytics";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const SITE_URL = "https://renaskah.com";

export async function generateMetadata(
  props: LayoutProps<"/[locale]">
): Promise<Metadata> {
  const { locale } = await props.params;
  if (!isLocale(locale)) return {};
  const content = getContent(locale);

  const languageAlternates = Object.fromEntries(
    locales.map((l) => [l, l === "ms" ? SITE_URL + "/ms" : `${SITE_URL}/${l}`])
  );

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: content.seo.title,
      template: `%s | Renaskah`,
    },
    description: content.seo.description,
    keywords: content.seo.keywords,
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: { ...languageAlternates, "x-default": `${SITE_URL}/ms` },
    },
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      url: `${SITE_URL}/${locale}`,
      siteName: "Renaskah",
      locale: locale === "ms" ? "ms_MY" : "en_MY",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.title,
      description: content.seo.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout(props: LayoutProps<"/[locale]">) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();

  const content = getContent(locale as Locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Renaskah",
    alternateName: "Reka Naskah Enterprise",
    url: SITE_URL,
    description: content.seo.description,
    areaServed: "MY",
    knowsLanguage: ["ms", "en"],
    sameAs: [],
  };

  return (
    <html
      lang={locale}
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-white"
        >
          {content.misc.skipToContent}
        </a>
        <Navbar locale={locale as Locale} content={content} />
        <main id="main-content" className="flex-1">
          {props.children}
        </main>
        <Footer locale={locale as Locale} content={content} />
        <FloatingWhatsApp content={content} />
        <WhatsAppClickTracker />
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","${GA_ID}");`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
