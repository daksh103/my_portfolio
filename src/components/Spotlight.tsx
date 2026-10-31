import { useEffect, useRef } from 'react';
import { useFinePointer, useReducedMotion } from '../hooks/motion';

/** Lime spotlight and crosshair that follow the cursor over the grid. Desktop only, off under reduced motion. */
export function Spotlight() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !fine || reduced) return;
    let raf = 0;
    let x = -999;
    let y = -999;
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf)
        raf = requestAnimationFrame(() => {
          el.style.setProperty('--mx', `${x}px`);
          el.style.setProperty('--my', `${y}px`);
          el.classList.add('is-on');
          const r = el.querySelector<HTMLElement>('.cross-readout');
          if (r) r.textContent = `X ${String(Math.round(x)).padStart(4, '0')} · Y ${String(Math.round(y)).padStart(4, '0')}`;
          raf = 0;
        });
    };
    const out = () => el.classList.remove('is-on');
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', out);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', out);
      cancelAnimationFrame(raf);
    };
  }, [fine, reduced]);

  if (!fine || reduced) return null;
  return (
    <div ref={ref} className="spotlight" aria-hidden="true">
      <span className="cross-x" />
      <span className="cross-y" />
      <span className="cross-readout" />
    </div>
  );
}
