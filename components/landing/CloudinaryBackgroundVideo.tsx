"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type MotionValue } from "framer-motion";
import { buildVideoUrl } from "@/lib/media";
import { cn } from "@/lib/utils";

type VideoMotion = {
  y?: MotionValue<string>;
  scale?: MotionValue<number>;
};

type CloudinaryBackgroundVideoProps = {
  publicId: string;
  className?: string;
  motion?: VideoMotion;
  enabled?: boolean;
  onCanPlay?: () => void;
  title?: string;
};

export function CloudinaryBackgroundVideo({
  publicId,
  className,
  motion: motionProps,
  enabled = true,
  onCanPlay,
  title = "Background video",
}: CloudinaryBackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !enabled) return null;

  const mp4Url = buildVideoUrl(publicId, "q_auto:good,w_1920,vc_h264", "mp4");
  const webmUrl = buildVideoUrl(publicId, "q_auto:good,w_1920,vc_vp9,f_webm", "webm");

  const videoEl = (
    <video
      ref={videoRef}
      aria-hidden
      title={title}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className="absolute inset-0 h-full w-full object-cover"
      onCanPlay={onCanPlay}
    >
      <source src={webmUrl} type="video/webm" />
      <source src={mp4Url} type="video/mp4" />
    </video>
  );

  if (motionProps) {
    return (
      <motion.div
        style={motionProps}
        className={cn("absolute inset-0 overflow-hidden", className)}
        aria-hidden
      >
        {videoEl}
      </motion.div>
    );
  }

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden>
      {videoEl}
    </div>
  );
}
