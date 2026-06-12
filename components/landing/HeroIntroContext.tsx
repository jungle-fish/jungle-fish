"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type HeroIntroPhase = "loading" | "transition" | "ready";

type HeroIntroContextValue = {
  phase: HeroIntroPhase;
  isReady: boolean;
  isContentVisible: boolean;
  usesVideo: boolean;
  setUsesVideo: (value: boolean) => void;
  notifyTransitionStart: () => void;
  notifyReady: () => void;
  notifyFallback: () => void;
};

const HeroIntroContext = createContext<HeroIntroContextValue | null>(null);

export function HeroIntroProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<HeroIntroPhase>("loading");
  const [usesVideo, setUsesVideo] = useState(true);

  const notifyTransitionStart = useCallback(() => {
    setPhase("transition");
  }, []);

  const notifyReady = useCallback(() => {
    setPhase("ready");
  }, []);

  const notifyFallback = useCallback(() => {
    setUsesVideo(false);
  }, []);

  const value = useMemo(
    () => ({
      phase,
      isReady: phase === "ready",
      isContentVisible: phase === "transition" || phase === "ready",
      usesVideo,
      setUsesVideo,
      notifyTransitionStart,
      notifyReady,
      notifyFallback,
    }),
    [phase, usesVideo, notifyTransitionStart, notifyReady, notifyFallback],
  );

  return (
    <HeroIntroContext.Provider value={value}>{children}</HeroIntroContext.Provider>
  );
}

export function useHeroIntro() {
  const context = useContext(HeroIntroContext);
  if (!context) {
    throw new Error("useHeroIntro must be used within HeroIntroProvider");
  }
  return context;
}
