import { m } from 'motion/react';
import { hero } from '../../../data/profile';
import { fadeUp, stagger } from '../../../utils/motion';

/** Key numbers from the resume, presented as a quiet definition list. */
export function HeroStats() {
  return (
    <m.dl
      variants={stagger(0.07, 0.4)}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface/50 shadow-soft backdrop-blur-sm xs:grid-cols-3 xs:divide-x xs:divide-y-0"
    >
      {hero.stats.map(({ value, label }) => (
        <m.div key={label} variants={fadeUp} className="flex flex-col gap-1 px-5 py-4 sm:px-6 sm:py-5">
          <dt className="order-2 text-[0.8125rem] leading-snug text-muted">{label}</dt>
          <dd className="order-1 text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-4xl">
            {value}
          </dd>
        </m.div>
      ))}
    </m.dl>
  );
}
