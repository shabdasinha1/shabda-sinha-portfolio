import { m, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useFinePointer } from '../../hooks/useFinePointer';
import { useMotionEnabled } from '../../hooks/useMotionEnabled';
import { cn } from '../../utils/cn';

const SPRING = { stiffness: 220, damping: 22, mass: 0.6 };

/**
 * Framer Motion 3D tilt: the card leans toward the pointer in perspective, with a
 * soft glare that follows it, and springs back on leave. Mouse/trackpad only;
 * static for touch screens and reduced motion. Motion values update the
 * transform directly, so pointer moves never re-render React.
 */
export function Tilt3D({ children, className, max = 6, glare = true }) {
  const motionEnabled = useMotionEnabled();
  const finePointer = useFinePointer();
  const enabled = motionEnabled && finePointer;
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), SPRING);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), SPRING);
  const glareX = useTransform(px, [0, 1], ['0%', '100%']);
  const glareY = useTransform(py, [0, 1], ['0%', '100%']);
  const glareOpacity = useSpring(0, SPRING);
  const glareImage = useMotionTemplate`radial-gradient(30rem circle at ${glareX} ${glareY}, rgb(255 255 255 / 0.16), transparent 60%)`;

  if (!enabled) return <div className={className}>{children}</div>;

  const onPointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
    glareOpacity.set(1);
  };
  const onPointerLeave = () => {
    px.set(0.5);
    py.set(0.5);
    glareOpacity.set(0);
  };

  return (
    <div className={cn('[perspective:1600px]', className)} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <m.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }} className="relative">
        {children}
        {glare && (
          <m.span
            aria-hidden="true"
            style={{ opacity: glareOpacity, backgroundImage: glareImage }}
            className="pointer-events-none absolute inset-0 rounded-[2rem] mix-blend-overlay"
          />
        )}
      </m.div>
    </div>
  );
}
