import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type Ctx = { active: string[] | null; setActive: (m: string[] | null) => void };
const HighlightCtx = createContext<Ctx>({ active: null, setActive: () => {} });

/** Shares the stack item the visitor is hovering so skills and case tags can light up. */
export function HighlightProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<string[] | null>(null);
  const value = useMemo(() => ({ active, setActive }), [active]);
  return <HighlightCtx.Provider value={value}>{children}</HighlightCtx.Provider>;
}

export const useHighlight = () => useContext(HighlightCtx);

export const matches = (label: string, active: string[] | null) =>
  !!active && active.some((m) => label.toLowerCase().includes(m));
