import { ArrowUpRight } from 'lucide-react';
import { SocialIcon } from '../../icons/SocialIcon';

/** Large profile link row used inside the inverse contact panel. */
export function ContactLink({ label, handle, href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 rounded-2xl border border-current/15 px-5 py-4 transition-colors hover:border-current/35 hover:bg-current/5"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-current/10">
        <SocialIcon name={icon} className="size-[18px]" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-medium">{label}</span>
        {/* Wraps instead of truncating, so the full handle stays readable on narrow phones. */}
        <span className="block text-sm [overflow-wrap:anywhere] opacity-60">{handle}</span>
      </span>
      <ArrowUpRight
        className="size-5 shrink-0 opacity-50 transition-[translate,opacity] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
        strokeWidth={1.75}
        aria-hidden="true"
      />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
