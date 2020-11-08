import {
    SET_LOADING,
    GET_DRONES,
  } from "../_actions/types";
  
  const initialState = {
    drone : {},
    drones: [],
    loading: false,
  };
  
  export const droneReducer = (state = { ...initialState }, action) => {
    switch (action.type) {
      case SET_LOADING:
        return {
          ...state,
          loading: true,
        };
      case GET_DRONES:
        return {
          ...state,
          drones: action.payload,
          loading: false,
        };
        default:
        return { ...state };
    }
}