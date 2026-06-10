import { useEffect, useState } from "react";
import {
  computeCoverSize,
  type CoverSize,
} from "@/lib/video/compute-cover-size";

export function useVideoCoverSize(
  containerRef: React.RefObject<HTMLElement | null>,
  overscan: number,
  active = true,
) {
  const [coverSize, setCoverSize] = useState<CoverSize>({ width: 0, height: 0 });

  useEffect(() => {
    if (!active) return;

    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      const { width, height } = container.getBoundingClientRect();
      setCoverSize(computeCoverSize(width, height, overscan));
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(container);

    return () => observer.disconnect();
  }, [active, containerRef, overscan]);

  return coverSize;
}
