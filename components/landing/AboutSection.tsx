"use client";

import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/motion/FadeIn";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { FallingLeaves } from "@/components/motion/FallingLeaves";
import { aboutCards, getAboutCardHref } from "@/lib/about/cards";

export function AboutSection() {
  const { t } = useLanguage();

  const availableCards = aboutCards.filter((card) => card.category === "available");
  const growingCards = aboutCards.filter((card) => card.category === "growing");

  return (
    <Section
      id="about"
      eyebrow={t.about.eyebrow}
      title={t.about.title}
      description={t.about.description}
      variant="cream"
      className="overflow-x-clip"
      decorations={<FallingLeaves />}
    >
      <div className="space-y-16">
        {/* Category A: Available Now */}
        <div>
          <div className="mb-8 border-l-4 border-emerald-500 pl-4">
            <h3 className="font-display text-2xl font-bold text-jungle-950 sm:text-3xl">
              {t.about.availableTitle}
            </h3>
            <p className="mt-1.5 text-sm text-muted sm:text-base">
              {t.about.availableSubtitle}
            </p>
          </div>
          
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 [&>*]:h-full">
            {availableCards.map(({ key, slug, iconSrc, accent, cloudinaryId, imageSrc }, index) => {
              const card = t.about.cards[key];
              return (
                <FadeIn key={key} delay={index * 0.08} className="h-full">
                  <Card
                    title={card.title}
                    description={card.description}
                    accent={accent}
                    href={getAboutCardHref(slug)}
                    linkLabel={t.about.cardCta}
                    cloudinaryId={cloudinaryId}
                    imageSrc={imageSrc}
                    icon={
                      <Image
                        src={iconSrc}
                        alt=""
                        width={28}
                        height={28}
                        className="h-7 w-7 object-contain"
                        aria-hidden
                      />
                    }
                    imageAlt={card.title}
                  />
                </FadeIn>
              );
            })}
          </div>
        </div>

        {/* Category B: Growing at Jungle Fish */}
        <div>
          <div className="mb-8 border-l-4 border-amber-500 pl-4">
            <h3 className="font-display text-2xl font-bold text-jungle-950 sm:text-3xl">
              {t.about.growingTitle}
            </h3>
            <p className="mt-1.5 text-sm text-muted sm:text-base">
              {t.about.growingSubtitle}
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 [&>*]:h-full">
            {growingCards.map(({ key, slug, iconSrc, accent, cloudinaryId, imageSrc }, index) => {
              const card = t.about.cards[key];
              return (
                <FadeIn key={key} delay={index * 0.08} className="h-full">
                  <Card
                    title={card.title}
                    description={card.description}
                    accent={accent}
                    href={getAboutCardHref(slug)}
                    linkLabel={t.about.cardCta}
                    cloudinaryId={cloudinaryId}
                    imageSrc={imageSrc}
                    icon={
                      <Image
                        src={iconSrc}
                        alt=""
                        width={28}
                        height={28}
                        className="h-7 w-7 object-contain"
                        aria-hidden
                      />
                    }
                    imageAlt={card.title}
                  />
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
