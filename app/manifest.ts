import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/brand";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#1b4332",
    theme_color: "#1b4332",
    icons: [
      {
        src: BRAND.favicon32,
        sizes: "32x32",
        type: "image/webp",
      },
      {
        src: BRAND.ogSquare,
        sizes: "512x512",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: BRAND.ogSquare,
        sizes: "512x512",
        type: "image/webp",
        purpose: "maskable",
      },
    ],
  };
}
