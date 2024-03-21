/** @type {import('next').NextConfig} */
const { StatsWriterPlugin } = require("webpack-stats-plugin");
const MyFirstWebpackPlugin = require("./webpack-plugin");

const nextConfig = {
  reactStrictMode: true,
  env: {
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    GA_ID: process.env.GA_ID,
    SCOPE: process.env.SCOPE,
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    domains: ["image.tmdb.org"],
    unoptimized: true,
  },
  // eslint-disable-next-line no-unused-vars
  webpack: (config, _options) => {
    config.plugins.push(
      // new StatsWriterPlugin({
      //   filename: '../.tmp/webpack-stats.json',
      //   stats: {
      //     assets: true,
      //   }
      // })
      new MyFirstWebpackPlugin()
    );

    return config;
  },
};

module.exports = nextConfig;
