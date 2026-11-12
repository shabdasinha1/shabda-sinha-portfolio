import { useEffect, useState } from 'react';

/**
 * Scroll-spy: returns the id of the section currently in the "reading band"
 * across the upper-middle of the viewport. IntersectionObserver keeps this off
 * the scroll handler, so it costs nothing while scrolling.
 */
export function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(null);
  const key = ids.join('|');

  useEffect(() => {
    const elements = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!elements.length) return undefined;

    const visible = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.target);
          else visible.delete(entry.target.id);
        });
        const topMost = [...visible.values()].sort(
          (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top,
        )[0];
        setActiveId(topMost ? topMost.id : null);
      },
      { rootMargin: '-35% 0px -55% 0px' },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  return activeId;
}
