"use client";

import { useFastScroll } from "@/hooks/useFastScroll";

/** Mount once near the page root to toggle `data-fast-scroll` on `<html>`. */
export function ScrollPerformanceBridge() {
  useFastScroll();
  return null;
}
