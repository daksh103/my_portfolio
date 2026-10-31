import { alsoItems, experience } from '../content/siteContent';
import { useScrollReveal } from '../hooks/useScrollReveal';

function SectionLabel({ num, title }: { num: string; title: string }) {
  return (
    <div className="section-label">
      <p className="section-label__num">{num}</p>
      <p className="section-label__title">{title}</p>
    </div>
  );
}

export function Experience() {
  const revealRef = useScrollReveal();

  return (
    <section
      id="experience"
      className="section-anchor section-pad"
      aria-labelledby="experience-heading"
    >
      <hr className="rule" />
      <div className="section-inner">
        <div className="section-grid" ref={revealRef}>
          <SectionLabel num="(02)" title="EXPERIENCE" />
          <div>
            <h2 id="experience-heading" className="display-serif display-serif--lg">
              Where I’ve worked
            </h2>
            <div className="timeline" style={{ marginTop: '2.5rem' }}>
              {experience.map((role) => (
                <div key={`${role.title}-${role.org}`}>
                  <hr className="rule" />
                  <div className="role">
                    <div className="role__when">
                      {'current' in role && role.current ? (
                        <>
                          <span className="role__when-now">Now</span>
                          <span className="badge-current">CURRENT</span>
                        </>
                      ) : (
                        <span>{role.when}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="role__title">{role.title}</h3>
                      <p className="role__org">{role.org}</p>
                    </div>
                    <ul className="role__notes">
                      {role.bullets.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              <hr className="rule" />
              <div className="role role--also">
                <div className="role__when">Also</div>
                <ul className="role__notes">
                  {alsoItems.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
