"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";
import { cn } from "@/lib/utils";

export type SectionRevealVariant = "fromLeft" | "fromRight" | "bounce";

type SectionRevealConfig = {
  initial: { opacity: number; x?: number; y?: number; scale?: number };
  animate: { opacity: number; x?: number; y?: number; scale?: number };
  transition: Transition;
};

const REVEAL_CONFIG: Record<SectionRevealVariant, SectionRevealConfig> = {
  fromLeft: {
    initial: { opacity: 0, x: -80 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
  },
  fromRight: {
    initial: { opacity: 0, x: 80 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
  },
  bounce: {
    initial: { opacity: 0, y: 56, scale: 0.94 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 22,
      mass: 1,
      duration: 1.5,
    },
  },
};

type SectionRevealProps = {
  variant: SectionRevealVariant;
  children: React.ReactNode;
  className?: string;
};

export function SectionReveal({
  variant,
  children,
  className,
}: SectionRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const config = REVEAL_CONFIG[variant];

  if (prefersReducedMotion) {
    return <div className={cn("w-full", className)}>{children}</div>;
  }

  return (
    <div className={cn("w-full overflow-x-clip", className)}>
      <motion.div
        initial={config.initial}
        whileInView={config.animate}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={config.transition}
        className="w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
