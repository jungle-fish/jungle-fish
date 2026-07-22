"use client";

import type { ComponentType, SVGProps } from "react";
import { CldImage } from "next-cloudinary";
import { CardIcon, CashIcon, CoinIcon, TokenIcon } from "@/components/icons";
import { Section } from "@/components/layout/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { CLOUD_IMAGE } from "@/lib/media";
import { cn } from "@/lib/utils";

const traditionalMethods = [
  { key: "cash", icon: CashIcon, color: "text-earth-600 bg-sand-200" },
  { key: "card", icon: CardIcon, color: "text-jungle-800 bg-jungle-100" },
] as const;

const cryptoMethods = [
  { key: "usdc", icon: CoinIcon, color: "text-lagoon-700 bg-lagoon-100" },
  { key: "jfish", icon: TokenIcon, color: "text-jungle-900 bg-jungle-200" },
] as const;

type PaymentMethodCardProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  color: string;
  title: string;
  description: string;
  variant?: "light" | "dark";
};

function PaymentMethodCard({
  icon: Icon,
  color,
  title,
  description,
  variant = "light",
}: PaymentMethodCardProps) {
  const isDark = variant === "dark";

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-2xl border p-6 shadow-sm",
        isDark
          ? "border-white/15 bg-white/10 text-white shadow-jungle-950/20"
          : "border-jungle-200/80 bg-white/90 shadow-jungle-900/5",
      )}
    >
      <div
        className={cn(
          "mb-4 flex h-12 w-12 items-center justify-center rounded-xl",
          color,
        )}
      >
        <Icon className="h-6 w-6" />
      </div>
      <h3
        className={cn(
          "font-display text-lg font-semibold",
          isDark ? "text-white" : "text-jungle-950",
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "mt-2 text-sm leading-relaxed",
          isDark ? "text-jungle-100" : "text-muted",
        )}
      >
        {description}
      </p>
    </article>
  );
}

type PaymentPanelProps = {
  eyebrow: string;
  children: React.ReactNode;
  variant: "light" | "dark";
  className?: string;
};

function PaymentPanel({
  eyebrow,
  children,
  variant,
  className,
}: PaymentPanelProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "overflow-hidden rounded-3xl border p-6 sm:p-8 lg:p-10",
        isDark
          ? "border-jungle-800/20 bg-linear-to-br from-jungle-950 via-jungle-900 to-jungle-800"
          : "border-jungle-200/80 bg-linear-to-br from-white via-cream to-jungle-100/40 shadow-sm shadow-jungle-900/5",
        className,
      )}
    >
      <p
        className={cn(
          "text-sm font-medium uppercase tracking-[0.2em]",
          isDark ? "text-jungle-300" : "text-jungle-700",
        )}
      >
        {eyebrow}
      </p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

export function PaymentSection() {
  const { t } = useLanguage();

  return (
    <Section
      id="payments"
      eyebrow={t.payments.eyebrow}
      title={t.payments.title}
      description={t.payments.description}
      variant="sand"
    >
      <FadeIn>
        <PaymentPanel eyebrow={t.payments.traditionalEyebrow} variant="light">
          <div className="grid gap-5 sm:grid-cols-2">
            {traditionalMethods.map(({ key, icon, color }, index) => {
              const method = t.payments.methods[key];
              return (
                <FadeIn key={key} delay={index * 0.08}>
                  <PaymentMethodCard
                    icon={icon}
                    color={color}
                    title={method.title}
                    description={method.description}
                  />
                </FadeIn>
              );
            })}
          </div>
        </PaymentPanel>
      </FadeIn>

      <FadeIn delay={0.16} className="mt-5">
        <PaymentPanel eyebrow={t.payments.cryptoEyebrow} variant="dark">
          <div className="grid gap-5 sm:grid-cols-2">
            {cryptoMethods.map(({ key, icon, color }, index) => {
              const method = t.payments.methods[key];
              return (
                <FadeIn key={key} delay={0.2 + index * 0.08}>
                  <PaymentMethodCard
                    icon={icon}
                    color={color}
                    title={method.title}
                    description={method.description}
                    variant="dark"
                  />
                </FadeIn>
              );
            })}
          </div>
        </PaymentPanel>
      </FadeIn>
    </Section>
  );
}
