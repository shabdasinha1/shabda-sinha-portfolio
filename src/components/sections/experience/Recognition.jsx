import { Award } from 'lucide-react';
import { RevealGroup, RevealItem } from '../../common/Reveal';

/** Verified achievements from the resume, shown as a three-column band. */
export function Recognition({ items }) {
  return (
    <div className="mt-24 rounded-3xl border border-line bg-surface shadow-soft">
      <div className="flex items-center gap-3 border-b border-line px-6 py-4">
        <Award className="size-4 text-accent" strokeWidth={1.75} aria-hidden="true" />
        <h3 className="eyebrow">Recognition</h3>
      </div>
      <RevealGroup as="ul" className="grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
        {items.map(({ id, text }, i) => (
          <RevealItem as="li" key={id} className="flex gap-4 p-6">
            <span className="font-mono text-xs text-subtle" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="leading-relaxed text-fg/85">{text}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
