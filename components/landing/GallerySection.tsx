"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
    alt: "Forest canopy",
    className: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1439068799847-934257630247?auto=format&fit=crop&w=600&q=80",
    alt: "Lake and mountains",
    className: "col-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80",
    alt: "Scenic water view",
    className: "col-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=600&q=80",
    alt: "Ocean waves",
    className: "col-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",
    alt: "Misty valley",
    className: "col-span-1",
  },
];

export function GallerySection() {
  const { t } = useLanguage();

  return (
    <Section
      id="gallery"
      eyebrow={t.gallery.eyebrow}
      title={t.gallery.title}
      description={t.gallery.description}
      variant="cream"
    >
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2">
        {galleryImages.map((image, index) => (
          <FadeIn
            key={image.src}
            delay={index * 0.06}
            className={image.className}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative aspect-4/3 overflow-hidden rounded-2xl bg-jungle-200 lg:aspect-auto lg:h-full lg:min-h-[180px]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-jungle-950/30 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
