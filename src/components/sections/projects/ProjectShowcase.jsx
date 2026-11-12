import { Check } from 'lucide-react';
import { Reveal } from '../../common/Reveal';
import { TechList } from '../../common/TechList';
import { useFinePointer } from '../../../hooks/useFinePointer';
import { cn } from '../../../utils/cn';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { ProjectLinks } from './ProjectLinks';

/**
 * A full-width project showcase: the story on one side, a system diagram
 * on the other. `reversed` alternates the layout on large screens.
 */
/**
 * Moves the card's soft highlight to the pointer by updating two CSS variables
 * directly on the element: no React state, so no re-renders while hovering.
 */
function trackPointer(event) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  card.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
  card.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
}

export function ProjectShowcase({ project, number, reversed }) {
  const titleId = `project-${project.id}`;
  const finePointer = useFinePointer();

  return (
    <Reveal
      as="article"
      aria-labelledby={titleId}
      onPointerMove={finePointer ? trackPointer : undefined}
      className="group relative isolate overflow-hidden rounded-[2rem] border border-line bg-surface shadow-card transition-[border-color,box-shadow] duration-(--duration-base) ease-smooth hover:border-line-strong hover:shadow-float"
    >
      {finePointer && <span aria-hidden="true" className="card-spotlight" />}
      <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
        <div className={cn('p-6 sm:p-10', reversed && 'lg:order-2')}>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-accent">{String(number).padStart(2, '0')}</span>
            <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
            <span className="eyebrow">{project.category}</span>
          </div>

          <h3 id={titleId} className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-fg sm:text-[2rem]">
            {project.name}
          </h3>

          <div className="mt-6 space-y-4">
            <div>
              <p className="text-xs font-semibold tracking-wide text-subtle uppercase">The problem</p>
              <p className="mt-1.5 leading-relaxed text-fg/90">{project.problem}</p>
            </div>
            <p className="leading-relaxed text-muted">{project.description}</p>
          </div>

          <div className="mt-7">
            <p className="text-xs font-semibold tracking-wide text-subtle uppercase">My contributions</p>
            <ul className="mt-3 space-y-2.5">
              {project.contributions.map((item) => (
                <li key={item.slice(0, 32)} className="flex gap-3 leading-relaxed text-muted">
                  <Check className="mt-1 size-4 shrink-0 text-success" strokeWidth={2} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-7 rounded-xl border-l-2 border-accent bg-accent-soft px-4 py-3 text-[0.9375rem] leading-relaxed text-fg">
            <span className="font-semibold">{project.highlight.label}: </span>
            {project.highlight.text}
          </p>

          <TechList items={project.stack} label={`${project.name} technologies`} className="mt-7" />
          <ProjectLinks links={project.links} projectName={project.name} />
        </div>

        <div
          className={cn(
            // Slightly translucent so the hover highlight glows through the diagram panel.
            'border-t border-line bg-bg-elevated/60 lg:border-t-0',
            reversed ? 'lg:order-1 lg:border-r' : 'lg:border-l',
          )}
        >
          <ArchitectureDiagram architecture={project.architecture} projectName={project.name} />
        </div>
      </div>
    </Reveal>
  );
}
