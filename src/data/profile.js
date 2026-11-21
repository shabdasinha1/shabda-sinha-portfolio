/**
 * Personal & hero content.
 * Source of truth: "Shabda Sinha Resume.pdf" (Oct 2026). Edit facts here,
 * never inside components. Do not add claims that are not on the resume.
 */

// Served as-is from /public (no hashing) so the download link stays stable.
const resumeUrl = `${import.meta.env.BASE_URL}Shabda_Kumar_Sinha_Resume.pdf`;
export const profile = {
  name: 'Shabda Kumar Sinha',
  shortName: 'Shabda Sinha',
  initials: 'SS',
  role: 'Full-Stack MERN Developer',
  location: 'Indore, Madhya Pradesh, India',
  shortLocation: 'Indore, India',
  availability: 'Immediate joiner · Open to relocation',
  email: 'shabdasinha11@gmail.com',
  resume: {
    href: resumeUrl,
    fileName: 'Shabda_Kumar_Sinha_Resume.pdf',
  },
};

export const hero = {
  eyebrow: 'MERN Stack Developer — Node.js & React.js',
  // Titles from the resume headline, shown in turn in the hero ("I'm a … developer").
  // The last one is where the rotation stops, and what reduced-motion users see.
  rotatingTitles: ['Node.js & React.js', 'full-stack', 'MERN stack'],
  // Headline is rendered as: lead + <emphasis> + tail
  headline: {
    lead: 'I build full‑stack web apps that hold up in',
    emphasis: 'production',
    tail: '.',
  },
  intro:
    "I'm Shabda, a full-stack developer with 2+ years of experience shipping SaaS, e-commerce and analytics products — from secure REST APIs, JWT/RBAC auth and payment integrations to responsive React interfaces.",
  primaryCta: { label: 'View my work', href: '#projects' },
  secondaryCta: { label: 'Download resume' },
  coreStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Redux Toolkit', 'MySQL', 'AWS S3'],
  stats: [
    { value: '2+', label: 'Years building with the MERN stack' },
    { value: '8+', label: 'Production applications delivered' },
    { value: '100+', label: 'RESTful APIs built and deployed' },
  ],
  currentRole: {
    title: 'Junior Software Engineer',
    company: 'Robotronix Engineering Tech Pvt. Ltd.',
    period: 'Jan 2025 – Oct 2026',
  },
};
