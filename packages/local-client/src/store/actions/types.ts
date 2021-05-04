import { CellActionType } from "../constants";
import { Cell, CellDirection, CellTypes } from "../state/cell";

export type MoveCellAction = {
  type: CellActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: CellDirection;
  };
};

export type DeleteCellAction = {
  type: CellActionType.DELETE_CELL;
  payload: string;
};

export type InsertCellAfterAction = {
  type: CellActionType.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    type: CellTypes;
  };
};

export type UpdateCellAction = {
  type: CellActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
};

export type BundleStartAction = {
  type: CellActionType.BUNDLE_START;
  payload: {
    cellId: string;
  };
};

export type BundleCompleteAction = {
  type: CellActionType.BUNDLE_COMPLETE;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      err: string;
    };
  };
};

export type FetchCellsAction = {
  type: CellActionType.FETCH_CELLS;
};

export type FetchCellsCompleteAction = {
  type: CellActionType.FETCH_CELLS_COMPLETE;
  payload: Cell[];
};

export type FetchCellsErrorAction = {
  type: CellActionType.FETCH_CELLS_ERROR;
  payload: string;
};

export type SaveCellsErrorAction = {
  type: CellActionType.SAVE_CELLS_ERROR;
  payload: string;
};

export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellAfterAction
  | UpdateCellAction
  | BundleStartAction
  | BundleCompleteAction
  | FetchCellsAction
  | FetchCellsCompleteAction
  | FetchCellsErrorAction
  | SaveCellsErrorAction;
