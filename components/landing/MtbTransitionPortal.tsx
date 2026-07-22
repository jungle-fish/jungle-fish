"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function MtbTransitionPortal() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  // Set up scroll hooks for the parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax translation for the background image
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  // Parallax translation for the words (different speeds for depth)
  const word1X = useTransform(scrollYProgress, [0, 1], ["-60px", "60px"]);
  const word2X = useTransform(scrollYProgress, [0, 1], ["40px", "-40px"]);
  const word3X = useTransform(scrollYProgress, [0, 1], ["-30px", "30px"]);

  return (
    <div
      ref={containerRef}
      className="relative z-10 h-[50vh] min-h-[400px] w-full overflow-hidden bg-black sm:h-[60vh]"
    >
      {/* Parallax Background Image */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 h-[130%] w-full">
        <Image
          src="/mtb-hero.jpg"
          alt="Mist jungle trail"
          fill
          priority
          className="object-cover opacity-50 select-none pointer-events-none"
        />
      </motion.div>

      {/* Dark and Atmospheric Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f7f5f0] via-black/80 to-[#0f1a0e]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.8)_80%)]" />

      {/* Content Container */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Word 1: Naturaleza */}
          <motion.div
            style={{ x: word1X }}
            className="flex items-center justify-center gap-3"
          >
            <span className="font-display text-4xl font-extrabold uppercase tracking-widest text-emerald-400/90 drop-shadow-[0_0_12px_rgba(52,211,153,0.3)] sm:text-6xl md:text-7xl">
              {t.mtbTransition.nature}
            </span>
            <span className="text-2xl sm:text-4xl">🌿</span>
          </motion.div>

          {/* Separator / Visual link */}
          <div className="mx-auto h-8 w-px bg-gradient-to-b from-emerald-500/50 to-amber-500/50 sm:h-12" />

          {/* Word 2: Adrenalina */}
          <motion.div
            style={{ x: word2X }}
            className="flex items-center justify-center gap-3"
          >
            <span className="text-2xl sm:text-4xl">⚡</span>
            <span className="font-display text-4xl font-extrabold uppercase tracking-widest text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.3)] sm:text-6xl md:text-7xl italic">
              {t.mtbTransition.adrenaline}
            </span>
          </motion.div>

          {/* Separator / Visual link */}
          <div className="mx-auto h-8 w-px bg-gradient-to-b from-amber-500/50 to-teal-500/50 sm:h-12" />

          {/* Word 3: Tecnología */}
          <motion.div
            style={{ x: word3X }}
            className="flex items-center justify-center gap-3"
          >
            <span className="font-display text-4xl font-extrabold uppercase tracking-widest text-teal-300 drop-shadow-[0_0_12px_rgba(45,212,191,0.3)] sm:text-6xl md:text-7xl">
              {t.mtbTransition.technology}
            </span>
            <span className="text-2xl sm:text-4xl">💎</span>
          </motion.div>
        </div>

        {/* Subtle scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-30">
          <div className="h-8 w-5 rounded-full border-2 border-white/60 p-1 flex justify-center">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
