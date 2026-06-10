"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

/** Placeholder — swap for final volunteer section photography */
const VOLUNTEER_BACKGROUND_SRC =
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&q=80";

type VolunteerSectionBackgroundProps = {
  y: MotionValue<string>;
  scale: MotionValue<number>;
};

export function VolunteerSectionBackground({
  y,
  scale,
}: VolunteerSectionBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="absolute -inset-[8%] origin-center will-change-transform"
        style={
          prefersReducedMotion
            ? undefined
            : {
                y,
                scale,
              }
        }
      >
        <Image
          src={VOLUNTEER_BACKGROUND_SRC}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      <div className="absolute inset-0 bg-jungle-950/72" />
      <div className="absolute inset-0 bg-linear-to-b from-jungle-950/50 via-jungle-950/65 to-jungle-950/80" />
    </div>
  );
}
