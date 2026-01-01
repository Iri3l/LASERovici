/** @type {import('next').NextConfig} */
// Static export for IONOS, server mode for Heroku
// Detect Heroku by checking for DYNO environment variable (always present on Heroku)
// or HEROKU=true config var
const isHeroku = !!process.env.DYNO || process.env.HEROKU === 'true';

const nextConfig = {
  // Only use static export if NOT on Heroku
  ...(isHeroku ? {} : { output: 'export' }),
  images: { unoptimized: true },
  // trailingSlash: true, // optional
};

module.exports = nextConfig;
