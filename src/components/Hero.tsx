import { useEffect, useRef } from 'react';
import { site } from '../content';
import { useFinePointer, useReducedMotion, useScramble } from '../hooks/motion';
import { MagneticLink } from './Magnetic';
import { Scramble } from './Scramble';

function Headline() {
  const { headline, accent } = site.hero;
  const [before, after] = headline.split(accent);
  const word = useScramble(accent, true, 1100);
  return (
    <h1 id="hero-h" className="reveal-up">
      {before}
      <span className="acc acc-word">
        <span className="ghost">{accent}</span>
        <span className="live" aria-hidden="true">{word}</span>
      </span>
      {after}
    </h1>
  );
}

function Portrait() {
  const { photo } = site.hero;
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !fine || reduced) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--rx', `${(-py * 6).toFixed(2)}deg`);
      el.style.setProperty('--ry', `${(px * 8).toFixed(2)}deg`);
      el.style.setProperty('--px', `${(px * -10).toFixed(1)}px`);
      el.style.setProperty('--py', `${(py * -10).toFixed(1)}px`);
    };
    const reset = () => {
      ['--rx', '--ry', '--px', '--py'].forEach((p) => el.style.removeProperty(p));
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', reset);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', reset);
    };
  }, [fine, reduced]);

  return (
    <figure className="portrait">
      <div className="frame" ref={ref}>
        <div className="frame-inner">
          <picture>
            <source srcSet={photo.webp} type="image/webp" />
            <img
              src={photo.jpg}
              width={photo.width}
              height={photo.height}
              alt={photo.alt}
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <span className="scanline" aria-hidden="true" />
        </div>
        <span className="tick tl" aria-hidden="true" />
        <span className="tick tr" aria-hidden="true" />
        <span className="tick bl" aria-hidden="true" />
        <span className="tick br" aria-hidden="true" />
      </div>
      <figcaption className="caption">
        <Scramble text="FIG. 01 — PORTRAIT" />
        <Scramble text={site.name.toUpperCase()} />
      </figcaption>
    </figure>
  );
}

export function Hero() {
  const h = site.hero;
  return (
    <section className="hero-main" aria-labelledby="hero-h">
      <div className="hero-copy">
        <span className="gridline" style={{ ['--x' as string]: '210px', ['--d' as string]: '0ms' }} aria-hidden="true" />
        <span className="gridline" style={{ ['--x' as string]: '420px', ['--d' as string]: '120ms' }} aria-hidden="true" />
        <span className="gridline" style={{ ['--x' as string]: '630px', ['--d' as string]: '240ms' }} aria-hidden="true" />
        <p className="status">
          <span className="live-dot" aria-hidden="true" />
          <Scramble text={h.status.toUpperCase()} />
        </p>
        <Headline />
        <p className="lede reveal-up" style={{ ['--d' as string]: '120ms' }}>
          {h.lede}
        </p>
        <div className="actions reveal-up" style={{ ['--d' as string]: '220ms' }}>
          <MagneticLink className="btn btn-primary" href="#work">
            {h.primaryCta} <span aria-hidden="true">→</span>
          </MagneticLink>
          <MagneticLink className="btn btn-ghost" href={`mailto:${site.email}`}>
            {h.secondaryCta}
          </MagneticLink>
        </div>
      </div>
      <aside className="hero-spec" aria-label="Quick facts">
        <Portrait />
        <dl className="spec">
          {h.spec.map((s) => (
            <div key={s.key}>
              <dt>{s.key}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      </aside>
    </section>
  );
}
