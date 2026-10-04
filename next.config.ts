import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 75 is the default for every image; 90 is only the load splash's larger logo. Its own quality
    // keeps it a separate file, so the header/footer logos never borrow it and render exactly as before.
    qualities: [75, 90],
  },
};

export default nextConfig;
