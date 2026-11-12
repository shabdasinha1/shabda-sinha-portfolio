import { cn } from '../../utils/cn';

/** Pill with a softly pulsing dot, e.g. availability status. */
export function StatusBadge({ children, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 py-1 pr-3.5 pl-2.5',
        'text-[0.8rem] font-medium text-muted shadow-soft',
        className,
      )}
    >
      <span className="relative flex size-2" aria-hidden="true">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-50 [animation-duration:2.4s] [animation-iteration-count:3]" />
        <span className="relative inline-flex size-2 rounded-full bg-success" />
      </span>
      {children}
    </span>
  );
}
