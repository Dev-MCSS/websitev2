'use client'

import { CldImage, type CldImageProps } from "next-cloudinary";

type CloudinaryImageProps = Omit<CldImageProps, "src"> & {
  /** Cloudinary public ID (e.g. "mcss/events/casino-night") */
  publicId: string;
};

export default function CloudinaryImage({
  publicId,
  alt,
  width,
  height,
  sizes,
  className,
  ...rest
}: CloudinaryImageProps) {
  return (
    <CldImage
      src={publicId}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes ?? "(min-width: 1024px) 50vw, 100vw"}
      className={className}
      format="auto"
      quality="auto"
      {...rest}
    />
  );
}
