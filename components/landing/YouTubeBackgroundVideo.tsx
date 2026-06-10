"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  type MotionValue,
  useReducedMotion,
} from "framer-motion";
import { useVideoCoverSize } from "@/hooks/useVideoCoverSize";
import {
  computeCoverSize,
  DEFAULT_COVER_OVERSCAN,
  MOTION_COVER_OVERSCAN,
} from "@/lib/video/compute-cover-size";
import {
  buildYouTubeBackgroundEmbedUrl,
  JUNGLEFISH_VIDEO_ID,
  shouldUseAdaptiveBackgroundVideo,
  shouldUseHeroBackgroundVideo,
} from "@/lib/video/youtube-background";
import { cn } from "@/lib/utils";

export type BackgroundVideoMotion = {
  x?: MotionValue<string>;
  y?: MotionValue<string>;
  scale?: MotionValue<number>;
};

export type BackgroundVideoPlaybackPolicy = "always" | "adaptive";

export type YouTubeBackgroundVideoProps = {
  className?: string;
  /** Framer Motion transforms applied to the iframe wrapper */
  motion?: BackgroundVideoMotion;
  /** Extra scale factor so the iframe covers the container (default: 1.1, 1.22 when motion is set) */
  overscan?: number;
  /** `always` = hero (all viewports); `adaptive` = respects mobile / data-saver */
  playbackPolicy?: BackgroundVideoPlaybackPolicy;
  /** Parent-level gate (e.g. hero intro state) */
  enabled?: boolean;
  onLoad?: () => void;
  iframeTitle?: string;
  videoId?: string;
};

function resolvePlaybackAllowed(policy: BackgroundVideoPlaybackPolicy) {
  return policy === "always"
    ? shouldUseHeroBackgroundVideo()
    : shouldUseAdaptiveBackgroundVideo();
}

export function YouTubeBackgroundVideo({
  className,
  motion: motionTransform,
  overscan: overscanProp,
  playbackPolicy = "adaptive",
  enabled = true,
  onLoad,
  iframeTitle = "Background video",
  videoId = JUNGLEFISH_VIDEO_ID,
}: YouTubeBackgroundVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [playbackAllowed, setPlaybackAllowed] = useState(false);

  const motionActive =
    Boolean(motionTransform) && !prefersReducedMotion && playbackAllowed;

  const overscan =
    overscanProp ?? (motionActive ? MOTION_COVER_OVERSCAN : DEFAULT_COVER_OVERSCAN);

  const coverSize = useVideoCoverSize(
    containerRef,
    overscan,
    Boolean(embedUrl) && enabled,
  );

  const syncPlayback = useCallback(() => {
    const allowed = resolvePlaybackAllowed(playbackPolicy);
    setPlaybackAllowed(allowed);

    // Once the embed URL is created, keep it so resize does not remount the iframe
    if (allowed) {
      setEmbedUrl(
        (current) =>
          current ??
          buildYouTubeBackgroundEmbedUrl(
            videoId,
            window.location.origin,
          ),
      );
    }
  }, [playbackPolicy, videoId]);

  useEffect(() => {
    syncPlayback();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.addEventListener("change", syncPlayback);

    // Only listen for viewport/data-saver changes when using adaptive policy
    if (playbackPolicy === "adaptive") {
      const mobile = window.matchMedia("(max-width: 767px)");
      mobile.addEventListener("change", syncPlayback);
      return () => {
        reducedMotion.removeEventListener("change", syncPlayback);
        mobile.removeEventListener("change", syncPlayback);
      };
    }

    return () => {
      reducedMotion.removeEventListener("change", syncPlayback);
    };
  }, [playbackPolicy, syncPlayback]);

  const showVideo = enabled && Boolean(embedUrl);

  const iframe = (
    <iframe
      title={iframeTitle}
      src={embedUrl ?? undefined}
      allow="autoplay; encrypted-media"
      referrerPolicy="strict-origin-when-cross-origin"
      tabIndex={-1}
      className="pointer-events-none absolute top-1/2 left-1/2 border-0 -translate-x-1/2 -translate-y-1/2"
      style={{
        width: coverSize.width > 0 ? coverSize.width : "100%",
        height: coverSize.height > 0 ? coverSize.height : "100%",
      }}
      onLoad={onLoad}
    />
  );

  return (
    <div ref={containerRef} className={cn(className)} aria-hidden>
      {showVideo && (
        motionActive && motionTransform ? (
          <motion.div
            style={{
              x: motionTransform.x,
              y: motionTransform.y,
              scale: motionTransform.scale,
            }}
            className="absolute inset-0 origin-center will-change-transform"
          >
            {iframe}
          </motion.div>
        ) : (
          iframe
        )
      )}
    </div>
  );
}

// Re-export helpers for consumers configuring overscan manually
export { computeCoverSize, DEFAULT_COVER_OVERSCAN, MOTION_COVER_OVERSCAN };
