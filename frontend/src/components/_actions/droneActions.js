import {
    SET_LOADING,
    GET_DRONES,
    GET_ERRORS,
    CREATE_DRONE,
    UPDATE_DRONE,
    REMOVE_DRONE,
    SEARCH_DRONES,
    GET_DRONE_DETAILS
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

  // Get Drone details by id
  export const getDroneDetails = (params) => (dispatch) => {
    console.log("get drone details");
    dispatch(setLoading());
    axios
      .get(backendurl + "drones/getDroneById",{params})
      .then((response) => {
        dispatch({
          type: GET_DRONE_DETAILS,
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

  // create a drone
  export const createDrone = (data) => (dispatch) => {
    console.log("dispatched");
    dispatch(setLoading());
    axios
      .post(backendurl + "drones/createdrone",data)
      .then((response) => {
        dispatch({
          type: CREATE_DRONE,
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

   // update a drone
   export const updateDrone = (data) => (dispatch) => {
    dispatch(setLoading());
    axios
      .put(backendurl + "drones/updatedrone",data)
      .then((response) => {
        dispatch({
          type: UPDATE_DRONE,
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

   // delete a drone
   export const removeDrone = () => (dispatch) => {
    dispatch(setLoading());
    axios
      .post(backendurl + "drones/removedrone")
      .then((response) => {
        dispatch({
          type: REMOVE_DRONE,
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

   // search drones
   export const searchDrones = (params) => (dispatch) => {
     console.log("search drones");
    dispatch(setLoading());
    axios
      .get(backendurl + "drones/searchdrones",{params})
      .then((response) => {
        dispatch({
          type: SEARCH_DRONES,
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
  
  