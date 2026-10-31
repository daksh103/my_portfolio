import { isTodo, site } from '../content';
import { Section } from './Section';

export function About() {
  const a = site.about;
  const [before] = a.title.split(a.accent);
  return (
    <Section id="about" num="04" keyLabel="ABOUT" titleId="about-h">
      <div className="about">
        <h2 id="about-h" className="about-title reveal-up">
          {before}
          <span className="acc">{a.accent}</span>
        </h2>
        <div className="about-copy">
          {a.paragraphs.map((p, i) => (
            <p key={i} className={`reveal-up ${isTodo(p) ? 'todo' : ''}`} style={{ ['--d' as string]: `${i * 90}ms` }}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
}
