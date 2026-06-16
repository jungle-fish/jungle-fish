export const FALLING_LEAF_IMAGES = [
  "/images/image_leaf_a.webp",
  "/images/image_leaf_b.webp",
  "/images/image_leaf_c.webp",
  "/images/image_leaf_d.webp",
  "/images/image_leaf_e.webp",
  "/images/image_leaf_f.webp",
  "/images/image_leaf_g.webp",
  "/images/image_leaf_h.webp",
  "/images/image_leaf_i.webp",
  "/images/image_leaf_j.webp",
] as const;

export type FallingLeavesSide = "left" | "right" | "both";

export type FallingLeavesOptions = {
  side?: FallingLeavesSide;
  countPerSide?: number;
  laneClassName?: string;
  images?: readonly string[];
};

export const FALLING_LEAVES_DEFAULTS = {
  side: "both" as FallingLeavesSide,
  countPerSide: 9,
  laneClassName: "w-[clamp(440px,18vw,660px)]",
} as const;
