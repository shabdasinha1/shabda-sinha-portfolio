import { m } from 'motion/react';
import { fadeUp, stagger } from '../../utils/motion';

// Defined once at module level so the component identity is stable across renders.
const MOTION_TAGS = {
  div: m.div,
  ul: m.ul,
  ol: m.ol,
  li: m.li,
  article: m.article,
  header: m.header,
  p: m.p,
  dl: m.dl,
};

// Trigger slightly before the element is fully in view; animate only once.
const VIEWPORT = { once: true, margin: '0px 0px -12% 0px' };

/**
 * Fades + lifts its content in the first time it scrolls into view.
 * Animates opacity/transform only, so it never causes layout shift.
 */
export function Reveal({ as = 'div', className, children, ...props }) {
  const Tag = MOTION_TAGS[as];
  return (
    <Tag
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className={className}
      {...props}
    >
      {children}
    </Tag>
  );
}

/** Parent that staggers its <RevealItem> children as the group enters view. */
export function RevealGroup({ as = 'div', gap = 0.08, delay = 0, className, children, ...props }) {
  const Tag = MOTION_TAGS[as];
  return (
    <Tag
      variants={stagger(gap, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className={className}
      {...props}
    >
      {children}
    </Tag>
  );
}

/** Child of <RevealGroup>; inherits the group's animation timing. */
export function RevealItem({ as = 'div', className, children, ...props }) {
  const Tag = MOTION_TAGS[as];
  return (
    <Tag variants={fadeUp} className={className} {...props}>
      {children}
    </Tag>
  );
}
