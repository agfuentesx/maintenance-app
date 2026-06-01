/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone output bundles only the required files for production,
  // enabling a minimal Docker image without node_modules.
  output: "standalone",
};

module.exports = nextConfig;
