export const JUNGLEFISH_VIDEO_ID = "2trbFv8JhRw";

export function buildYouTubeBackgroundEmbedUrl(
  videoId: string = JUNGLEFISH_VIDEO_ID,
  origin?: string,
) {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    controls: "0",
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
    playlist: videoId,
    iv_load_policy: "3",
    cc_load_policy: "0",
    disablekb: "1",
    fs: "0",
    enablejsapi: "1",
  });

  if (origin) {
    params.set("origin", origin);
  }

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

function isReducedMotionPreferred() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Hero — all viewports; only reduced-motion disables playback */
export function shouldUseHeroBackgroundVideo() {
  if (typeof window === "undefined") return false;
  return !isReducedMotionPreferred();
}

/** Sections — reduced-motion, mobile, and data-saver can disable playback */
export function shouldUseAdaptiveBackgroundVideo() {
  if (typeof window === "undefined") return false;

  const mobile = window.matchMedia("(max-width: 767px)");
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;

  return (
    !isReducedMotionPreferred() &&
    !mobile.matches &&
    connection?.saveData !== true
  );
}

/** @deprecated Use shouldUseAdaptiveBackgroundVideo or shouldUseHeroBackgroundVideo */
export function shouldUseBackgroundVideo() {
  return shouldUseAdaptiveBackgroundVideo();
}
