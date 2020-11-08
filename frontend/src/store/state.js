import { combineReducers } from "redux";
import {droneReducer } from "../components/_reducers/droneReducer";
import { errorReducer } from "../components/_reducers/errorReducer";

export const rootReducer = combineReducers({
  droneState: droneReducer,
  errorState: errorReducer,
});
