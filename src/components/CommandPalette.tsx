import { useEffect, useMemo, useRef, useState } from 'react';
import { site } from '../content';

type Item = { id: string; group: string; label: string; hint?: string; run: () => void | Promise<void> };

type Props = { onClose: () => void };

export default function CommandPalette({ onClose }: Props) {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const [toast, setToast] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const prevFocus = useRef<Element | null>(null);

  const items: Item[] = useMemo(() => {
    const go = (id: string) => () => {
      onClose();
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        el?.querySelector<HTMLElement>('h2, h1')?.setAttribute('tabindex', '-1');
        el?.querySelector<HTMLElement>('h2, h1')?.focus({ preventScroll: true });
      });
    };
    return [
      ...site.nav.map((n, i) => ({ id: `go-${n.id}`, group: 'Go to', label: n.label, hint: `[0${i + 1}]`, run: go(n.id) })),
      {
        id: 'copy-email',
        group: 'Actions',
        label: 'Copy email address',
        hint: site.email,
        run: async () => {
          try {
            await navigator.clipboard.writeText(site.email);
            setToast('Email copied');
            setTimeout(onClose, 700);
          } catch {
            window.location.href = `mailto:${site.email}`;
          }
        },
      },
      { id: 'send-email', group: 'Actions', label: 'Send an email', hint: 'mailto', run: () => { window.location.href = `mailto:${site.email}`; onClose(); } },
      ...site.contact.links.map((l) => ({
        id: `open-${l.label}`,
        group: 'Links',
        label: `Open ${l.label}`,
        hint: l.display,
        run: () => { window.open(l.href, '_blank', 'noopener'); onClose(); },
      })),
    ];
  }, [onClose]);

  const filtered = items.filter((i) => `${i.group} ${i.label} ${i.hint ?? ''}`.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    prevFocus.current = document.activeElement;
    inputRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
      (prevFocus.current as HTMLElement | null)?.focus?.();
    };
  }, []);

  useEffect(() => setSel(0), [q]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSel((s) => Math.min(filtered.length - 1, s + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSel((s) => Math.max(0, s - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      filtered[sel]?.run();
    } else if (e.key === 'Tab') {
      e.preventDefault(); // keep focus inside the dialog
    }
  };

  let lastGroup = '';
  return (
    <div className="palette-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="palette" role="dialog" aria-modal="true" aria-label="Command palette" onKeyDown={onKey}>
        <div className="palette-input">
          <span className="prompt" aria-hidden="true">›</span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Jump to a section or run an action…"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={filtered[sel] ? `pi-${filtered[sel].id}` : undefined}
            aria-autocomplete="list"
          />
          <kbd>ESC</kbd>
        </div>
        <ul id="palette-list" className="palette-list" role="listbox" aria-label="Commands">
          {filtered.length === 0 && <li className="palette-empty">No matches.</li>}
          {filtered.map((it, i) => {
            const header = it.group !== lastGroup ? it.group : null;
            lastGroup = it.group;
            return (
              <li key={it.id} role="presentation">
                {header && <p className="palette-group" aria-hidden="true">{header.toUpperCase()}</p>}
                <div
                  id={`pi-${it.id}`}
                  role="option"
                  aria-selected={i === sel}
                  className={`palette-item ${i === sel ? 'is-sel' : ''}`}
                  onMouseMove={() => setSel(i)}
                  onClick={() => it.run()}
                >
                  <span>{it.label}</span>
                  {it.hint && <span className="palette-hint">{it.hint}</span>}
                </div>
              </li>
            );
          })}
        </ul>
        <div className="palette-foot" aria-live="polite">
          {toast ? <span className="acc">✓ {toast}</span> : <span>↑↓ navigate · ↵ select · esc close</span>}
        </div>
      </div>
    </div>
  );
}
