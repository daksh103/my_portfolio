import { site } from '../content';
import { matches, useHighlight } from '../highlight';
import { Section } from './Section';

export function Skills() {
  const s = site.skills;
  const { active } = useHighlight();
  return (
    <Section id="skills" num="03" keyLabel="SKILLS.MATRIX" titleId="skills-h" title={s.title}>
      <div className={`matrix ${active ? 'has-active' : ''}`}>
        {s.groups.map((g, gi) => (
          <div className="group" key={g.name} style={{ ['--i' as string]: gi }}>
            <h3>
              {g.name.toUpperCase()} <span className="count">{String(g.items.length).padStart(2, '0')}</span>
            </h3>
            <ul className="chips">
              {g.items.map((it) => (
                <li key={it} className={matches(it, active) ? 'is-on' : undefined}>{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
