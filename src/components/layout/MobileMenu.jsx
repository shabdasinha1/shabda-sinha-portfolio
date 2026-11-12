import { useEffect, useRef } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { navItems } from '../../data/navigation';
import { profile } from '../../data/profile';
import { SocialLinks } from '../common/SocialLinks';
import { EASE_OUT } from '../../utils/motion';
import { cn } from '../../utils/cn';

const panel = {
  hidden: { opacity: 0, y: -12, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: EASE_OUT, staggerChildren: 0.04, delayChildren: 0.06 },
  },
  exit: { opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.2, ease: 'easeIn' } },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE_OUT } },
};

/**
 * Mobile navigation sheet. Rendered inside the header, so while it is open the
 * rest of the page is made `inert` by Layout — keyboard focus stays in the menu.
 */
export function MobileMenu({ id, open, activeId, onClose }) {
  const firstLinkRef = useRef(null);

  // Move focus into the menu when it opens; close on Escape.
  useEffect(() => {
    if (!open) return undefined;
    firstLinkRef.current?.focus({ preventScroll: true });
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose({ restoreFocus: true });
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <m.div
            key="backdrop"
            aria-hidden="true"
            onClick={() => onClose()}
            className="fixed inset-0 -z-10 bg-bg/60 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
          <m.nav
            key="panel"
            id={id}
            aria-label="Mobile"
            variants={panel}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mx-auto mt-2 w-full origin-top overflow-hidden rounded-3xl border border-line bg-bg-elevated/95 p-2 shadow-float backdrop-blur-2xl md:hidden"
          >
            <ul className="flex flex-col">
              {navItems.map(({ id: sectionId, label }, index) => {
                const isActive = activeId === sectionId;
                return (
                  <m.li key={sectionId} variants={item}>
                    <a
                      ref={index === 0 ? firstLinkRef : undefined}
                      href={`#${sectionId}`}
                      onClick={() => onClose()}
                      aria-current={isActive ? 'location' : undefined}
                      className={cn(
                        'flex items-baseline gap-4 rounded-xl px-4 py-3.5 transition-colors',
                        isActive ? 'bg-surface-muted text-fg' : 'text-muted hover:bg-surface-muted hover:text-fg',
                      )}
                    >
                      <span className="font-mono text-xs text-subtle" aria-hidden="true">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-2xl font-semibold tracking-[-0.02em]">{label}</span>
                    </a>
                  </m.li>
                );
              })}
            </ul>

            <m.div
              variants={item}
              className="mt-2 flex items-center justify-between gap-3 border-t border-line px-2 pt-3 pb-1"
            >
              <SocialLinks />
              <p className="pr-2 text-xs text-subtle">{profile.shortLocation}</p>
            </m.div>
          </m.nav>
        </>
      )}
    </AnimatePresence>
  );
}
