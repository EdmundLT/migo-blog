/** @type {import('next').NextConfig} */

const withOptimizedImages = require("next-optimized-images");
const { i18nRewriter } = require("next-i18n-router");
const i18nConfig = require("./i18nConfig");

module.exports = withOptimizedImages({});

module.exports = {
  async rewrites() {
    return {
      afterFiles: i18nRewriter(i18nConfig),
    };
  },
  async redirects() {
    return [
      {
        source: "/Life",
        destination: "/life",
        permanent: true,
      },
      {
        source: "/Immigrant",
        destination: "/immigrant",
        permanent: true,
      },
      {
        source: "/Work",
        destination: "/working",
        permanent: true,
      },
      {
        source: "/Study",
        destination: "/study",
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["cdn.sanity.io"],
  },
};
