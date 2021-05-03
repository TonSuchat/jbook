import produce from "immer";
import { CellActionType } from "../constants";
import { Action } from "../actions/types";
import { Cell } from "../state/cell";
import { findOrderIndex, generateId } from "../../helpers";

type CellState = {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
};

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce((draft: CellState, action: Action) => {
  switch (action.type) {
    case CellActionType.UPDATE_CELL:
      draft.data[action.payload.id].content = action.payload.content;
      break;
    case CellActionType.DELETE_CELL:
      delete draft.data[action.payload];
      draft.order = draft.order.filter((d) => d !== action.payload);
      break;
    case CellActionType.MOVE_CELL:
      const index = findOrderIndex(draft.order, action.payload.id);
      const targetIndex =
        action.payload.direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex > draft.order.length - 1) break;
      draft.order[index] = draft.order[targetIndex];
      draft.order[targetIndex] = action.payload.id;
      break;
    case CellActionType.INSERT_CELL_AFTER:
      const cell: Cell = {
        id: generateId(),
        type: action.payload.type,
        content: "",
      };
      draft.data[cell.id] = cell;
      if (!action.payload.id) {
        draft.order.push(cell.id);
        break;
      }
      const foundIndex = findOrderIndex(draft.order, action.payload.id);
      if (foundIndex < 0) draft.order.unshift(cell.id);
      else draft.order.splice(foundIndex + 1, 0, cell.id);
      break;
  }
}, initialState);

export default reducer;
