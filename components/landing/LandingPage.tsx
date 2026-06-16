import { AboutSection } from "@/components/landing/AboutSection";
import { FinalCTASection } from "@/components/landing/FinalCTASection";
import { VolunteerSection } from "@/components/landing/VolunteerSection";
import { Hero } from "@/components/landing/Hero";
import { JFishSection } from "@/components/landing/JFishSection";
import { PaymentSection } from "@/components/landing/PaymentSection";
import { StrongholdSection } from "@/components/landing/StrongholdSection";
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
        <SectionReveal variant="fromRight">
          <PaymentSection />
        </SectionReveal>
        <SectionReveal variant="fadeUp">
          <JFishSection />
        </SectionReveal>
        <SectionReveal variant="fromRight">
          <StrongholdSection />
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
