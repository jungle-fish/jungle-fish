"use client";

import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

function QrPayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3M17 17h4v4M14 20h3" />
    </svg>
  );
}

function RegionIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
      <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function WorkshopIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v15H6.5A2.5 2.5 0 0 1 4 14.5v-10A2.5 2.5 0 0 1 6.5 2Z" />
      <path d="M8 7h8M8 11h5" />
    </svg>
  );
}

const pillarConfig = [
  {
    key: "onsite" as const,
    icon: QrPayIcon,
    accent: "text-lagoon-700 bg-lagoon-100",
  },
  {
    key: "regional" as const,
    icon: RegionIcon,
    accent: "text-jungle-800 bg-jungle-100",
  },
  {
    key: "education" as const,
    icon: WorkshopIcon,
    accent: "text-earth-700 bg-sand-200",
  },
];

type PillarCardProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  accent: string;
  title: string;
  description: string;
};

function PillarCard({ icon: Icon, accent, title, description }: PillarCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-jungle-200/80 bg-white/90 p-6 shadow-sm shadow-jungle-900/5">
      <div
        className={cn(
          "mb-4 flex h-12 w-12 items-center justify-center rounded-xl",
          accent,
        )}
      >
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-display text-lg font-semibold text-jungle-950">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </article>
  );
}

export function StrongholdSection() {
  const { t } = useLanguage();

  return (
    <Section
      id="stronghold"
      eyebrow={t.stronghold.eyebrow}
      title={t.stronghold.title}
      description={t.stronghold.description}
      variant="cream"
      containerClassName="max-w-6xl"
    >
      <FadeIn>
        <div className="overflow-hidden rounded-3xl border border-jungle-800/15 bg-linear-to-br from-jungle-950 via-jungle-900 to-jungle-800 p-6 text-center sm:p-8 lg:p-10">
          <Image
            src="/icons/icon_stronghold.webp"
            alt=""
            width={200}
            height={64}
            className="mx-auto h-10 w-auto object-contain sm:h-12"
            aria-hidden
          />
          <p className="mt-4 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-jungle-200">
            {t.stronghold.badge}
          </p>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-jungle-100 sm:text-lg">
            {t.stronghold.intro}
          </p>
        </div>
      </FadeIn>

      <div className="mt-8 grid gap-5 lg:grid-cols-3 lg:gap-6">
        {pillarConfig.map(({ key, icon, accent }, index) => {
          const pillar = t.stronghold.pillars[key];
          return (
            <FadeIn key={key} delay={0.08 + index * 0.08}>
              <PillarCard
                icon={icon}
                accent={accent}
                title={pillar.title}
                description={pillar.description}
              />
            </FadeIn>
          );
        })}
      </div>

      <FadeIn delay={0.2}>
        <div className="mt-8 rounded-3xl border border-jungle-200/80 bg-linear-to-br from-white via-cream to-jungle-100/50 p-6 sm:p-8 lg:p-10">
          <h3 className="font-display text-xl font-semibold text-jungle-950 sm:text-2xl">
            {t.stronghold.flowTitle}
          </h3>
          <ol className="mt-6 grid gap-4 sm:grid-cols-3">
            {t.stronghold.flowSteps.map((step, index) => (
              <li
                key={step.label}
                className="relative rounded-2xl border border-jungle-200/70 bg-white/80 p-5"
              >
                <span className="font-display text-2xl font-semibold text-jungle-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 font-medium text-jungle-950">{step.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </FadeIn>

      <FadeIn delay={0.28}>
        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
          <div>
            <h3 className="font-display text-xl font-semibold text-jungle-950 sm:text-2xl">
              {t.stronghold.workshopTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              {t.stronghold.workshopDescription}
            </p>
          </div>
          <ul className="space-y-3 rounded-2xl border border-jungle-200/80 bg-white/80 p-5 sm:p-6">
            {t.stronghold.workshopTopics.map((topic) => (
              <li
                key={topic}
                className="flex items-start gap-3 text-sm text-jungle-800 sm:text-base"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lagoon-500" />
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>

      <FadeIn delay={0.34}>
        <p className="mt-8 rounded-2xl border border-jungle-200/60 bg-jungle-100/40 px-5 py-4 text-sm leading-relaxed text-jungle-800 sm:px-6 sm:text-base">
          {t.stronghold.closingNote}
        </p>
      </FadeIn>
    </Section>
  );
}
