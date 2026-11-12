/**
 * Build-time SEO + static-hosting plugin for Vite.
 *
 * What it does:
 *  1. Injects <title>, meta description, Open Graph, X card and JSON-LD into
 *     index.html from src/data/seo.js (one source of truth, real HTML that
 *     crawlers and link-preview bots read without running JavaScript).
 *  2. Emits robots.txt, sitemap.xml and Cloudflare Pages `_headers` into dist/.
 *
 * The public URL comes from VITE_SITE_URL. When it is not set, every tag or
 * file that needs an absolute URL (canonical, og:url, og:image, sitemap) is
 * skipped and the build prints a warning: no invented domain is ever published.
 */
import { createHash } from 'node:crypto';
import { seo } from '../src/data/seo.js';

const escapeHtml = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Validates and normalises VITE_SITE_URL ("https://example.com/" → "https://example.com"). */
export function resolveSiteUrl(raw) {
  if (!raw) return null;
  let url;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(`VITE_SITE_URL is not a valid URL: "${raw}"`);
  }
  if (!['https:', 'http:'].includes(url.protocol)) {
    throw new Error(`VITE_SITE_URL must start with https:// (got "${raw}")`);
  }
  if (url.search || url.hash) {
    throw new Error(`VITE_SITE_URL must not contain a query string or #hash (got "${raw}")`);
  }
  return url.href.replace(/\/$/, '');
}

const meta = (attrs) => ({ tag: 'meta', attrs, injectTo: 'head' });

/** JSON-LD: a Person and the WebSite they own, linked by @id when the URL is known. */
export function buildStructuredData(siteUrl) {
  const { person } = seo;
  const personNode = {
    '@type': 'Person',
    ...(siteUrl && { '@id': `${siteUrl}/#person`, url: `${siteUrl}/` }),
    name: person.name,
    alternateName: person.alternateName,
    jobTitle: person.jobTitle,
    description: person.description,
    email: `mailto:${person.email}`,
    homeLocation: { '@type': 'Place', name: person.homeLocation },
    alumniOf: person.alumniOf.map((name) => ({ '@type': 'CollegeOrUniversity', name })),
    knowsAbout: person.knowsAbout,
    sameAs: person.sameAs,
    ...(siteUrl && { image: `${siteUrl}${seo.ogImage.path}` }),
  };
  const websiteNode = {
    '@type': 'WebSite',
    ...(siteUrl && { '@id': `${siteUrl}/#website`, url: `${siteUrl}/` }),
    name: seo.siteName,
    description: seo.description,
    inLanguage: seo.language,
    ...(siteUrl ? { author: { '@id': `${siteUrl}/#person` } } : { author: { '@type': 'Person', name: person.name } }),
  };
  return { '@context': 'https://schema.org', '@graph': [personNode, websiteNode] };
}

function headTags(siteUrl) {
  const { ogImage } = seo;
  const tags = [
    meta({ name: 'description', content: seo.description }),
    meta({ name: 'author', content: seo.author }),
    meta({ name: 'keywords', content: seo.keywords.join(', ') }),
    meta({ name: 'robots', content: 'index, follow, max-image-preview:large' }),

    // Open Graph: Facebook, LinkedIn, WhatsApp and most chat apps.
    meta({ property: 'og:type', content: 'profile' }),
    meta({ property: 'og:site_name', content: seo.siteName }),
    meta({ property: 'og:locale', content: seo.locale }),
    meta({ property: 'og:title', content: seo.title }),
    meta({ property: 'og:description', content: seo.description }),
    meta({ property: 'profile:first_name', content: 'Shabda' }),
    meta({ property: 'profile:last_name', content: 'Sinha' }),

    // X / Twitter. No twitter:site — there is no verified X account to reference.
    meta({ name: 'twitter:card', content: siteUrl ? 'summary_large_image' : 'summary' }),
    meta({ name: 'twitter:title', content: seo.title }),
    meta({ name: 'twitter:description', content: seo.description }),
  ];

  if (siteUrl) {
    const imageUrl = `${siteUrl}${ogImage.path}`;
    tags.push(
      { tag: 'link', attrs: { rel: 'canonical', href: `${siteUrl}/` }, injectTo: 'head' },
      meta({ property: 'og:url', content: `${siteUrl}/` }),
      meta({ property: 'og:image', content: imageUrl }),
      meta({ property: 'og:image:secure_url', content: imageUrl }),
      meta({ property: 'og:image:type', content: ogImage.type }),
      meta({ property: 'og:image:width', content: String(ogImage.width) }),
      meta({ property: 'og:image:height', content: String(ogImage.height) }),
      meta({ property: 'og:image:alt', content: ogImage.alt }),
      meta({ name: 'twitter:image', content: imageUrl }),
      meta({ name: 'twitter:image:alt', content: ogImage.alt }),
    );
  }

  tags.push({
    tag: 'script',
    attrs: { type: 'application/ld+json' },
    // Escape "<" so no value can ever close the <script> element early.
    children: JSON.stringify(buildStructuredData(siteUrl)).replace(/</g, '\\u003c'),
    injectTo: 'head',
  });
  return tags;
}

