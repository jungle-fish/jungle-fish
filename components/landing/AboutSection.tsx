"use client";

import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/motion/FadeIn";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { FallingLeaves } from "../motion/FallingLeaves";

const cardConfig = [
  {
    key: "permaculture",
    iconSrc: "/icons/icon_permaculture.webp",
    accent: "green" as const,
    imageSrc:
      "https://www.ecoworldbuilding.com/wp-content/uploads/2022/03/permacultura2.jpg",
  },
  {
    key: "aquaculture",
    iconSrc: "/icons/icon_fish.webp",
    accent: "lagoon" as const,
    imageSrc: "https://pbs.twimg.com/media/Essm9FCXcAAvZo0.jpg",
  },
  {
    key: "accommodation",
    iconSrc: "/icons/icon_house.webp",
    accent: "earth" as const,
    imageSrc:
      "https://travelrebels.com/wp-content/uploads/2023/06/La-Tigra-Rainforest-Lodge-bijzonder-overnachten-Costa-Rica-1675x1116.jpg",
  },
  {
    key: "book",
    iconSrc: "/icons/icon_bookleaf.webp",
    accent: "sand" as const,
    imageSrc: "/images/image_drawn_lake.jpg",
  },
  {
    key: "freshFood",
    iconSrc: "/icons/icon_humburger.webp",
    accent: "sand" as const,
    imageSrc:
      "https://s3.ca-central-1.amazonaws.com/oc-bodhisurfyoga.com/wp-content/uploads/2023/06/05161643/gallo-pinto.jpg",
  },
  {
    key: "education",
    iconSrc: "/icons/icon_mountain.webp",
    accent: "green" as const,
    imageSrc:
      "https://www.cloudbridge.org/wp-content/uploads/2016/07/Students_Plant_Trees-1024x1004.jpg",
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
        {cardConfig.map(({ key, iconSrc, accent, imageSrc }, index) => {
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
                imageSrc={imageSrc}
                imageAlt={card.title}
              />
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}
