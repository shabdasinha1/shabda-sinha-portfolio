import { hero } from '../../../data/profile';
import { CountUp } from '../../common/CountUp';

/** Key numbers from the resume; each counts up as it comes into view. */
export function HeroStats() {
  return (
    // Stacked on narrow phones, three columns from 416px (xs) up.
    <dl className="grid grid-cols-1 divide-y divide-line rounded-2xl border border-line bg-bg-elevated xs:grid-cols-3 xs:divide-x xs:divide-y-0">
      {hero.stats.map(({ value, label }) => (
        <div key={label} className="flex flex-col gap-1.5 px-4 py-4 sm:px-5 sm:py-5">
          <dt className="order-2 text-xs leading-snug text-muted sm:text-[0.8125rem]">{label}</dt>
          <dd className="order-1 text-3xl font-semibold tracking-[-0.04em] text-fg sm:text-4xl">
            <CountUp value={value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
