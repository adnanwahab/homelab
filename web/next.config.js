// next.config.js
module.exports = {
  env: {PORT: "8000"},
  experimental: {
    serverActions: {
      allowedOrigins: ["observablehq.com"],
    },
  },
  serverRuntimeConfig: {
    LIVEKIT_API_KEY: 'APItSbwXvSjh4cf',
    LIVEKIT_WS_URL: 'wss://omnissiah-university-kmuz0plz.livekit.cloud',
    LIVEKIT_API_SECRET: '118jYtOPXJUYVeH7ZMSlQSoMKzPNve6sATZ149DfmfYC',
  },
  typescript: {
    // This will allow production builds to complete even if 
    // there are type errors in the project.
    ignoreBuildErrors: true,
  },
}

//start bun server for automation on 8001
//start deno-webgpu-server for rendering on 8002

//??