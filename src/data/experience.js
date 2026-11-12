/**
 * Professional experience — verbatim facts from the Oct 30 resume.
 * Both roles were at the same company, so they are grouped under it.
 */
export const experience = {
  index: '02',
  eyebrow: 'Experience',
  title: 'Where I have shipped production software.',
  description:
    'More than two years at one company, from intern to Junior Software Engineer, building APIs, integrations and full-stack features for live client products.',
  company: {
    name: 'Robotronix Engineering Tech Pvt. Ltd.',
    period: 'Jul 2024 – Oct 2026',
    summary: 'SaaS, e-commerce and analytics products for web and mobile.',
  },
  // Numbers stated on the resume.
  metrics: [
    { value: '100+', label: 'RESTful APIs built and deployed' },
    { value: '8+', label: 'Production web & mobile apps powered' },
    { value: '2', label: 'Junior developers mentored' },
  ],
  roles: [
    {
      id: 'junior-swe',
      title: 'Junior Software Engineer',
      subtitle: 'MERN Stack Developer',
      period: 'Jan 2025 – Oct 2026',
      highlights: [
        'Built and deployed 100+ RESTful APIs with Node.js and Express.js, powering 8+ production web and mobile applications across SaaS, e-commerce and analytics domains.',
        'Implemented authentication and authorisation using JWT, refresh tokens and role-based access control (RBAC) to protect user data and admin features.',
        'Designed reusable payment gateway modules for Razorpay and Easebuzz, standardising checkout and billing flows across multiple products.',
        'Optimised MongoDB queries and API endpoints, reducing query latency and improving overall application throughput.',
        'Configured AWS S3 storage with pre-signed URLs for secure, time-limited media access, and integrated Firebase push notifications for real-time alerts.',
        'Worked in Agile sprints with cross-functional teams, taking features from requirements gathering to production deployment.',
        'Mentored 2 junior developers through code reviews and led end-to-end development of the official Robotronix company website.',
      ],
      stack: ['Node.js', 'Express.js', 'React.js', 'MongoDB', 'JWT / RBAC', 'Razorpay', 'Easebuzz', 'AWS S3', 'Firebase'],
    },
    {
      id: 'intern',
      title: 'Software Development Intern',
      subtitle: 'MERN Stack · Full-time',
      period: 'Jul 2024 – Dec 2024',
      highlights: [
        'Developed backend APIs in Node.js and Express.js and integrated them with React.js frontends for live client projects.',
        'Resolved bugs, joined peer code reviews, followed Git/GitLab branching strategies and helped reduce page load times.',
      ],
      stack: ['Node.js', 'Express.js', 'React.js', 'Git', 'GitLab'],
    },
  ],
  recognition: [
    {
      id: 'lead-angel',
      text: 'Received client appreciation for dynamic analytics dashboards and graphical reporting built for the Lead Angel project.',
    },
    {
      id: 'incentives',
      text: 'Awarded performance-based incentives for delivering 8+ production applications and 100+ APIs.',
    },
    {
      id: 'workshops',
      text: 'Conducted frontend development workshops for 100+ engineering students.',
    },
  ],
};
