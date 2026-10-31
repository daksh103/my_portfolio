import { lazy, Suspense } from 'react';
import { site } from '../content';
import { Section } from './Section';

const Terminal = lazy(() => import('./Terminal'));

/** Static fallback that matches the terminal until the interactive one loads. */
function TerminalFallback() {
  return (
    <div className="terminal">
      <div className="term-bar"><span className="dots" aria-hidden="true"><i /><i /><i /></span><span>~/contact</span></div>
      <div className="term-body">
        <a className="term-mail" href={`mailto:${site.email}`}><span className="prompt">$ mail </span>{site.email}</a>
      </div>
    </div>
  );
}

export function Contact() {
  const c = site.contact;
  const [before] = c.title.split(c.accent);
  return (
    <Section id="contact" num="05" keyLabel="CONTACT" titleId="contact-h">
      <div className="contact">
        <h2 id="contact-h" className="contact-title reveal-up">
          {before}
          <span className="acc">{c.accent}</span>
        </h2>
        <p className="contact-sub reveal-up" style={{ ['--d' as string]: '80ms' }}>{c.sub}</p>
        <Suspense fallback={<TerminalFallback />}>
          <Terminal />
        </Suspense>
      </div>
    </Section>
  );
}
