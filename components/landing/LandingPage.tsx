import { AboutSection } from "@/components/landing/AboutSection";
import { ExperiencesSection } from "@/components/landing/ExperiencesSection";
import { FinalCTASection } from "@/components/landing/FinalCTASection";
import { VolunteerSection } from "@/components/landing/VolunteerSection";
import { FloatingAudioPlayer } from "@/components/landing/FloatingAudioPlayer";
import { GallerySection } from "@/components/landing/GallerySection";
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
          <ExperiencesSection />
        </SectionReveal>
        <JFishSection />
        <SectionReveal variant="fromLeft">
          <PaymentSection />
        </SectionReveal>
        <SectionReveal variant="fromRight">
          <StrongholdSection />
        </SectionReveal>
        <SectionReveal variant="fromLeft">
          <GallerySection />
        </SectionReveal>
        <SectionReveal variant="bounce">
          <FinalCTASection />
        </SectionReveal>
        <SectionReveal variant="fromLeft">
          <VolunteerSection />
        </SectionReveal>
      </main>
      <Footer />
      {/* <FloatingAudioPlayer /> */}
    </>
  );
}
