/** @type {import('next').NextConfig} */
// Static export for IONOS, server mode for Heroku
// On Heroku, set HEROKU=true environment variable to disable static export
const isHeroku = process.env.HEROKU === 'true';

const nextConfig = {
  // Only use static export if NOT on Heroku
  ...(isHeroku ? {} : { output: 'export' }),
  images: { unoptimized: true },
  // trailingSlash: true, // optional
};

module.exports = nextConfig;
