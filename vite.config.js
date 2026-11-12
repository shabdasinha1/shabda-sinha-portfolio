import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolveSiteUrl, seoPlugin } from './build/seo-plugin.js';

/**
 * Adds <link rel="preload"> for the Latin Geist font file in production builds.
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
        /geist-latin-wght-normal-[\w-]+\.woff2$/.test(name),
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

/**
 * The public base path comes from the site URL, so there is a single setting:
 *   https://shabdasinha1.github.io/shabda-sinha-portfolio → /shabda-sinha-portfolio/
 *   https://example.com                                    → /
 * In CI the URL is provided by GitHub (actions/configure-pages), never typed by hand.
 */
function basePathFrom(siteUrl) {
  if (!siteUrl) return '/';
  const { pathname } = new URL(siteUrl);
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

// https://vite.dev/config/
export default defineConfig(({ command, mode, isPreview }) => {
  // Reads VITE_SITE_URL from .env files or the environment (set by the GitHub Pages workflow).
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const siteUrl = resolveSiteUrl(env.VITE_SITE_URL);

  return {
    // The dev server always runs at "/" so local development is unaffected;
    // `vite build` and `vite preview` use the deployed base path.
    base: command === 'build' || isPreview ? basePathFrom(siteUrl) : '/',
    plugins: [react(), tailwindcss(), preloadPrimaryFont(), seoPlugin({ siteUrl })],
    build: {
      // Never inline fonts as data: URLs. Keeps them as cacheable files and lets
      // the Content-Security-Policy stay strict (font-src 'self', no data:).
      assetsInlineLimit: (filePath) => (/\.(woff2?|ttf|otf)$/.test(filePath) ? false : undefined),
    },
  };
});
