import { useEffect, useRef } from 'react';
import { animate, useInView } from 'motion/react';
import { useMotionEnabled } from '../../hooks/useMotionEnabled';
import { EASE_OUT } from '../../utils/motion';

/**
 * Counts a number up from zero when it scrolls into view, e.g. "100+" or "8.25".
 * The visible digits are updated directly in the DOM (no React re-renders) and
 * hidden from screen readers, which read the final value straight away.
 * With reduced motion the final value is shown immediately.
 */
export function CountUp({ value, className }) {
  const [, digits = value, suffix = ''] = String(value).match(/^([\d.]+)(.*)$/) ?? [];
  const target = parseFloat(digits);
  const decimals = (digits.split('.')[1] ?? '').length;
  const animatable = Number.isFinite(target);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const enabled = useMotionEnabled() && animatable;

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!enabled) {
      el.textContent = value;
      return undefined;
    }
    if (!inView) return undefined;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: EASE_OUT,
      onUpdate: (latest) => {
        el.textContent = `${latest.toFixed(decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [enabled, inView, target, decimals, suffix, value]);

  return (
    <span className={className}>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {enabled ? `${(0).toFixed(decimals)}${suffix}` : value}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
