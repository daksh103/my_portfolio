import { about } from '../content/siteContent';
import { useScrollReveal } from '../hooks/useScrollReveal';

function SectionLabel({ num, title }: { num: string; title: string }) {
  return (
    <div className="section-label">
      <p className="section-label__num">{num}</p>
      <p className="section-label__title">{title}</p>
    </div>
  );
}

export function About() {
  const revealRef = useScrollReveal();

  return (
    <section id="about" className="section-anchor section-pad" aria-labelledby="about-heading">
      <hr className="rule" />
      <div className="section-inner">
        <div className="section-grid" ref={revealRef}>
          <SectionLabel num="(04)" title="ABOUT" />
          <div>
            <h2 id="about-heading" className="display-serif display-serif--lg">
              {about.title.before}
              <em>{about.title.accent}</em>
            </h2>
            <div className="about__cols" style={{ marginTop: '2.5rem' }}>
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="body-lg" style={{ margin: 0 }}>
                  {p}
                </p>
              ))}
            </div>
            <p className="body-sm" style={{ marginTop: '1.5rem' }}>
              {about.footnote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
