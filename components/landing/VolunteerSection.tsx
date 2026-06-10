"use client";

import { useRef, useState, type FormEvent } from "react";
import { useScroll, useTransform } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import { VolunteerSectionBackground } from "@/components/landing/VolunteerSectionBackground";
import { contact } from "@/lib/contact";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { PHONE_COUNTRY_CODES } from "@/lib/volunteer/country-codes";
import { cn } from "@/lib/utils";

const inputClassName =
  "w-full rounded-xl border border-jungle-200 bg-white px-4 py-3 text-sm text-jungle-950 outline-none transition-colors placeholder:text-jungle-400/80 focus:border-jungle-600 focus:ring-2 focus:ring-jungle-600/20 sm:text-base";

export function VolunteerSection() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const parallaxScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1.1, 1.2],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const fullName = String(data.get("fullName") ?? "").trim();
    const countryCode = String(data.get("countryCode") ?? "");
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const body = [
      `${t.volunteer.emailBodyIntro}`,
      "",
      `${t.volunteer.form.fullName}: ${fullName}`,
      `${t.volunteer.form.phone}: ${countryCode} ${phone}`,
      `${t.volunteer.form.email}: ${email}`,
      "",
      `${t.volunteer.form.message}:`,
      message,
    ].join("\n");

    const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(t.volunteer.emailSubject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSubmitted(true);
    form.reset();
  }

  return (
    <Section
      ref={sectionRef}
      id="volunteer"
      eyebrow={t.volunteer.eyebrow}
      title={t.volunteer.title}
      description={t.volunteer.description}
      variant="jungle"
      className="overflow-hidden"
      containerClassName="max-w-6xl"
      decorations={
        <VolunteerSectionBackground y={parallaxY} scale={parallaxScale} />
      }
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-start">
        <FadeIn>
          <div className="space-y-8">
            <p className="text-base leading-relaxed text-jungle-100 sm:text-lg">
              {t.volunteer.intro}
            </p>

            <ul className="space-y-4">
              {t.volunteer.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-jungle-100 sm:text-base"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-jungle-400" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="rounded-2xl border border-jungle-600/40 bg-jungle-800/40 p-5 sm:p-6">
              <p className="font-display text-lg font-semibold text-white">
                {t.volunteer.noteTitle}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-jungle-200 sm:text-base">
                {t.volunteer.noteBody}
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="rounded-3xl border border-jungle-600/30 bg-cream p-6 shadow-xl shadow-jungle-950/20 sm:p-8">
            <h3 className="font-display text-2xl font-semibold text-jungle-950">
              {t.volunteer.formTitle}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
              {t.volunteer.formDescription}
            </p>

            {submitted ? (
              <div
                className="mt-6 rounded-2xl border border-jungle-300 bg-jungle-100/80 px-5 py-6 text-sm leading-relaxed text-jungle-900 sm:text-base"
                role="status"
              >
                {t.volunteer.successMessage}
              </div>
            ) : (
              <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="volunteer-fullName"
                    className="mb-2 block text-sm font-medium text-jungle-900"
                  >
                    {t.volunteer.form.fullName}
                  </label>
                  <input
                    id="volunteer-fullName"
                    name="fullName"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder={t.volunteer.form.fullNamePlaceholder}
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label
                    htmlFor="volunteer-phone"
                    className="mb-2 block text-sm font-medium text-jungle-900"
                  >
                    {t.volunteer.form.phone}
                  </label>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <select
                      id="volunteer-countryCode"
                      name="countryCode"
                      defaultValue="+506"
                      className={cn(inputClassName, "sm:max-w-[11rem]")}
                      aria-label={t.volunteer.form.countryCode}
                    >
                      {PHONE_COUNTRY_CODES.map(({ code, country }) => (
                        <option key={`${code}-${country}`} value={code}>
                          {country} {code}
                        </option>
                      ))}
                    </select>
                    <input
                      id="volunteer-phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel-national"
                      placeholder={t.volunteer.form.phonePlaceholder}
                      className={inputClassName}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="volunteer-email"
                    className="mb-2 block text-sm font-medium text-jungle-900"
                  >
                    {t.volunteer.form.email}
                  </label>
                  <input
                    id="volunteer-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder={t.volunteer.form.emailPlaceholder}
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label
                    htmlFor="volunteer-message"
                    className="mb-2 block text-sm font-medium text-jungle-900"
                  >
                    {t.volunteer.form.message}
                  </label>
                  <textarea
                    id="volunteer-message"
                    name="message"
                    required
                    rows={5}
                    placeholder={t.volunteer.form.messagePlaceholder}
                    className={cn(inputClassName, "resize-y min-h-[140px]")}
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-full bg-jungle-700 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-jungle-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jungle-600 sm:w-auto"
                >
                  {t.volunteer.form.submit}
                </button>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
