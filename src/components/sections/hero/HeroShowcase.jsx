import { useRef } from 'react';
import { m, useScroll, useSpring, useTransform } from 'motion/react';
import { MapPin } from 'lucide-react';
import portrait from '../../../assets/images/portrait.jpeg';
import { hero, profile } from '../../../data/profile';
import { useMotionEnabled } from '../../../hooks/useMotionEnabled';
import { EASE_OUT, SCROLL_SPRING } from '../../../utils/motion';
import { TechList } from '../../common/TechList';
import { HeroStats } from './HeroStats';

/**
 * The hero's "product shot": portrait, most recent role, key numbers and core
 * stack in one large panel. In the style of Apple's product reveals it starts
 * tilted back and slightly smaller, and settles flat as it scrolls into view.
 * Scroll-linked values are spring-smoothed; reduced motion renders it flat.
 */
export function HeroShowcase() {
  const { currentRole } = hero;
  const ref = useRef(null);
  const enabled = useMotionEnabled();

  // 0 when the panel's top reaches the bottom of the screen, 1 when it is 30% from the top.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.3'] });
  const progress = useSpring(scrollYProgress, SCROLL_SPRING);
  const rotateX = useTransform(progress, [0, 1], [16, 0]);
  const scale = useTransform(progress, [0, 1], [0.92, 1]);
  const y = useTransform(progress, [0, 1], [30, 0]);

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: EASE_OUT, delay: 0.5 }}
      className="mx-auto mt-16 max-w-5xl [perspective:1400px] sm:mt-24"
    >
      <m.div
        style={enabled ? { rotateX, scale, y, transformOrigin: '50% 0%' } : undefined}
        className="overflow-hidden rounded-[2rem] border border-line bg-surface text-left shadow-float sm:rounded-[2.5rem]"
      >
        <div className="grid md:grid-cols-[0.85fr_1.15fr]">
          <figure className="group relative overflow-hidden bg-surface-muted">
            <img
              src={portrait}
              alt={`Portrait of ${profile.name}`}
              width="720"
              height="1035"
              decoding="async"
              className="aspect-[4/5] h-full w-full object-cover object-[50%_20%] transition-transform duration-[1200ms] ease-smooth group-hover:scale-[1.04] md:aspect-auto"
            />
            <figcaption className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
              <MapPin className="size-3.5" strokeWidth={2} aria-hidden="true" />
              {profile.shortLocation}
            </figcaption>
          </figure>

          <div className="flex flex-col gap-8 p-6 sm:p-10">
            <div>
              <p className="eyebrow">Most recent role</p>
              <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-fg sm:text-3xl">{currentRole.title}</p>
              <p className="mt-1.5 text-muted">{currentRole.company}</p>
              <p className="mt-1 font-mono text-xs text-subtle">{currentRole.period}</p>
            </div>

            <HeroStats />

            <div>
              <p className="eyebrow">Core stack</p>
              <TechList items={hero.coreStack} label="Core technologies" variant="pill" className="mt-3" />
            </div>
          </div>
        </div>
      </m.div>
    </m.div>
  );
}
