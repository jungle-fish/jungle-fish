import { Button } from "./Button";
import { cn } from "@/lib/utils";

type CTAProps = {
  title: string;
  description?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
  variant?: "light" | "dark";
};

export function CTA({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  className,
  variant = "light",
}: CTAProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "rounded-3xl border p-8 sm:p-10 lg:p-12",
        isDark
          ? "border-jungle-700/50 bg-jungle-800/50"
          : "border-jungle-200 bg-white shadow-lg shadow-jungle-900/5",
        className,
      )}
    >
      <h3
        className={cn(
          "font-display text-2xl font-semibold sm:text-3xl",
          isDark ? "text-white" : "text-jungle-950",
        )}
      >
        {title}
      </h3>
      {description && (
        <p
          className={cn(
            "mt-3 max-w-xl text-base leading-relaxed",
            isDark ? "text-jungle-200" : "text-muted",
          )}
        >
          {description}
        </p>
      )}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button
          href={primaryHref}
          variant={isDark ? "outline" : "primary"}
          size="lg"
        >
          {primaryLabel}
        </Button>
        {secondaryLabel && secondaryHref && (
          <Button
            href={secondaryHref}
            variant={isDark ? "ghost" : "secondary"}
            size="lg"
            className={isDark ? "text-white hover:bg-white/10" : undefined}
          >
            {secondaryLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
