import { createContext, ReactNode, useState } from "react";

interface CreateCycleData {
  task: string;
  duration: number;
}

interface Cycle {
  id: string;
  task: string;
  duration: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesContextData {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  secondsActive: number;
  finishCycle: () => void;
  setSeconds: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextData);

interface CyclesContextProviderProps {
  children: ReactNode;
}

export const CyclesContextProvider = ({
  children,
}: CyclesContextProviderProps) => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<null | string>(null);
  const [secondsActive, setSecondsActive] = useState(0);
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function setSeconds(seconds: number) {
    setSecondsActive(seconds);
  }

  function finishCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      duration: data.duration,
      startDate: new Date(),
    };
    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
    setSecondsActive(0);
  }

  function interruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );

    setActiveCycleId(null);
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        finishCycle,
        secondsActive,
        setSeconds,
        createNewCycle,
        interruptCycle,
        cycles,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
};
