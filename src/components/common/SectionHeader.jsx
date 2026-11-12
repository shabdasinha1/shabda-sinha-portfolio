import { m } from 'motion/react';
import { cn } from '../../utils/cn';
import { drawLine } from '../../utils/motion';
import { RevealGroup, RevealItem } from './Reveal';

const rule = drawLine(0.15);

/**
 * Numbered section heading: "01 — About", a large title and optional intro.
 * `titleId` must match the parent <Section labelledBy>.
 */
export function SectionHeader({ index, eyebrow, title, titleId, description, align = 'left', className }) {
  return (
    <RevealGroup
      as="header"
      className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}
    >
      <RevealItem
        as="p"
        className={cn('eyebrow flex items-center gap-3', align === 'center' && 'justify-center')}
      >
        <span className="text-accent">{index}</span>
        {/* Rule draws in from the left as the heading reveals. */}
        <m.span
          aria-hidden="true"
          variants={rule}
          className={cn('h-px w-10 bg-gradient-to-r from-accent to-line-strong', align === 'center' ? 'origin-center' : 'origin-left')}
        />
        {eyebrow}
      </RevealItem>
      <RevealItem as="div">
        <h2
          id={titleId}
          className="mt-5 text-[clamp(2rem,4.4vw,3.25rem)] leading-[1.06] font-semibold tracking-[-0.035em] text-fg"
        >
          {title}
        </h2>
      </RevealItem>
      {description && (
        <RevealItem as="p" className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-muted">
          {description}
        </RevealItem>
      )}
    </RevealGroup>
  );
}
