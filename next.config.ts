import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/post/1", destination: "/post/slamming-items", permanent: true },
      { source: "/post/2", destination: "/post/trait-scraps", permanent: true },
      {
        source: "/post/3",
        destination: "/post/augment-tower-defense",
        permanent: true,
      },
      {
        source: "/post/4",
        destination: "/post/recap-the-convergence",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
