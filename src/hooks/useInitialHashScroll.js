import { useEffect } from 'react';

/**
 * Makes shared links like /#projects land on the right section.
 *
 * The browser tries to jump to #projects while parsing the HTML, before React
 * has rendered any sections, so it finds nothing and stays at the top. Once the
 * app has mounted, this scrolls to the target section (instantly, as a normal
 * anchor jump would). scroll-padding-top keeps it clear of the fixed navbar.
 */
export function useInitialHashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return undefined;
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, []);
}
