import { types } from "../types/types";

const initialState = {
  operations: [],
  activeOperation: null,
};
export const operationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.operationAddNew:
      return {
        ...state,
        operations: [...state.operations, action.payload],
      };
    case types.operationLoaded:
      return {
        ...state,
        ...action.payload,
      };
    case types.operationUpdated:
      return {
        ...state,
        operations: state.operation.map((e) =>
          e.id === action.payload.id ? action.payload : e
        ),
      };
    case types.operationSetActive:
      return {
        ...state,
        activeOperation: action.payload,
      };
    case types.operationClearActiveOperation:
      return {
        ...state,
        activeOperation: null,
      };
    case types.operationDeleted:
      return {
        operations: state.operation.filter(
          (e) => e.id !== state.activeOperation.id
        ),
        activeEvent: null,
      };
    default:
      return state;
  }
};
