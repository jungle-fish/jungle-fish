import type { NextConfig } from "next";

const remotePlaceholderImageHostnames = [ // TODO: Remove these urls once we have a proper domain and in production
  "images.unsplash.com",
  "www.ecoworldbuilding.com",
  "pbs.twimg.com",
  "bestcostaricadmc.com",
  "foxiepass.com",
  "travelrebels.com",
  "s3.ca-central-1.amazonaws.com",
  "media.tacdn.com",
  "www.bodhisurfyoga.com",
  "q-xx.bstatic.com",
  "www.cloudbridge.org",
  "d1cq5bmaro4ubb.cloudfront.net",
] as const;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: remotePlaceholderImageHostnames.map((hostname) => ({
      protocol: "https",
      hostname,
    })),
  },
};

export default nextConfig;
