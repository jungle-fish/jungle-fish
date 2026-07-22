"use client";

import Image from "next/image";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { getAboutCardBySlug } from "@/lib/about/cards";
import type { AboutCardSlug } from "@/lib/about/cards";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { textLinkClass, interactivePress } from "@/lib/styles/interactive";
import { cn } from "@/lib/utils";

const accentHeroStyles = {
  green: "from-jungle-900/80 via-jungle-800/50 to-jungle-700/30",
  lagoon: "from-jungle-950/80 via-lagoon-700/40 to-lagoon-500/20",
  sand: "from-jungle-950/80 via-earth-600/35 to-sand-200/20",
  earth: "from-jungle-950/80 via-earth-600/45 to-sand-100/15",
};

const accentBadgeStyles = {
  green: "bg-jungle-100 text-jungle-800",
  lagoon: "bg-lagoon-100 text-lagoon-700",
  sand: "bg-sand-200 text-earth-600",
  earth: "bg-sand-100 text-earth-600",
};

type AboutCardDetailViewProps = {
  slug: AboutCardSlug;
};

export function AboutCardDetailView({ slug }: AboutCardDetailViewProps) {
  const { t } = useLanguage();
  const card = getAboutCardBySlug(slug);

  if (!card) {
    return null;
  }

  const copy = t.about.cards[card.key];
  const detail = copy.detail;

  return (
    <>
      <Header />
      <main className="overflow-x-clip bg-cream">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <section className="relative min-h-[42vh] overflow-hidden sm:min-h-[48vh]">
            {card.imageSrc ? (
              <Image
                src={card.imageSrc}
                alt={copy.title}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            ) : (
              <CldImage
                src={card.cloudinaryId!}
                alt={copy.title}
                fill
                priority
                crop="fill"
                gravity="auto"
                quality="auto"
                format="auto"
                sizes="100vw"
                className="object-cover"
              />
            )}
            <div
              className={cn(
                "absolute inset-0 bg-linear-to-t",
                accentHeroStyles[card.accent],
              )}
            />
            <div className="absolute inset-0 bg-jungle-950/25" />

            <Container className="relative z-10 flex min-h-[42vh] flex-col justify-end pb-10 pt-28 sm:min-h-[48vh] sm:pb-12">
              <Link
                href="/#about"
                className={cn(
                  interactivePress,
                  "mb-6 inline-flex w-fit items-center gap-2 text-sm font-medium text-jungle-100/90 hover:text-white",
                )}
              >
                <span aria-hidden>←</span>
                {t.about.detailBack}
              </Link>

              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-md",
                    accentBadgeStyles[card.accent],
                  )}
                >
                  <Image
                    src={card.iconSrc}
                    alt=""
                    width={28}
                    height={28}
                    className="h-7 w-7 object-contain"
                    aria-hidden
                  />
                </div>
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-jungle-200">
                    {t.about.eyebrow}
                  </p>
                  <h1 className="mt-2 font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                    {copy.title}
                  </h1>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-jungle-100 sm:text-lg">
                    {copy.description}
                  </p>
                </div>
              </div>
            </Container>
          </section>

          <Container className="py-14 sm:py-16 lg:py-20">
            <FadeIn>
              <p className="max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
                {detail.intro}
              </p>
            </FadeIn>

            <FadeIn delay={0.08} className="mt-10">
              <h2 className="font-display text-2xl font-semibold text-jungle-950 sm:text-3xl">
                {t.about.experienceTitle}
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {detail.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-jungle-200/80 bg-white/80 px-5 py-4 text-sm text-jungle-800 sm:text-base"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lagoon-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {detail.experiences.map((experience, index) => (
                <FadeIn key={experience.title} delay={0.12 + index * 0.06}>
                  <article className="flex h-full flex-col rounded-2xl border border-jungle-200/80 bg-linear-to-br from-white via-cream to-jungle-100/40 p-6 shadow-sm shadow-jungle-900/5">
                    <h3 className="font-display text-lg font-semibold text-jungle-950">
                      {experience.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                      {experience.description}
                    </p>
                  </article>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.28} className="mt-10">
              <div className="rounded-2xl border border-jungle-200/70 bg-jungle-100/40 px-6 py-5 sm:px-8 sm:py-6">
                <h2 className="font-display text-lg font-semibold text-jungle-950 sm:text-xl">
                  {t.about.visitNoteTitle}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-jungle-800 sm:text-base">
                  {detail.visitNote}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.34} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button href="/#visit" size="lg">
                {t.about.detailCta}
              </Button>
              <Link
                href="/#about"
                className={cn("text-sm text-jungle-800", textLinkClass)}
              >
                {t.about.detailBack}
              </Link>
            </FadeIn>
          </Container>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
