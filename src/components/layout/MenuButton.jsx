import { cn } from '../../utils/cn';

/** Animated two-line hamburger that morphs into a close (×) icon. */
export function MenuButton({ open, onClick, controls, className }) {
  const line =
    'absolute left-1/2 h-[1.5px] w-[18px] -translate-x-1/2 rounded-full bg-current transition-transform duration-(--duration-base) ease-smooth';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls={controls}
      aria-label={open ? 'Close menu' : 'Open menu'}
      className={cn(
        'touch-target relative inline-flex size-9 items-center justify-center rounded-full border border-line text-fg',
        'transition-colors hover:border-line-strong hover:bg-surface-muted',
        className,
      )}
    >
      <span aria-hidden="true" className={cn(line, open ? 'top-1/2 rotate-45' : 'top-[14px]')} />
      <span
        aria-hidden="true"
        className={cn(line, open ? 'top-1/2 -rotate-45' : 'top-[20px]')}
      />
    </button>
  );
}
