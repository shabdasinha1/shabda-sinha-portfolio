import { TechList } from '../../common/TechList';
import { cn } from '../../../utils/cn';

/** One role on the experience timeline. */
export function RoleEntry({ role, isLatest }) {
  return (
    <article aria-labelledby={`role-${role.id}`}>
      {/* Timeline node */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute top-1.5 left-0 grid size-[15px] place-items-center rounded-full border bg-bg-elevated',
          isLatest ? 'border-accent' : 'border-line-strong',
        )}
      >
        <span className={cn('size-[7px] rounded-full', isLatest ? 'bg-accent' : 'bg-line-strong')} />
      </span>

      <p className="font-mono text-xs tracking-wide text-subtle">{role.period}</p>
      <h3 id={`role-${role.id}`} className="mt-2 text-xl font-semibold tracking-tight text-fg sm:text-2xl">
        {role.title}
      </h3>
      <p className="mt-1 text-sm text-muted">{role.subtitle}</p>

      <ul className="mt-6 space-y-3">
        {role.highlights.map((item) => (
          <li key={item.slice(0, 32)} className="relative pl-5 leading-relaxed text-muted">
            <span aria-hidden="true" className="absolute top-[0.7em] left-0 h-px w-2.5 bg-accent" />
            {item}
          </li>
        ))}
      </ul>

      <TechList items={role.stack} label={`Technologies used as ${role.title}`} className="mt-6" />
    </article>
  );
}
