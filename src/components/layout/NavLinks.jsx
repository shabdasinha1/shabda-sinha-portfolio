import { useLayoutEffect, useRef } from 'react';
import { navItems } from '../../data/navigation';
import { cn } from '../../utils/cn';

/**
 * Desktop navigation with a pill that slides to the active section.
 *
 * The pill is one absolutely positioned element moved with a CSS transform,
 * measured from the active link. This replaces Motion's layout animation, which
 * needed the much larger layout engine for a single effect.
 */
export function NavLinks({ activeId, className }) {
  const wrapperRef = useRef(null);
  const pillRef = useRef(null);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const pill = pillRef.current;
    if (!wrapper || !pill) return undefined;

    const place = () => {
      const link = activeId ? wrapper.querySelector(`a[href="#${activeId}"]`) : null;
      if (!link) {
        pill.style.opacity = '0';
        pill.dataset.visible = 'false';
        return;
      }
      // When the pill first appears, jump into place instead of sliding from
      // its old position; only the fade is animated.
      const appearing = pill.dataset.visible !== 'true';
      if (appearing) pill.style.transitionProperty = 'opacity';
      pill.style.width = `${link.offsetWidth}px`;
      pill.style.transform = `translateX(${link.offsetLeft}px)`;
      pill.style.opacity = '1';
      pill.dataset.visible = 'true';
      if (appearing) {
        pill.getBoundingClientRect(); // commit the position before restoring transitions
        pill.style.transitionProperty = '';
      }
    };

    place();
    // Re-measure when link widths change (web font swap, viewport resize).
    const observer = new ResizeObserver(place);
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [activeId]);

  return (
    <div ref={wrapperRef} className={cn('relative', className)}>
      <span
        ref={pillRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-9 rounded-full bg-surface-muted opacity-0 transition-[transform,width,opacity] duration-(--duration-base) ease-smooth"
      />
      <ul className="relative flex items-center gap-0.5">
        {navItems.map(({ id, label }) => {
          const isActive = activeId === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? 'location' : undefined}
                className={cn(
                  'inline-flex h-9 items-center rounded-full px-3.5 text-sm font-medium transition-colors',
                  isActive ? 'text-fg' : 'text-muted hover:text-fg',
                )}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
