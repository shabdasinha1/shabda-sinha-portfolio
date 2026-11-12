import { cn } from '../../utils/cn';

const base =
  'group/btn inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap ' +
  // Duration/easing come from the shared defaults in index.css (--default-transition-*).
  'transition-[background-color,border-color,color,box-shadow,translate,scale] ' +
  'hover:-translate-y-px active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50';

const variants = {
  primary:
    'bg-inverse text-inverse-fg shadow-card hover:shadow-float hover:bg-inverse/90',
  secondary:
    'border border-line-strong bg-surface/60 text-fg shadow-soft hover:border-fg/25 hover:bg-surface',
  ghost: 'text-muted hover:bg-surface-muted hover:text-fg',
};

const sizes = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-12 px-6 text-[0.9375rem]',
};

/**
 * Renders an <a> when `href` is provided, otherwise a <button>.
 * `icon` is shown after the label and nudges on hover.
 */
export function Button({
  href,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'end',
  className,
  children,
  ...props
}) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const iconEl = Icon ? (
    <Icon
      aria-hidden="true"
      strokeWidth={1.75}
      className={cn(
        'size-4 transition-transform',
        iconPosition === 'end' && 'group-hover/btn:translate-x-0.5',
      )}
    />
  ) : null;

  const content = (
    <>
      {iconPosition === 'start' && iconEl}
      {children}
      {iconPosition === 'end' && iconEl}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  );
}
