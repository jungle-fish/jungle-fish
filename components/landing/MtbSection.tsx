"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function MtbSection() {
  const { t } = useLanguage();

  return (
    <section
      id="mtb"
      className="relative overflow-hidden bg-gradient-to-br from-[#0f1a0e] via-[#1a2f18] to-[#0d1a22] py-24 sm:py-32"
    >
      {/* Background texture */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,197,94,0.08)_0%,transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.06)_0%,transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <div className="mb-4 flex items-center gap-3">
          <span className="inline-block h-px w-8 bg-emerald-400" />
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
            {t.mtb.eyebrow}
          </p>
        </div>

        {/* Main layout: text left, image right */}
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT — Text content */}
          <div className="flex flex-col">
            {/* Title */}
            <h2 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
              {t.mtb.title}
            </h2>

            {/* Description */}
            <p className="mb-10 text-lg leading-relaxed text-slate-300">
              {t.mtb.description}
            </p>

            {/* Benefits header */}
            <p className="mb-8 text-base font-bold text-emerald-300">
              {t.mtb.benefitsTitle}
            </p>

            {/* Visual Timeline Flow */}
            <div className="relative border-l border-emerald-500/20 ml-4 pl-8 mb-10 space-y-8">
              {t.mtb.benefits.map((benefit, i) => (
                <div key={i} className="relative">
                  {/* Glowing Step Badge */}
                  <div className="absolute -left-[48px] top-0.5 flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500/40 bg-gradient-to-b from-[#112411] to-[#0a120a] text-xs font-black text-emerald-400 shadow-md ring-4 ring-[#0f1a0e] transition-colors group-hover:border-emerald-400">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-display text-base font-bold text-white sm:text-lg">
                      {benefit.title}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-slate-400">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Urgency box */}
            <div className="mb-8 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-6 py-5">
              <p className="mb-2 font-bold text-amber-300">{t.mtb.urgencyTitle}</p>
              <p className="text-sm leading-relaxed text-amber-100/80">
                {t.mtb.urgencyText}
              </p>
            </div>

            {/* CTA Button */}
            <Link
              href="/registro"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:from-emerald-400 hover:to-teal-400 hover:shadow-emerald-500/40 hover:scale-[1.02] sm:w-auto"
            >
              <span>👉</span>
              {t.mtb.cta}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* RIGHT — Image + floating token icon */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-black/50 ring-1 ring-white/10">
              <Image
                src="/mtb-hero.jpg"
                alt="Mountain biker in Jungle Fish Costa Rica"
                width={900}
                height={600}
                className="h-auto w-full object-cover"
                priority
              />
              {/* Gradient overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a0e]/60 via-transparent to-transparent" />
            </div>

            {/* Floating $JFISH coin badge */}
            <div className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-[#0f1a0e]/90 px-5 py-4 shadow-xl backdrop-blur-md">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-xl font-black text-white shadow-lg shadow-emerald-500/40">
                $
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  $JFISH Token
                </p>
                <p className="text-sm font-bold text-white">Stellar Network</p>
              </div>
            </div>

            {/* Floating discount badge */}
            <div className="absolute -right-4 top-6 rounded-2xl border border-amber-500/30 bg-[#0f1a0e]/90 px-4 py-3 shadow-xl backdrop-blur-md">
              <p className="text-center text-2xl font-extrabold text-amber-400">15%</p>
              <p className="text-center text-xs font-semibold text-slate-300">
                Descuento
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
