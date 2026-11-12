import { m } from 'motion/react';
import { ArrowRight, Download } from 'lucide-react';
import { hero, profile } from '../../../data/profile';
import { drawLine, fadeIn, fadeUp, stagger } from '../../../utils/motion';
import { Button } from '../../common/Button';
import { Container } from '../../common/Container';
import { SocialLinks } from '../../common/SocialLinks';
import { StatusBadge } from '../../common/StatusBadge';
import { HeroBackdrop } from './HeroBackdrop';
import { HeroPortrait } from './HeroPortrait';
import { HeroStats } from './HeroStats';

// The underline draws in once the headline has settled.
const underline = drawLine(0.55);

export function Hero() {
  const { headline } = hero;

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate pt-28 pb-16 sm:pt-36 sm:pb-24"
    >
      <HeroBackdrop />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
          {/* Short, tight stagger: everything is visible within ~0.6s. */}
          <m.div variants={stagger(0.07)} initial="hidden" animate="visible">
            <m.div variants={fadeUp}>
              <StatusBadge>{profile.availability}</StatusBadge>
            </m.div>

            <m.p variants={fadeUp} className="eyebrow mt-8">
              {hero.eyebrow}
            </m.p>

            <m.h1
              id="hero-title"
              variants={fadeUp}
              className="mt-4 text-[clamp(2.4rem,6.2vw,4.6rem)] leading-[1.02] font-semibold tracking-[-0.04em] text-fg"
            >
              {headline.lead}{' '}
              <span className="relative inline-block font-serif font-normal tracking-[-0.01em] text-accent italic">
                {headline.emphasis}
                <m.span
                  aria-hidden="true"
                  variants={underline}
                  className="absolute inset-x-[0.04em] bottom-[0.02em] h-[0.06em] origin-left rounded-full bg-accent/60"
                />
              </span>
              {headline.tail}
            </m.h1>

            <m.p
              variants={fadeUp}
              className="mt-6 max-w-[38rem] text-[1.0625rem] leading-relaxed text-muted sm:text-lg"
            >
              {hero.intro}
            </m.p>

            <m.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
              <Button href={hero.primaryCta.href} size="lg" icon={ArrowRight}>
                {hero.primaryCta.label}
              </Button>
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
            </m.div>

            <m.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-subtle"
            >
              <span className="font-medium">{profile.name}</span>
              <span aria-hidden="true" className="h-4 w-px bg-line-strong" />
              <SocialLinks className="-ml-2" />
            </m.div>
          </m.div>

          <HeroPortrait />
        </div>

        <div className="mt-16 sm:mt-20">
          <HeroStats />

          <m.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2"
          >
            <p className="eyebrow mr-2">Core stack</p>
            <ul className="flex flex-wrap gap-2" aria-label="Core technologies">
              {hero.coreStack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-line bg-surface/60 px-3 py-1 font-mono text-xs text-muted transition-colors hover:border-line-strong hover:text-fg"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </m.div>
        </div>
      </Container>
    </section>
  );
}
