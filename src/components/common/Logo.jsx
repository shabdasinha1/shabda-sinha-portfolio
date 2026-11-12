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
        className="grid size-8 place-items-center rounded-[10px] bg-inverse text-base leading-none font-semibold tracking-[-0.04em] text-inverse-fg transition-transform duration-(--duration-base) ease-smooth group-hover:scale-105"
      >
        S
      </span>
      {/* Name hidden on the narrowest phones so the Resume button always fits; the link keeps its accessible name. */}
      <span className="text-[0.95rem] font-semibold tracking-[-0.02em] whitespace-nowrap text-fg max-[359px]:hidden">
        {profile.shortName}
      </span>
    </a>
  );
}
