import { useState } from 'react';
import { useInitialHashScroll } from '../../hooks/useInitialHashScroll';
import { useTheme } from '../../hooks/useTheme';
import { BRAND_GRADIENT } from '../../utils/brand';
import ClickSpark from '../reactbits/ClickSpark';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { SkipLink } from './SkipLink';

/**
 * Page shell: skip link, fixed navbar, main content and footer.
 * While the mobile menu is open, everything except the header is `inert`
 * so keyboard and screen-reader focus cannot leak behind the menu.
 * React Bits ClickSpark adds a small burst of brand-coloured sparks on clicks
 * in the page content (a brief static flash for reduced motion).
 */
export function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme } = useTheme();
  useInitialHashScroll();

  return (
    <>
      {/* Also inert while the menu is open: it points at <main>, which is unreachable then. */}
      <SkipLink inert={menuOpen} />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <ClickSpark sparkColor={BRAND_GRADIENT[theme]} sparkSize={10} sparkRadius={22} sparkCount={9} duration={450}>
        <main id="main" tabIndex={-1} inert={menuOpen} className="outline-none">
          {children}
        </main>
        <div inert={menuOpen}>
          <Footer />
        </div>
      </ClickSpark>
    </>
  );
}
