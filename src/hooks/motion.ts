import { useEffect, useRef, useState } from 'react';

const query = (q: string) => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(q) : null);

function useMedia(q: string, fallback = false) {
  const [match, setMatch] = useState(() => query(q)?.matches ?? fallback);
  useEffect(() => {
    const m = query(q);
    if (!m) return;
    const on = () => setMatch(m.matches);
    on();
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, [q]);
  return match;
}

/** True when the visitor asked the OS to reduce motion. Every effect checks this. */
export const useReducedMotion = () => useMedia('(prefers-reduced-motion: reduce)');
/** True for a mouse or trackpad. Cursor effects only run when this is true. */
export const useFinePointer = () => useMedia('(hover: hover) and (pointer: fine)');

/** Adds `is-in` once the element scrolls into view. */
export function useInView<T extends Element>(options: IntersectionObserverInit = { rootMargin: '0px 0px -12% 0px' }) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    }, options);
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, inView] as const;
}

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/_[]<>#$%';

/** Scrambles `text` into place when `run` becomes true. Returns the final text instantly under reduced motion. */
export function useScramble(text: string, run: boolean, duration = 700) {
  const reduced = useReducedMotion();
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (!run || reduced) {
      setOut(text);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const settled = Math.floor(p * text.length);
      let s = '';
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        s += i < settled || ch === ' ' ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      setOut(s);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, run, reduced, duration]);
  return out;
}

/** Pulls an element slightly toward the cursor. No-op on touch or reduced motion. */
export function useMagnetic<T extends HTMLElement>(strength = 0.25) {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || !fine) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const leave = () => {
      el.style.transform = '';
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      el.style.transform = '';
    };
  }, [reduced, fine, strength]);
  return ref;
}
