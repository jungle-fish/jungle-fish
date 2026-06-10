"use client";

import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/motion/FadeIn";
import { FallingLeaves } from "@/components/motion/FallingLeaves";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const experienceConfig = [
  {
    key: "food",
    iconSrc: "/icons/icon_humburger.webp",
    accent: "sand" as const,
    imageSrc:
      "https://s3.ca-central-1.amazonaws.com/oc-bodhisurfyoga.com/wp-content/uploads/2023/06/05161643/gallo-pinto.jpg",
  },
  {
    key: "boat",
    iconSrc: "/icons/icon_boat.webp",
    accent: "lagoon" as const,
    imageSrc:
      "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/70/44/ec.jpg",
  },
  {
    key: "outdoor",
    iconSrc: "/icons/icon_mountain.webp",
    accent: "green" as const,
    imageSrc:
      "https://www.bodhisurfyoga.com/wp-content/uploads/2018/06/hiking-costa-rica.jpg",
  },
  {
    key: "cabins",
    iconSrc: "/icons/icon_house.webp",
    accent: "earth" as const,
    imageSrc:
      "https://q-xx.bstatic.com/xdata/images/hotel/608x352/234861787.webp?k=8055397b1fe397b2efb41c56e394318ac768595d33df7cc2f061d13968a809c4&o=",
  },
  {
    key: "education",
    iconSrc: "/icons/icon_bookleaf.webp",
    accent: "green" as const,
    imageSrc:
      "https://www.cloudbridge.org/wp-content/uploads/2016/07/Students_Plant_Trees-1024x1004.jpg",
  },
  {
    key: "relaxation",
    iconSrc: "/icons/icon_shines.webp",
    accent: "lagoon" as const,
    imageSrc:
      "https://d1cq5bmaro4ubb.cloudfront.net/wp-content/uploads/2025/04/wellness-png.webp",
  },
] as const;

export function ExperiencesSection() {
  const { t } = useLanguage();

  return (
    <Section
      id="experiences"
      eyebrow={t.experiences.eyebrow}
      title={t.experiences.title}
      description={t.experiences.description}
      className="overflow-x-clip"
      decorations={<FallingLeaves />}
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 [&>*]:h-full">
        {experienceConfig.map(({ key, iconSrc, accent, imageSrc }, index) => {
          const item = t.experiences.items[key];
          return (
            <FadeIn key={key} delay={index * 0.06} className="h-full">
              <Card
                title={item.title}
                description={item.description}
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
                imageAlt={item.title}
              />
            </FadeIn>
          );
        })}
      </div>

      <FadeIn delay={0.2} className="mt-12 lg:mt-16">
        <div className="rounded-3xl border border-jungle-200 bg-jungle-100/50 p-8 sm:p-10">
          <h3 className="font-display text-2xl font-semibold text-jungle-950">
            {t.experiences.benefitsTitle}
          </h3>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {t.experiences.benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-3 text-sm text-muted sm:text-base"
              >
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-jungle-600" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>
    </Section>
  );
}
