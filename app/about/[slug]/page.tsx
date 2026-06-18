import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutCardDetailView } from "@/components/about/AboutCardDetailView";
import {
  ABOUT_CARD_SLUGS,
  getAboutCardBySlug,
  isValidAboutCardSlug,
} from "@/lib/about/cards";
import { getTranslation } from "@/lib/i18n/translations";
import { SITE_NAME } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return ABOUT_CARD_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!isValidAboutCardSlug(slug)) {
    return {};
  }

  const card = getAboutCardBySlug(slug);
  if (!card) {
    return {};
  }

  const t = getTranslation("en");
  const copy = t.about.cards[card.key];

  return {
    title: copy.title,
    description: copy.detail.intro,
    openGraph: {
      title: `${copy.title} | ${SITE_NAME}`,
      description: copy.description,
    },
  };
}

export default async function AboutCardPage({ params }: PageProps) {
  const { slug } = await params;

  if (!isValidAboutCardSlug(slug) || !getAboutCardBySlug(slug)) {
    notFound();
  }

  return <AboutCardDetailView slug={slug} />;
}
