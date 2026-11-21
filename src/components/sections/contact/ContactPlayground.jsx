import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { BRAND_GRADIENT } from '../../../utils/brand';

// Raw WebGL2 physics; its chunk is fetched only when Contact is about to scroll into view.
const Ballpit = lazy(() => import('../../reactbits/Ballpit'));

/**
 * A walled-off playground at the bottom of the contact panel: React Bits Ballpit,
 * a pile of glossy brand-coloured balls that follow the cursor and can be grabbed
 * and tossed. It has its own area so it never sits behind text. Decorative.
 */
export function ContactPlayground() {
  const ref = useRef(null);
  const [near, setNear] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setNear(true), {
      rootMargin: '600px 0px',
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative mt-12 h-48 overflow-hidden rounded-3xl border border-current/10 bg-current/[0.04] sm:h-64"
    >
      {near && (
        <Suspense fallback={null}>
          <Ballpit
            count={70}
            colors={[...BRAND_GRADIENT[theme], '#ffffff']}
            material="gloss"
            minSize={0.55}
            maxSize={1.15}
            gravity={0.7}
            followCursor
            grab
            className="absolute inset-0"
          />
        </Suspense>
      )}
      <p className="pointer-events-none absolute top-3 left-4 font-mono text-[0.7rem] tracking-[0.14em] uppercase opacity-60">
        Playground · toss them around
      </p>
    </div>
  );
}
