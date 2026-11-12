/**
 * SEO and social-sharing content: the single source for <title>, meta tags,
 * Open Graph / X cards and JSON-LD structured data.
 *
 * This file is read at BUILD time by build/seo-plugin.js (in Node, not the
 * browser), so it must stay plain data with no browser-only APIs.
 *
 * Every statement restates the Oct 30 resume. Do not add ratings, reviews,
 * certifications, endorsements, addresses or other unverified claims.
 *
 * The public domain is NOT hard-coded: set VITE_SITE_URL at build time
 * (see README.md). Tags that need an absolute URL (canonical, og:url, og:image,
 * sitemap) are only emitted when it is set.
 */
import { education } from './education.js';
import { socials } from './socials.js';

const name = 'Shabda Kumar Sinha';

export const seo = {
  siteName: name,
  language: 'en',
  locale: 'en_IN',
  title: `${name} | Full-Stack Developer | MERN Stack Engineer`,
  // ~155 characters: fits in search result snippets without truncation.
  description:
    'Full-stack MERN developer in Indore, India with 2+ years building production web apps: REST APIs, JWT/RBAC auth, payment integrations and React interfaces.',
  author: name,
  // Kept short and specific; search engines ignore stuffed keyword lists.
  keywords: [
    name,
    'Full-Stack Developer',
    'MERN Stack Developer',
    'React.js',
    'Node.js',
    'Express.js',
    'MongoDB',
    'Indore',
  ],
  // Social preview image, served from /public. 1200×630 is the shared
  // recommendation for Facebook, LinkedIn, WhatsApp and X large cards.
  ogImage: {
    path: '/og-image.jpg',
    width: 1200,
    height: 630,
    type: 'image/jpeg',
    alt: `${name}, Full-Stack MERN Developer: portrait with name and core technologies`,
  },
  person: {
    name,
    alternateName: 'Shabda Sinha',
    jobTitle: 'MERN Stack Developer',
    description:
      'Full-stack developer with 2+ years of experience building and deploying web applications with MongoDB, Express.js, React.js and Node.js.',
    email: 'shabdasinha11@gmail.com',
    homeLocation: 'Indore, Madhya Pradesh, India',
    alumniOf: education.entries.map((entry) => entry.institution),
    // Technologies listed on the resume.
    knowsAbout: [
      'JavaScript',
      'React.js',
      'Redux Toolkit',
      'Node.js',
      'Express.js',
      'MongoDB',
      'MySQL',
      'RESTful APIs',
      'JWT authentication',
      'Role-based access control',
      'AWS S3',
      'Payment gateway integration',
    ],
    sameAs: socials.filter((s) => s.href.startsWith('https://')).map((s) => s.href),
  },
};
