import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    include: ['**/*.test.ts']
  },
  ssr: {
    external: ['@jill64/sentry-sveltekit-cloudflare']
  }
})
