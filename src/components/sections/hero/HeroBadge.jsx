import { lazy, Suspense, useEffect, useState } from 'react';
import { Hand, MapPin } from 'lucide-react';
import badgeBack from '../../../assets/images/badge-back.jpg';
import badgeFront from '../../../assets/images/badge-front.jpg';
import portrait from '../../../assets/images/portrait.jpeg';
import { profile } from '../../../data/profile';
import { whenSettled } from '../../../utils/whenSettled';

// Three.js (~140 KB gzipped) ships in its own chunk, fetched only once the page has settled.
const Lanyard = lazy(() => import('../../reactbits/Lanyard'));

const supportsWebGL2 = () => {
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch {
    return false;
  }
};

function Portrait() {
  return (
    <img
      src={portrait}
      alt=""
      width="720"
      height="1035"
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover object-[50%_20%]"
    />
  );
}

/**
 * Left column of the hero showcase. Shows the portrait first, then (once the
 * page has settled, and only where WebGL2 works) swaps in React Bits Lanyard: a
 * Three.js ID badge on a lanyard that hangs, sways and can be grabbed and flung.
 * The badge textures (design/badge.html) carry the same portrait, name and role.
 */
export function HeroBadge() {
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    // Its first frame compiles shaders (a long main-thread task), so it waits until the
    // hero entrance and largest contentful paint are done. The WebGL2 probe itself
    // creates a GL context, so it is deferred too.
    return whenSettled(() => supportsWebGL2() && setShow3D(true), 1800);
  }, []);

  return (
    <figure
      role="img"
      aria-label={`Portrait of ${profile.name}${show3D ? ' on a 3D ID badge that can be dragged and swung' : ''}`}
      className="relative aspect-[4/5] overflow-hidden bg-[radial-gradient(120%_70%_at_50%_0%,var(--glow-a),transparent_65%),radial-gradient(90%_60%_at_80%_100%,var(--glow-b),transparent_70%)] bg-surface-muted md:aspect-auto md:min-h-[34rem]"
    >
      {show3D ? (
        <Suspense fallback={<Portrait />}>
          <Lanyard
            frontImage={badgeFront}
            backImage={badgeBack}
            cardColor="#0a0a0c"
            strapColor="#0071e3"
            strapWidth={0.55}
            strapLength={0.42}
            size={0.62}
            finish="glossy"
            metal="silver"
            breeze={0.35}
            className="absolute inset-0"
          />
        </Suspense>
      ) : (
        <Portrait />
      )}

      <figcaption className="pointer-events-none absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
        <MapPin className="size-3.5" strokeWidth={2} aria-hidden="true" />
        {profile.shortLocation}
      </figcaption>

      {show3D && (
        <p
          aria-hidden="true"
          className="pointer-events-none absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/20 bg-black/70 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-white backdrop-blur-md"
        >
          <Hand className="size-3.5" strokeWidth={2} />
          Drag the badge
        </p>
      )}
    </figure>
  );
}
