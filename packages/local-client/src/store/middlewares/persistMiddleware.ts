import { Dispatch } from "redux";
import { Action } from "../actions/types";
import { CellActionType } from "../constants";
import { saveCells } from "../actions";
import { RootState } from "../reducers";

export const persistMiddleware = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => {
  let timer: any;
  return (next: (action: Action) => void) => {
    return (action: Action) => {
      next(action);
      if (
        [
          CellActionType.MOVE_CELL,
          CellActionType.UPDATE_CELL,
          CellActionType.INSERT_CELL_AFTER,
          CellActionType.DELETE_CELL,
        ].includes(action.type)
      ) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          saveCells()(dispatch, getState);
        }, 750);
      }
    };
  };
};
