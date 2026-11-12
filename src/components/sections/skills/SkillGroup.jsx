import { Icon } from '../../icons/Icon';
import { TechList } from '../../common/TechList';

/** One cell of the skills grid. No proficiency levels: the resume states none. */
export function SkillGroup({ id, icon, title, summary, items }) {
  return (
    <div className="group flex h-full flex-col p-6 transition-colors duration-(--duration-base) hover:bg-bg-elevated sm:p-8">
      <div className="flex items-center justify-between">
        <span className="inline-flex size-10 items-center justify-center rounded-xl border border-line bg-bg-elevated text-muted transition-colors duration-(--duration-base) group-hover:border-accent/40 group-hover:text-accent">
          <Icon name={icon} className="size-[18px]" />
        </span>
        <span className="font-mono text-xs text-subtle">{items.length} items</span>
      </div>
      <h3 id={`skills-${id}`} className="mt-6 text-lg font-semibold tracking-tight text-fg">
        {title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{summary}</p>
      <TechList items={items} label={`${title} skills`} variant="pill" className="mt-6" />
    </div>
  );
}
