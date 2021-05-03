import produce from "immer";
import { CellActionType } from "../constants";
import { Action } from "../actions/types";

type BundleState = {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        err: string;
      }
    | undefined;
};

const initialState: BundleState = {};

const reducer = produce((draft: BundleState, action: Action) => {
  switch (action.type) {
    case CellActionType.BUNDLE_START:
      draft[action.payload.cellId] = {
        loading: true,
        code: "",
        err: "",
      };
      break;
    case CellActionType.BUNDLE_COMPLETE:
      const { code, err } = action.payload.bundle;
      draft[action.payload.cellId] = {
        loading: false,
        code,
        err,
      };
      break;
  }
}, initialState);

export default reducer;
