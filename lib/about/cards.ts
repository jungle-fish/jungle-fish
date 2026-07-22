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
  cloudinaryId?: CloudImageId;
  imageSrc?: string;
  category: "available" | "growing";
};

export const aboutCards: readonly AboutCardConfig[] = [
  {
    key: "permaculture",
    slug: "permaculture",
    iconSrc: "/icons/icon_permaculture.webp",
    accent: "sand",
    cloudinaryId: CLOUD_IMAGE.permaculture,
    category: "growing",
  },
  {
    key: "aquaculture",
    slug: "aquaculture",
    iconSrc: "/icons/icon_fish.webp",
    accent: "lagoon",
    imageSrc: "/acuacultura.webp",
    category: "available",
  },
  {
    key: "accommodation",
    slug: "accommodation",
    iconSrc: "/icons/icon_house.webp",
    accent: "sand",
    imageSrc: "/hospedaje.webp",
    category: "growing",
  },
  {
    key: "book",
    slug: "book",
    iconSrc: "/icons/icon_bookleaf.webp",
    accent: "lagoon",
    imageSrc: "/libros.webp",
    category: "available",
  },
  {
    key: "freshFood",
    slug: "fresh-food",
    iconSrc: "/icons/icon_humburger.webp",
    accent: "lagoon",
    imageSrc: "/comida-fresca.webp",
    category: "available",
  },
  {
    key: "education",
    slug: "education",
    iconSrc: "/icons/icon_mountain.webp",
    accent: "sand",
    imageSrc: "/visitas-educativas.webp",
    category: "growing",
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
