import { caseStudies } from '../content/siteContent';
import { useScrollReveal } from '../hooks/useScrollReveal';

function SectionLabel({ num, title }: { num: string; title: string }) {
  return (
    <div className="section-label">
      <p className="section-label__num">{num}</p>
      <p className="section-label__title">{title}</p>
    </div>
  );
}

export function Work() {
  const revealRef = useScrollReveal();

  return (
    <section id="work" className="section-anchor section-pad" aria-labelledby="work-heading">
      <hr className="rule" />
      <div className="section-inner">
        <div className="section-grid" ref={revealRef}>
          <SectionLabel num="(01)" title="SELECTED WORK" />
          <div>
            <h2 id="work-heading" className="display-serif display-serif--lg">
              Two things I built, and why
            </h2>
            <p className="work-intro">
              Each one is written as the problem, what I did, and what came of it.
            </p>

            {caseStudies.map((study) => (
              <article key={study.title} className="case">
                <div className="case__meta">
                  <span>{study.meta}</span>
                  <span className="case__meta-right">{study.stack}</span>
                </div>
                <h3 className="case__title">{study.title}</h3>
                <div className="case__cols">
                  <div>
                    <hr className="rule" />
                    <h4 className="case__col-title">Problem</h4>
                    <p className="body-md" style={{ margin: '0.75rem 0 0' }}>
                      {study.problem}
                    </p>
                    {'problemNote' in study && study.problemNote ? (
                      <p className="body-sm" style={{ margin: '0.75rem 0 0' }}>
                        {study.problemNote}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <hr className="rule" />
                    <h4 className="case__col-title">What I did</h4>
                    <p className="body-md" style={{ margin: '0.75rem 0 0' }}>
                      {study.did}
                    </p>
                  </div>
                  <div>
                    <hr className="rule" />
                    <h4 className="case__col-title">Result</h4>
                    <p className="case__result">{study.result}</p>
                    <p className="body-sm" style={{ margin: '0.5rem 0 0' }}>
                      {study.resultNote}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
