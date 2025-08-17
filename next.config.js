/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',               // <-- tells Next to make a static export
  images: { unoptimized: true },  // good for static hosting
  // optional, helps on some static hosts:
  // trailingSlash: true
};

module.exports = nextConfig;
