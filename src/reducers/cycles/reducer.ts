import produce from "immer";
import { ActionTypes } from "./actions";

export interface Cycle {
  id: string;
  task: string;
  duration: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export function cyclesReducer(state: CyclesState, action: any) {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.START_NEW_CYCLE: {
        draft.cycles.push(action.payload.newCycle);
        draft.activeCycleId = action.payload.newCycle.id;
        break;
      }
      case ActionTypes.STOP_CURRENT_CYCLE: {
        const currentCycleIndex = state.cycles.findIndex(
          (cycle) => cycle.id === state.activeCycleId
        );

        if (currentCycleIndex < 0) {
          return state;
        }
        draft.cycles[currentCycleIndex].interruptedDate = new Date();
        draft.activeCycleId = null;
        break;
      }
      case ActionTypes.FINISH_CURRENT_CYCLE: {
        const currentCycleIndex = state.cycles.findIndex(
          (cycle) => cycle.id === state.activeCycleId
        );

        if (currentCycleIndex < 0) {
          return state;
        }
        draft.cycles[currentCycleIndex].finishedDate = new Date();
        draft.activeCycleId = null;
        break;
      }
      default:
        return state;
    }
  });
}
