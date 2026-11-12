/**
 * Featured projects — facts from the Oct 30 resume only.
 *
 * - `problem` restates the need each project addressed, as described on the resume.
 * - `architecture` lists only technologies named for that project on the resume.
 *   It is rendered as a simplified diagram (captioned as such) instead of
 *   fabricated screenshots; it does not document the real system design.
 * - `links` is intentionally empty: no public repository or live URL is listed.
 *   Add { label, href, type: 'github' | 'live' } entries here when available.
 */
export const projectsSection = {
  index: '03',
  eyebrow: 'Selected work',
  title: "Products I've helped build.",
  description:
    'Three products from my resume, covering a SaaS platform, an analytics dashboard and an e‑commerce store.',
};

export const projects = [
  {
    id: 'qa-preneur',
    name: 'QA Preneur',
    category: 'SaaS business platform',
    problem:
      'A SaaS business needed one backend to serve both an admin web panel and a consumer mobile app, covering sign-in, validated data, notifications and payments.',
    description:
      'I built the core backend for the platform: the REST APIs behind both the admin panel and the mobile application.',
    contributions: [
      'Built the core backend serving an admin web panel and a consumer mobile application.',
      'Developed REST APIs for authentication, data validation and Firebase push notifications.',
      'Integrated Razorpay through a unified payment API.',
    ],
    highlight: { label: 'Highlight', text: 'Razorpay integrated through a single, unified payment API.' },
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Razorpay', 'Firebase'],
    architecture: {
      clients: [
        { label: 'Admin web panel', icon: 'monitor' },
        { label: 'Consumer mobile app', icon: 'smartphone' },
      ],
      core: { label: 'REST API', detail: 'Node.js · Express.js' },
      services: [
        { label: 'MongoDB', icon: 'database' },
        { label: 'Razorpay', icon: 'payment' },
        { label: 'Firebase', icon: 'bell' },
      ],
    },
    links: [],
  },
  {
    id: 'surveillance-analytics',
    name: 'Surveillance Analytics Dashboard',
    category: 'Analytics dashboard',
    problem:
      'Business stakeholders needed a clear view of real-time camera activity, plus secure, temporary access to recorded video.',
    description:
      'An analytics dashboard that turns camera activity into interactive Chart.js reports, backed by a secure media workflow on AWS S3.',
    contributions: [
      'Built an analytics dashboard that visualises real-time camera activity with interactive Chart.js reports for business stakeholders.',
      'Implemented an AWS S3 pre-signed URL workflow for secure, temporary access to video recordings and downloads.',
    ],
    highlight: { label: 'Highlight', text: 'Secure, temporary access to recordings and downloads through AWS S3 pre-signed URLs.' },
    stack: ['React.js', 'Node.js', 'Express.js', 'REST APIs', 'AWS S3', 'Chart.js'],
    architecture: {
      clients: [{ label: 'React dashboard', icon: 'chart' }],
      core: { label: 'REST API', detail: 'Node.js · Express.js' },
      services: [
        { label: 'AWS S3', icon: 'storage' },
        { label: 'Pre-signed URLs', icon: 'lock' },
      ],
    },
    links: [],
  },
  {
    id: 'fortitude-fashion',
    name: 'Fortitude Fashion',
    category: 'E-commerce platform',
    problem:
      'An online fashion store needed a storefront for shoppers and an admin portal that non-technical staff could use to manage products and inventory.',
    description:
      'A full-stack e-commerce storefront and admin portal with inventory management.',
    contributions: [
      'Developed the full-stack storefront and admin portal.',
      'Built inventory management that lets non-technical admins manage 100+ products.',
    ],
    highlight: { label: 'Highlight', text: 'Enables non-technical admins to manage 100+ products.' },
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    architecture: {
      clients: [
        { label: 'Storefront', icon: 'store' },
        { label: 'Admin portal', icon: 'layout' },
      ],
      core: { label: 'REST API', detail: 'Node.js · Express.js' },
      services: [{ label: 'MongoDB', icon: 'database' }],
    },
    links: [],
  },
];
