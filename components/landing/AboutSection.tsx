"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScroll } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/motion/FadeIn";
import { AboutSectionDecorations } from "@/components/landing/AboutSectionDecorations";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

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
    key: "experiences",
    iconSrc: "/icons/icon_boat.webp",
    accent: "sand" as const,
    imageSrc:
      "https://bestcostaricadmc.com/wp-content/uploads/2-5-1024x576.jpg",
  },
  {
    key: "nature",
    iconSrc: "/icons/icon_tree.webp",
    accent: "green" as const,
    imageSrc:
      "https://foxiepass.com/blog/uploads/20230505/costa-rica2_aucGuK.jpg",
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
    imageSrc:
      "/images/image_drawn_lake.jpg",
  },
] as const;

export function AboutSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <Section
      ref={sectionRef}
      id="about"
      eyebrow={t.about.eyebrow}
      title={t.about.title}
      description={t.about.description}
      variant="cream"
      decorations={
        <AboutSectionDecorations scrollYProgress={scrollYProgress} />
      }
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
