import {
    SET_LOADING,
    GET_DRONES,
    CREATE_DRONE,
    REMOVE_DRONE,
    UPDATE_DRONE,
    SEARCH_DRONES,
    GET_DRONE_DETAILS
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
        case GET_DRONE_DETAILS:
        return {
          ...state,
          drone: action.payload,
          loading: false,
        };
        case CREATE_DRONE:
        return {
          ...state,
          drone: action.payload,
          loading: false,
        };
        case UPDATE_DRONE:
        return {
          ...state,
          drone: action.payload,
          loading: false,
        };
        case REMOVE_DRONE:
        return {
          ...state,
          drone: action.payload,
          loading: false,
        };
        case SEARCH_DRONES:
        return {
          ...state,
          drones: action.payload,
          loading: false,
        };
        default:
        return { ...state };
    }
}