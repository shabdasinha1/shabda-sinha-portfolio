/** Keyboard users can jump past the navigation straight to the content. */
export function SkipLink({ target = 'main', inert = false }) {
  return (
    <a
      href={`#${target}`}
      inert={inert}
      className="fixed top-3 left-3 z-[60] -translate-y-20 rounded-full bg-inverse px-4 py-2 text-sm font-medium text-inverse-fg shadow-float transition-transform focus:translate-y-0"
    >
      Skip to content
    </a>
  );
}
