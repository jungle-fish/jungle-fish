"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { ChevronDownIcon } from "@/components/icons";
import { HeroIntroProvider, useHeroIntro } from "@/components/landing/HeroIntroContext";
import { HeroVideoBackground } from "@/components/landing/HeroVideoBackground";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { interactivePress } from "@/lib/styles/interactive";

const CONTENT_EASE = [0.22, 1, 0.36, 1] as const;

function HeroContent() {
  const { t } = useLanguage();
  const { isReady, isContentVisible } = useHeroIntro();
  const { scrollY } = useScroll();

  const bgY = useTransform(scrollY, [0, 1200], [0, 700]);
  const bgScale = useTransform(scrollY, [0, 1200], [1, 1.5]);
  const overlayDarkness = useTransform(scrollY, [0, 1000], [0, 1]);
  const contentY = useTransform(scrollY, [0, 900], [0, 575]);
  const scrollContentOpacity = useTransform(scrollY, [0, 700], [1, 0.5]);
  const contentOpacity = isReady ? 1 : isContentVisible ? 0.82 : 0;

  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      <HeroVideoBackground y={bgY} scale={bgScale} />

      <motion.div
        style={{ opacity: isContentVisible ? overlayDarkness : 0 }}
        className="pointer-events-none absolute inset-0 z-[1] bg-jungle-950"
        aria-hidden
      />

      <Container className="relative z-10 flex min-h-[92vh] flex-col justify-center py-28">
        <motion.div
          style={
            isContentVisible
              ? { y: contentY, opacity: scrollContentOpacity }
              : { y: 0, opacity: 0 }
          }
          className="max-w-3xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={
              isContentVisible
                ? { opacity: contentOpacity, y: 0 }
                : { opacity: 0, y: 16 }
            }
            transition={{ duration: 0.45, delay: 0.05, ease: CONTENT_EASE }}
            className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-jungle-200 drop-shadow-sm"
          >
            {t.hero.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={
              isContentVisible
                ? { opacity: contentOpacity, y: 0 }
                : { opacity: 0, y: 24 }
            }
            transition={{ duration: 0.5, delay: 0.12, ease: CONTENT_EASE }}
            className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-white drop-shadow-md sm:text-5xl lg:text-6xl"
          >
            {t.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={
              isContentVisible
                ? { opacity: contentOpacity, y: 0 }
                : { opacity: 0, y: 24 }
            }
            transition={{ duration: 0.5, delay: 0.2, ease: CONTENT_EASE }}
            className="mt-5 max-w-2xl text-base leading-relaxed text-jungle-100 drop-shadow-sm sm:text-lg"
          >
            {t.hero.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={
              isContentVisible
                ? { opacity: contentOpacity, y: 0 }
                : { opacity: 0, y: 24 }
            }
            transition={{ duration: 0.5, delay: 0.28, ease: CONTENT_EASE }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button href="#about" variant="primary" size="lg">
              {t.hero.ctaPrimary}
            </Button>
            <Button href="#jfish" variant="outline" size="lg">
              {t.hero.ctaSecondary}
            </Button>
          </motion.div>
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={isReady ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: isReady ? 0.35 : 0, duration: 0.45, ease: CONTENT_EASE }}
          className={`${interactivePress} absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-jungle-200/80 hover:scale-105 hover:text-white`}
          aria-label="Scroll to about section"
        >
          <ChevronDownIcon className="h-5 w-5 animate-float" />
        </motion.a>
      </Container>
    </section>
  );
}

export function Hero() {
  return (
    <HeroIntroProvider>
      <HeroContent />
    </HeroIntroProvider>
  );
}
