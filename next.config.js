/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: ['tailwindui.com'],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
