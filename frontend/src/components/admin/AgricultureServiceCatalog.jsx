import React, { Component } from "react";
import {getAgricultureServicesByDroneId} from "../_actions/droneActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";

import Button from "react-bootstrap/Button";
 
class AgricultureServiceCatalog extends Component {
  state={
    drone_id:"",
    service_id:"",
    basecost:"",
    description:"",
    name:""
  }

  componentDidMount(){
    const drone_id = this.props.location.state;

    const params = {
        id : drone_id
      };
    this.props.getAgricultureServicesByDroneId(params);
  }

  updateService = (e,service_id) => {
    //prevent page from refresh
    //e.preventDefault();

   this.props.history.push("/main/updateservice",service_id);
    
  };


  render() {
const {agricultureservices,loading} = this.props.droneState;
  let serviceContent;
  if(agricultureservices==null || loading){
    <Spinner />
  }
  else{
  serviceContent = agricultureservices.map((agricultureservice,index)=>{
    return(
       <tr>
           <td>{agricultureservice.name}</td>
           <td>{agricultureservice.basecost}</td>
           <td>{agricultureservice.description}</td>
           <td><Button
                className="btn btn-primary" type="submit"
                onClick={e => this.updateService(e,agricultureservice.service_id)}>
                Update Service
              </Button></td>
              <td><Button
                className="btn btn-primary" type="submit"
                onClick={e => this.deleteService(e,agricultureservice.service_id)}>
                Delete Service
              </Button></td>
       </tr>
    )
    
  })}

    
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align background blue">
            <h2 className="text-center text-white font-italic font-family-sans-serif">
             Service Catalog
            </h2>
          </div>
        </div>
        <div className=" container">
          <div className="container">
            <div>
            <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Basecost</th>
      <th scope="col">Description</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
              {serviceContent}
              </tbody>
              </table>
            </div>
          </div>
          </div>
      </div>
    );
  }
}


AgricultureServiceCatalog.propTypes={
  errors: PropTypes.object.isRequired,
  agricultureServices:PropTypes.array,
}
const mapStateToProps =(state)=>({
  droneState:state.droneState,
  errorState:state.errorState

})

export default connect(mapStateToProps,{getAgricultureServicesByDroneId}) (AgricultureServiceCatalog);