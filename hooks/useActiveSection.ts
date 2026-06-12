"use client";

import { useEffect, useRef, useState } from "react";

export function useActiveSection(sectionIds: readonly string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIdRef = useRef<string | null>(null);
  const rafIdRef = useRef(0);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) {
      return;
    }

    const ratios = new Map<string, number>();

    const commitActiveSection = () => {
      rafIdRef.current = 0;

      const mostVisible = [...ratios.entries()]
        .filter(([, ratio]) => ratio > 0)
        .sort((a, b) => b[1] - a[1])[0];

      const nextId = mostVisible?.[0] ?? null;
      if (nextId === activeIdRef.current) {
        return;
      }

      activeIdRef.current = nextId;
      setActiveId(nextId);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }

        if (!rafIdRef.current) {
          rafIdRef.current = window.requestAnimationFrame(commitActiveSection);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0, 0.5, 1],
      },
    );

    for (const element of elements) {
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
      if (rafIdRef.current) {
        window.cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [sectionIds]);

  return activeId;
}
