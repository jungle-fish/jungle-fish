"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  type MotionValue,
  useAnimationControls,
} from "framer-motion";
import { useHeroIntro } from "@/components/landing/HeroIntroContext";

const VIDEO_LOAD_TIMEOUT_MS = 5_000;
const MIN_BRAND_IDLE_MS = 350;
const CROSSFADE_MS = 450;

const EASE = [0.22, 1, 0.36, 1] as const;

type BrandPhase = "enter" | "idle" | "exit" | "done";

type HeroVideoBackgroundProps = {
  y: MotionValue<number>;
  scale: MotionValue<number>;
};

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function HeroVideoBackground({ y, scale }: HeroVideoBackgroundProps) {
  const { setUsesVideo, notifyTransitionStart, notifyReady, notifyFallback } =
    useHeroIntro();

  const brandControls = useAnimationControls();
  const videoReadyRef = useRef(false);
  const transitionStartedRef = useRef(false);
  const introCompleteRef = useRef(false);
  const enterDoneAtRef = useRef<number | null>(null);
  const brandPhaseRef = useRef<BrandPhase>("enter");

  const [mounted, setMounted] = useState(false);
  const [videoAllowed, setVideoAllowed] = useState(true);
  const [showBrandScreen, setShowBrandScreen] = useState(true);
  const [whiteOpacity, setWhiteOpacity] = useState(1);
  const [showOverlays, setShowOverlays] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  const setBrandPhaseSafe = useCallback((phase: BrandPhase) => {
    brandPhaseRef.current = phase;
  }, []);

  const syncVideoPreference = useCallback(() => {
    const allowed = !prefersReducedMotion();
    setVideoAllowed(allowed);
    setUsesVideo(allowed);

    if (!allowed) {
      notifyFallback();
      if (introCompleteRef.current) {
        setShowFallback(true);
      }
    }
  }, [notifyFallback, setUsesVideo]);

  const runExitSequence = useCallback(
    async (forceFallback = false) => {
      if (transitionStartedRef.current) return;
      transitionStartedRef.current = true;
      introCompleteRef.current = true;

      const withVideo =
        videoAllowed && !forceFallback && videoReadyRef.current;

      notifyTransitionStart();
      setWhiteOpacity(0);
      setShowFallback(!withVideo);
      setShowOverlays(true);

      brandControls.stop();
      setBrandPhaseSafe("exit");
      notifyReady();

      await brandControls.start({
        scale: [1, 1.07, 0.97, 1],
        opacity: 0,
        x: "-60vw",
        transition: { duration: 0.65, ease: "easeInOut" },
      });

      setBrandPhaseSafe("done");
      setShowBrandScreen(false);
    },
    [brandControls, notifyReady, notifyTransitionStart, setBrandPhaseSafe, videoAllowed],
  );

  const tryStartExit = useCallback(() => {
    if (transitionStartedRef.current) return;
    if (brandPhaseRef.current !== "idle") return;
    if (!enterDoneAtRef.current) return;

    const elapsed = Date.now() - enterDoneAtRef.current;
    const delay = Math.max(0, MIN_BRAND_IDLE_MS - elapsed);

    window.setTimeout(() => {
      void runExitSequence();
    }, delay);
  }, [runExitSequence]);

  const handleVideoCanPlay = useCallback(() => {
    videoReadyRef.current = true;

    if (introCompleteRef.current) {
      setShowFallback(false);
    }

    if (brandPhaseRef.current === "idle") {
      tryStartExit();
    }
  }, [tryStartExit]);

  useEffect(() => {
    setMounted(true);
    syncVideoPreference();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.addEventListener("change", syncVideoPreference);

    return () => {
      reducedMotion.removeEventListener("change", syncVideoPreference);
    };
  }, [syncVideoPreference]);

  useEffect(() => {
    let cancelled = false;

    async function runEnter() {
      await brandControls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 0.55, ease: "easeInOut" },
      });

      if (cancelled) return;

      setBrandPhaseSafe("idle");
      enterDoneAtRef.current = Date.now();

      brandControls.start({
        scale: [1, 1.1, 1],
        transition: {
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
        },
      });

      if (videoReadyRef.current || !videoAllowed) {
        tryStartExit();
      }
    }

    void runEnter();

    return () => {
      cancelled = true;
    };
  }, [brandControls, setBrandPhaseSafe, tryStartExit, videoAllowed]);

  useEffect(() => {
    if (!videoAllowed || !mounted) return;

    const timeout = window.setTimeout(() => {
      if (!videoReadyRef.current && !transitionStartedRef.current) {
        notifyFallback();
        void runExitSequence(true);
      }
    }, VIDEO_LOAD_TIMEOUT_MS);

    return () => window.clearTimeout(timeout);
  }, [mounted, notifyFallback, runExitSequence, videoAllowed]);

  return (
    <motion.div
      style={{ y, scale }}
      className="absolute inset-0 origin-center will-change-transform"
    >
      <motion.div
        animate={{ opacity: showFallback ? 1 : 0 }}
        transition={{ duration: CROSSFADE_MS / 1000, ease: EASE }}
        className="absolute inset-0 bg-linear-to-br from-jungle-100 via-cream to-jungle-200"
        aria-hidden
      />

      <Image
        src="/home.webp"
        alt="Jungle Fish background"
        fill
        priority
        className="object-cover"
        style={{ objectPosition: "30% 60%" }}
        onLoad={handleVideoCanPlay}
      />

      <motion.div
        animate={{ opacity: showOverlays ? 1 : 0 }}
        transition={{ duration: CROSSFADE_MS / 1000, ease: EASE }}
        className="absolute inset-0"
        aria-hidden
      >
        <div className="hero-gradient absolute inset-0 opacity-75 mix-blend-multiply" />
        <div className="absolute inset-0 bg-linear-to-t from-jungle-950/80 via-jungle-900/45 to-jungle-800/25" />
        <div className="absolute inset-0 bg-jungle-950/20" />
      </motion.div>

      {showBrandScreen && (
        <motion.div
          animate={{ opacity: whiteOpacity }}
          transition={{ duration: CROSSFADE_MS / 1000, ease: EASE }}
          className="absolute inset-0 z-20 flex items-center justify-center overflow-hidden bg-white"
        >
          <motion.h1
            initial={{ x: "55vw", opacity: 0, scale: 1 }}
            animate={brandControls}
            className="font-display whitespace-nowrap text-4xl font-semibold tracking-tight text-jungle-900 sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Jungle Fish
          </motion.h1>
        </motion.div>
      )}
    </motion.div>
  );
}
