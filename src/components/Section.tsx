import type { ReactNode } from 'react';
import { useInView } from '../hooks/motion';
import { Scramble } from './Scramble';

type Props = {
  id: string;
  num: string;
  keyLabel: string;
  title?: ReactNode;
  titleId: string;
  sub?: string;
  children: ReactNode;
  className?: string;
};

/** Section shell: [NN] KEY bar with counter, crosshairs on the rails, optional title block. */
export function Section({ id, num, keyLabel, title, titleId, sub, children, className }: Props) {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <section id={id} ref={ref} className={`section ${inView ? 'is-in' : ''} ${className ?? ''}`} aria-labelledby={titleId}>
      <span className="plus plus-l" aria-hidden="true">+</span>
      <span className="plus plus-r" aria-hidden="true">+</span>
      <div className="sec-bar">
        <Scramble className="sec-key" text={`[${num}] ${keyLabel}`} />
        <span className="sec-count">SECTION {num} / 05</span>
        <span className="sec-draw" aria-hidden="true" />
      </div>
      {title && (
        <div className="sec-title">
          <h2 id={titleId} className="reveal-up">
            {title}
          </h2>
          {sub && <p className="sec-sub reveal-up" style={{ ['--d' as string]: '80ms' }}>{sub}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
