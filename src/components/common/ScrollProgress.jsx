import { m, useScroll, useSpring } from 'motion/react';
import { useMotionEnabled } from '../../hooks/useMotionEnabled';
import { SCROLL_SPRING } from '../../utils/motion';

/** Thin gradient line along the top edge showing how far down the page you are. */
export function ScrollProgress() {
  const enabled = useMotionEnabled();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, SCROLL_SPRING);

  if (!enabled) return null;
  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className="absolute inset-x-0 top-0 z-10 h-[2px] origin-left bg-[image:var(--gradient-text)]"
    />
  );
}
