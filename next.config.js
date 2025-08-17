/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",          // you already have this for IONOS
  images: { unoptimized: true }, // ✅ allow next/image in static export
}

module.exports = nextConfig
