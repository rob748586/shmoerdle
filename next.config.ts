import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts", // Path to your custom service worker source file
  swDest: "public/sw.js", // Path where the generated service worker will be placed
  cacheOnNavigation: true, // Whether to cache navigation requests
  reloadOnOnline: true, // Whether to reload the page when the user goes back online
  disable: process.env.NODE_ENV === "development", // Disable Serwist in development mode
  // Your Serwist configuration options here
});

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

export default withSerwist(nextConfig);
