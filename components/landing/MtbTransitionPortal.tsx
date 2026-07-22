"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function MtbTransitionPortal() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking within this specific transition zone
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 1. Horizontal movement of the wheel from left (-10%) to right (110%)
  const wheelX = useTransform(scrollYProgress, [0.1, 0.9], ["-10%", "105%"]);

  // 2. Rotation of the wheel (spinning effect)
  const wheelRotate = useTransform(scrollYProgress, [0.1, 0.9], [0, 1440]); // 4 full rotations

  // 3. Opacity and scale for each word as the wheel passes by
  // Word 1: Naturaleza (occurs around 20-30% scroll)
  const opacity1 = useTransform(scrollYProgress, [0.15, 0.35, 0.95], [0, 1, 1]);
  const scale1 = useTransform(scrollYProgress, [0.15, 0.35], [0.85, 1]);
  const blur1 = useTransform(scrollYProgress, [0.15, 0.35], ["blur(8px)", "blur(0px)"]);

  // Word 2: Adrenalina (occurs around 45-55% scroll)
  const opacity2 = useTransform(scrollYProgress, [0.4, 0.6, 0.95], [0, 1, 1]);
  const scale2 = useTransform(scrollYProgress, [0.4, 0.6], [0.85, 1]);
  const blur2 = useTransform(scrollYProgress, [0.4, 0.6], ["blur(8px)", "blur(0px)"]);

  // Word 3: Tecnología (occurs around 70-80% scroll)
  const opacity3 = useTransform(scrollYProgress, [0.65, 0.85, 0.95], [0, 1, 1]);
  const scale3 = useTransform(scrollYProgress, [0.65, 0.85], [0.85, 1]);
  const blur3 = useTransform(scrollYProgress, [0.65, 0.85], ["blur(8px)", "blur(0px)"]);

  return (
    <div
      ref={containerRef}
      className="relative z-10 w-full bg-gradient-to-b from-[#f7f5f0] via-[#0b120a] to-[#0f1a0e] py-32 overflow-hidden select-none"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Track Line / Road */}
        <div className="relative flex flex-col justify-center h-[200px] w-full">
          
          {/* Background text markers */}
          <div className="absolute inset-x-0 top-0 flex justify-between px-10 md:px-20 text-center">
            {/* Word 1 */}
            <motion.div
              style={{ opacity: opacity1, scale: scale1, filter: blur1 }}
              className="flex flex-col items-center w-1/3"
            >
              <span className="text-sm font-semibold tracking-[0.2em] text-emerald-500 uppercase">
                01
              </span>
              <span className="font-display text-2xl font-black uppercase tracking-wider text-white sm:text-4xl md:text-5xl drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                {t.mtbTransition.nature}
              </span>
            </motion.div>

            {/* Word 2 */}
            <motion.div
              style={{ opacity: opacity2, scale: scale2, filter: blur2 }}
              className="flex flex-col items-center w-1/3"
            >
              <span className="text-sm font-semibold tracking-[0.2em] text-amber-500 uppercase">
                02
              </span>
              <span className="font-display text-2xl font-black uppercase tracking-wider text-white sm:text-4xl md:text-5xl drop-shadow-[0_0_15px_rgba(245,158,11,0.3)] italic">
                {t.mtbTransition.adrenaline}
              </span>
            </motion.div>

            {/* Word 3 */}
            <motion.div
              style={{ opacity: opacity3, scale: scale3, filter: blur3 }}
              className="flex flex-col items-center w-1/3"
            >
              <span className="text-sm font-semibold tracking-[0.2em] text-teal-400 uppercase">
                03
              </span>
              <span className="font-display text-2xl font-black uppercase tracking-wider text-white sm:text-4xl md:text-5xl drop-shadow-[0_0_15px_rgba(45,212,191,0.3)]">
                {t.mtbTransition.technology}
              </span>
            </motion.div>
          </div>

          {/* Dirt Ground Track / Horizon Line */}
          <div className="absolute inset-x-0 bottom-2 h-0.5 bg-gradient-to-r from-emerald-500/10 via-white/20 to-teal-500/10">
            {/* Knobby texture indicator */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.15)_2px,transparent_2px)] bg-[size:16px_100%]" />
          </div>

          {/* Rolling MTB Wheel */}
          <motion.div
            style={{ x: wheelX, rotate: wheelRotate }}
            className="absolute bottom-2.5 left-0 z-20 -translate-x-1/2 flex items-center justify-center h-16 w-16 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)] sm:h-20 sm:w-20"
          >
            <svg
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              className="w-full h-full"
            >
              {/* Outer MTB Knobby Tire */}
              <circle
                cx="50"
                cy="50"
                r="45"
                strokeWidth="6"
                strokeDasharray="6 3.5"
                className="text-emerald-500"
              />
              {/* Rim */}
              <circle cx="50" cy="50" r="39" strokeWidth="2.5" />
              {/* Spokes */}
              <line x1="50" y1="11" x2="50" y2="89" />
              <line x1="11" y1="50" x2="89" y2="50" />
              <line x1="22.5" y1="22.5" x2="77.5" y2="77.5" />
              <line x1="22.5" y1="77.5" x2="77.5" y2="22.5" />
              <line x1="36" y1="15" x2="64" y2="85" />
              <line x1="15" y1="36" x2="85" y2="64" />
              <line x1="15" y1="64" x2="85" y2="36" />
              <line x1="36" y1="85" x2="64" y2="15" />
              {/* Hub */}
              <circle cx="50" cy="50" r="7" fill="currentColor" />
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
