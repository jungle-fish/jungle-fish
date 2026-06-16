"use client";

import { useRef, useState, type FormEvent } from "react";
import { useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeader } from "@/components/motion/SectionHeader";
import { CloudinaryBackgroundVideo } from "@/components/landing/CloudinaryBackgroundVideo";
import { Button } from "@/components/ui/Button";
import { contact } from "@/lib/contact";
import { CLOUD_VIDEO } from "@/lib/media";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const inputClassName =
  "w-full rounded-xl border border-jungle-600/50 bg-jungle-950/40 px-4 py-3 text-sm text-jungle-100 outline-none transition-colors placeholder:text-jungle-400/60 focus:border-lagoon-400 focus:ring-2 focus:ring-lagoon-400/20 sm:text-base";

function JFishVideoOverlay() {
  return (
    <div
      className="jfish-video-overlay pointer-events-none absolute inset-0 z-[1]"
      aria-hidden
    />
  );
}

export function JFishSection() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const body = [
      t.jfish.emailBodyIntro,
      "",
      `${t.jfish.form.name}: ${name}`,
      `${t.jfish.form.email}: ${email}`,
      "",
      `${t.jfish.form.message}:`,
      message,
    ].join("\n");

    const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(t.jfish.emailSubject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSubmitted(true);
    form.reset();
  }

  return (
    <section
      ref={sectionRef}
      id="jfish"
      className="relative overflow-hidden bg-jungle-900 py-16 text-jungle-100 sm:py-20 lg:py-24"
    >
      <CloudinaryBackgroundVideo
        publicId={CLOUD_VIDEO.background}
        className="absolute inset-0 overflow-hidden"
        motion={{ y: parallaxY }}
        title="Jungle Fish background video"
      />

      <JFishVideoOverlay />

      <Container className="relative z-10">
        <SectionHeader
          eyebrow={t.jfish.eyebrow}
          title={t.jfish.title}
          description={t.jfish.description}
          variant="jungle"
        />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <FadeIn>
            <div className="rounded-3xl border border-jungle-700/50 bg-jungle-800/40 p-8 backdrop-blur-[2px]">
              <h3 className="font-display text-xl font-semibold text-white">
                {t.jfish.usesTitle}
              </h3>
              <ul className="mt-5 space-y-3">
                {t.jfish.uses.map((use) => (
                  <li
                    key={use}
                    className="flex items-start gap-3 text-sm text-jungle-200 sm:text-base"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lagoon-300" />
                    {use}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-jungle-200 sm:text-base">
                {t.jfish.closingText}
              </p>
              <Button
                href={contact.x}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="sm"
                className="mt-6 w-full sm:w-auto"
              >
                {t.jfish.xCta}
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-xl font-semibold text-white">
                  {t.jfish.howTitle}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-jungle-200 sm:text-base">
                  {t.jfish.howDescription}
                </p>
              </div>

              <div className="rounded-3xl border border-jungle-700/50 bg-jungle-800/40 p-8 backdrop-blur-[2px]">
                <h3 className="font-display text-xl font-semibold text-white">
                  {t.jfish.interestTitle}
                </h3>
                <p className="mt-2 text-sm font-medium text-jungle-200 sm:text-base">
                  {t.jfish.contactLabel}
                </p>
                {submitted ? (
                  <div
                    className="mt-5 rounded-2xl border border-jungle-600/40 bg-jungle-950/30 px-5 py-6 text-sm leading-relaxed text-jungle-100 sm:text-base"
                    role="status"
                  >
                    {t.jfish.successMessage}
                  </div>
                ) : (
                  <form className="mt-5 space-y-4" onSubmit={handleContactSubmit}>
                    <div>
                      <label
                        htmlFor="jfish-name"
                        className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-jungle-300"
                      >
                        {t.jfish.form.name}
                      </label>
                      <input
                        id="jfish-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder={t.jfish.form.namePlaceholder}
                        className={inputClassName}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="jfish-email"
                        className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-jungle-300"
                      >
                        {t.jfish.form.email}
                      </label>
                      <input
                        id="jfish-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder={t.jfish.form.emailPlaceholder}
                        className={inputClassName}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="jfish-message"
                        className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-jungle-300"
                      >
                        {t.jfish.form.message}
                      </label>
                      <textarea
                        id="jfish-message"
                        name="message"
                        required
                        rows={3}
                        placeholder={t.jfish.form.messagePlaceholder}
                        className={`${inputClassName} min-h-[100px] resize-y`}
                      />
                    </div>
                    <button
                      type="submit"
                      className="inline-flex cursor-pointer items-center justify-center rounded-full bg-jungle-700 px-4 py-2 text-sm font-medium text-white transition-[background-color,transform,box-shadow] duration-200 hover:scale-[1.02] hover:bg-jungle-800 hover:shadow-md hover:shadow-jungle-950/20 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jungle-600"
                    >
                      {t.jfish.form.submit}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
