import { Icon } from '../../icons/Icon';

/** One focus area: icon, title and a short description under a hairline rule. */
export function FocusArea({ icon, title, text }) {
  return (
    <div className="group relative border-t border-line pt-6">
      {/* Accent rule grows across the top border on hover. */}
      <span
        aria-hidden="true"
        className="absolute -top-px left-0 h-px w-10 bg-accent transition-[width] duration-500 ease-smooth group-hover:w-full"
      />
      <span className="inline-flex size-10 items-center justify-center rounded-xl border border-line bg-surface text-accent shadow-soft">
        <Icon name={icon} className="size-[18px]" />
      </span>
      <h3 className="mt-5 text-lg font-semibold tracking-tight text-fg">{title}</h3>
      <p className="mt-2 leading-relaxed text-muted">{text}</p>
    </div>
  );
}
