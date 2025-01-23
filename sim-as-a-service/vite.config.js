import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',      // Listen on all network interfaces
    port: 3333,            // Desired port
    strictPort: true,     // Exit if port is in use
    https: false,         // Disable HTTPS
    // Add proxy or other server options here if needed
  },
  // Other Vite configuration options like plugins, build settings, etc.
});
