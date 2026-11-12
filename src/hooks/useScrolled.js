import { useEffect, useRef, useState } from 'react';

/**
 * True once the page has scrolled past `threshold` pixels.
 * React state only changes when the value actually flips, so scrolling does not
 * trigger re-renders on every scroll event.
 */
export function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);
  const current = useRef(false);

  useEffect(() => {
    const update = () => {
      const next = window.scrollY > threshold;
      if (next !== current.current) {
        current.current = next;
        setScrolled(next);
      }
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [threshold]);

  return scrolled;
}
