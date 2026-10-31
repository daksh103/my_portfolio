import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export function Footer() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <footer>
      <hr className="rule" />
      <div className="footer">
        <span>© 2026 Daksh Arora</span>
        <button
          type="button"
          className="footer__top"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
          }
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
