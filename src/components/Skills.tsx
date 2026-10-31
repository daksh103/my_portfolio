import { skillGroups } from '../content/siteContent';
import { useScrollReveal } from '../hooks/useScrollReveal';

function SectionLabel({ num, title }: { num: string; title: string }) {
  return (
    <div className="section-label">
      <p className="section-label__num">{num}</p>
      <p className="section-label__title">{title}</p>
    </div>
  );
}

export function Skills() {
  const revealRef = useScrollReveal();

  return (
    <section id="skills" className="section-anchor section-pad" aria-labelledby="skills-heading">
      <hr className="rule" />
      <div className="section-inner">
        <div className="section-grid" ref={revealRef}>
          <SectionLabel num="(03)" title="SKILLS" />
          <div>
            <h2 id="skills-heading" className="display-serif display-serif--lg">
              What I work with
            </h2>
            <div className="skills-grid" style={{ marginTop: '2.5rem' }}>
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="skill-group__title">{group.title}</h3>
                  <hr className="rule" />
                  <ul className="skill-group__list">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
