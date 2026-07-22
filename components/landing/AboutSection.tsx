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
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 [&>*]:h-full">
        {aboutCards.map(({ key, slug, iconSrc, accent, cloudinaryId, imageSrc }, index) => {
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
    </Section>
  );
}
