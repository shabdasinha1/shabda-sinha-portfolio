import { cn } from '../../utils/cn';
import { Container } from './Container';

/**
 * Standard page section: anchor id, accessible label, consistent vertical
 * rhythm and a hairline divider. `tone="muted"` gives a subtly different
 * background to separate neighbouring sections.
 */
export function Section({ id, labelledBy, tone = 'default', className, containerClassName, children }) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        'relative border-t border-line py-24 sm:py-32',
        tone === 'muted' && 'bg-bg-elevated',
        className,
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
