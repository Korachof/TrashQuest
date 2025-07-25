// Testing config for vitest
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.js'],
    /* Make test functions like expect, describe, etc.
    available before vitest makes them available */
    globals: true,
  },
});
