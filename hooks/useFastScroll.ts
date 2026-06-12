"use client";

import { useEffect, useState } from "react";

/** px/ms — above this we treat scroll as "fast" (middle-click autoscroll, flick, etc.) */
const FAST_SCROLL_VELOCITY = 2.4;
const FAST_SCROLL_COOLDOWN_MS = 100;

export function useFastScroll() {
  const [isFastScrolling, setIsFastScrolling] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let lastTime = performance.now();
    let rafId = 0;
    let cooldownId = 0;

    const endFastScroll = () => {
      window.clearTimeout(cooldownId);
      cooldownId = window.setTimeout(() => {
        setIsFastScrolling(false);
        document.documentElement.removeAttribute("data-fast-scroll");
      }, FAST_SCROLL_COOLDOWN_MS);
    };

    const onScroll = () => {
      if (rafId) return;

      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        const now = performance.now();
        const elapsed = Math.max(now - lastTime, 1);
        const velocity = Math.abs(window.scrollY - lastY) / elapsed;

        lastY = window.scrollY;
        lastTime = now;

        if (velocity >= FAST_SCROLL_VELOCITY) {
          setIsFastScrolling(true);
          document.documentElement.setAttribute("data-fast-scroll", "true");
          endFastScroll();
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(cooldownId);
      document.documentElement.removeAttribute("data-fast-scroll");
    };
  }, []);

  return isFastScrolling;
}
