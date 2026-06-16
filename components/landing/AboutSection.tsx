"use client";

import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/motion/FadeIn";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { FallingLeaves } from "@/components/motion/FallingLeaves";
import { CLOUD_IMAGE } from "@/lib/media";

const cardConfig = [
  {
    key: "permaculture",
    iconSrc: "/icons/icon_permaculture.webp",
    accent: "green" as const,
    cloudinaryId: CLOUD_IMAGE.permaculture,
  },
  {
    key: "aquaculture",
    iconSrc: "/icons/icon_fish.webp",
    accent: "lagoon" as const,
    cloudinaryId: CLOUD_IMAGE.aquaculture,
  },
  {
    key: "accommodation",
    iconSrc: "/icons/icon_house.webp",
    accent: "earth" as const,
    cloudinaryId: CLOUD_IMAGE.accommodation,
  },
  {
    key: "book",
    iconSrc: "/icons/icon_bookleaf.webp",
    accent: "sand" as const,
    cloudinaryId: CLOUD_IMAGE.drawnLake,
  },
  {
    key: "freshFood",
    iconSrc: "/icons/icon_humburger.webp",
    accent: "sand" as const,
    cloudinaryId: CLOUD_IMAGE.freshFood,
  },
  {
    key: "education",
    iconSrc: "/icons/icon_mountain.webp",
    accent: "green" as const,
    cloudinaryId: CLOUD_IMAGE.education,
  },
] as const;

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
        {cardConfig.map(({ key, iconSrc, accent, ...imageProps }, index) => {
          const card = t.about.cards[key];
          return (
            <FadeIn key={key} delay={index * 0.08} className="h-full">
              <Card
                title={card.title}
                description={card.description}
                accent={accent}
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
                {...imageProps}
                imageAlt={card.title}
              />
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}
