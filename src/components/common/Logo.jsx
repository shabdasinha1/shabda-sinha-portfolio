import { profile } from '../../data/profile';
import { cn } from '../../utils/cn';

/** Monogram + name. Links back to the top of the page. */
export function Logo({ className, onClick }) {
  return (
    <a
      href="#home"
      onClick={onClick}
      aria-label={`${profile.name} — back to top`}
      className={cn('group inline-flex items-center gap-2.5 rounded-full', className)}
    >
      <span
        aria-hidden="true"
        className="grid size-8 place-items-center rounded-[10px] bg-inverse font-serif text-lg leading-none text-inverse-fg italic transition-transform duration-(--duration-base) ease-smooth group-hover:-rotate-6"
      >
        S
      </span>
      <span className="text-[0.95rem] font-semibold tracking-tight whitespace-nowrap text-fg">
        {profile.shortName}
      </span>
    </a>
  );
}
