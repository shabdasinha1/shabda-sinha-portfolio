import { cn } from '../../utils/cn';

/** Centred, max-width content wrapper with responsive side gutters. */
export function Container({ as: Tag = 'div', className, children, ...props }) {
  return (
    <Tag className={cn('mx-auto w-full max-w-6xl px-5 sm:px-8', className)} {...props}>
      {children}
    </Tag>
  );
}
