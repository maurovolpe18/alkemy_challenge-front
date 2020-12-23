import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { operationReducer } from "./operationReducer";
import { uiReducer } from "./uiReducer";

export const rootReducer = combineReducers({
  //
  auth: authReducer,
  operation: operationReducer,
  ui: uiReducer,
});
