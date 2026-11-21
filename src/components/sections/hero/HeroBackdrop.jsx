import { useEffect, useState } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { BRAND_GRADIENT } from '../../../utils/brand';
import { cn } from '../../../utils/cn';
import { whenSettled } from '../../../utils/whenSettled';
import Aurora from '../../reactbits/Aurora';

/**
 * Decorative hero background:
 *  - React Bits Aurora: a slow WebGL aurora in the brand gradient across the top,
 *    fading out before it reaches the showcase. It drifts toward the pointer,
 *    pauses when off-screen or in a background tab, and is static for reduced motion.
 *    It mounts after first paint (WebGL setup is a long task) and fades in.
 *  - Soft CSS light fields and a faint grid underneath, which also serve as the
 *    fallback where WebGL2 is unavailable.
 */
export function HeroBackdrop() {
  const { theme } = useTheme();
  const light = theme === 'light';
  const [auroraReady, setAuroraReady] = useState(false);
  const [auroraVisible, setAuroraVisible] = useState(false);

  useEffect(() => whenSettled(() => setAuroraReady(true), 900), []);
  useEffect(() => {
    if (!auroraReady) return undefined;
    // Next frame, so the opacity transition runs from 0.
    const id = window.requestAnimationFrame(() => setAuroraVisible(true));
    return () => window.cancelAnimationFrame(id);
  }, [auroraReady]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black_20%,transparent_70%)]" />
      <div className="absolute -top-56 left-1/2 h-[44rem] w-[44rem] -translate-x-[78%] rounded-full bg-[radial-gradient(circle,var(--glow-a),transparent_62%)] blur-3xl" />
      <div className="absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-[18%] rounded-full bg-[radial-gradient(circle,var(--glow-b),transparent_62%)] blur-3xl" />

      {/* Starts below the 56px header (so nav text never sits on the aurora's brightest band)
          and fades in at the top and out at the bottom. */}
      <div
        className={cn(
          'absolute inset-x-0 top-14 h-[30rem] opacity-0 transition-opacity duration-[1600ms] ease-out [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_40%,transparent)] sm:h-[38rem]',
          auroraVisible && 'opacity-100',
        )}
      >
        {auroraReady && (
          <Aurora
            colorStops={BRAND_GRADIENT[theme]}
            lightMode={light}
            opacity={light ? 0.4 : 0.38}
            amplitude={1.1}
            blend={0.6}
            height={0.5}
            speed={0.6}
            layers={2}
          />
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}
