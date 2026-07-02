"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// ─── Config ──────────────────────────────────────────────────────────────────
const SINPE_PHONE = "XXXX-XXXX"; // ← reemplaza con tu número real
const USDC_WALLET = "GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"; // ← reemplaza con tu ID real
const MTB_PRICE_USD = 35; // precio de la inscripción
const STRIPE_LINK = "https://buy.stripe.com/mock_link"; // ← reemplaza con tu link de pago de Stripe
const MONEYGRAM_INFO = {
  name: "Isaac Camacho Navarro",
  id: "1-XXXX-XXXX", // Cédula o ID del receptor
  country: "Costa Rica",
  city: "San Isidro del General",
};

// ─── Types ────────────────────────────────────────────────────────────────────
type PaymentMethod = "sinpe" | "transfer" | "usdc" | "stripe" | "moneygram" | null;
type Step = 1 | 2 | 3 | 4;

// ─── Step indicator ──────────────────────────────────────────────────────────
function StepDot({ n, current }: { n: number; current: number }) {
  const done = current > n;
  const active = current === n;
  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
          done
            ? "bg-emerald-500 text-white"
            : active
            ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30"
            : "bg-white/10 text-white/40"
        }`}
      >
        {done ? "✓" : n}
      </div>
      {n < 3 && (
        <div
          className={`h-px w-8 sm:w-16 transition-all duration-500 ${
            current > n ? "bg-emerald-500" : "bg-white/10"
          }`}
        />
      )}
    </div>
  );
}

// ─── Method card ─────────────────────────────────────────────────────────────
function MethodCard({
  id,
  icon,
  label,
  sub,
  selected,
  onClick,
}: {
  id: PaymentMethod;
  icon: string;
  label: string;
  sub: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-2xl border p-5 text-left transition-all duration-200 ${
        selected
          ? "border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/10"
          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
      }`}
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-2xl">
        {icon}
      </span>
      <div>
        <p className="font-semibold text-white">{label}</p>
        <p className="text-sm text-slate-400">{sub}</p>
      </div>
      <div
        className={`ml-auto h-5 w-5 shrink-0 rounded-full border-2 transition-all ${
          selected
            ? "border-emerald-500 bg-emerald-500"
            : "border-white/20 bg-transparent"
        }`}
      >
        {selected && (
          <svg viewBox="0 0 20 20" fill="white" className="h-full w-full p-0.5">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </button>
  );
}

