import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { useMagnetic } from '../hooks/motion';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode };

export function MagneticLink({ children, className, ...rest }: Props) {
  const ref = useMagnetic<HTMLAnchorElement>();
  return (
    <a ref={ref} className={`magnetic ${className ?? ''}`} {...rest}>
      {children}
    </a>
  );
}
