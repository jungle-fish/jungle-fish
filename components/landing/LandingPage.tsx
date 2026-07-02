import { AboutSection } from "@/components/landing/AboutSection";
import { FinalCTASection } from "@/components/landing/FinalCTASection";
import { VolunteerSection } from "@/components/landing/VolunteerSection";
import { Hero } from "@/components/landing/Hero";
import { MtbSection } from "@/components/landing/MtbSection";
import { PaymentSection } from "@/components/landing/PaymentSection";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SectionReveal } from "@/components/motion/SectionReveal";

export function LandingPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <Hero />
        <SectionReveal variant="fromLeft">
          <AboutSection />
        </SectionReveal>
        <SectionReveal variant="fadeUp">
          <MtbSection />
        </SectionReveal>
        <SectionReveal variant="fromRight">
          <PaymentSection />
        </SectionReveal>
        <SectionReveal variant="bounce">
          <FinalCTASection />
        </SectionReveal>
        <SectionReveal variant="fadeUp">
          <VolunteerSection />
        </SectionReveal>
      </main>
      <Footer />
    </>
  );
}
