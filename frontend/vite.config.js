import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Specify the development server port for the frontend
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Backend API URL during local development
        changeOrigin: true, // Adjusts the origin of the request to the target URL
        secure: false, // If the backend uses HTTPS in production, set this to false
      },
    },
  },
});
