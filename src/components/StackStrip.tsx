import { site } from '../content';
import { useHighlight } from '../highlight';

/** Hover or focus a stack item to light up matching skills and case-study tags. */
export function StackStrip() {
  const { active, setActive } = useHighlight();
  return (
    <div className="stack" aria-label="Stack. Hover or focus an item to highlight related skills and work.">
      <span className="stack-label">STACK</span>
      <ul>
        {site.stack.map((s) => {
          const on = !!active && active.join() === s.match.join();
          return (
            <li key={s.label}>
              <button
                type="button"
                className={`stack-item ${on ? 'is-on' : ''}`}
                aria-pressed={on}
                onMouseEnter={() => setActive([...s.match])}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive([...s.match])}
                onBlur={() => setActive(null)}
                onClick={() => setActive(on ? null : [...s.match])}
              >
                {s.label.toUpperCase()}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
