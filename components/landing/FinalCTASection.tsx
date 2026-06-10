"use client";

import { Section } from "@/components/layout/Section";
import { CTA } from "@/components/ui/CTA";
import { FadeIn } from "@/components/motion/FadeIn";
import { contact } from "@/lib/contact";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function FinalCTASection() {
  const { t } = useLanguage();

  return (
    <Section id="visit" variant="default" align="center">
      <FadeIn className="mx-auto max-w-3xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-jungle-700">
          {t.finalCta.eyebrow}
        </p>
        <CTA
          title={t.finalCta.title}
          description={t.finalCta.description}
          primaryLabel={t.finalCta.ctaPrimary}
          primaryHref={`mailto:${contact.email}`}
          secondaryLabel={t.finalCta.ctaSecondary}
          secondaryHref="#gallery"
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-jungle-200 bg-cream px-6 py-5 text-left">
            <p className="text-xs font-medium uppercase tracking-wider text-jungle-700">
              {t.finalCta.locationLabel}
            </p>
            <a
              href={contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-sm text-jungle-800 underline-offset-4 hover:underline sm:text-base"
            >
              {contact.address}
            </a>
          </div>
          <div className="rounded-2xl border border-jungle-200 bg-cream px-6 py-5 text-left">
            <p className="text-xs font-medium uppercase tracking-wider text-jungle-700">
              {t.finalCta.phoneLabel}
            </p>
            <a
              href={`tel:${contact.phoneHref}`}
              className="mt-1 block text-sm text-jungle-800 underline-offset-4 hover:underline sm:text-base"
            >
              {contact.phoneDisplay}
            </a>
          </div>
          <div className="rounded-2xl border border-jungle-200 bg-cream px-6 py-5 text-left">
            <p className="text-xs font-medium uppercase tracking-wider text-jungle-700">
              {t.finalCta.contactLabel}
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="mt-1 block text-sm text-jungle-800 underline-offset-4 hover:underline sm:text-base"
            >
              {contact.email}
            </a>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}
