/**
 * About section content.
 * Source of truth: "Shabda Sinha Resume.pdf" (Oct 30). Every statement below
 * restates something on the resume; do not add claims that are not there.
 */
export const about = {
  index: '01',
  eyebrow: 'About',
  title: 'A full-stack developer with a backend-first mindset.',
  lead: 'I build and deploy full-stack web applications with MongoDB, Express.js, React.js and Node.js — and I care most about the parts that keep them secure and reliable in production.',
  paragraphs: [
    'Across 2+ years at Robotronix Engineering Tech, I delivered 8+ production applications and 100+ RESTful APIs across SaaS, e-commerce and analytics products, taking features from requirements gathering through to production deployment.',
    'My strongest work sits in the backend: JWT authentication with refresh tokens, role-based access control, reusable payment gateway modules, AWS S3 storage and MongoDB query optimisation. On the frontend, I build responsive React interfaces and Chart.js dashboards that make that data useful.',
    'I work well in Agile teams, take code reviews seriously and enjoy teaching — I have mentored junior developers and run frontend workshops for engineering students.',
  ],
  facts: [
    { id: 'location', label: 'Based in', value: 'Indore, Madhya Pradesh, India' },
    { id: 'experience', label: 'Experience', value: '2+ years · MERN stack' },
    { id: 'education', label: 'Education', value: 'B.Tech, Information Technology' },
    { id: 'availability', label: 'Availability', value: 'Immediate joiner · Open to relocation' },
  ],
  focusAreas: [
    {
      id: 'security',
      icon: 'shield',
      title: 'Secure backends',
      text: 'Authentication and authorisation with JWT, refresh tokens and RBAC to protect user data and admin features.',
    },
    {
      id: 'integrations',
      icon: 'plug',
      title: 'Payments & integrations',
      text: 'Reusable Razorpay and Easebuzz modules, AWS S3 pre-signed URLs and Firebase push notifications.',
    },
    {
      id: 'interfaces',
      icon: 'layout',
      title: 'Responsive interfaces',
      text: 'React.js and Redux Toolkit single-page apps, with interactive Chart.js dashboards and reporting.',
    },
  ],
};
