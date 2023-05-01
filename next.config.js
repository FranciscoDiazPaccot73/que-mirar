/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    GA_ID: process.env.GA_ID,
    SCOPE: process.env.SCOPE,
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    domains: ['image.tmdb.org'],
    unoptimized: true,
  },
};

module.exports = nextConfig;
