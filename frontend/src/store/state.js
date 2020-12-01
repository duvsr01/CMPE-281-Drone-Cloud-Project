import { combineReducers } from "redux";
import {droneReducer } from "../components/_reducers/droneReducer";
import { errorReducer } from "../components/_reducers/errorReducer";
import { serviceReducer } from "../components/_reducers/serviceReducer";
import { orderReducer } from "../components/_reducers/orderReducer";
import { trackingReducer } from "../components/_reducers/trackingReducer";

export const rootReducer = combineReducers({
  droneState: droneReducer,
  serviceState: serviceReducer,
  trackingState: trackingReducer,
  orderState: orderReducer,
  errorState: errorReducer,
});
