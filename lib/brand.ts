import { SITE_URL } from "@/lib/site";

export const BRAND = {
  favicon16: "/brand/favicon-16x16.webp",
  favicon32: "/brand/favicon-32x32.webp",
  ogLandscape: "/brand/og-image.webp",
  ogSquare: "/brand/og-image-square.webp",
} as const;

export const BRAND_SIZES = {
  favicon16: { width: 16, height: 16 },
  favicon32: { width: 32, height: 32 },
  ogLandscape: { width: 1200, height: 630 },
  ogSquare: { width: 1200, height: 1200 },
} as const;

export function brandUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}
