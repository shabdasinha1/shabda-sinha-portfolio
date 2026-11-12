/**
 * Shared animation presets so motion feels consistent across the site.
 * EASE_OUT matches the CSS `ease-smooth` curve (--ease-smooth in index.css),
 * so JS-driven and CSS-driven motion share one timing language.
 * Reduced-motion users get transforms disabled by <MotionConfig reducedMotion="user">.
 */
export const EASE_OUT = [0.22, 1, 0.36, 1];

export const DURATION = { fast: 0.2, base: 0.45, slow: 0.65 };

export const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.slow, ease: EASE_OUT } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.slow, ease: EASE_OUT } },
};

/** Horizontal rule that "draws" itself from the left. */
export const drawLine = (delay = 0.15) => ({
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.8, ease: EASE_OUT, delay } },
});

export const stagger = (staggerChildren = 0.07, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});
