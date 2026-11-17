/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    /*
      Stock photos come from the Unsplash CDN, which resizes and re-encodes on
      its own edge. A custom loader hands sizing to Unsplash instead of making
      Next's optimizer download and re-encode every variant (slow cold starts,
      see memory: nextjs-avif-slow-image-loads). Local files pass through as-is.
    */
    loader: "custom",
    loaderFile: "./lib/imageLoader.js",
    deviceSizes: [390, 640, 828, 1080, 1280, 1920],
    imageSizes: [96, 160, 256, 384],
  },
  poweredByHeader: false,
};

module.exports = nextConfig;
