import { useId, useState } from 'react';
import { isTodo, site, type Case } from '../content';
import { matches, useHighlight } from '../highlight';
import { useInView } from '../hooks/motion';
import { Section } from './Section';

function CaseStudy({ c }: { c: Case }) {
  const [ref, inView] = useInView<HTMLElement>({ rootMargin: '0px 0px -20% 0px' });
  const [step, setStep] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const { active } = useHighlight();
  const related = c.tags.some((t) => matches(t, active));
  const detailId = useId();

  const nodes = [
    { label: 'PROBLEM', body: <><p>{c.problem}</p>{c.problemTodo && <p className="todo">{c.problemTodo}</p>}</> },
    { label: 'WHAT I DID', body: <p>{c.did}</p> },
    {
      label: 'RESULT',
      body: (
        <>
          <p className={`result ${isTodo(c.result) ? 'is-todo' : ''}`}>{c.result}</p>
          {c.resultNote && <p className="todo todo-note">{c.resultNote}</p>}
        </>
      ),
    },
  ];

  return (
    <article
      ref={ref}
      className={`case ${inView ? 'is-in' : ''} ${related ? 'is-related' : ''}`}
      aria-labelledby={`${c.id}-h`}
      onMouseLeave={() => setStep(null)}
    >
      <div className="case-meta">
        <p className="case-id">{c.id}</p>
        <h3 id={`${c.id}-h`}>{c.title}</h3>
        <p className="case-kicker">{c.kicker.toUpperCase()}</p>
        <ul className="chips" aria-label="Tools">
          {c.tags.map((t) => (
            <li key={t} className={matches(t, active) ? 'is-on' : undefined}>{t}</li>
          ))}
        </ul>
        <button
          type="button"
          className="case-toggle"
          aria-expanded={open}
          aria-controls={detailId}
          onClick={() => setOpen((o) => !o)}
        >
          <span aria-hidden="true">{open ? '−' : '+'}</span> {open ? 'HIDE DETAILS' : 'SHOW DETAILS'}
        </button>
      </div>
      <div className="case-flow">
        <ol className="flow" aria-label="Problem, what I did, result">
          {nodes.map((n, i) => (
            <li
              key={n.label}
              className={`node ${i === 2 ? 'node-result' : ''} ${step !== null && step >= i ? 'is-lit' : ''}`}
              style={{ ['--i' as string]: i }}
              onMouseEnter={() => setStep(i)}
              onFocus={() => setStep(i)}
              tabIndex={0}
            >
              <p className="node-label">0{i + 1} / {n.label}</p>
              {n.body}
              {i < 2 && <span className="connector" aria-hidden="true"><span className="connector-line" /><span className="connector-head">→</span></span>}
            </li>
          ))}
        </ol>
        <div id={detailId} className={`case-detail ${open ? 'is-open' : ''}`} hidden={!open}>
          <dl>
            <div><dt>STACK</dt><dd>{c.tags.join(' · ')}</dd></div>
            <div><dt>MY ROLE</dt><dd className="todo">[TODO: solo build or team? Your exact role.]</dd></div>
            <div><dt>LINKS</dt><dd className="todo">[TODO: repo, demo or write-up link]</dd></div>
            <div><dt>NEXT</dt><dd className="todo">[TODO: what you’d improve or measure next]</dd></div>
          </dl>
        </div>
      </div>
    </article>
  );
}

export function Work() {
  const w = site.work;
  return (
    <Section id="work" num="01" keyLabel="SELECTED_WORK" titleId="work-h" title={w.title} sub={w.sub}>
      {w.cases.map((c) => (
        <CaseStudy key={c.id} c={c} />
      ))}
    </Section>
  );
}
