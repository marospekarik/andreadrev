import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  markdown: {
    drafts: true,
    shikiConfig: {
      theme: 'css-variables',
    },
  },
  shikiConfig: {
    wrap: true,
    skipInline: false,
    drafts: true,
  },
  allowImportingTsExtensions: true,
  site: 'https://andreadrev.com',
  integrations: [tailwind(), sitemap(), mdx(), react()],
});
