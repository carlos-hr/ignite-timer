import { Cycle } from "./reducer";

export enum ActionTypes {
  START_NEW_CYCLE = "START_NEW_CYCLE",
  STOP_CURRENT_CYCLE = "STOP_NEW_CYCLE",
  FINISH_CURRENT_CYCLE = "START_NEW_CYCLE",
}

export function startNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.START_NEW_CYCLE,
    payload: {
      newCycle,
    },
  };
}

export function interruptCycleAction() {
  return {
    type: ActionTypes.STOP_CURRENT_CYCLE,
  };
}

export function finishCycleAction() {
  return {
    type: ActionTypes.FINISH_CURRENT_CYCLE,
  };
}
