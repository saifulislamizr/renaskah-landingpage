/**
 * Shape of all translatable landing-page content. Every section
 * component receives its slice of this object as a typed prop,
 * components never hardcode copy, so the BM and EN sites stay
 * structurally identical while every string differs.
 *
 * See src/content/ms.ts and src/content/en.ts for the two complete,
 * independently-written translations.
 */

/**
 * A short headline or line split into lead / keyword / tail so exactly
 * one phrase can get the marker-style highlight treatment (see
 * components/ui/Highlight.tsx and HighlightedText.tsx), instead of
 * highlighting whole sentences. `lead` and `tail` may be empty strings
 * when the keyword opens or closes the line.
 */
export interface HighlightedLine {
  lead: string;
  keyword: string;
  tail: string;
  keywordColor?: "copper" | "teal";
}

export interface NavContent {
  links: { label: string; href: string }[];
  ctaLabel: string;
  /** Shorter CTA that fits beside the menu button on mobile. */
  ctaShortLabel: string;
}

export interface HeroContent {
  eyebrow: string;
  headline: HighlightedLine;
  body: string;
  ctaPrimary: string;
  ctaSecondary: string;
  visualBadge: string;
  whatsappPrefill: string;
  /** One short, real client quote shown under the hero CTAs. */
  proofQuote: { text: string; attribution: string };
}

export interface TrustBarContent {
  sinceLabel: string;
  countValue: number;
  countSuffix: string;
  countLabel: string;
  languagesLabel: string;
  urgentLabel: string;
  urgentNote: string;
  urgentDisclaimer: string;
}

export interface ProblemContent {
  eyebrow: string;
  title: HighlightedLine;
  intro: string;
  points: HighlightedLine[];
  bridge: HighlightedLine;
}

export interface ServiceContent {
  id: "formatting" | "proofreading";
  eyebrow: string;
  headline: HighlightedLine;
  outcome: string;
  unitLabel: string;
  scopeToggleLabel: string;
  scopeTitle: string;
  scopeItems: string[];
  excludedTitle: string;
  excludedItems: string[];
  extraTitle?: string;
  extraItems?: string[];
  note?: string;
  tagsLabel: string;
  ctaLabel: string;
}

export interface UniversityExperienceContent {
  eyebrow: string;
  title: HighlightedLine;
  intro: string;
  disclaimer: string;
  universities: string[];
}

export interface TestimonialItem {
  src: string;
  width: number;
  height: number;
}

export interface TestimonialsContent {
  eyebrow: string;
  title: HighlightedLine;
  intro: string;
  disclaimer: string;
  imageAlt: string;
  items: TestimonialItem[];
}

export interface WhyPoint {
  title: string;
  description: string;
}

export interface WhyRenaskahContent {
  eyebrow: string;
  title: HighlightedLine;
  intro: string;
  points: WhyPoint[];
}

export interface BeforeAfterExample {
  label: string;
  description: string;
  beforeHref: string;
  afterHref: string;
  beforeLabel: string;
  afterLabel: string;
  isRealSample: boolean;
}

export interface BeforeAfterPage {
  label: string;
  pageNumber: number;
}

export interface PdfViewerChrome {
  loading: string;
  error: string;
  pageLabel: string;
  ofLabel: string;
  previousPage: string;
  nextPage: string;
  zoomIn: string;
  zoomOut: string;
  zoomLevel: string;
  fullscreen: string;
  exitFullscreen: string;
  downloadBefore: string;
  downloadAfter: string;
}

export interface BeforeAfterContent {
  eyebrow: string;
  title: HighlightedLine;
  intro: string;
  disclaimer: string;
  sliderBeforeLabel: string;
  sliderAfterLabel: string;
  jumpToLabel: string;
  pages: BeforeAfterPage[];
  dragHandleLabel: string;
  fullViewerToggleLabel: string;
  examples: BeforeAfterExample[];
  viewer: PdfViewerChrome;
}

export interface PricingTier {
  turnaround: string;
  rate: string;
  group: "standard" | "urgent";
}

export interface PricingTableContent {
  serviceLabel: string;
  unitLabel: string;
  turnaroundLabel: string;
  rateLabel: string;
  standardGroupLabel: string;
  urgentGroupLabel: string;
  tiers: PricingTier[];
  ctaLabel: string;
}

export interface PricingContent {
  eyebrow: string;
  title: HighlightedLine;
  intro: string;
  proofreading: PricingTableContent;
  formatting: PricingTableContent;
  depositNote: string;
  urgentCaveat: string;
  currencyNote: string;
  calculator: PriceCalculatorContent;
}

export interface PriceCalculatorContent {
  title: string;
  intro: string;
  formattingTab: string;
  proofreadingTab: string;
  pagesLabel: string;
  pagesPlaceholder: string;
  wordsLabel: string;
  wordsPlaceholder: string;
  turnaroundLabel: string;
  estimateLabel: string;
  depositLabel: string;
  emptyEstimate: string;
  note: string;
  ctaLabel: string;
  /** Opening line of the WhatsApp message the calculator sends. */
  whatsappIntro: string;
  /** Labels for the lines of that message. */
  messageLabels: { service: string; quantity: string; turnaround: string; estimate: string };
}

/** Short reassurance list shown next to the deposit note and the quote form. */
export interface AssurancesContent {
  title: string;
  items: string[];
}

export interface HowItWorksStep {
  title: string;
  description: string;
}

export interface HowItWorksContent {
  eyebrow: string;
  title: HighlightedLine;
  intro: string;
  steps: HowItWorksStep[];
}

export interface QuoteFormContent {
  eyebrow: string;
  title: HighlightedLine;
  intro: string;
  serviceToggleLabel: string;
  proofreadingTab: string;
  formattingTab: string;
  fields: {
    name: { label: string; placeholder: string };
    documentType: { label: string; placeholder: string };
    language: { label: string; options: string[] };
    wordCount: { label: string; placeholder: string; helper: string };
    pageCount: { label: string; placeholder: string; helper: string };
    institution: { label: string; placeholder: string };
    guideline: { label: string; placeholder: string };
    dueDate: { label: string; helper: string };
    notes: { label: string; placeholder: string };
  };
  requiredError: string;
  submitLabel: string;
  privacyNote: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqContent {
  eyebrow: string;
  title: string;
  items: FaqItem[];
}

export interface FinalCtaContent {
  title: HighlightedLine;
  body: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface FooterContent {
  description: string;
  servicesTitle: string;
  services: string[];
  quickLinksTitle: string;
  quickLinks: { label: string; href: string }[];
  contactTitle: string;
  languagesLabel: string;
  legalName: string;
  regNo: string;
  copyright: string;
}

export interface MiscContent {
  skipToContent: string;
  whatsappFloatingLabel: string;
  languageSwitcherLabel: string;
  backToTop: string;
}

export interface SeoContent {
  title: string;
  description: string;
  keywords: string[];
}

export interface SiteContent {
  seo: SeoContent;
  nav: NavContent;
  hero: HeroContent;
  trustBar: TrustBarContent;
  problem: ProblemContent;
  documentTypeOptions: string[];
  formatting: ServiceContent;
  proofreading: ServiceContent;
  beforeAfter: BeforeAfterContent;
  universityExperience: UniversityExperienceContent;
  testimonials: TestimonialsContent;
  whyRenaskah: WhyRenaskahContent;
  pricing: PricingContent;
  assurances: AssurancesContent;
  howItWorks: HowItWorksContent;
  quoteForm: QuoteFormContent;
  faq: FaqContent;
  finalCta: FinalCtaContent;
  footer: FooterContent;
  misc: MiscContent;
}
