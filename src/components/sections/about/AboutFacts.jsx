/** "At a glance" panel: a definition list of quick facts. */
export function AboutFacts({ facts }) {
  return (
    <div className="rounded-3xl border border-line bg-surface p-2 shadow-card">
      <p className="eyebrow px-5 pt-4 pb-3">At a glance</p>
      <dl className="divide-y divide-line rounded-2xl border border-line bg-bg-elevated">
        {facts.map(({ id, label, value }) => (
          <div key={id} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <dt className="shrink-0 text-sm text-subtle">{label}</dt>
            <dd className="text-[0.9375rem] font-medium text-fg sm:text-right">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
