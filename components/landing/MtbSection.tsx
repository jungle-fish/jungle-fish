"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const flowData = {
  es: {
    before: {
      competitor: {
        steps: [
          { text: "Recibes automáticamente tu saldo en $JFISH al pagar la entrada." },
          { text: "Si quieres más tokens, puedes ir a las empresas patrocinadoras del evento." }
        ]
      },
      attendees: {
        steps: [
          { text: "¡El token es para todos! Te enteras de la carrera y el token por las campañas del evento." },
          { text: "Consigue tus primeros tokens gratis en redes sociales etiquetando a los patrocinadores." },
          { text: "O gana tokens directo comprando productos específicos en tiendas aliadas." }
        ]
      }
    },
    during: {
      competitor: {
        steps: [
          { text: "Usa tus tokens en los stands del santuario como cupones de descuento." },
          { text: "Si te quedas sin tokens, puedes ir a stands patrocinadores que los regalen o te den por comprar un producto." },
          { text: "Úsalos en este o en próximos eventos y en empresas patrocinadoras." }
        ]
      },
      attendees: {
        steps: [
          { text: "Usa tus tokens en stands como cupones de descuento para consumir alimentos y bebidas." },
          { text: "Si te quedas sin tokens, ve a los stands aliados que regalan $JFISH o que den tokens por la compra de artículos." },
          { text: "Usa tu saldo durante el evento o guárdalo para futuros eventos y patrocinadores." }
        ]
      }
    },
    after: {
      competitor: {
        steps: [
          { text: "Canjea tus tokens restantes por descuentos en locales y empresas patrocinadoras de la zona." },
          { text: "Visita patrocinadores que regalen $JFISH o que den tokens con la compra de productos para seguir sumando saldo." },
          { text: "Úsalos en próximos eventos o en empresas aliadas durante los siguientes 6 meses." }
        ]
      },
      attendees: {
        steps: [
          { text: "Usa tu saldo como cupones de descuento en comercios y hoteles aliados de la región." },
          { text: "Visita a las empresas patrocinadoras que regalen $JFISH o den tokens por compras para acumular más." },
          { text: "Úsalos en tus visitas habituales o guárdalos para la carrera del próximo año." }
        ]
      }
    }
  },
  en: {
    before: {
      competitor: {
        steps: [
          { text: "Automatically receive your $JFISH token balance when paying your race entry." },
          { text: "If you want more tokens, you can visit the sponsoring companies of the event." }
        ]
      },
      attendees: {
        steps: [
          { text: "The token is for everyone! Learn about the race and the token through our event campaigns." },
          { text: "Get your first tokens free on social media by tagging our official sponsors." },
          { text: "Or earn tokens directly by purchasing specific products at allied shops." }
        ]
      }
    },
    during: {
      competitor: {
        steps: [
          { text: "Use your tokens at sanctuary stands as discount coupons." },
          { text: "If you run out of tokens, visit sponsor stands that gift them or give them for purchasing a product." },
          { text: "Spend them during this or future events and with sponsoring companies." }
        ]
      },
      attendees: {
        steps: [
          { text: "Use your tokens at the stands as discount coupons for food and beverages." },
          { text: "If you run out, go to allied stands that gift $JFISH or give tokens for product purchases." },
          { text: "Use your balance during the event or save it for future events and sponsors." }
        ]
      }
    },
    after: {
      competitor: {
        steps: [
          { text: "Redeem your remaining tokens for discounts at local shops and sponsoring companies in the area." },
          { text: "Visit sponsors that gift $JFISH or give tokens with product purchases to keep adding balance." },
          { text: "Use them in future events or allied businesses for the next 6 months." }
        ]
      },
      attendees: {
        steps: [
          { text: "Use your balance as discount coupons in local shops and allied hotels in the region." },
          { text: "Visit sponsoring companies that gift $JFISH or give tokens for purchases to earn more." },
          { text: "Use them on your regular visits or save them for next year's race." }
        ]
      }
    }
  }
};

