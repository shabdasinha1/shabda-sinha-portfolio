import { useRef } from 'react';
import { m, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowRight, Download } from 'lucide-react';
import { hero, profile } from '../../../data/profile';
import { useMotionEnabled } from '../../../hooks/useMotionEnabled';
import { useTheme } from '../../../hooks/useTheme';
import { BRAND_GRADIENT } from '../../../utils/brand';
import { drawLine, EASE_OUT, SCROLL_SPRING, stagger } from '../../../utils/motion';
import GradientText from '../../reactbits/GradientText';
import Magnet from '../../reactbits/Magnet';
import RotatingText from '../../reactbits/RotatingText';
import { Button } from '../../common/Button';
import { Container } from '../../common/Container';
import { SocialLinks } from '../../common/SocialLinks';
import { StatusBadge } from '../../common/StatusBadge';
import { HeroBackdrop } from './HeroBackdrop';
import { HeroShowcase } from './HeroShowcase';

// The underline sweeps in once the headline has settled.
const underline = drawLine(0.6);

// Hero entrance: same Apple-style rise-and-focus as the rest of the site, but a
// little quicker. Browsers count the headline as "painted" (LCP) only when its
// fade finishes, so the first screen must settle fast.
const fadeUp = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE_OUT } },
};

/**
 * Apple-style hero: a centred, oversized headline that gently recedes
 * (fades, rises and shrinks a little) as the page scrolls, followed by the
 * portrait showcase that tilts up into place.
 */
export function Hero() {
  const { headline } = hero;
  const sectionRef = useRef(null);
  const enabled = useMotionEnabled();
  const { theme } = useTheme();
  const titles = hero.rotatingTitles;

  // 0 → 1 while the top of the hero travels from the top of the screen to off-screen.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const progress = useSpring(scrollYProgress, SCROLL_SPRING);
  const introOpacity = useTransform(progress, [0, 0.45], [1, 0]);
  const introY = useTransform(progress, [0, 0.45], [0, -70]);
  const introScale = useTransform(progress, [0, 0.45], [1, 0.94]);

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-labelledby="hero-title"
      // overflow-x-clip: while the showcase is tilted in 3D its near edge projects
      // slightly wider than the screen; clip (not hidden) keeps it from widening the page.
      className="relative isolate overflow-x-clip pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      <HeroBackdrop />

      <Container className="text-center">
        <m.div style={enabled ? { opacity: introOpacity, y: introY, scale: introScale } : undefined}>
          <m.div variants={stagger(0.06)} initial="hidden" animate="visible">
            <m.div variants={fadeUp} className="flex justify-center">
              <StatusBadge>{profile.availability}</StatusBadge>
            </m.div>

            {/* React Bits RotatingText: runs through the resume titles once (~3.6s) and
                stops, so it never needs a pause control (WCAG 2.2.2). */}
            <m.p
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1 text-lg font-medium tracking-[-0.01em] text-fg sm:text-xl [text-shadow:0_0_18px_var(--bg),0_0_6px_var(--bg)]"
            >
              <span>I&apos;m a</span>
              <RotatingText
                texts={enabled ? titles : titles.slice(-1)}
                auto={enabled}
                loop={false}
                rotationInterval={1800}
                highlight
                highlightColor="#0071e3"
                staggerDuration={0.02}
                staggerFrom="last"
                mainClassName="font-semibold"
              />
              <span>developer</span>
            </m.p>

            <m.h1
              id="hero-title"
              variants={fadeUp}
              className="mx-auto mt-5 max-w-5xl text-[clamp(2.6rem,8vw,6.25rem)] leading-[0.98] font-semibold tracking-[-0.05em] text-fg"
            >
              {headline.lead}{' '}
              <span className="relative inline-block">
                {/* React Bits GradientText: the brand gradient drifts slowly (paused for reduced motion).
                    The descendant padding keeps the "p" descender inside the painted area. */}
                <GradientText
                  colors={BRAND_GRADIENT[theme]}
                  animationSpeed={7}
                  className="[&_span]:pb-[0.1em]"
                >
                  {headline.emphasis}
                </GradientText>
                <m.span
                  aria-hidden="true"
                  variants={underline}
                  className="absolute inset-x-[0.04em] bottom-[0.02em] h-[0.055em] origin-left rounded-full bg-[image:var(--gradient-text)] opacity-70"
                />
              </span>
              {headline.tail}
            </m.h1>

            <m.p
              variants={fadeUp}
              className="mx-auto mt-7 max-w-2xl text-[1.0625rem] leading-relaxed text-muted sm:text-xl sm:leading-relaxed"
            >
              {hero.intro}
            </m.p>

            {/* React Bits Magnet: buttons lean toward a nearby mouse pointer (off for touch and reduced motion). */}
            <m.div variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Magnet padding={60} magnetStrength={5} maxOffset={10}>
                <Button href={hero.primaryCta.href} size="lg" icon={ArrowRight}>
                  {hero.primaryCta.label}
                </Button>
              </Magnet>
              <Magnet padding={60} magnetStrength={5} maxOffset={10}>
                <Button
                  href={profile.resume.href}
                  download={profile.resume.fileName}
                  size="lg"
                  variant="secondary"
                  icon={Download}
                  iconPosition="start"
                >
                  {hero.secondaryCta.label}
                </Button>
              </Magnet>
            </m.div>

            <m.div variants={fadeUp} className="mt-8 flex justify-center">
              <SocialLinks />
            </m.div>
          </m.div>
        </m.div>

        <HeroShowcase />
      </Container>
    </section>
  );
}
