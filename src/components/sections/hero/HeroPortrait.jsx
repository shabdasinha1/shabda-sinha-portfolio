import { m, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { MapPin } from 'lucide-react';
import portrait from '../../../assets/images/portrait.jpeg';
import { hero, profile } from '../../../data/profile';
import { useFinePointer } from '../../../hooks/useFinePointer';
import { EASE_OUT } from '../../../utils/motion';

const MAX_TILT = 5; // degrees: enough to feel tactile, small enough to stay calm
const SPRING = { stiffness: 160, damping: 22, mass: 0.6 };

/** Framed portrait with a caption card and a gentle pointer-driven tilt. */
export function HeroPortrait() {
  const { currentRole } = hero;
  const finePointer = useFinePointer();
  const reduceMotion = useReducedMotion();
  const tiltEnabled = finePointer && !reduceMotion;

  // Motion values update the transform directly, so pointer moves never re-render React.
  const rotateX = useSpring(useMotionValue(0), SPRING);
  const rotateY = useSpring(useMotionValue(0), SPRING);

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * MAX_TILT * 2);
    rotateX.set(-y * MAX_TILT * 2);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <m.figure
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.15 }}
      className="group relative mx-auto w-full max-w-[22rem] lg:max-w-none"
    >
      <m.div
        onPointerMove={tiltEnabled ? handlePointerMove : undefined}
        onPointerLeave={tiltEnabled ? resetTilt : undefined}
        style={tiltEnabled ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
        className="relative"
      >
        {/* Offset outline gives the frame quiet depth without heavy shadows. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 translate-x-3 translate-y-3 rounded-[1.75rem] border border-line-strong transition-transform duration-(--duration-base) ease-smooth group-hover:translate-x-4 group-hover:translate-y-4"
        />

        <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-surface-muted shadow-float">
          <img
            src={portrait}
            alt={`Portrait of ${profile.name}`}
            width="720"
            height="1035"
            fetchPriority="high"
            decoding="async"
            className="aspect-[4/5] w-full object-cover object-[50%_20%] transition-transform duration-700 ease-smooth group-hover:scale-[1.03]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/25 to-transparent"
          />

          <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/15 bg-black/35 p-4 text-white backdrop-blur-md">
            <p className="text-[0.7rem] font-medium tracking-[0.14em] text-white/70 uppercase">
              {currentRole.period}
            </p>
            <p className="mt-1 font-medium tracking-tight">{currentRole.title}</p>
            <p className="text-sm text-white/75">{currentRole.company}</p>
          </figcaption>
        </div>

        <div className="absolute -top-3 -left-3 inline-flex items-center gap-1.5 rounded-full border border-line bg-bg-elevated px-3 py-1.5 text-xs font-medium text-muted shadow-card">
          <MapPin className="size-3.5 text-accent" strokeWidth={2} aria-hidden="true" />
          Indore, India
        </div>
      </m.div>
    </m.figure>
  );
}
