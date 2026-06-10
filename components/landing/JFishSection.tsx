"use client";

import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { TokenIcon } from "@/components/icons";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { YouTubeBackgroundVideo } from "@/components/landing/YouTubeBackgroundVideo";
import { Button } from "@/components/ui/Button";
import { contact } from "@/lib/contact";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

function JFishVideoOverlay() {
  return (
    <div
      className="jfish-video-overlay pointer-events-none absolute inset-0 z-[1]"
      aria-hidden
    />
  );
}

export function JFishSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /** Subtle vertical drift — slower than page scroll */
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-75%", "75%"]);

  /** Max zoom when section center aligns with viewport center */
  const parallaxScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1.5, 1],
  );

  return (
    <section
      ref={sectionRef}
      id="jfish"
      className="relative overflow-hidden bg-jungle-900 py-16 text-jungle-100 sm:py-20 lg:py-24"
    >
      <YouTubeBackgroundVideo
        className="absolute inset-0 overflow-hidden"
        playbackPolicy="always"
        motion={{ y: parallaxY, scale: parallaxScale }}
        iframeTitle="Jungle Fish background video"
      />

      <JFishVideoOverlay />

      <Container className="relative z-10">
        <header className="mb-10 max-w-2xl sm:mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-jungle-300">
            {t.jfish.eyebrow}
          </p>
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t.jfish.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-jungle-200 sm:text-lg">
            {t.jfish.description}
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <FadeIn>
            <div className="rounded-3xl border border-jungle-700/50 bg-jungle-800/40 p-8 backdrop-blur-[2px]">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-jungle-700/50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-jungle-200">
                <TokenIcon className="h-3.5 w-3.5" />
                {t.jfish.badge}
              </div>
              <h3 className="font-display text-xl font-semibold text-white">
                {t.jfish.usesTitle}
              </h3>
              <ul className="mt-5 space-y-3">
                {t.jfish.uses.map((use) => (
                  <li
                    key={use}
                    className="flex items-start gap-3 text-sm text-jungle-200 sm:text-base"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lagoon-300" />
                    {use}
                  </li>
                ))}
              </ul>
              <Button
                href={contact.x}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="sm"
                className="mt-6 w-full sm:w-auto"
              >
                {t.jfish.xCta}
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-xl font-semibold text-white">
                  {t.jfish.howTitle}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-jungle-200 sm:text-base">
                  {t.jfish.howDescription}
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl font-semibold text-white">
                  {t.jfish.examplesTitle}
                </h3>
                <div className="mt-4 grid gap-3">
                  {t.jfish.examples.map((example) => (
                    <div
                      key={example.label}
                      className="flex items-center justify-between rounded-2xl border border-jungle-700/40 bg-jungle-950/30 px-5 py-4 backdrop-blur-[2px]"
                    >
                      <span className="font-medium text-jungle-100">
                        {example.label}
                      </span>
                      <span className="text-sm text-lagoon-300">
                        {example.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
