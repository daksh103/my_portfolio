import { useInView, useScramble } from '../hooks/motion';

type Props = { text: string; className?: string; as?: 'span' | 'p' };

/** Mono label that decodes itself when it scrolls into view. Screen readers get the real text. */
export function Scramble({ text, className, as = 'span' }: Props) {
  const [ref, inView] = useInView<HTMLElement>();
  const shown = useScramble(text, inView);
  const Tag = as;
  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      <span aria-hidden="true">{shown}</span>
    </Tag>
  );
}
