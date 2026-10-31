import { site } from '../content/siteContent';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { scrollToSection } from '../utils/scrollToSection';

export function Hero() {
  const revealRef = useScrollReveal();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="eyebrow">
        <span className="eyebrow__left">{site.role}</span>
        <span className="eyebrow__right">{site.portfolioLabel}</span>
      </div>

      <h1 id="hero-heading" className="hero__headline">
        {site.headline.before}
        <em>{site.headline.accent}</em>
        {site.headline.after}
      </h1>

      <div className="hero__row" ref={revealRef}>
        <img
          className="hero__photo"
          src="/headshot.jpg"
          alt="Portrait of Daksh Arora"
          width={300}
          height={312}
          loading="eager"
          decoding="async"
        />

        <div className="hero__details">
          <hr className="rule" />
          <div className="hero__details-row">
            <p className="body-lg" style={{ margin: 0, maxWidth: '34rem' }}>
              {site.bio}
            </p>
            <div className="hero__meta">
              <div className="hero__actions">
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => scrollToSection('work', reducedMotion)}
                >
                  See selected work →
                </button>
                <a className="btn btn--ghost" href={`mailto:${site.email}`}>
                  Email me
                </a>
              </div>
              <ul className="hero__facts">
                {site.facts.map((fact, i) => (
                  <li key={fact} className="hero__fact">
                    <span className="hero__fact-num">{String(i + 1).padStart(2, '0')}</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
