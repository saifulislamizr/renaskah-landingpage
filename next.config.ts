import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages serves this site as static files (no Node/edge
  // runtime) — `next build` emits a fully static `/out` directory instead
  // of the default server output. There are no API routes, server
  // actions, or other dynamic-runtime features in this project, so
  // nothing else needs to change for this to work.
  output: "export",
  images: {
    // The Next.js Image Optimization API needs a server to resize/convert
    // images on request, which a static export doesn't have. `unoptimized`
    // makes next/image render a plain <img> at the original file's pixel
    // data instead, so visual output (dimensions, cropping, quality) is
    // unchanged — the browser just does the same CSS-driven scaling it
    // already does today, without the extra server-side resize step.
    unoptimized: true,
  },
};

export default nextConfig;
