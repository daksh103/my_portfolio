import { useState } from 'react';
import { isTodo, site, type Role } from '../content';
import { Section } from './Section';

function Notes({ items }: { items: readonly string[] }) {
  return (
    <ul className="log-notes">
      {items.map((n) => (
        <li key={n} className={isTodo(n) ? 'is-todo' : undefined}>
          {isTodo(n) ? <span className="todo">{n}</span> : n}
        </li>
      ))}
    </ul>
  );
}

const escapeRe = (s: string) => s.replace(/[.*+?^$()|[\]\\{}]/g, '\\$&');
/** Whole-word match, so "C" doesn't match "CRM" and "C++" still works. */
const wordIn = (word: string, text: string) => new RegExp('(^|[^a-z0-9+])' + escapeRe(word) + '($|[^a-z0-9+])').test(text);

/** Skills from the skills matrix that this role's own text mentions. Derived, never invented. */
function toolsFor(r: Role) {
  const text = `${r.role} ${r.notes.join(' ')}`.toLowerCase();
  return site.skills.groups
    .flatMap((g) => g.items)
    .filter((it) =>
      it
        .toLowerCase()
        .split(' / ')
        .some((part) => wordIn(part, text)),
    );
}

function Row({ r, index }: { r: Role; index: number }) {
  const [open, setOpen] = useState(false);
  const id = `log-${index}`;
  const tools = toolsFor(r);
  const expandable = tools.length > 0;
  const head = (
    <>
      <span className="log-when">
        {r.when.toUpperCase()}
        {r.current && (
          <span className="active"><span className="live-dot" aria-hidden="true" />ACTIVE</span>
        )}
      </span>
      <span className="log-role">{r.role}</span>
      <span className="log-org">{r.org}</span>
    </>
  );
  return (
    <li
      className={`log-row ${r.current ? 'is-now' : ''} ${open ? 'is-open' : ''} ${expandable ? 'is-expandable' : ''}`}
      style={{ ['--i' as string]: index }}
      onClick={(e) => {
        if (!expandable || (e.target as HTMLElement).closest('a, button')) return;
        setOpen((o) => !o);
      }}
    >
      <div className="log-cols">
        {head}
        <div className="log-notes-col">
          <Notes items={r.notes} />
          {expandable && (
            <button type="button" className="log-toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
              <span aria-hidden="true">{open ? '−' : '+'}</span> {open ? 'LESS' : 'TOOLS USED'}
            </button>
          )}
        </div>
      </div>
      {expandable && (
        <div id={id} className="log-detail" hidden={!open}>
          <span className="log-detail-k">TOOLS</span>
          <ul className="chips">
            {tools.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>
      )}
    </li>
  );
}

export function Experience() {
  const e = site.experience;
  return (
    <Section id="experience" num="02" keyLabel="EXPERIENCE.LOG" titleId="exp-h" title={e.title}>
      <div className="log">
        <div className="log-head" aria-hidden="true">
          <span>PERIOD</span><span>ROLE</span><span>ORGANISATION</span><span>NOTES</span>
        </div>
        <ol className="log-list" aria-label="Work history">
          {e.roles.map((r, i) => (
            <Row key={r.org} r={r} index={i} />
          ))}
        </ol>
        <div className="log-also">
          <span className="log-when">ALSO</span>
          <Notes items={e.also} />
        </div>
      </div>
    </Section>
  );
}
