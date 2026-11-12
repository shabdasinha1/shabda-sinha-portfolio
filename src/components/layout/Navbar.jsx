import { useCallback, useEffect, useRef } from 'react';
import { Download } from 'lucide-react';
import { navItems } from '../../data/navigation';
import { profile } from '../../data/profile';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useScrolled } from '../../hooks/useScrolled';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { Button } from '../common/Button';
import { Container } from '../common/Container';
import { Logo } from '../common/Logo';
import { ThemeToggle } from '../common/ThemeToggle';
import { MenuButton } from './MenuButton';
import { MobileMenu } from './MobileMenu';
import { NavLinks } from './NavLinks';
import { cn } from '../../utils/cn';

const MOBILE_MENU_ID = 'mobile-menu';
const SECTION_IDS = navItems.map((item) => item.id);

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
      <Container className="pt-3 sm:pt-4">
        <div
          className={cn(
            'flex h-14 items-center justify-between gap-4 rounded-full border pr-2 pl-4 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-(--duration-base) ease-smooth',
            elevated
              ? 'border-line bg-[var(--nav-bg)] shadow-card backdrop-blur-xl backdrop-saturate-150'
              : 'border-transparent bg-transparent',
          )}
        >
          <Logo onClick={() => closeMenu()} />

          <nav aria-label="Primary" className="hidden md:block">
            <NavLinks activeId={activeId} />
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <span className="hidden lg:contents">
              <Button
                href={profile.resume.href}
                download={profile.resume.fileName}
                size="sm"
                icon={Download}
              >
                Résumé
              </Button>
            </span>
            <span ref={menuButtonRef} className="md:hidden">
              <MenuButton
                open={menuOpen}
                controls={MOBILE_MENU_ID}
                onClick={() => setMenuOpen((open) => !open)}
              />
            </span>
          </div>
        </div>

        <MobileMenu id={MOBILE_MENU_ID} open={menuOpen} activeId={activeId} onClose={closeMenu} />
      </Container>
    </header>
  );
}