// ─── Main wizard ──────────────────────────────────────────────────────────────
export function MtbRegistrationWizard() {
  const [step, setStep] = useState<Step>(1);
  const [method, setMethod] = useState<PaymentMethod>(null);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [email, setEmail] = useState("");
  const [jfishWallet, setJfishWallet] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setProofFile(e.target.files[0]);
  };

  const canProceedStep1 = method !== null;
  const canProceedStep2 =
    method === "sinpe" || method === "transfer" || method === "moneygram"
      ? proofFile !== null
      : true; // USDC and Stripe don't require an uploaded proof file here
  const canProceedStep3 = email.includes("@") && email.includes(".");
  const canProceedStep4 = jfishWallet.trim().length > 10;

  // Flow labels based on method
  const stepLabels =
    method === "usdc"
      ? ["Método de pago", "Realizar pago", "Tu billetera", "Confirmación"]
      : method === "stripe"
      ? ["Método de pago", "Pagar en línea", "Tu correo", "Confirmación"]
      : ["Método de pago", "Comprobante", "Tu correo", "Confirmación"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1a0e] via-[#1a2f18] to-[#0d1a22] px-4 py-12 sm:px-6 lg:px-8">
      {/* Back link */}
      <div className="mx-auto mb-8 max-w-2xl">
        <Link
          href="/#mtb"
          className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Volver al sitio
        </Link>
      </div>

      {/* Card */}
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-semibold text-emerald-400">
            🚵 MTB Competition — Jungle Fish
          </span>
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Asegura tu campo
          </h1>
          <p className="mt-2 text-slate-400">
            Inscripción · ${MTB_PRICE_USD} USD · Incluye tokens $JFISH
          </p>
        </div>

        {/* Step indicator */}
        <div className="mb-8 flex items-center justify-center">
          {[1, 2, 3, 4].map((n) => (
            <StepDot key={n} n={n} current={step} />
          ))}
        </div>
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-emerald-400">
          Paso {step} — {stepLabels[step - 1]}
        </p>

        {/* Panel */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
          {/* ── STEP 1: Choose method ───────────────────────────────────── */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="mb-6 text-xl font-bold text-white">
                ¿Cómo vas a pagar?
              </h2>
              <MethodCard
                id="stripe"
                icon="💳"
                label="Tarjeta (Stripe)"
                sub="Pago seguro en línea con tarjeta de crédito o débito"
                selected={method === "stripe"}
                onClick={() => setMethod("stripe")}
              />
              <MethodCard
                id="sinpe"
                icon="📱"
                label="SINPE Móvil"
                sub="Transferencia instantánea desde tu app bancaria (Costa Rica)"
                selected={method === "sinpe"}
                onClick={() => setMethod("sinpe")}
              />
              <MethodCard
                id="transfer"
                icon="🏦"
                label="Transferencia Bancaria"
                sub="Depósito o SINPE a cuenta bancaria"
                selected={method === "transfer"}
                onClick={() => setMethod("transfer")}
              />
              <MethodCard
                id="usdc"
                icon="💎"
                label="USDC (Cripto)"
                sub="Paga en USDC y recibe $JFISH en tu billetera"
                selected={method === "usdc"}
                onClick={() => setMethod("usdc")}
              />
              <MethodCard
                id="moneygram"
                icon="💵"
                label="MoneyGram"
                sub="Envío internacional de efectivo a persona"
                selected={method === "moneygram"}
                onClick={() => setMethod("moneygram")}
              />
            </div>
          )}

          {/* ── STEP 2a: SINPE / Transfer / MoneyGram — upload proof ────────── */}
          {step === 2 && (method === "sinpe" || method === "transfer" || method === "moneygram") && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">
                {method === "sinpe"
                  ? "Realiza el SINPE Móvil"
                  : method === "transfer"
                  ? "Realiza la transferencia bancaria"
                  : "Envía el dinero por MoneyGram"}
              </h2>

              {/* Payment info box */}
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
                {method === "sinpe" ? (
                  <>
                    <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
                      Número de SINPE Móvil
                    </p>
                    <p className="mt-2 text-3xl font-extrabold tracking-widest text-white">
                      {SINPE_PHONE}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Monto: ${MTB_PRICE_USD} USD (equivalente en colones al tipo de cambio del día)
                    </p>
                  </>
                ) : method === "transfer" ? (
                  <>
                    <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
                      Datos para transferencia
                    </p>
                    <div className="mt-3 space-y-1 text-sm text-white">
                      <p><span className="text-slate-400">Banco:</span> BAC San José</p>
                      <p><span className="text-slate-400">Cuenta:</span> XXXX-XXXX-XXXX-XXXX</p>
                      <p><span className="text-slate-400">Nombre:</span> Jungle Fish S.A.</p>
                      <p><span className="text-slate-400">Monto:</span> ${MTB_PRICE_USD} USD</p>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
                      Datos para el envío de MoneyGram
                    </p>
                    <div className="mt-3 space-y-1 text-sm text-white">
                      <p><span className="text-slate-400">Receptor:</span> {MONEYGRAM_INFO.name}</p>
                      <p><span className="text-slate-400">ID / Cédula:</span> {MONEYGRAM_INFO.id}</p>
                      <p><span className="text-slate-400">País:</span> {MONEYGRAM_INFO.country}</p>
                      <p><span className="text-slate-400">Ciudad:</span> {MONEYGRAM_INFO.city}</p>
                      <p><span className="text-slate-400">Monto:</span> ${MTB_PRICE_USD} USD</p>
                    </div>
                  </>
                )}
              </div>

              <p className="text-sm text-slate-400">
                Una vez realizado el pago, adjunta el comprobante de envío (foto o captura de pantalla):
              </p>

              {/* File upload */}
              <button
                onClick={() => fileRef.current?.click()}
                className={`flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed py-10 transition-all duration-200 ${
                  proofFile
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
                }`}
              >
                {proofFile ? (
                  <>
                    <span className="text-3xl">✅</span>
                    <p className="text-sm font-semibold text-emerald-400">
                      {proofFile.name}
                    </p>
                    <p className="text-xs text-slate-500">Clic para cambiar</p>
                  </>
                ) : (
                  <>
                    <span className="text-3xl">📎</span>
                    <p className="text-sm font-semibold text-white">
                      Adjuntar comprobante
                    </p>
                    <p className="text-xs text-slate-500">
                      PNG, JPG o PDF · máx 10 MB
                    </p>
                  </>
                )}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          )}

          {/* ── STEP 2b: USDC — show our wallet ─────────────────────────── */}
          {step === 2 && method === "usdc" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">
                Envía el pago en USDC
              </h2>
              <p className="text-sm text-slate-400">
                Realiza el pago de{" "}
                <span className="font-bold text-white">${MTB_PRICE_USD} USDC</span>{" "}
                a la siguiente billetera en la red Stellar (Lobstr):
              </p>

              {/* Wallet display */}
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-400">
                  ID de billetera Jungle Fish (Stellar)
                </p>
                <p className="break-all font-mono text-sm text-white">
                  {USDC_WALLET}
                </p>
                <button
                  onClick={() => navigator.clipboard.writeText(USDC_WALLET)}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
                >
                  📋 Copiar ID
                </button>
              </div>

              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
                <p className="text-sm text-amber-200">
                  ⚠️ Usa únicamente la red <strong>Stellar</strong>. Envíos en
                  otras redes no serán recibidos.
                </p>
              </div>

              <p className="text-sm text-slate-400">
                Una vez enviado el pago, continúa al siguiente paso para
                registrar tu billetera y recibir tus tokens $JFISH.
              </p>
            </div>
          )}

          {/* ── STEP 2c: Stripe — card payment button ─────────────────────────── */}
          {step === 2 && method === "stripe" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">
                Paga de forma segura con Stripe
              </h2>
              <p className="text-sm text-slate-400">
                Usa el siguiente enlace para realizar el pago de{" "}
                <span className="font-bold text-white">${MTB_PRICE_USD} USD</span>{" "}
                con tarjeta de crédito o débito a través de la plataforma segura de Stripe.
              </p>

              {/* Stripe Link Button */}
              <div className="flex justify-center py-6">
                <a
                  href={STRIPE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-2xl bg-[#635bff] px-8 py-4 text-base font-bold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:bg-[#7a73ff] hover:scale-[1.02] hover:shadow-indigo-500/40"
                >
                  💳 Pagar con Tarjeta (Stripe)
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
                <p className="text-sm text-emerald-200">
                  ℹ️ **Nota:** Una vez completado el pago en Stripe, regresa a esta página y presiona **Continuar** para ingresar tu correo y recibir tu entrada.
                </p>
              </div>
            </div>
          )}

          {/* ── STEP 3a: Email (SINPE / transfer / moneygram / stripe) ───────── */}
          {step === 3 && (method === "sinpe" || method === "transfer" || method === "moneygram" || method === "stripe") && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">
                ¿A dónde enviamos tu entrada?
              </h2>
              <p className="text-sm text-slate-400">
                Ingresa tu correo electrónico. Una vez confirmado el pago
                manualmente, recibirás tu entrada ahí.
              </p>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tucorreo@ejemplo.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
                />
              </div>

              <p className="text-sm text-slate-400">
                ¿Quieres recibir también tus tokens{" "}
                <span className="font-semibold text-emerald-400">$JFISH</span>?
                Ingresa el ID de tu billetera Stellar (opcional):
              </p>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  ID billetera Stellar{" "}
                  <span className="font-normal text-slate-500">(opcional)</span>
                </label>
                <input
                  type="text"
                  value={jfishWallet}
                  onChange={(e) => setJfishWallet(e.target.value)}
                  placeholder="GXXXXXXXXXXXXXXXX..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-mono text-sm text-white placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
                />
              </div>
            </div>
          )}

          {/* ── STEP 3b: USDC — collect their wallet ─────────────────────── */}
          {step === 3 && method === "usdc" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">
                ¿A dónde enviamos tus $JFISH?
              </h2>
              <p className="text-sm text-slate-400">
                Ingresa el ID de tu billetera Stellar para que podamos enviarte
                tus tokens <span className="font-semibold text-emerald-400">$JFISH</span> automáticamente al confirmar el pago.
              </p>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  ID de tu billetera Stellar / Lobstr
                </label>
                <input
                  type="text"
                  value={jfishWallet}
                  onChange={(e) => setJfishWallet(e.target.value)}
                  placeholder="GXXXXXXXXXXXXXXXX..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-mono text-sm text-white placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
                />
              </div>
              <p className="text-sm text-slate-400">
                ¿Aún no tienes billetera? Descarga{" "}
                <a
                  href="https://lobstr.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-emerald-400 underline"
                >
                  Lobstr
                </a>{" "}
                y crea una en minutos.
              </p>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Correo electrónico (para tu confirmación)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tucorreo@ejemplo.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
                />
              </div>
            </div>
          )}

          {/* ── STEP 4: Confirmation ─────────────────────────────────────── */}
          {step === 4 && (
            <div className="space-y-6 text-center">
              {!submitted ? (
                <>
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-5xl">
                    🏁
                  </div>
                  <h2 className="text-2xl font-extrabold text-white">
                    ¡Todo listo para enviar!
                  </h2>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Método de pago</span>
                      <span className="font-semibold text-white">
                        {method === "sinpe"
                          ? "SINPE Móvil"
                          : method === "transfer"
                          ? "Transferencia Bancaria"
                          : method === "usdc"
                          ? "USDC"
                          : method === "stripe"
                          ? "Tarjeta (Stripe)"
                          : "MoneyGram"}
                      </span>
                    </div>
                    {proofFile && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Comprobante</span>
                        <span className="font-semibold text-emerald-400">
                          ✓ Adjunto
                        </span>
                      </div>
                    )}
                    {email && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Correo</span>
                        <span className="font-semibold text-white">{email}</span>
                      </div>
                    )}
                    {jfishWallet && (
                      <div className="flex flex-col gap-1 text-sm">
                        <span className="text-slate-400">Billetera $JFISH</span>
                        <span className="break-all font-mono text-xs text-emerald-400">
                          {jfishWallet}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-slate-400">
                    Al enviar, un administrador de Jungle Fish revisará tu pago
                    y te contactará por correo en menos de 24 horas.
                  </p>
                </>
              ) : (
                <div className="space-y-5 py-4">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/20 text-6xl animate-bounce">
                    🎉
                  </div>
                  <h2 className="text-2xl font-extrabold text-white">
                    ¡Inscripción enviada!
                  </h2>
                  <p className="text-slate-400">
                    Revisaremos tu pago y te enviaremos tu entrada a{" "}
                    <span className="font-semibold text-white">{email || "tu correo"}</span>{" "}
                    en menos de 24 horas. ¡Nos vemos en la pista! 🚵
                  </p>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-105"
                  >
                    Volver al inicio
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* ── Navigation buttons ───────────────────────────────────────── */}
          {step < 4 && (
            <div className="mt-8 flex gap-3">
              {step > 1 && (
                <button
                  onClick={() => setStep((s) => (s - 1) as Step)}
                  className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition-all hover:bg-white/10"
                >
                  ← Atrás
                </button>
              )}
              <button
                disabled={
                  step === 1
                    ? !canProceedStep1
                    : step === 2
                    ? !canProceedStep2
                    : !canProceedStep3
                }
                onClick={() => setStep((s) => (s + 1) as Step)}
                className="flex-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] hover:shadow-emerald-500/40 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
              >
                Continuar →
              </button>
            </div>
          )}

          {step === 4 && !submitted && (
            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setStep(3)}
                className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition-all hover:bg-white/10"
              >
                ← Atrás
              </button>
              <button
                onClick={() => setSubmitted(true)}
                className="flex-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02]"
              >
                ✅ Enviar inscripción
              </button>
            </div>
          )}
        </div>

        {/* Footer note */}
        <p className="mt-8 text-center text-xs text-slate-600">
          ¿Dudas? Contáctanos por WhatsApp o Instagram{" "}
          <span className="text-emerald-700">@junglefish.cr</span>
        </p>
      </div>
    </div>
  );
}
