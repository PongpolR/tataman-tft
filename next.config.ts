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
      { source: "/admin", destination: "/blog/manage", permanent: true },
      { source: "/admin/posts/new", destination: "/blog/manage/posts/new", permanent: true },
      {
        source: "/admin/posts/:id/edit",
        destination: "/blog/manage/posts/:id/edit",
        permanent: true,
      },
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
