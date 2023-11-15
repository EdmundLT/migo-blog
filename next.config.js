/** @type {import('next').NextConfig} */

const withOptimizedImages = require("next-optimized-images");

module.exports = withOptimizedImages({});

module.exports = {
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
    domains: ["cdn.sanity.io", "images.ctfassets.net"],
  },
};
