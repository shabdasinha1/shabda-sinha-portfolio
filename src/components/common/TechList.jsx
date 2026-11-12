import { cn } from '../../utils/cn';

const variants = {
  // Monospace "tag" chips used for stacks on projects/roles.
  mono: 'rounded-md border border-line bg-surface-muted/60 px-2 py-0.5 font-mono text-[0.72rem] text-muted',
  // Softer pill used for grouped skills.
  pill: 'rounded-full border border-line bg-surface px-3 py-1 text-[0.8125rem] text-fg/85 transition-colors hover:border-line-strong hover:text-fg',
};

/** Accessible list of technology labels. */
export function TechList({ items, label, variant = 'mono', className }) {
  return (
    <ul aria-label={label} className={cn('flex flex-wrap gap-1.5', variant === 'pill' && 'gap-2', className)}>
      {items.map((item) => (
        <li key={item} className={variants[variant]}>
          {item}
        </li>
      ))}
    </ul>
  );
}
