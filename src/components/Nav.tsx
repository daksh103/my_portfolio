import { useEffect, useState } from 'react';
import { site } from '../content';

type Props = { onOpenPalette: () => void };

export function Nav({ onOpenPalette }: Props) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string>('');

  useEffect(() => {
    const ids = site.nav.map((n) => n.id);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setCurrent(e.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open]);

  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

  return (
    <header className="nav" id="top">
      <a className="logo" href="#top" aria-label={`${site.name}, back to top`}>
        <span className="logo-mark" aria-hidden="true">DA</span>
        <span className="logo-text">{site.handle}</span>
      </a>
      <nav aria-label="Primary" className="nav-primary">
        <ul id="nav-links" className={`nav-links ${open ? 'is-open' : ''}`}>
          {site.nav.map((n, i) => (
            <li key={n.id} className={n.id === 'contact' ? 'nav-only-menu' : undefined}>
              <a
                href={`#${n.id}`}
                aria-current={current === n.id ? 'location' : undefined}
                onClick={() => setOpen(false)}
              >
                <span className="dim">[0{i + 1}]</span> {n.label.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="nav-right">
        <button type="button" className="kbd-btn" onClick={onOpenPalette} aria-label="Open command palette">
          <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd>
          <kbd>K</kbd>
        </button>
        <a className="btn-contact" href="#contact">
          CONTACT <span aria-hidden="true">→</span>
        </a>
        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'CLOSE' : 'MENU'}
        </button>
      </div>
    </header>
  );
}
