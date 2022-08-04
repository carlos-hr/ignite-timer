import { createContext, ReactNode, useReducer, useState } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import {
  ActionTypes,
  finishCycleAction,
  interruptCycleAction,
  startNewCycleAction,
} from "../reducers/cycles/actions";

interface CreateCycleData {
  task: string;
  duration: number;
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
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  });

  const { cycles, activeCycleId } = cyclesState;

  const [secondsActive, setSecondsActive] = useState(0);
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function setSeconds(seconds: number) {
    setSecondsActive(seconds);
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      duration: data.duration,
      startDate: new Date(),
    };
    dispatch(startNewCycleAction(newCycle));
    setSecondsActive(0);
  }

  function interruptCycle() {
    dispatch(interruptCycleAction());
  }

  function finishCycle() {
    dispatch(finishCycleAction());
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
