import { GlowCard } from '../../common/GlowCard';
import { Icon } from '../../icons/Icon';

/** One focus area as a glowing tile: icon, title and a short description. */
export function FocusArea({ icon, title, text }) {
  return (
    <GlowCard className="group">
      <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-accent-soft text-accent transition-transform duration-(--duration-base) ease-smooth group-hover:scale-110">
        <Icon name={icon} className="size-5" />
      </span>
      <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em] text-fg">{title}</h3>
      <p className="mt-2 leading-relaxed text-muted">{text}</p>
    </GlowCard>
  );
}
