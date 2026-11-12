import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { seoPlugin } from './build/seo-plugin.js';

/**
 * Adds <link rel="preload"> for the Latin Inter font file in production builds.
 * Without it the browser only discovers the font after downloading and parsing
 * the CSS; preloading starts the download in parallel, so body text renders in
 * its final font sooner. The file name is hashed, so it is looked up in the bundle.
 */
function preloadPrimaryFont() {
  let base = '/';
  return {
    name: 'preload-primary-font',
    apply: 'build',
    configResolved(config) {
      base = config.base;
    },
    transformIndexHtml(_html, ctx) {
      const file = Object.keys(ctx.bundle ?? {}).find((name) =>
        /inter-latin-wght-normal-[\w-]+\.woff2$/.test(name),
      );
      if (!file) return [];
      return [
        {
          tag: 'link',
          attrs: { rel: 'preload', href: `${base}${file}`, as: 'font', type: 'font/woff2', crossorigin: '' },
          injectTo: 'head',
        },
      ];
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Reads VITE_SITE_URL from .env files or the build environment
  // (e.g. Cloudflare Pages → Settings → Environment variables).
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    plugins: [react(), tailwindcss(), preloadPrimaryFont(), seoPlugin({ siteUrl: env.VITE_SITE_URL })],
    build: {
      // Never inline fonts as data: URLs. Keeps them as cacheable files and lets
      // the Content-Security-Policy stay strict (font-src 'self', no data:).
      assetsInlineLimit: (filePath) => (/\.(woff2?|ttf|otf)$/.test(filePath) ? false : undefined),
    },
  };
});
