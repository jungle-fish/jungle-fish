import type { Metadata, Viewport } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import { contact } from "@/lib/contact";
import { BRAND, BRAND_SIZES, brandUrl } from "@/lib/brand";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const PAGE_TITLE = `${SITE_NAME} | Eco-Sanctuary in Costa Rica`;
const OG_ALT = `${SITE_NAME} — Eco-Sanctuary in Costa Rica`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1b4332",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: PAGE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Jungle Fish",
    "eco-tourism Costa Rica",
    "San Isidro del General",
    "permaculture Costa Rica",
    "aquaculture tilapia farm",
    "sustainable tourism",
    "JFISH token",
    "Stellar blockchain",
    "eco-sanctuary",
    "volunteer Costa Rica",
    "Stronghold Pay",
    "regenerative tourism",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-US": `${SITE_URL}?lang=en`,
      "es-CR": `${SITE_URL}?lang=es`,
    },
  },
  icons: {
    icon: [
      {
        url: BRAND.favicon16,
        sizes: "16x16",
        type: "image/webp",
      },
      {
        url: BRAND.favicon32,
        sizes: "32x32",
        type: "image/webp",
      },
    ],
    shortcut: BRAND.favicon32,
    apple: [
      {
        url: BRAND.ogSquare,
        sizes: "180x180",
        type: "image/webp",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "es_CR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: PAGE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: BRAND.ogLandscape,
        secureUrl: brandUrl(BRAND.ogLandscape),
        width: BRAND_SIZES.ogLandscape.width,
        height: BRAND_SIZES.ogLandscape.height,
        alt: OG_ALT,
        type: "image/webp",
      },
      {
        url: BRAND.ogSquare,
        secureUrl: brandUrl(BRAND.ogSquare),
        width: BRAND_SIZES.ogSquare.width,
        height: BRAND_SIZES.ogSquare.height,
        alt: SITE_NAME,
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: SITE_DESCRIPTION,
    images: {
      url: BRAND.ogLandscape,
      alt: OG_ALT,
    },
    creator: "@arichcosta",
    site: "@arichcosta",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  logo: brandUrl(BRAND.ogSquare),
  image: brandUrl(BRAND.ogLandscape),
  telephone: contact.phoneDisplay,
  email: contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle Fallas",
    addressLocality: "San Isidro del General",
    addressRegion: "San José",
    postalCode: "11901",
    addressCountry: "CR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "9.3697",
    longitude: "-83.6970",
  },
  sameAs: [contact.facebook, contact.instagram, contact.x],
  hasMap: contact.mapsUrl,
  touristType: [
    "EcoTourist",
    "NatureTourist",
    "AdventureTourist",
    "CulturalTourist",
  ],
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Permaculture Farm" },
    { "@type": "LocationFeatureSpecification", name: "Tilapia Aquaculture" },
    { "@type": "LocationFeatureSpecification", name: "Eco Accommodation" },
    { "@type": "LocationFeatureSpecification", name: "Restaurant" },
    { "@type": "LocationFeatureSpecification", name: "Crypto Payments" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${fraunces.variable} h-full scroll-smooth antialiased overflow-x-clip`}
    >
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full overflow-x-clip bg-background font-sans text-foreground">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
