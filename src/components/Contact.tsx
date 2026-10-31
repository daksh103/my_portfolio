import { site } from '../content/siteContent';
import { useScrollReveal } from '../hooks/useScrollReveal';

function SectionLabel({ num, title }: { num: string; title: string }) {
  return (
    <div className="section-label">
      <p className="section-label__num">{num}</p>
      <p className="section-label__title">{title}</p>
    </div>
  );
}

export function Contact() {
  const revealRef = useScrollReveal();
  const { linkedin, x } = site.links;

  return (
    <section id="contact" className="section-anchor section-pad" aria-labelledby="contact-heading">
      <hr className="rule" />
      <div className="section-inner" style={{ paddingTop: '8.75rem' }}>
        <div className="section-grid" ref={revealRef}>
          <SectionLabel num="(05)" title="CONTACT" />
          <div>
            <h2 id="contact-heading" className="display-serif display-serif--contact">
              Let’s talk <em>product.</em>
            </h2>
            <p className="body-lg" style={{ margin: '1.25rem 0 0', maxWidth: '36rem' }}>
              The fastest way to reach me is email. I’m also on LinkedIn and X.
            </p>

            <div className="contact__email-row" style={{ marginTop: '1.5rem' }}>
              <a className="contact__email link-hover" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              <span className="contact__arrow" aria-hidden>
                ↗
              </span>
            </div>

            <div className="contact-links" style={{ marginTop: '2.5rem' }}>
              {[linkedin, x].map((link) => (
                <div key={link.label}>
                  <hr className="rule" />
                  <p className="contact-link__label">{link.label}</p>
                  <a
                    className="contact-link__url"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.display} ↗
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
