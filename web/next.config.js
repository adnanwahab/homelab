// import createMDX from '@next/mdx'
// import remarkGfm from 'remark-gfm'
// import rehypePrism from '@mapbox/rehype-prism'

// const withMDX = createMDX({
//   options: {
//     remarkPlugins: [remarkGfm],
//     rehypePlugins: [rehypePrism],
//   },
// })

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   }
// }

// export default withMDX(nextConfig)

// next.config.js
module.exports = {
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers: [
          // Option A: Using X-Frame-Options (less flexible):
          // { key: 'X-Frame-Options', value: 'ALLOWALL' },

          // Option B: Using frame-ancestors in CSP (more flexible and recommended):
          { key: 'Content-Security-Policy', value: "frame-ancestors 'self' https://your-embedding-domain.com" }
        ],
      },
    ];
  },
};