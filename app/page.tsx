import { Hero } from "@/components/sections/Hero";
import { PriceCompare } from "@/components/sections/PriceCompare";
import { PriceList } from "@/components/sections/PriceList";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhatsIncluded } from "@/components/sections/WhatsIncluded";
import { About } from "@/components/sections/About";
import { Doctors } from "@/components/sections/Doctors";
import { Cases } from "@/components/sections/Cases";
import { Reviews } from "@/components/sections/Reviews";
import { Guarantees } from "@/components/sections/Guarantees";
import { VisaCustoms } from "@/components/sections/VisaCustoms";
import { Calculator } from "@/components/sections/Calculator";
import { LeadForm } from "@/components/sections/LeadForm";
import { FAQ } from "@/components/sections/FAQ";
import { faq } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Hero />
      <PriceCompare />
      <PriceList />
      <ServicesGrid />
      <HowItWorks />
      <WhatsIncluded />
      <About />
      <Doctors />
      <Cases />
      <Reviews />
      <Guarantees />
      <VisaCustoms />
      <Calculator />
      <LeadForm />
      <FAQ items={faq} />
    </>
  );
}
