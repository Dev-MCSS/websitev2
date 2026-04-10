import type { NextConfig } from "next";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

const nextConfig: NextConfig = {
  images: {
    // Turbopack dev: requests to `/_next/image` for local `/public` files can hang
    // indefinitely, which keeps the browser tab in a perpetual loading state. Cloudinary
    // URLs still load (directly or via the loader). Production keeps optimization on.
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        // If cloud name is missing (misconfigured .env), `/undefined/**` blocks every image.
        pathname:
          cloudName != null && cloudName !== ""
            ? `/${cloudName}/**`
            : "/**",
      },
    ],
  },
};

export default nextConfig;
