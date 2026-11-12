/** Employer summary with the headline numbers from the resume. */
export function CompanyCard({ company, metrics }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-surface shadow-card">
      <div className="flex items-start gap-4 p-6">
        <span
          aria-hidden="true"
          className="grid size-11 shrink-0 place-items-center rounded-xl bg-inverse font-serif text-xl text-inverse-fg italic"
        >
          R
        </span>
        <div>
          <p className="font-semibold tracking-tight text-fg">{company.name}</p>
          <p className="mt-0.5 font-mono text-xs text-subtle">{company.period}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{company.summary}</p>
        </div>
      </div>

      <dl className="grid grid-cols-3 divide-x divide-line border-t border-line bg-bg-elevated">
        {metrics.map(({ value, label }) => (
          <div key={label} className="flex flex-col gap-1 px-4 py-5 sm:px-5">
            <dt className="order-2 text-xs leading-snug text-muted">{label}</dt>
            <dd className="order-1 text-2xl font-semibold tracking-[-0.03em] text-fg sm:text-3xl">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