function robotsTxt(siteUrl) {
  return ['User-agent: *', 'Allow: /', '', ...(siteUrl ? [`Sitemap: ${siteUrl}/sitemap.xml`, ''] : [])].join('\n');
}

function sitemapXml(siteUrl) {
  const today = new Date().toISOString().slice(0, 10);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
  </url>
</urlset>
`;
}

/**
 * Cloudflare Pages `_headers`. The CSP allows only this site's own files, plus
 * the inline theme script by its exact SHA-256 hash (computed from the built
 * HTML, so it can never drift out of sync with the script).
 */
function headersFile(scriptHashes, siteUrl) {
  const csp = [
    "default-src 'self'",
    `script-src 'self' ${scriptHashes.map((h) => `'sha256-${h}'`).join(' ')}`,
    "style-src 'self'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "manifest-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'none'",
    "frame-ancestors 'none'",
    'upgrade-insecure-requests',
  ].join('; ');

  const onCustomDomain = siteUrl && !new URL(siteUrl).hostname.endsWith('.pages.dev');
  return `# Generated by build/seo-plugin.js — edit there, not in dist/.
/*
  Content-Security-Policy: ${csp}
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  X-Frame-Options: DENY
  Cross-Origin-Opener-Policy: same-origin
  Strict-Transport-Security: max-age=31536000

# Hashed build assets never change: cache them for a year.
/assets/*
  Cache-Control: public, max-age=31536000, immutable

# Keep preview / branch deployments out of search results.
https://:version.:project.pages.dev/*
  X-Robots-Tag: noindex
${onCustomDomain ? `
# The site lives on a custom domain, so the default *.pages.dev address is a duplicate.
https://:project.pages.dev/*
  X-Robots-Tag: noindex
` : ''}`;
}

export function seoPlugin({ siteUrl: rawSiteUrl }) {
  const siteUrl = resolveSiteUrl(rawSiteUrl);
  let isBuild = false;

  return {
    name: 'portfolio-seo',
    enforce: 'post',
    configResolved(config) {
      isBuild = config.command === 'build';
      if (isBuild && !siteUrl) {
        config.logger.warn(
          '\n[portfolio-seo] VITE_SITE_URL is not set: building without canonical URL, og:image, ' +
            'og:url and sitemap.xml. Set it to the public domain for production builds (see README.md).\n',
        );
      }
    },
    transformIndexHtml(html) {
      return {
        html: html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(seo.title)}</title>`),
        tags: headTags(siteUrl),
      };
    },
    generateBundle(_options, bundle) {
      const page = bundle['index.html'];
      const source = typeof page?.source === 'string' ? page.source : page?.source?.toString();
      if (!source) return;
      // Hash every executable inline script (not JSON-LD data blocks).
      const hashes = [...source.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)]
        .map((m) => createHash('sha256').update(m[1], 'utf8').digest('base64'));

      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robotsTxt(siteUrl) });
      this.emitFile({ type: 'asset', fileName: '_headers', source: headersFile(hashes, siteUrl) });
      if (siteUrl) this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml(siteUrl) });
    },
  };
}
