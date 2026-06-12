"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/motion/SectionHeader";
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
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          variant={variant === "jungle" ? "jungle" : "default"}
          align={align}
        />
        {children}
      </Container>
    </section>
  );
});
