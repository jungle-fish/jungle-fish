export const DEFAULT_COVER_OVERSCAN = 1.1;
export const MOTION_COVER_OVERSCAN = 1.22;

const VIDEO_ASPECT = 16 / 9;

export function computeCoverSize(
  containerWidth: number,
  containerHeight: number,
  overscan = DEFAULT_COVER_OVERSCAN,
) {
  if (containerWidth <= 0 || containerHeight <= 0) {
    return { width: 0, height: 0 };
  }

  const containerAspect = containerWidth / containerHeight;
  let width: number;
  let height: number;

  if (containerAspect > VIDEO_ASPECT) {
    width = containerWidth;
    height = containerWidth / VIDEO_ASPECT;
  } else {
    height = containerHeight;
    width = containerHeight * VIDEO_ASPECT;
  }

  return {
    width: width * overscan,
    height: height * overscan,
  };
}

export type CoverSize = ReturnType<typeof computeCoverSize>;
