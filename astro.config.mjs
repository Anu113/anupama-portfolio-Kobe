import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://anupama.design',
  // Fetch the next page's HTML while the pointer rests on (or focus is on)
  // a link, so most clicks open at once. HTML only, never images.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  vite: { plugins: [tailwind()] },
});
