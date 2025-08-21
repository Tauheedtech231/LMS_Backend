import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    domains: ['images.unsplash.com'],
    // If you need to use other image hosts, add them here
    // domains: ['images.unsplash.com', 'example.com', 'another-domain.com'],
  },
};

export default nextConfig;
