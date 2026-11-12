import { useReducedMotion } from 'motion/react';

/**
 * False when the visitor asks the OS for reduced motion.
 * Scroll-linked effects (parallax, scaling, word reveals) bind motion values to
 * `style` directly, which <MotionConfig reducedMotion="user"> does not cover,
 * so those components check this and render static instead.
 */
export function useMotionEnabled() {
  return !useReducedMotion();
}
