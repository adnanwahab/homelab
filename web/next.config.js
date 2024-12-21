/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.jasondavies.com',
      },
    ],
  },
}

module.exports = nextConfig 