import React, { Component } from "react";
import {withRouter } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { getDroneDetails } from "../_actions/droneActions";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";

class DroneCard extends Component {
  constructor(props) {
    super(props);
    
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state={
    drone:{}
  }
  
  handleSubmit = (drone_id) => {
    //prevent page from refresh
   // e.preventDefault();
   
    const params = {
      id : drone_id
    };

     this.props.getDroneDetails(params);

     if (
      localStorage.getItem("usertype") === "admin"
    ) {
      this.props.history.push("/main/admindronedetails",this.props.drone);
    } else if (
      localStorage.getItem("usertype") === "customer"
    ) {
      this.props.history.push("/main/customerdronedetails",this.props.drone);
    }

     
 
  };

  render() {
    const { drone } = this.props;
    return (
    <Card bg="white" style={{ width: "25rem", margin: "1rem" }}>

    <Card.Body>
    <Card.Title>{drone.name}</Card.Title>
    <Card.Text>
        {drone.description} 
    </Card.Text>
    <Button variant="primary" type="submit" 
                onClick={() => this.handleSubmit(drone.drone_id)}>Details</Button>
    </Card.Body>
    </Card>
    );
  }
}

DroneCard.propTypes={
  drones:PropTypes.array,
  drone:PropTypes.any
}

const mapStateToProps = (state) => ({
  store: state.storeState,
  errors: state.errorState,
  droneState:state.droneState
});


export default withRouter(connect(mapStateToProps, { getDroneDetails }) (DroneCard));
