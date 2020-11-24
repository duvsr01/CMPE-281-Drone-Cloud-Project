import { combineReducers } from "redux";
import {droneReducer } from "../components/_reducers/droneReducer";
import { errorReducer } from "../components/_reducers/errorReducer";
import { serviceReducer } from "../components/_reducers/serviceReducer";
import { orderReducer } from "../components/_reducers/orderReducer";

export const rootReducer = combineReducers({
  droneState: droneReducer,
  serviceState: serviceReducer,
  orderState: orderReducer,
  errorState: errorReducer,
});
