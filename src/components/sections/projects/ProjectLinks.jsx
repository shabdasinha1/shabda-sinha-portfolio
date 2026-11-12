import { ArrowUpRight } from 'lucide-react';
import { SocialIcon } from '../../icons/SocialIcon';

/**
 * Renders repository / live-demo links when real URLs exist in data/projects.js.
 * Renders nothing otherwise: links are never invented.
 */
export function ProjectLinks({ links, projectName }) {
  if (!links?.length) return null;

  return (
    <ul className="mt-7 flex flex-wrap gap-2" aria-label={`${projectName} links`}>
      {links.map(({ label, href, type }) => (
        <li key={href}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-medium text-fg transition-colors hover:bg-surface-muted"
          >
            {type === 'github' && <SocialIcon name="github" className="size-4" />}
            {label}
            <ArrowUpRight className="size-3.5" strokeWidth={2} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
