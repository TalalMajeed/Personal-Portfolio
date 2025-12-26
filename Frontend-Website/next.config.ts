import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Generate a fully static site that can be hosted from object storage.
  output: "export",
};

export default nextConfig;
