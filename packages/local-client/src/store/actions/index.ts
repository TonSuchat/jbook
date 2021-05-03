import { Dispatch } from "redux";
import { CellActionType } from "../constants";
import { CellDirection, CellTypes } from "../state/cell";
import * as Actions from "./types";
import bundle from "../../bundler";

export const updateCell = (
  id: string,
  content: string
): Actions.UpdateCellAction => ({
  type: CellActionType.UPDATE_CELL,
  payload: {
    id,
    content,
  },
});

export const deleteCell = (id: string): Actions.DeleteCellAction => ({
  type: CellActionType.DELETE_CELL,
  payload: id,
});

export const moveCell = (
  id: string,
  direction: CellDirection
): Actions.MoveCellAction => ({
  type: CellActionType.MOVE_CELL,
  payload: {
    id,
    direction,
  },
});

export const insertCellAfter = (
  id: string,
  type: CellTypes
): Actions.InsertCellAfterAction => ({
  type: CellActionType.INSERT_CELL_AFTER,
  payload: {
    id,
    type,
  },
});

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Actions.Action>) => {
    dispatch({ type: CellActionType.BUNDLE_START, payload: { cellId } });
    const { code, err } = await bundle(input);
    dispatch({
      type: CellActionType.BUNDLE_COMPLETE,
      payload: { cellId, bundle: { code, err } },
    });
  };
};
