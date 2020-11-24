import {
    SET_LOADING,
    GET_ERRORS,
    BOOK_DRONE_SERVICE,
    GET_SERVICE_REQUESTS,
    APPROVE_REQUEST,
    REJECT_REQUEST
  } from "./types";
  import axios from "axios";
  import swal from "sweetalert";
  import { properties } from "../../properties";
  import {getAgricultureServicesByDroneId} from "./droneActions.js";
  const backendurl = properties.backendhost;

  
  // Set loading state
  export const setLoading = () => {
    return {
      type: SET_LOADING,
    };
  };
  
  // book drone service
  export const bookDroneService = (data) => (dispatch) => {
    dispatch(setLoading());
    axios
      .post(backendurl + "booking/bookDrone",data)
      .then((response) => {
        dispatch({
          type: BOOK_DRONE_SERVICE,
          payload: response.data,
        });
        swal("Booking Request Placed");
        const params = {
            id : response.data.drone_id
          };
        dispatch(getAgricultureServicesByDroneId(params));
      })
      .catch((error) => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data,
        });
      });
      
  };

  // Get drone service requests placed by all users
export const getServiceRequests = () => (dispatch) => {
  dispatch(setLoading());
  axios
    .get(backendurl + `booking/getServiceRequests`)
    .then((response) => {
      console.log("the service request data is" + response.data);
      dispatch({
        type: GET_SERVICE_REQUESTS,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: error.data,
      // });
    });
};
  

// Approve Service Request
export const approveRequest = (data) => (dispatch) => {
  console.log("the request_id is"+data)
  dispatch(setLoading());
  axios
    .post(backendurl + "booking/approveServiceRequest",data)
    .then((response) => {
      console.log("the approval data is" + response.data);
      dispatch({
        type: APPROVE_REQUEST,
        payload: response.status,
      });
      swal(response.data.status);
      dispatch(getServiceRequests());
    })
    .catch((error) => {
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: error.response.data,
      // });
    });
};

// Reject Service Request
export const rejectRequest = (data) => (dispatch) => {

  dispatch(setLoading());
  axios
    .post(backendurl + `booking/rejectServiceRequest`,data)
    .then((response) => {
      console.log("the data is" + response.data);
      dispatch({
        type: REJECT_REQUEST,
        payload: response.status,
      });
      swal(response.data.status);
      dispatch(getServiceRequests());
    })
    .catch((error) => {
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: error.response.data,
      // });
    });
};