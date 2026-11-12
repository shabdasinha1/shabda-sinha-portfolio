import { useState } from 'react';
import { useInitialHashScroll } from '../../hooks/useInitialHashScroll';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { SkipLink } from './SkipLink';

/**
 * Page shell: skip link, fixed navbar, main content and footer.
 * While the mobile menu is open, everything except the header is `inert`
 * so keyboard and screen-reader focus cannot leak behind the menu.
 */
export function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  useInitialHashScroll();

  return (
    <>
      {/* Also inert while the menu is open: it points at <main>, which is unreachable then. */}
      <SkipLink inert={menuOpen} />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main id="main" tabIndex={-1} inert={menuOpen} className="outline-none">
        {children}
      </main>
      <div inert={menuOpen}>
        <Footer />
      </div>
    </>
  );
}
