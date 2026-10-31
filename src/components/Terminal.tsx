import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { site } from '../content';

type Line = { id: number; kind: 'in' | 'out' | 'err'; content: ReactNode };

const COMMANDS = ['help', 'about', 'work', 'experience', 'skills', 'contact', 'email', 'linkedin', 'x', 'github', 'clear'] as const;

const link = (label: string) => site.contact.links.find((l) => l.label === label)!;

let nextId = 0;

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const b = bodyRef.current;
    if (b) b.scrollTop = b.scrollHeight;
  }, [lines]);

  const print = (kind: Line['kind'], content: ReactNode) =>
    setLines((ls) => [...ls, { id: nextId++, kind, content }]);

  const open = (href: string) => window.open(href, '_blank', 'noopener');

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    print('in', raw);
    if (!cmd) return;
    setHistory((h) => [...h, raw]);
    switch (cmd) {
      case 'help':
        print('out', (
          <span>
            Commands: {COMMANDS.map((c, i) => <span key={c}><b>{c}</b>{i < COMMANDS.length - 1 ? ' · ' : ''}</span>)}
            <br />Tip: ↑/↓ for history, Tab to complete.
          </span>
        ));
        break;
      case 'about':
        print('out', `${site.name}: ${site.hero.spec.map((s) => s.value).join(' · ')}.`);
        print('out', <a href="#about">↳ jump to #about</a>);
        break;
      case 'work':
        print('out', site.work.cases.map((c) => `${c.id}  ${c.title}`).join('\n'));
        print('out', <a href="#work">↳ jump to #work</a>);
        break;
      case 'experience':
        print('out', site.experience.roles.map((r) => `${r.when.padEnd(20)} ${r.role} · ${r.org}`).join('\n'));
        print('out', <a href="#experience">↳ jump to #experience</a>);
        break;
      case 'skills':
        print('out', site.skills.groups.map((g) => `${g.name}: ${g.items.join(', ')}`).join('\n'));
        print('out', <a href="#skills">↳ jump to #skills</a>);
        break;
      case 'contact':
        print('out', (
          <span>
            email <a href={`mailto:${site.email}`}>{site.email}</a>
            {site.contact.links.map((l) => (
              <span key={l.label}><br />{l.label.toLowerCase().padEnd(8, ' ')} <a href={l.href} target="_blank" rel="noopener">{l.display}</a></span>
            ))}
          </span>
        ));
        break;
      case 'email':
      case 'mail':
        navigator.clipboard?.writeText(site.email).then(
          () => print('out', <span>Copied <b>{site.email}</b> to clipboard. <a href={`mailto:${site.email}`}>Open mail app →</a></span>),
          () => print('out', <span><a href={`mailto:${site.email}`}>{site.email}</a></span>),
        ) ?? print('out', <a href={`mailto:${site.email}`}>{site.email}</a>);
        break;
      case 'linkedin':
      case 'x':
      case 'github': {
        const l = link(cmd === 'linkedin' ? 'LinkedIn' : cmd === 'x' ? 'X' : 'GitHub');
        print('out', <span>Opening <a href={l.href} target="_blank" rel="noopener">{l.display}</a> …</span>);
        open(l.href);
        break;
      }
      case 'clear':
        setLines([]);
        break;
      case 'sudo hire daksh':
        print('out', 'Permission granted. Run `email` to start the process.');
        break;
      default:
        print('err', `command not found: ${cmd}. Type "help".`);
    }
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(value);
      setValue('');
      setHIndex(null);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const i = hIndex === null ? history.length - 1 : Math.max(0, hIndex - 1);
      setHIndex(i);
      setValue(history[i]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (hIndex === null) return;
      const i = hIndex + 1;
      if (i >= history.length) {
        setHIndex(null);
        setValue('');
      } else {
        setHIndex(i);
        setValue(history[i]);
      }
    } else if (e.key === 'Tab') {
      const v = value.trim().toLowerCase();
      if (!v) return;
      const hits = COMMANDS.filter((c) => c.startsWith(v));
      if (hits.length) e.preventDefault();
      if (hits.length === 1) setValue(hits[0]);
      else if (hits.length > 1) print('out', hits.join('  '));
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <div className="terminal" onClick={() => inputRef.current?.focus()}>
      <div className="term-bar">
        <span className="dots" aria-hidden="true"><i /><i /><i /></span>
        <span>~/contact</span>
        <span className="term-hint">type <b>help</b></span>
      </div>
      <div className="term-body" ref={bodyRef}>
        <a className="term-mail" href={`mailto:${site.email}`}>
          <span className="prompt" aria-hidden="true">$ mail </span>
          <span className="addr">{site.email}</span>
        </a>
        <ul className="term-links">
          {site.contact.links.map((l) => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="me noopener">
                <span className="prompt" aria-hidden="true">$ open</span> {l.display} <span className="comment"># {l.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="term-log" role="log" aria-live="polite" aria-label="Terminal output">
          {lines.map((l) => (
            <div key={l.id} className={`term-line term-${l.kind}`}>
              {l.kind === 'in' ? <><span className="prompt">$ </span>{l.content}</> : l.content}
            </div>
          ))}
        </div>
        <label className="term-input">
          <span className="prompt" aria-hidden="true">$</span>
          <span className="sr-only">Terminal command. Type help for a list.</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKey}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            enterKeyHint="send"
            placeholder="help"
            aria-describedby="term-help"
          />
          <span className="cursor" aria-hidden="true" />
        </label>
        <span id="term-help" className="sr-only">Commands: {COMMANDS.join(', ')}. Up and down arrows for history, Tab to complete.</span>
      </div>
    </div>
  );
}
