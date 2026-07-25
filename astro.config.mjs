import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://anupama.design',
  vite: { plugins: [tailwind()] },
});
