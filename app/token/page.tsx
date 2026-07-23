"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function TokenInfoPage() {
  const { locale } = useLanguage();

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f1a0e] via-[#1a2f18] to-[#0d1a22] text-white flex items-center justify-center py-20 px-4">
      <Container className="max-w-2xl text-center">
        <span className="flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-4xl font-black text-white shadow-lg shadow-emerald-500/40 mb-8">
          $
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 sm:text-5xl">
          {locale === "es" ? "JFISH Token" : "JFISH Token"}
        </h1>
        <p className="text-lg text-slate-300 mb-8 max-w-lg mx-auto">
          {locale === "es"
            ? "Toda la información sobre el token del santuario, su economía en la red Stellar y cómo usarlo en la zona estará disponible aquí muy pronto."
            : "All information about the sanctuary token, its economy on the Stellar network, and how to use it in the region will be available here very soon."}
        </p>
        <div className="flex justify-center gap-4">
          <Button href="/" variant="primary">
            {locale === "es" ? "Volver al Inicio" : "Back to Home"}
          </Button>
        </div>
      </Container>
    </main>
  );
}
