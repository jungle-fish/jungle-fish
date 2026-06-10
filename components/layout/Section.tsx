"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  decorations?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  variant?: "default" | "cream" | "jungle" | "sand";
  align?: "left" | "center";
};

const variantStyles = {
  default: "bg-background text-foreground",
  cream: "bg-cream text-foreground",
  jungle: "bg-jungle-900 text-jungle-100",
  sand: "bg-sand-100 text-foreground",
};

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  {
    id,
    eyebrow,
    title,
    description,
    children,
    decorations,
    className,
    containerClassName,
    variant = "default",
    align = "left",
  },
  ref,
) {
  const isCenter = align === "center";

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        "relative py-16 sm:py-20 lg:py-24",
        variantStyles[variant],
        className,
      )}
    >
      {decorations}
      <Container className={cn("relative z-10", containerClassName)}>
        {(eyebrow || title || description) && (
          <header
            className={cn(
              "mb-10 max-w-2xl sm:mb-12",
              isCenter && "mx-auto text-center",
            )}
          >
            {eyebrow && (
              <p
                className={cn(
                  "mb-3 text-sm font-medium uppercase tracking-[0.2em]",
                  variant === "jungle" ? "text-jungle-300" : "text-jungle-700",
                )}
              >
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                className={cn(
                  "font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl",
                  variant === "jungle" ? "text-white" : "text-jungle-950",
                )}
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                className={cn(
                  "mt-4 text-base leading-relaxed sm:text-lg",
                  variant === "jungle" ? "text-jungle-200" : "text-muted",
                )}
              >
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
});
