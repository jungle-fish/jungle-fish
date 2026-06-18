"use client";

import Image from "next/image";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type CardProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  imageSrc?: string;
  cloudinaryId?: string;
  imageAlt?: string;
  href?: string;
  linkLabel?: string;
  className?: string;
  accent?: "green" | "lagoon" | "sand" | "earth";
};

const accentStyles = {
  green: "from-jungle-600/15 to-jungle-200/30 border-jungle-300/40",
  lagoon: "from-lagoon-500/15 to-lagoon-100/40 border-lagoon-300/40",
  sand: "from-sand-200/80 to-sand-100 border-sand-200",
  earth: "from-earth-600/10 to-sand-100 border-earth-600/20",
};

export function Card({
  title,
  description,
  icon,
  imageSrc,
  cloudinaryId,
  imageAlt = "",
  href,
  linkLabel,
  className,
  accent = "green",
}: CardProps) {
  const hasImage = Boolean(imageSrc ?? cloudinaryId);

  const article = (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border bg-linear-to-br shadow-sm shadow-jungle-900/5",
        hasImage ? "p-0" : "p-6",
        accentStyles[accent],
        href && "cursor-pointer",
        className,
      )}
    >
      {hasImage && (
        <div className="relative aspect-16/10 w-full overflow-hidden">
          {cloudinaryId ? (
            <CldImage
              src={cloudinaryId}
              alt={imageAlt || title}
              fill
              crop="fill"
              gravity="auto"
              quality="auto"
              format="auto"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <Image
              src={imageSrc!}
              alt={imageAlt || title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-jungle-950/80 to-transparent"
          />
          {icon && (
            <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/85 text-jungle-800 shadow-md shadow-jungle-950/15 backdrop-blur-sm">
              {icon}
            </div>
          )}
        </div>
      )}

      <div className={cn("flex flex-1 flex-col", hasImage && "p-6")}>
        {!hasImage && icon && (
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/70 text-jungle-800 shadow-sm">
            {icon}
          </div>
        )}
        <h3 className="font-display text-xl font-semibold text-jungle-950">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted sm:text-base">
          {description}
        </p>
        {href && linkLabel && (
          <p className="mt-4 text-sm font-medium text-jungle-700 transition-colors group-hover:text-jungle-900">
            {linkLabel} →
          </p>
        )}
      </div>
    </motion.article>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jungle-600">
        {article}
      </Link>
    );
  }

  return article;
}
