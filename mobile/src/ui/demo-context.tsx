import { createContext, useContext, useState, type ReactNode } from 'react';
import { createDemoState, markAlertRead, saveSchool, selectChild, type DemoState, type SchoolConfig } from '../domain/demo';

type DemoContextValue = {
  state: DemoState;
  resetRevision: number;
  select: (id: string) => void;
  read: (id: string) => void;
  save: (childId: string, config: SchoolConfig) => void;
  reset: () => void;
};
const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(createDemoState);
  const [resetRevision, setResetRevision] = useState(0);
  return <DemoContext.Provider value={{ state, resetRevision,
    select: id => setState(previous => selectChild(previous, id)),
    read: id => setState(previous => markAlertRead(previous, id)),
    save: (id, config) => {
      const next = saveSchool(state, id, config);
      setState(next);
    },
    reset: () => { setState(createDemoState()); setResetRevision(previous => previous + 1); },
  }}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const value = useContext(DemoContext);
  if (!value) throw new Error('Le contexte de démonstration est indisponible.');
  return value;
}
