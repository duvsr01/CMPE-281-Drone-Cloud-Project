import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { properties } from "../../properties";
import swal from "sweetalert";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../common/Spinner";
import { getServiceRequests,approveRequest,rejectRequest } from "../_actions/serviceActions";
const backendurl = properties.backendhost;

class ReviewServiceRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      request_id:"",
      user_name:"",
      user_email:"",
      drone_name: "",
      drone_id: "",
      service_name: "",
      service_id:"",
      service_date:"",
      session_time:"",
      no_of_sessions:"",
      service_basecost:"",
      service_totalcost:"",
      droneServiceRequests: [],
      approvalResponse: "",
      rejectionResponse: "",
      rowIndex: "",
    };
  }

  componentDidMount() {
    this.props.getServiceRequests();
  }

  onApprove(index, serviceRequestId) {
    this.setState({
      rowIndex: index,
    });

    let data = {
      serviceRequestId: serviceRequestId
    };
  
    this.props.approveRequest(data);
  }

  onReject(index, serviceRequestId) {
    this.setState({
      rowIndex: index,
    });
    let data = {
      serviceRequestId: serviceRequestId
    };
    this.props.rejectRequest(data);
  }

  render() {
    const { rowIndex, approvalResponse, rejectionResponse } = this.state;
    const { droneServiceRequests, loading } = this.props.serviceState;
    let spinner;
    if (droneServiceRequests === null || loading) {
      spinner = <Spinner />;
    }
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div>
          <table className="table table-bordered table-hover">
            {spinner}
            <thead className="thead">
              <tr>
                <th className="text-center  font-weight-bold"  scope="col">
                  <h6>User Name</h6>
                </th>
                <th className="text-center  font-weight-bold" scope="col">
                <h6>Drone Name</h6>
                </th>
                <th className="text-center  font-weight-bold" scope="col">
                <h6>Drone Status</h6>
                </th>
                <th className="text-center  font-weight-bold" scope="col">
                <h6>Serivce Name</h6>
                </th>
                <th className="text-center  font-weight-bold" scope="col">
                <h6>Service Request Date</h6>
                </th>
                <th className="text-center  font-weight-bold" scope="col">
                <h6> Requested Session Time</h6>
                </th>
                <th className="text-center  font-weight-bold" scope="col">
                <h6>Requested Number of Sessions</h6>
                </th>
                <th className="text-center  font-weight-bold" scope="col">
                <h6>Service Total Cost</h6>
                </th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {droneServiceRequests
               .filter(
                (droneServiceRequest) =>
                droneServiceRequest.request_status !== "Approved" && droneServiceRequest.request_status !== "Rejected"
                )
                .map((droneServiceRequest, index) => {
                  //console.log("the service request rec is " + droneServiceRequest);   
                  return (
                    <tr key={index}>
                      <th className="text-center text-primary" scope="row">
                        <h6>{droneServiceRequest.userName}</h6>
                      </th>
                      {/* <td className="text-center">{droneServiceRequest.request_id}</td> */}
                      <td className="text-center text-primary"><h6>{droneServiceRequest.droneName}</h6></td>
                      <td className="text-center text-primary"><h6>{droneServiceRequest.droneStatus}</h6></td>
                      <td className="text-center text-primary"><h6>{droneServiceRequest.serviceName}</h6></td>
                      <td className="text-center text-primary"><h6>{droneServiceRequest.serviceDate}</h6></td>
                      <td className="text-center text-primary"><h6>{droneServiceRequest.serviceTime}</h6></td>
                      <td className="text-center text-primary"><h6>{droneServiceRequest.serviceSessionNumber}</h6></td>
                      <td className="text-center text-primary"><h6>{droneServiceRequest.serviceTotalCost}</h6></td>
                      <td className="text-center">
                        <tr className="text-center">
                          <td>
                            <Button
                              className="btn btn-success"
                              onClick={() =>
                                this.onApprove(index, droneServiceRequest.request_id)
                              }
                              type="submit"
                            >
                              Approve
                            </Button>

                            {/* {rowIndex === index ? (
                              <div>
                                <p className="text-primary">
                                  {approvalResponse}
                                </p>
                              </div>
                            ) : (
                              ""
                            )} */}
                          </td>

                          <td>
                            <Button
                              className="btn btn-danger"
                              onClick={() => {
                                this.onReject(index, droneServiceRequest.request_id);
                              }}
                              type="submit"
                            >
                              Reject
                            </Button>

                            {/* {rowIndex === index ? (
                              <div>
                                <p className="text-primary">
                                  {rejectionResponse}
                                </p>
                              </div>
                            ) : (
                              ""
                            )} */}
                          </td>
                        </tr>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

ReviewServiceRequests.propTypes = {
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  serviceState: state.serviceState,
  errors: state.errorState,
});
export default connect(mapStateToProps,{getServiceRequests,approveRequest,rejectRequest})(ReviewServiceRequests);
