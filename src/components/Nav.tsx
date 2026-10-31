import { useCallback, useState } from 'react';
import { navItems, site } from '../content/siteContent';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { scrollToSection } from '../utils/scrollToSection';

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const goTo = useCallback(
    (id: string) => {
      setMenuOpen(false);
      scrollToSection(id, reducedMotion);
    },
    [reducedMotion],
  );

  return (
    <header className="nav">
      <div className="nav__bar section-pad">
        <button
          type="button"
          className="nav__brand"
          onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })}
        >
          {site.name}
        </button>

        <nav className="nav__links" aria-label="Primary">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="nav__link link-hover"
              onClick={() => goTo(item.id)}
            >
              {item.label}
            </button>
          ))}
          <button type="button" className="nav__contact" onClick={() => goTo('contact')}>
            Contact
          </button>
        </nav>

        <button
          type="button"
          className="nav__menu-btn"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`nav__mobile section-pad${menuOpen ? ' nav__mobile--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="nav__mobile-inner">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="nav__mobile-link"
              onClick={() => goTo(item.id)}
            >
              {item.label}
            </button>
          ))}
          <button type="button" className="nav__mobile-link" onClick={() => goTo('contact')}>
            Contact
          </button>
        </div>
      </div>

      <div className="section-pad">
        <hr className="rule" />
      </div>
    </header>
  );
}
