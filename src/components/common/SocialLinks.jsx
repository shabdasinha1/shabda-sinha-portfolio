import { socials } from '../../data/socials';
import { SocialIcon } from '../icons/SocialIcon';
import { cn } from '../../utils/cn';

/** Row of icon-only social links with accessible labels. */
export function SocialLinks({ className, itemClassName }) {
  return (
    <ul className={cn('flex items-center gap-1', className)}>
      {socials.map(({ id, label, href, icon }) => {
        const external = href.startsWith('http');
        return (
          <li key={id}>
            <a
              href={href}
              aria-label={label}
              title={label}
              {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
              className={cn(
                'touch-target relative inline-flex size-10 items-center justify-center rounded-full text-muted',
                'transition-colors hover:bg-surface-muted hover:text-fg',
                itemClassName,
              )}
            >
              <SocialIcon name={icon} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
