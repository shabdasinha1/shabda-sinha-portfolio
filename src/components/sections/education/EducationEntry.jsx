import { GraduationCap } from 'lucide-react';

/** A single qualification: degree story on the left, grade on the right. */
export function EducationEntry({ entry }) {
  const { degree, field, institution, location, period, grade } = entry;

  return (
    <article className="grid overflow-hidden rounded-3xl border border-line bg-surface shadow-card md:grid-cols-[1fr_auto]">
      <div className="flex gap-5 p-6 sm:p-10">
        <span className="hidden size-12 shrink-0 items-center justify-center rounded-2xl border border-line bg-bg-elevated text-accent sm:inline-flex">
          <GraduationCap className="size-5" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <div>
          <p className="font-mono text-xs tracking-wide text-subtle">{period}</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-fg sm:text-3xl">
            {degree}, <span className="font-serif font-normal tracking-normal italic">{field}</span>
          </h3>
          <p className="mt-2 text-muted">
            {institution}, {location}
          </p>
        </div>
      </div>

      {grade && (
        <dl className="flex items-center gap-4 border-t border-line bg-bg-elevated px-6 py-6 sm:px-10 md:flex-col md:items-start md:justify-center md:border-t-0 md:border-l">
          <dt className="eyebrow md:order-2">{grade.label}</dt>
          <dd className="text-4xl font-semibold tracking-[-0.04em] text-fg md:order-1 sm:text-5xl">
            {grade.value}
            <span className="text-xl font-normal text-subtle"> / {grade.scale}</span>
          </dd>
        </dl>
      )}
    </article>
  );
}
