import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Col, Row, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { getDroneDetails } from "../_actions/droneActions";
import PropTypes from "prop-types";

class DroneCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit = (drone_id) => {
    //prevent page from refresh
   // e.preventDefault();
    this.setState({
      text: "",
      errors: ""
    });
   
    const params = {
      id : drone_id
    };

      this.props.getDroneDetails(params);
    
  };

  render() {
    const { drone } = this.props;
    return (
    <Card bg="white" style={{ width: "25rem", margin: "1rem" }}>
    <Card.Img variant="top" src="holder.js/100px180" />
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
  drone:PropTypes.any,
}

const mapStateToProps = (state) => ({
  store: state.storeState,
  errors: state.errorState,
  droneState:state.droneState
});


export default connect(mapStateToProps, { getDroneDetails })(DroneCard);
