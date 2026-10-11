import { isLocale, type Locale } from "@/lib/locale";
import { getContent } from "@/content";
import { notFound } from "next/navigation";

import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import ProblemSection from "@/components/sections/ProblemSection";
import ServiceSection from "@/components/sections/ServiceSection";
import BeforeAfter from "@/components/sections/BeforeAfter";
import UniversityExperience from "@/components/sections/UniversityExperience";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import HowItWorks from "@/components/sections/HowItWorks";
import QuoteForm from "@/components/quote-form/QuoteForm";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";

export default async function HomePage(props: PageProps<"/[locale]">) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();

  const content = getContent(locale as Locale);

  return (
    <>
      <Hero content={content} />
      <TrustBar content={content} />
      <ProblemSection content={content} />
      <ServiceSection content={content.formatting} tags={content.documentTypeOptions} />
      <ServiceSection content={content.proofreading} tags={content.documentTypeOptions} />
      <BeforeAfter content={content} />
      <UniversityExperience content={content} />
      <Testimonials content={content} />
      <Pricing content={content} />
      <QuoteForm content={content} />
      <HowItWorks content={content} />
      <Faq content={content} />
      <FinalCta content={content} />
    </>
  );
}
