"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  variant?: "default" | "jungle";
  align?: "left" | "center";
  className?: string;
};

const STAGGER = 0.09;
const EASE = [0.22, 1, 0.36, 1] as const;

export function SectionHeader({
  eyebrow,
  title,
  description,
  variant = "default",
  align = "left",
  className,
}: SectionHeaderProps) {
  const prefersReducedMotion = useReducedMotion();

  if (!eyebrow && !title && !description) {
    return null;
  }

  const isJungle = variant === "jungle";
  const isCenter = align === "center";

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : STAGGER,
        delayChildren: prefersReducedMotion ? 0 : 0.04,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 18,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: EASE },
    },
  };

  return (
    <motion.header
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={cn(
        "mb-10 max-w-2xl sm:mb-12",
        isCenter && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <motion.p
          variants={item}
          className={cn(
            "mb-3 text-sm font-medium uppercase tracking-[0.2em]",
            isJungle ? "text-jungle-300" : "text-jungle-700",
          )}
        >
          {eyebrow}
        </motion.p>
      )}
      {title && (
        <motion.h2
          variants={item}
          className={cn(
            "font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl",
            isJungle ? "text-white" : "text-jungle-950",
          )}
        >
          {title}
        </motion.h2>
      )}
      {description && (
        <motion.p
          variants={item}
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            isJungle ? "text-jungle-200" : "text-muted",
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.header>
  );
}
