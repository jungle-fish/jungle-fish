"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

export function MtbSection() {
  const { t, locale } = useLanguage();
  const [showPromo, setShowPromo] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setScreenshotFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshotFile(e.target.files[0]);
    }
  };

  const handleSave = () => {
    if (!walletAddress || !screenshotFile) {
      alert(locale === "es" ? "Por favor completa todos los campos (imagen y dirección de billetera)" : "Please complete all fields (image and wallet address)");
      return;
    }
    setIsSaved(true);
  };

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
                  {i === 4 && (
                    <div className="mt-4">
                      <p className="text-xs font-semibold text-slate-300">
                        {locale === "es" ? "¿Quieres ganar tus primeros JFISH?" : "Want to earn your first JFISH?"}
                      </p>
                      <button
                        onClick={() => setShowPromo(!showPromo)}
                        className="mt-2 inline-flex items-center gap-2 rounded-xl bg-amber-550/90 border border-amber-500/30 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-amber-500 hover:scale-[1.02] transition-all cursor-pointer"
                      >
                        🎁 {locale === "es" ? "100 JFISH Gratis" : "100 Free JFISH"}
                      </button>
                      {showPromo && (
                        <div className="mt-4 p-5 rounded-2xl border border-dashed border-amber-500/30 bg-amber-500/5 space-y-4 max-w-lg">
                          {isSaved ? (
                            <div className="text-center py-4 space-y-2">
                              <span className="text-3xl">🎉</span>
                              <h5 className="font-bold text-emerald-400">
                                {locale === "es" ? "¡Guardado con éxito!" : "Saved successfully!"}
                              </h5>
                              <p className="text-xs text-slate-300">
                                {locale === "es" 
                                  ? "Validaremos tu participación y en unas horas recibirás tus 100 $JFISH." 
                                  : "We will validate your participation and send your 100 $JFISH within a few hours."
                                }
                              </p>
                              <button
                                onClick={() => {
                                  setIsSaved(false);
                                  setWalletAddress("");
                                  setScreenshotFile(null);
                                }}
                                className="mt-4 inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white underline cursor-pointer"
                              >
                                {locale === "es" ? "Enviar otro" : "Submit another"}
                              </button>
                            </div>
                          ) : (
                            <ol className="list-decimal list-inside text-xs text-slate-300 space-y-3.5">
                              <li>
                                {locale === "es" 
                                  ? "Sube la siguiente imagen a tu Instagram, Facebook o TikTok:" 
                                  : "Upload the following image to your Instagram, Facebook, or TikTok:"
                                }
                                <div className="mt-2 pl-4">
                                  <a
                                    href="/visitas-educativas.webp"
                                    download="jfish_promo.webp"
                                    className="inline-flex items-center gap-1.5 text-emerald-400 hover:underline font-bold"
                                  >
                                    📥 {locale === "es" ? "Descargar Imagen Promocional" : "Download Promotional Image"}
                                  </a>
                                </div>
                              </li>
                              <li>
                                {locale === "es" ? "Etiqueta a @JungleFish." : "Tag @JungleFish."}
                              </li>
                              <li className="space-y-3">
                                <span>
                                  {locale === "es" 
                                    ? "Mándanos el pantallazo y déjanos tu dirección de Lobster:" 
                                    : "Send us the screenshot and leave your Lobster address:"
                                  }
                                </span>

                                {/* Drag & Drop Area */}
                                <div className="mt-2">
                                  <div
                                    onDragEnter={handleDrag}
                                    onDragOver={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDrop={handleDrop}
                                    className={cn(
                                      "relative flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed transition-all",
                                      dragActive ? "border-emerald-400 bg-emerald-500/10" : "border-white/10 hover:border-white/20 bg-black/20",
                                      screenshotFile ? "border-emerald-500/50 bg-emerald-500/5" : ""
                                    )}
                                  >
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={handleFileChange}
                                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                      id="file-upload"
                                    />
                                    {screenshotFile ? (
                                      <div className="text-center pointer-events-none">
                                        <span className="text-xl">📸</span>
                                        <p className="text-xs text-emerald-400 font-semibold mt-1 max-w-[250px] truncate">
                                          {screenshotFile.name}
                                        </p>
                                        <p className="text-[10px] text-slate-500">
                                          {(screenshotFile.size / 1024).toFixed(1)} KB
                                        </p>
                                      </div>
                                    ) : (
                                      <div className="text-center pointer-events-none">
                                        <span className="text-xl">📤</span>
                                        <p className="text-xs text-slate-300 font-medium mt-1">
                                          {locale === "es" ? "Arrastra tu captura aquí" : "Drag your screenshot here"}
                                        </p>
                                        <p className="text-[10px] text-slate-500 mt-0.5">
                                          {locale === "es" ? "o haz clic para explorar" : "or click to browse"}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Stellar Address Input */}
                                <div className="space-y-1">
                                  <label htmlFor="wallet-address" className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                                    {locale === "es" ? "Dirección Pública Stellar" : "Stellar Public Address"}
                                  </label>
                                  <input
                                    type="text"
                                    id="wallet-address"
                                    value={walletAddress}
                                    onChange={(e) => setWalletAddress(e.target.value)}
                                    placeholder={locale === "es" ? "Dirección de Lobster (G...)" : "Lobster Address (G...)"}
                                    className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-hidden"
                                  />
                                </div>

                                {/* Save Submit Button */}
                                <button
                                  type="button"
                                  onClick={handleSave}
                                  className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:from-emerald-400 hover:to-teal-400 transition-all cursor-pointer"
                                >
                                  💾 {locale === "es" ? "Guardar" : "Save"}
                                </button>
                              </li>
                              <li>
                                {locale === "es" 
                                  ? "En unas horas recibirás tus JFISH listos para canjearlos por descuentos." 
                                  : "Within a few hours, you'll receive your JFISH ready to redeem for discounts."
                                }
                              </li>
                            </ol>
                          )}
                        </div>
                      )}
                    </div>
                  )}
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

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
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
              <Link
                href="/token"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-base font-bold text-white hover:bg-white/10 transition-all sm:w-auto"
              >
                {locale === "es" ? "Conoce más sobre JFISH token" : "Learn more about JFISH token"}
              </Link>
            </div>
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
