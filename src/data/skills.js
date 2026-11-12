/**
 * Technical skills, regrouped from the resume's skill lines.
 * Only technologies listed on the Oct 30 resume appear here.
 * No proficiency levels: the resume does not state any.
 */
export const skillsSection = {
  index: '04',
  eyebrow: 'Skills',
  title: 'The tools I use to ship.',
  description: 'Technologies from my resume, grouped by where they sit in the stack.',
  languages: ['JavaScript (ES6+)', 'HTML5', 'CSS3', 'SQL'],
};

export const skillGroups = [
  {
    id: 'frontend',
    icon: 'layout',
    title: 'Frontend',
    summary: 'Responsive single-page apps and data-rich dashboards.',
    items: ['React.js', 'Redux Toolkit', 'Chart.js', 'Bootstrap', 'Responsive Web Design', 'Single Page Applications'],
  },
  {
    id: 'backend',
    icon: 'server',
    title: 'Backend',
    summary: 'Secure REST APIs with authentication built in.',
    items: [
      'Node.js',
      'Express.js',
      'RESTful APIs',
      'JWT Authentication',
      'Refresh Tokens',
      'Role-Based Access Control',
      'Data Validation',
    ],
  },
  {
    id: 'databases',
    icon: 'database',
    title: 'Databases',
    summary: 'Data models designed and queries tuned for speed.',
    items: ['MongoDB', 'Mongoose', 'MySQL', 'Database Design', 'Query Optimization'],
  },
  {
    id: 'cloud',
    icon: 'cloud',
    title: 'Cloud & Deployment',
    summary: 'Storage, notifications and shipping to production.',
    items: ['AWS S3', 'AWS EC2', 'Pre-Signed URLs', 'Firebase Push Notifications', 'Production Deployment'],
  },
  {
    id: 'tools',
    icon: 'tools',
    title: 'Tools & Integrations',
    summary: 'Payments, third-party APIs and team workflow.',
    items: [
      'Razorpay',
      'Easebuzz',
      'Third-Party APIs',
      'Git',
      'GitHub',
      'GitLab',
      'Code Reviews',
      'Agile / SDLC',
    ],
  },
];
