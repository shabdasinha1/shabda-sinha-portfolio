import { ArrowDown } from 'lucide-react';
import { profile } from '../../data/profile';
import { cn } from '../../utils/cn';

/**
 * Compact blue "Resume" pill for the header, in the style of Apple's nav buttons.
 * Downloads the PDF; visible at every screen width. The 32px pill gets a
 * 44px tap area through `touch-target`.
 */
export function ResumeButton({ className }) {
  return (
    <a
      href={profile.resume.href}
      download={profile.resume.fileName}
      aria-label="Resume, download PDF"
      title="Download resume (PDF)"
      className={cn(
        'group/resume touch-target relative inline-flex h-8 items-center gap-1.5 rounded-full bg-accent-button px-3.5',
        'text-[0.8125rem] font-medium text-white shadow-soft',
        'transition-[background-color,translate,scale] hover:-translate-y-px hover:bg-accent-button-hover active:translate-y-0 active:scale-[0.97]',
        className,
      )}
    >
      Resume
      <ArrowDown
        aria-hidden="true"
        strokeWidth={2.25}
        className="size-3.5 transition-transform group-hover/resume:translate-y-0.5"
      />
    </a>
  );
}
