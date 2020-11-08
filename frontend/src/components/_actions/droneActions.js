import {
    SET_LOADING,
    GET_DRONES,
    GET_ERRORS
  } from "./types";
  import axios from "axios";
  import swal from "sweetalert";
  import { properties } from "../../properties";
  const backendurl = properties.backendhost;
  
  // Set loading state
  export const setLoading = () => {
    return {
      type: SET_LOADING,
    };
  };
  
  // Get all Drones
  export const getDrones = () => (dispatch) => {
    dispatch(setLoading());
    axios
      .get(backendurl + "drones")
      .then((response) => {
        dispatch({
          type: GET_DRONES,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data,
        });
      });
  };
  
  