export function MtbSection() {
  const { t, locale } = useLanguage();
  const [showPromo, setShowPromo] = useState(false);
  const [showTokenInfo, setShowTokenInfo] = useState(false);
  const [activeTab, setActiveTab] = useState<"before" | "during" | "after">("before");
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
              <button
                type="button"
                onClick={() => setShowTokenInfo(!showTokenInfo)}
                className="inline-flex w-full items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-base font-bold text-white hover:bg-white/10 transition-all sm:w-auto cursor-pointer"
              >
                {locale === "es" ? "Conoce más sobre JFISH token" : "Learn more about JFISH token"}
              </button>
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

        {/* Collapsible Token Flow Dashboard */}
        {showTokenInfo && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-16 rounded-3xl border border-emerald-500/20 bg-black/40 p-6 sm:p-10 backdrop-blur-md shadow-2xl"
          >
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xl font-black mb-3">
                $
              </span>
              <h3 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
                {locale === "es" ? "Ciclo de Valor del Token $JFISH" : "$JFISH Token Value Cycle"}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {locale === "es"
                  ? "Entiende cómo fluye y se multiplica el valor de tu saldo en cada etapa de la carrera"
                  : "Understand how your token balance flows and multiplies at each stage of the race"}
              </p>
            </div>

            {/* Steps Selector (Before / During / After) */}
            <div className="flex border-b border-white/5 mb-10 pb-px overflow-x-auto justify-start md:justify-center gap-2 scrollbar-none">
              {(["before", "during", "after"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-6 py-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer",
                    activeTab === tab
                      ? "border-emerald-400 text-emerald-400"
                      : "border-transparent text-slate-450 hover:text-white"
                  )}
                >
                  {tab === "before" && (locale === "es" ? "1. Antes del Evento" : "1. Before the Event")}
                  {tab === "during" && (locale === "es" ? "2. Durante el Evento" : "2. During the Event")}
                  {tab === "after" && (locale === "es" ? "3. Después del Evento (Hasta 6 meses)" : "3. After the Event (Up to 6 months)")}
                </button>
              ))}
            </div>

            {/* Dynamic Comparison Cards */}
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Competitors Flow */}
              <div className="rounded-2xl border border-white/5 bg-[#0e170e]/80 p-6 sm:p-8 space-y-6 shadow-lg shadow-[#060c06]/50">
                <div className="flex items-center justify-between border-b border-emerald-500/10 pb-4">
                  <h4 className="font-display text-lg font-bold text-emerald-400 flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 text-base">
                      🚴
                    </span>
                    {locale === "es" ? "Competidores" : "Competitors"}
                  </h4>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                    {locale === "es" ? "Inscritos" : "Registered"}
                  </span>
                </div>

                <div className="space-y-6 relative pl-4 border-l border-emerald-500/10 ml-2">
                  {(locale === "es" ? flowData.es[activeTab].competitor.steps : flowData.en[activeTab].competitor.steps).map((step, idx) => (
                    <div key={idx} className="relative">
                      {/* Node circle on the vertical left line */}
                      <span className="absolute -left-[29px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[8px] font-bold text-white shadow-sm ring-4 ring-[#0e170e]">
                        {idx + 1}
                      </span>
                      <p className="text-sm leading-relaxed text-slate-300">
                        {step.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attendees Flow */}
              <div className="rounded-2xl border border-white/5 bg-[#17140e]/80 p-6 sm:p-8 space-y-6 shadow-lg shadow-[#0c0a06]/50">
                <div className="flex items-center justify-between border-b border-amber-500/10 pb-4">
                  <h4 className="font-display text-lg font-bold text-amber-400 flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 text-base">
                      👥
                    </span>
                    {locale === "es" ? "Asistentes y Familiares" : "Spectators & Family"}
                  </h4>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/25">
                    {locale === "es" ? "Público General" : "General Public"}
                  </span>
                </div>

                <div className="space-y-6 relative pl-4 border-l border-amber-500/10 ml-2">
                  {(locale === "es" ? flowData.es[activeTab].attendees.steps : flowData.en[activeTab].attendees.steps).map((step, idx) => (
                    <div key={idx} className="relative">
                      {/* Node circle on the vertical left line */}
                      <span className="absolute -left-[29px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[8px] font-bold text-[#17140e] shadow-sm ring-4 ring-[#17140e]">
                        {idx + 1}
                      </span>
                      <p className="text-sm leading-relaxed text-slate-300">
                        {step.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
