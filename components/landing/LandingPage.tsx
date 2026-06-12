import { AboutSection } from "@/components/landing/AboutSection";
import { FinalCTASection } from "@/components/landing/FinalCTASection";
import { VolunteerSection } from "@/components/landing/VolunteerSection";
import { FloatingAudioPlayer } from "@/components/landing/FloatingAudioPlayer";
// import { GallerySection } from "@/components/landing/GallerySection";
import { Hero } from "@/components/landing/Hero";
import { JFishSection } from "@/components/landing/JFishSection";
import { PaymentSection } from "@/components/landing/PaymentSection";
import { StrongholdSection } from "@/components/landing/StrongholdSection";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { ScrollPerformanceBridge } from "@/components/motion/ScrollPerformanceBridge";

export function LandingPage() {
  return (
    <>
      <ScrollPerformanceBridge />
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
        {/* <SectionReveal variant="fromLeft">
          <GallerySection />
        </SectionReveal> */}
        <SectionReveal variant="bounce">
          <FinalCTASection />
        </SectionReveal>
        <SectionReveal variant="fadeUp">
          <VolunteerSection />
        </SectionReveal>
      </main>
      <Footer />
      {/* <FloatingAudioPlayer /> */}
    </>
  );
}
