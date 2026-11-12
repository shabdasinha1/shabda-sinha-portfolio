import { useCallback, useEffect, useRef } from 'react';
import { navItems } from '../../data/navigation';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useScrolled } from '../../hooks/useScrolled';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { Container } from '../common/Container';
import { Logo } from '../common/Logo';
import { ResumeButton } from '../common/ResumeButton';
import { ScrollProgress } from '../common/ScrollProgress';
import { ThemeToggle } from '../common/ThemeToggle';
import { MenuButton } from './MenuButton';
import { MobileMenu } from './MobileMenu';
import { NavLinks } from './NavLinks';
import { cn } from '../../utils/cn';

const MOBILE_MENU_ID = 'mobile-menu';
const SECTION_IDS = navItems.map((item) => item.id);

/**
 * Apple-style global navigation: a full-width bar that turns into frosted glass
 * once the page scrolls, with a thin progress line along its top edge.
 */
export function Navbar({ menuOpen, setMenuOpen }) {
  const scrolled = useScrolled();
  const activeId = useActiveSection(SECTION_IDS);
  const menuButtonRef = useRef(null);

  useLockBodyScroll(menuOpen);

  const closeMenu = useCallback(
    ({ restoreFocus = false } = {}) => {
      setMenuOpen(false);
      if (restoreFocus) menuButtonRef.current?.querySelector('button')?.focus();
    },
    [setMenuOpen],
  );

  // Close the mobile menu if the viewport grows to desktop size.
  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const onChange = (e) => e.matches && setMenuOpen(false);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [setMenuOpen]);

  const elevated = scrolled || menuOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'relative border-b transition-[background-color,border-color,backdrop-filter] duration-(--duration-base) ease-smooth',
          elevated
            ? 'border-line bg-[var(--nav-bg)] backdrop-blur-2xl backdrop-saturate-[1.8]'
            : 'border-transparent bg-transparent',
        )}
      >
        <ScrollProgress />
        <Container className="flex h-14 items-center justify-between gap-3">
          <Logo onClick={() => closeMenu()} />

          <nav aria-label="Primary" className="hidden md:block">
            <NavLinks activeId={activeId} />
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <ResumeButton />
            <span ref={menuButtonRef} className="md:hidden">
              <MenuButton
                open={menuOpen}
                controls={MOBILE_MENU_ID}
                onClick={() => setMenuOpen((open) => !open)}
              />
            </span>
          </div>
        </Container>
      </div>

      <Container>
        <MobileMenu id={MOBILE_MENU_ID} open={menuOpen} activeId={activeId} onClose={closeMenu} />
      </Container>
    </header>
  );
}
