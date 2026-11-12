import { Icon } from '../../icons/Icon';
import { cn } from '../../../utils/cn';

/**
 * One block in the diagram. On card hover the blocks lift in a quick cascade;
 * `--i` sets each block's place in that cascade.
 */
function Node({ icon, label, index }) {
  return (
    <li
      style={{ '--i': index }}
      className={cn(
        'flex items-center gap-2.5 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm font-medium text-fg shadow-soft',
        'transition-[translate,border-color] delay-[calc(var(--i)*40ms)] duration-(--duration-base) ease-smooth',
        'group-hover:-translate-y-0.5 group-hover:border-line-strong',
      )}
    >
      <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-surface-muted text-muted">
        <Icon name={icon} className="size-[15px]" />
      </span>
      {label}
    </li>
  );
}

/** Vertical connector between tiers; brightens to the accent colour on hover. */
function Connector() {
  return (
    <div aria-hidden="true" className="flex justify-center py-1.5">
      <span className="relative h-7 w-px bg-line-strong">
        {/* Gradients can't transition, so an accent layer fades in over the base line. */}
        <span className="absolute inset-0 bg-gradient-to-b from-transparent to-accent opacity-50 transition-opacity duration-(--duration-base) ease-smooth group-hover:opacity-100" />
      </span>
    </div>
  );
}

function TierLabel({ children }) {
  return <p className="mb-2.5 text-center font-mono text-[0.72rem] tracking-[0.12em] text-subtle uppercase">{children}</p>;
}

/**
 * Code-drawn overview built only from the technologies listed for the project
 * on the resume (clients → API → services). It is a simplification, not a
 * documented architecture, and is labelled as such. Used instead of
 * screenshots, which are not available.
 */
export function ArchitectureDiagram({ architecture, projectName }) {
  const { clients, core, services } = architecture;

  return (
    <figure
      aria-labelledby={`diagram-${projectName.replace(/\W+/g, '-').toLowerCase()}`}
      className="bg-grid relative flex h-full flex-col justify-center px-6 py-10 sm:px-10"
    >
      <div className="mx-auto w-full max-w-sm">
        <TierLabel>Clients</TierLabel>
        <ul className="flex flex-wrap justify-center gap-2.5">
          {clients.map((node, i) => (
            <Node key={node.label} index={i} {...node} />
          ))}
        </ul>

        <Connector />

        <div className="mx-auto max-w-[15rem] rounded-2xl border border-accent/40 bg-surface p-4 text-center shadow-card transition-[border-color,box-shadow] duration-(--duration-base) ease-smooth group-hover:border-accent/70 group-hover:shadow-float">
          <p className="font-semibold tracking-tight text-fg">{core.label}</p>
          <p className="mt-0.5 font-mono text-xs text-muted">{core.detail}</p>
        </div>

        <Connector />

        <TierLabel>Data & services</TierLabel>
        <ul className="flex flex-wrap justify-center gap-2.5">
          {services.map((node, i) => (
            <Node key={node.label} index={clients.length + 1 + i} {...node} />
          ))}
        </ul>
      </div>

      <figcaption
        id={`diagram-${projectName.replace(/\W+/g, '-').toLowerCase()}`}
        className="mt-8 text-center text-xs text-subtle"
      >
        <span className="sr-only">{projectName}: </span>
        Simplified overview based on the listed technology stack.
      </figcaption>
    </figure>
  );
}
