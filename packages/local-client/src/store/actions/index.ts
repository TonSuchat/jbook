import { Dispatch } from "redux";
import axios from "axios";
import { CellActionType } from "../constants";
import { Cell, CellDirection, CellTypes } from "../state/cell";
import {
  Action,
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellAfterAction,
} from "./types";
import bundle from "../../bundler";
import { RootState } from "../reducers";

export const updateCell = (id: string, content: string): UpdateCellAction => ({
  type: CellActionType.UPDATE_CELL,
  payload: {
    id,
    content,
  },
});

export const deleteCell = (id: string): DeleteCellAction => ({
  type: CellActionType.DELETE_CELL,
  payload: id,
});

export const moveCell = (
  id: string,
  direction: CellDirection
): MoveCellAction => ({
  type: CellActionType.MOVE_CELL,
  payload: {
    id,
    direction,
  },
});

export const insertCellAfter = (
  id: string,
  type: CellTypes
): InsertCellAfterAction => ({
  type: CellActionType.INSERT_CELL_AFTER,
  payload: {
    id,
    type,
  },
});

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: CellActionType.BUNDLE_START, payload: { cellId } });
    const { code, err } = await bundle(input);
    dispatch({
      type: CellActionType.BUNDLE_COMPLETE,
      payload: { cellId, bundle: { code, err } },
    });
  };
};

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: CellActionType.FETCH_CELLS });
    try {
      const { data }: { data: Cell[] } = await axios.get("/cells");
      dispatch({ type: CellActionType.FETCH_CELLS_COMPLETE, payload: data });
    } catch (error) {
      dispatch({
        type: CellActionType.FETCH_CELLS_ERROR,
        payload: error.message,
      });
    }
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    try {
      const {
        cells: { data, order },
      } = getState();
      const cells = order.map((id) => data[id]);
      await axios.post("/cells", { cells });
    } catch (error) {
      dispatch({
        type: CellActionType.SAVE_CELLS_ERROR,
        payload: error.message,
      });
    }
  };
};
