"use client";

import { useReducedMotion, type MotionValue } from "framer-motion";
import { CloudinaryBackgroundVideo } from "@/components/landing/CloudinaryBackgroundVideo";
import { CLOUD_VIDEO } from "@/lib/media";

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
      <div className="absolute -inset-[8%] origin-center">
        <CloudinaryBackgroundVideo
          publicId={CLOUD_VIDEO.background}
          className="h-full w-full"
          motion={
            prefersReducedMotion
              ? undefined
              : {
                  y,
                  scale,
                }
          }
          title="Volunteer section background video"
        />
      </div>

      <div className="absolute inset-0 bg-jungle-950/72" />
      <div className="absolute inset-0 bg-linear-to-b from-jungle-950/50 via-jungle-950/65 to-jungle-950/80" />
    </div>
  );
}
