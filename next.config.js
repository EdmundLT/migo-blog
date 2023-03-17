/** @type {import('next').NextConfig} */

const withOptimizedImages = require('next-optimized-images')

module.exports = withOptimizedImages({})

module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  images: {
    domains: ["cdn.sanity.io"]
  }
}

