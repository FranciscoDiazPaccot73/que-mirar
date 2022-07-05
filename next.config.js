/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    GA_ID: process.env.GA_ID,
  },
  images: {
    domains: ['image.tmdb.org'],
  },
}

module.exports = nextConfig
