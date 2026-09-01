import type { SiteContent } from "./schema";
import { testimonialItems } from "./testimonials-data";
import { beforeAfterAsset } from "./before-after-data";
import { pricingTable, formatTurnaroundEn } from "./pricing-data";

const documentTypeOptions = [
  "Thesis",
  "Dissertation",
  "Journal Article",
  "Research Proposal",
  "Proposal",
  "Report",
  "Book",
  "Manuscript",
];

export const en: SiteContent = {
  seo: {
    title: "Renaskah | Professional Thesis Proofreading & Formatting",
    description:
      "Professional proofreading and formatting services for thesis, journals, proposals, reports and manuscripts in Bahasa Melayu and English. Full pricing, upfront.",
    keywords: [
      "thesis proofreading",
      "proofreading thesis Malaysia",
      "thesis formatting Malaysia",
      "academic proofreading Malaysia",
      "English proofreading Malaysia",
      "proofreading Bahasa Melayu",
      "thesis formatting price",
    ],
  },
  nav: {
    links: [
      { label: "Formatting", href: "#formatting" },
      { label: "Proofreading", href: "#proofreading" },
      { label: "Pricing", href: "#harga" },
      { label: "Testimonials", href: "#testimoni" },
      { label: "How It Works", href: "#cara-kerja" },
      { label: "FAQ", href: "#faq" },
    ],
    ctaLabel: "Check My Document",
  },
  hero: {
    eyebrow: "Academic Proofreading & Formatting",
    headline: {
      lead: "Your Thesis Is Done, But Still Stuck on ",
      keyword: "Formatting and Proofreading",
      tail: "?",
    },
    body: "Renaskah helps solve the language and formatting problems keeping your document from being ready to submit.",
    ctaPrimary: "Check My Document",
    ctaSecondary: "WhatsApp Renaskah",
    visualBadge: "See Our Work, Before and After",
    whatsappPrefill: "Hi Renaskah, I'd like to ask about your Proofreading/Formatting service.",
  },
  trustBar: {
    sinceLabel: "Since 2015",
    countValue: 300,
    countSuffix: "+",
    countLabel: "Theses & Manuscripts Completed",
    languagesLabel: "Bahasa Melayu & English",
    urgentLabel: "Urgent Service Available",
    urgentNote: "up to 3 hours*",
    urgentDisclaimer:
      "*Urgent turnaround depends on document size, scope of work, complexity, and staff availability at the time. Not guaranteed for every job.",
  },
  problem: {
    eyebrow: "The Problem We Understand",
    title: {
      lead: "The Research Is Done, But You're Still Struggling with ",
      keyword: "Your Document",
      tail: "?",
    },
    intro: "It's not the content that's the problem. This is what usually happens before submission:",
    points: [
      { lead: "You fix the ", keyword: "page numbers", tail: ", and something else shifts." },
      { lead: "The TOC ", keyword: "updates", tail: ", but the rest of the formatting doesn't." },
      { lead: "Headings and subheadings ", keyword: "don't match", tail: "." },
      { lead: "Margins don't follow ", keyword: "the university guideline", tail: "." },
      { lead: "References are ", keyword: "inconsistently", tail: " formatted." },
      { lead: "The deadline's close, ", keyword: "the document", tail: " still isn't ready." },
    ],
    bridge: { lead: "Let us help you ", keyword: "solve", tail: " this." },
  },
  documentTypeOptions,
  formatting: {
    id: "formatting",
    eyebrow: "Formatting Service",
    headline: { lead: "We Help Organize and Tidy Up the ", keyword: "Formatting", tail: " of Your Document." },
    outcome:
      "We fix the structure and layout of your document to match your university, journal or publisher guideline, from margins and heading hierarchy through to references and lists of tables. You don't spend hours fixing it yourself.",
    unitLabel: "Per Page",
    scopeToggleLabel: "See Full Scope",
    scopeTitle: "Formatting Scope",
    scopeItems: [
      "Margins",
      "Fonts",
      "Line spacing",
      "Paragraph spacing",
      "Indentation",
      "Heading & subheading hierarchy",
      "Page numbering",
      "Section breaks",
      "Tables",
      "Figures",
      "Captions",
      "Table of Contents",
      "List of Tables",
      "List of Figures",
      "Citation formatting",
      "Reference formatting",
    ],
    excludedTitle: "Not Included",
    excludedItems: [
      "Newly added pages or content introduced after the original work is completed.",
      "Major changes introduced after the original work is completed.",
    ],
    extraTitle: "Guidelines We Can Follow",
    extraItems: ["APA 7", "Harvard", "IEEE", "University guidelines", "Journal guidelines", "Custom formatting"],
    note: "Formatting revisions continue until the agreed requirements are met. This doesn't include new content or major changes introduced after the original work is completed.",
    tagsLabel: "Good for:",
    ctaLabel: "I Need Formatting",
  },
  proofreading: {
    id: "proofreading",
    eyebrow: "Proofreading Service",
    headline: { lead: "The Words Are There. We Help Check Your ", keyword: "Spelling and Grammar", tail: "." },
    outcome:
      "We check spelling, grammar, punctuation and sentence clarity in your document, in Bahasa Melayu or English, without changing what you meant to say.",
    unitLabel: "Per Word",
    scopeToggleLabel: "See Full Scope",
    scopeTitle: "Proofreading Scope",
    scopeItems: [
      "Spelling",
      "Grammar",
      "Punctuation",
      "Typographical errors",
      "Basic sentence structure",
      "Sentence clarity",
      "Terminology consistency",
      "Language/style consistency",
    ],
    excludedTitle: "Not Included In Standard Proofreading",
    excludedItems: ["Formatting & document layout.", "Fact-checking of content.", "Comprehensive rewriting."],
    extraTitle: "Languages",
    extraItems: ["Bahasa Melayu", "English"],
    tagsLabel: "Good for:",
    ctaLabel: "I Need Proofreading",
  },
  beforeAfter: {
    eyebrow: "Proof, Not Promises",
    title: { lead: "This Is an ", keyword: "Example", tail: " of What We Deliver." },
    intro: "A real thesis manuscript before and after Renaskah's formatting process. Drag to compare.",
    disclaimer: "This sample document is used with the owner's permission.",
    sliderBeforeLabel: "Before",
    sliderAfterLabel: "After",
    jumpToLabel: "Jump to:",
    pages: [
      { label: "Table of Contents", pageNumber: 6 },
      { label: "List of Tables", pageNumber: 7 },
      { label: "Chapter 1 Heading", pageNumber: 8 },
      { label: "Cover Page", pageNumber: 1 },
    ],
    dragHandleLabel: "Drag to compare before and after",
    fullViewerToggleLabel: "View Full Document",
    examples: [
      {
        label: "Thesis Formatting Sample",
        description: "A comparison of structure, headings, spacing and references before and after formatting.",
        beforeHref: beforeAfterAsset.beforeHref,
        afterHref: beforeAfterAsset.afterHref,
        beforeLabel: "Before",
        afterLabel: "After",
        isRealSample: beforeAfterAsset.isRealSample,
      },
    ],
    placeholderNote: "More before/after examples will be added here.",
    viewer: {
      loading: "Loading PDF…",
      error: "Couldn't load the PDF. Please try downloading the file directly.",
      pageLabel: "Page",
      ofLabel: "of",
      previousPage: "Previous page",
      nextPage: "Next page",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
      zoomLevel: "Zoom level",
      fullscreen: "Fullscreen",
      exitFullscreen: "Exit fullscreen",
      downloadBefore: "Download Before PDF",
      downloadAfter: "Download After PDF",
    },
  },
  universityExperience: {
    eyebrow: "Experience",
    title: {
      lead: "We're Experienced Handling a Wide Range of Documents from Different ",
      keyword: "Universities and Institutions",
      tail: ".",
    },
    intro: "Since 2015, we've handled manuscripts and theses using formatting guidelines from a range of institutions, including:",
    disclaimer:
      "Renaskah is not an official partner of, endorsed by, or representing any university listed here. This list reflects formatting experience only.",
    universities: ["UiTM", "UKM", "UPM", "UM", "UPNM", "UniKL", "UTM"],
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: { lead: "", keyword: "Don't Just Take It", tail: " From Us." },
    intro: "A selection of real responses from Renaskah clients on WhatsApp.",
    disclaimer: "Real screenshots, used with client consent. Names, phone numbers and other personal details have been redacted.",
    imageAlt: "WhatsApp testimonial screenshot from a Renaskah client, name redacted",
    items: testimonialItems,
  },
  whyRenaskah: {
    eyebrow: "Why Renaskah",
    title: { lead: "Why Do Many Clients ", keyword: "Come Back", tail: " to Renaskah's Services?" },
    intro: "Focused support for language and formatting only. Your research stays entirely your own work.",
    points: [
      {
        title: "Familiar with Thesis Formats",
        description:
          "We're used to a wide range of university formats. Issues like page numbering, table of contents, headings, margins, tables, figures and references are things we handle regularly.",
      },
      {
        title: "Can Help When Your Deadline Is Close",
        description:
          "If your submission date is close, urgent service is available. In certain cases, work can be completed in as little as 3 hours, depending on workload and slot availability.",
      },
      {
        title: "If Formatting Issues Remain, We'll Fix Them",
        description:
          "For the Formatting service, if issues remain in the same areas, we'll continue making corrections as long as it doesn't involve adding new content or new pages.",
      },
      {
        title: "BM and English in One Place",
        description:
          "No need to look elsewhere for different languages. Proofreading in Bahasa Melayu and English is available with us, while Formatting can follow the guideline required by your university or journal.",
      },
    ],
  },
  pricing: {
    eyebrow: "See the Pricing First, Then Decide",
    title: { lead: "What Does It ", keyword: "Cost", tail: "?" },
    intro: "We show the full price list upfront so you can calculate and compare based on the turnaround you need.",
    proofreading: {
      serviceLabel: "Proofreading",
      unitLabel: "Per Word",
      turnaroundLabel: "Turnaround",
      rateLabel: "Rate",
      standardGroupLabel: "Standard",
      urgentGroupLabel: "Urgent",
      tiers: pricingTable.map((row) => ({
        turnaround: formatTurnaroundEn(row),
        rate: row.proofreadingRate,
        group: row.group,
      })),
      ctaLabel: "Get A Proofreading Quote",
    },
    formatting: {
      serviceLabel: "Formatting",
      unitLabel: "Per Page",
      turnaroundLabel: "Turnaround",
      rateLabel: "Rate",
      standardGroupLabel: "Standard",
      urgentGroupLabel: "Urgent",
      tiers: pricingTable.map((row) => ({
        turnaround: formatTurnaroundEn(row),
        rate: row.formattingRate,
        group: row.group,
      })),
      ctaLabel: "Get A Formatting Quote",
    },
    depositNote: "50% deposit before work begins.",
    urgentCaveat: "Urgent turnaround is subject to document size, workload, complexity, and availability at the time of enquiry.",
    currencyNote: "Prices in Malaysian Ringgit (RM). Subject to periodic review.",
  },
  howItWorks: {
    eyebrow: "The Process Is Simple",
    title: { lead: "", keyword: "6 Steps", tail: " to a Finished Document." },
    intro: "From sending your details to a finished document, every step is clear.",
    steps: [
      { title: "Choose A Service", description: "Proofreading or Formatting." },
      { title: "Enter Your Details", description: "Document type, word or page count, completion date." },
      { title: "Check The Price", description: "Refer to the full pricing above or request an exact quote." },
      { title: "WhatsApp Renaskah", description: "Submit the form, straight to WhatsApp." },
      { title: "50% Deposit", description: "Work begins as soon as the deposit is received." },
      { title: "Work Begins", description: "Your manuscript is completed to the agreed scope." },
    ],
  },
  quoteForm: {
    eyebrow: "Get A Quote",
    title: { lead: "Send Your Document. We'll ", keyword: "Handle The Rest", tail: "." },
    intro: "Choose a service, fill in your document details, and send it straight to WhatsApp. We'll reply with a quote.",
    serviceToggleLabel: "Choose A Service",
    proofreadingTab: "Proofreading",
    formattingTab: "Formatting",
    fields: {
      name: { label: "Name", placeholder: "Your full name" },
      documentType: { label: "Document Type", placeholder: "e.g. Master's Thesis" },
      language: { label: "Document Language", options: ["Bahasa Melayu", "English"] },
      wordCount: { label: "Word Count", placeholder: "e.g. 15000", helper: "Estimated total word count of the document." },
      pageCount: { label: "Page Count", placeholder: "e.g. 120", helper: "Estimated total page count of the document." },
      institution: { label: "University / Journal", placeholder: "e.g. Universiti Teknologi MARA" },
      guideline: { label: "Guideline / Format", placeholder: "e.g. APA 7, Harvard, university format" },
      dueDate: { label: "Required Completion Date", helper: "Pick the completion date you need." },
      notes: { label: "Additional Notes", placeholder: "Any specific requirements (optional)" },
    },
    requiredError: "This field is required.",
    submitLabel: "Send To WhatsApp",
    privacyNote: "This information is only used to generate a WhatsApp message to Renaskah. No data is stored on our servers.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "FAQ",
    items: [
      {
        question: "What's the difference between Proofreading and Formatting?",
        answer:
          "Proofreading focuses on language: spelling, grammar, punctuation and sentence clarity, priced by word count. Formatting focuses on document structure and layout: headings, spacing, page numbering, tables and references, priced by page count. They are two separate services.",
      },
      {
        question: "Can I request both services at once?",
        answer:
          "Yes. Send two separate enquiries, one for Proofreading and one for Formatting, so the scope and quote are clear for each.",
      },
      {
        question: "How long does the work take?",
        answer:
          "Turnaround depends on document size, scope of work, and staff availability at the time. See the full pricing above for estimated turnaround and rates. Please state your required completion date when requesting a quote.",
      },
      {
        question: "Why is pricing shown by turnaround time?",
        answer:
          "Urgent work needs a different schedule. Rates increase for shorter turnaround, shown in full here so you can plan ahead.",
      },
      {
        question: "Does formatting include a language check?",
        answer:
          "Not automatically. Standard formatting focuses on structure and layout. If you need both language and formatting cleaned up, let us know so we can recommend the right scope.",
      },
      {
        question: "How many formatting revisions are allowed?",
        answer:
          "Formatting revisions continue until the agreed requirements are met. This doesn't include new pages or content, or major changes introduced after the original work is completed.",
      },
      {
        question: "Is my document information kept confidential?",
        answer: "Yes. Your document and information are used solely to complete the work you requested.",
      },
    ],
  },
  finalCta: {
    title: {
      lead: "Your Writing and Research Have Come This Far. Don't Let It Get Stuck on Just ",
      keyword: "Formatting and Proofreading",
      tail: ".",
    },
    body: "Get a Proofreading or Formatting quote today. Straight through WhatsApp.",
    ctaPrimary: "Check My Document",
    ctaSecondary: "WhatsApp Renaskah",
  },
  footer: {
    description: "Renaskah helps fix the language and formatting problems in your academic and professional manuscripts, in Bahasa Melayu and English.",
    servicesTitle: "Services",
    services: ["Formatting", "Proofreading"],
    quickLinksTitle: "Quick Links",
    quickLinks: [
      { label: "Formatting", href: "#formatting" },
      { label: "Proofreading", href: "#proofreading" },
      { label: "Pricing", href: "#harga" },
      { label: "Testimonials", href: "#testimoni" },
      { label: "How It Works", href: "#cara-kerja" },
      { label: "FAQ", href: "#faq" },
    ],
    contactTitle: "Contact Us",
    languagesLabel: "Languages: Bahasa Melayu & English",
    legalName: "Reka Naskah Enterprise",
    regNo: "Reg. No: 202003178667 (CT0074367-H)",
    copyright: "Renaskah. All rights reserved.",
  },
  misc: {
    skipToContent: "Skip to main content",
    whatsappFloatingLabel: "WhatsApp Renaskah",
    languageSwitcherLabel: "Language",
    backToTop: "Back to top",
  },
};
