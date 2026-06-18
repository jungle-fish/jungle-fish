import { CLOUD_IMAGE, type CloudImageId } from "@/lib/media";

export const ABOUT_CARD_SLUGS = [
  "permaculture",
  "aquaculture",
  "accommodation",
  "book",
  "fresh-food",
  "education",
] as const;

export type AboutCardSlug = (typeof ABOUT_CARD_SLUGS)[number];

export type AboutCardKey =
  | "permaculture"
  | "aquaculture"
  | "accommodation"
  | "book"
  | "freshFood"
  | "education";

export type AboutCardAccent = "green" | "lagoon" | "sand" | "earth";

export type AboutCardConfig = {
  key: AboutCardKey;
  slug: AboutCardSlug;
  iconSrc: string;
  accent: AboutCardAccent;
  cloudinaryId: CloudImageId;
};

export const aboutCards: readonly AboutCardConfig[] = [
  {
    key: "permaculture",
    slug: "permaculture",
    iconSrc: "/icons/icon_permaculture.webp",
    accent: "green",
    cloudinaryId: CLOUD_IMAGE.permaculture,
  },
  {
    key: "aquaculture",
    slug: "aquaculture",
    iconSrc: "/icons/icon_fish.webp",
    accent: "lagoon",
    cloudinaryId: CLOUD_IMAGE.aquaculture,
  },
  {
    key: "accommodation",
    slug: "accommodation",
    iconSrc: "/icons/icon_house.webp",
    accent: "earth",
    cloudinaryId: CLOUD_IMAGE.accommodation,
  },
  {
    key: "book",
    slug: "book",
    iconSrc: "/icons/icon_bookleaf.webp",
    accent: "sand",
    cloudinaryId: CLOUD_IMAGE.drawnLake,
  },
  {
    key: "freshFood",
    slug: "fresh-food",
    iconSrc: "/icons/icon_humburger.webp",
    accent: "sand",
    cloudinaryId: CLOUD_IMAGE.freshFood,
  },
  {
    key: "education",
    slug: "education",
    iconSrc: "/icons/icon_mountain.webp",
    accent: "green",
    cloudinaryId: CLOUD_IMAGE.education,
  },
] as const;

export function isValidAboutCardSlug(slug: string): slug is AboutCardSlug {
  return (ABOUT_CARD_SLUGS as readonly string[]).includes(slug);
}

export function getAboutCardBySlug(slug: string) {
  return aboutCards.find((card) => card.slug === slug);
}

export function getAboutCardHref(slug: AboutCardSlug) {
  return `/about/${slug}`;
}
