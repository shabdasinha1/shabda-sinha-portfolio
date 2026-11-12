/**
 * Shared animation presets so motion feels consistent across the site.
 *
 * The feel is modelled on Apple's product pages: long, soft decelerations,
 * content that rises a little and comes into focus (blur → sharp), and
 * scroll-linked effects smoothed by springs. EASE_OUT matches the CSS
 * `ease-smooth` curve (--ease-smooth in index.css).
 *
 * Reduced-motion users get transforms disabled by <MotionConfig reducedMotion="user">;
 * scroll-linked effects check useReducedMotion() themselves (see useMotionEnabled).
 */
export const EASE_OUT = [0.22, 1, 0.36, 1];

export const DURATION = { fast: 0.25, base: 0.5, slow: 0.9 };

/** Spring used to smooth scroll-linked values so they glide instead of tracking 1:1. */
export const SCROLL_SPRING = { stiffness: 120, damping: 30, mass: 0.4, restDelta: 0.0005 };

export const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.slow, ease: EASE_OUT } },
};

/** Horizontal rule that "draws" itself from the left. */
export const drawLine = (delay = 0.15) => ({
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1, ease: EASE_OUT, delay } },
});

export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});
