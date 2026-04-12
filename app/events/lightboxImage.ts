const LIGHTBOX_IMAGE_WIDTHS = [960, 1280, 1600, 2000] as const;

function encodedPublicId(publicId: string) {
  return publicId
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

export function pickLightboxBreakpointWidth(
  viewportWidth: number,
  viewportHeight: number,
  devicePixelRatio = 1,
) {
  const clampedDpr = Math.min(Math.max(devicePixelRatio || 1, 1), 2);
  const target = Math.max(viewportWidth, viewportHeight) * clampedDpr;
  const match = LIGHTBOX_IMAGE_WIDTHS.find((width) => width >= target);
  return match ?? LIGHTBOX_IMAGE_WIDTHS[LIGHTBOX_IMAGE_WIDTHS.length - 1];
}

export function buildLightboxHighResSrc(
  cloudName: string | undefined,
  publicId: string | null,
  width: number,
) {
  if (!cloudName || !publicId) return null;
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_${width}/${encodedPublicId(
    publicId,
  )}`;
}

export function buildLightboxBlurSrc(
  cloudName: string | undefined,
  publicId: string | null,
) {
  if (!cloudName || !publicId) return null;
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_10,w_96,e_blur:1000/${encodedPublicId(
    publicId,
  )}`;
}
