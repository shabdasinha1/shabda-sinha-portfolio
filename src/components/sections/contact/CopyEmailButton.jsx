import { Check, Copy } from 'lucide-react';
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard';

/** Copies the email address, with a polite screen-reader announcement. */
export function CopyEmailButton({ email }) {
  const { copied, copy } = useCopyToClipboard();
  const Icon = copied ? Check : Copy;

  return (
    <>
      <button
        type="button"
        onClick={() => copy(email)}
        // The name states the action; it starts with the visible text at every width
        // ("Copy email…") and includes the address (WCAG 2.5.3 Label in Name).
        aria-label={`Copy email address ${email}`}
        className="inline-flex h-12 max-w-full items-center gap-2.5 rounded-full border border-current/20 px-5 text-[0.9375rem] font-medium transition-colors hover:border-current/40 hover:bg-current/5"
      >
        <Icon className="size-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
        {copied ? (
          <span className="font-mono text-sm">Copied!</span>
        ) : (
          <>
            {/* The full address (~260px of unbreakable text) does not fit narrow phones. */}
            <span className="font-mono text-sm max-[359px]:hidden">{email}</span>
            <span className="hidden max-[359px]:inline">Copy email</span>
          </>
        )}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </>
  );
}
