"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import {
  FALLING_LEAF_PLACEHOLDER_IMAGES,
  FALLING_LEAVES_DEFAULTS,
  type FallingLeavesOptions,
  type FallingLeavesSide,
} from "@/lib/decorations/falling-leaves.config";
import { cn } from "@/lib/utils";

type LeafSpec = {
  id: string;
  src: string;
  size: number;
  delay: number;
  duration: number;
  startX: number;
  driftX: number;
  rotateStart: number;
  rotateEnd: number;
  peakOpacity: number;
  sway: number;
};

function seededUnit(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function buildLeafSpecs(
  side: "left" | "right",
  count: number,
  images: readonly string[],
): LeafSpec[] {
  const sideOffset = side === "left" ? 0 : 1000;

  return Array.from({ length: count }, (_, index) => {
    const seed = sideOffset + index + 1;
    const r1 = seededUnit(seed);
    const r2 = seededUnit(seed + 0.17);
    const r3 = seededUnit(seed + 0.31);
    const r4 = seededUnit(seed + 0.52);
    const r5 = seededUnit(seed + 0.73);
    const r6 = seededUnit(seed + 0.91);

    const rotateStart = -70 + r2 * 140;

    return {
      id: `${side}-${index}`,
      src: images[index % images.length]!,
      size: 28 + r1 * 32,
      delay: r2 * 9,
      duration: 9 + r3 * 8,
      startX: 4 + r4 * 88,
      driftX: (r5 - 0.5) * (side === "left" ? 64 : -64),
      rotateStart,
      rotateEnd: rotateStart + (r6 - 0.5) * 220,
      peakOpacity: 0.45 + r3 * 0.4,
      sway: 6 + r4 * 14,
    };
  });
}

type LeafStyle = CSSProperties & {
  "--leaf-duration": string;
  "--leaf-delay": string;
  "--leaf-drift-x": string;
  "--leaf-rotate-start": string;
  "--leaf-rotate-end": string;
  "--leaf-peak-opacity": string;
  "--leaf-sway": string;
  "--leaf-sway-duration": string;
};

function leafStyle(leaf: LeafSpec): LeafStyle {
  return {
    left: `${leaf.startX}%`,
    width: leaf.size,
    height: leaf.size,
    "--leaf-duration": `${leaf.duration}s`,
    "--leaf-delay": `${leaf.delay}s`,
    "--leaf-drift-x": `${leaf.driftX}px`,
    "--leaf-rotate-start": `${leaf.rotateStart}deg`,
    "--leaf-rotate-end": `${leaf.rotateEnd}deg`,
    "--leaf-peak-opacity": String(leaf.peakOpacity),
    "--leaf-sway": `${leaf.sway}px`,
    "--leaf-sway-duration": `${2.8 + leaf.sway * 0.08}s`,
  };
}

function FallingLeaf({
  leaf,
  reducedMotion,
}: {
  leaf: LeafSpec;
  reducedMotion: boolean;
}) {
  if (reducedMotion) {
    return (
      <div
        className="absolute opacity-30"
        style={{
          left: `${leaf.startX}%`,
          top: `${(leaf.delay % 5) * 18 + 8}%`,
          width: leaf.size,
          height: leaf.size,
          transform: `rotate(${leaf.rotateStart * 0.4}deg)`,
        }}
      >
        <Image
          src={leaf.src}
          alt=""
          width={leaf.size}
          height={leaf.size}
          className="h-full w-full object-contain"
          aria-hidden
        />
      </div>
    );
  }

  return (
    <div className="falling-leaf absolute" style={leafStyle(leaf)}>
      <div className="falling-leaf__inner h-full w-full">
        <Image
          src={leaf.src}
          alt=""
          width={leaf.size}
          height={leaf.size}
          className="h-full w-full object-contain drop-shadow-sm"
          aria-hidden
        />
      </div>
    </div>
  );
}

type FallingLeavesLaneProps = {
  side: "left" | "right";
  specs: LeafSpec[];
  laneClassName: string;
  reducedMotion: boolean;
};

function FallingLeavesLane({
  side,
  specs,
  laneClassName,
  reducedMotion,
}: FallingLeavesLaneProps) {
  return (
    <div
      className={cn(
        "falling-leaf-lane pointer-events-none absolute inset-y-0 z-0 hidden overflow-hidden lg:block",
        side === "left" ? "left-0" : "right-0",
        laneClassName,
      )}
      aria-hidden
    >
      {specs.map((leaf) => (
        <FallingLeaf key={leaf.id} leaf={leaf} reducedMotion={reducedMotion} />
      ))}
    </div>
  );
}

function resolveSides(side: FallingLeavesSide): Array<"left" | "right"> {
  if (side === "both") return ["left", "right"];
  return [side];
}

export function FallingLeaves({
  side = FALLING_LEAVES_DEFAULTS.side,
  countPerSide = FALLING_LEAVES_DEFAULTS.countPerSide,
  laneClassName = FALLING_LEAVES_DEFAULTS.laneClassName,
  images = FALLING_LEAF_PLACEHOLDER_IMAGES,
}: FallingLeavesOptions = {}) {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const specsBySide = useMemo(() => {
    const lanes = resolveSides(side);
    return Object.fromEntries(
      lanes.map((lane) => [lane, buildLeafSpecs(lane, countPerSide, images)]),
    ) as Record<"left" | "right", LeafSpec[]>;
  }, [countPerSide, images, side]);

  if (!mounted) {
    return null;
  }

  const reducedMotion = Boolean(prefersReducedMotion);
  const sides = resolveSides(side);

  return (
    <>
      {sides.map((lane) => (
        <FallingLeavesLane
          key={lane}
          side={lane}
          specs={specsBySide[lane]}
          laneClassName={laneClassName}
          reducedMotion={reducedMotion}
        />
      ))}
    </>
  );
}
