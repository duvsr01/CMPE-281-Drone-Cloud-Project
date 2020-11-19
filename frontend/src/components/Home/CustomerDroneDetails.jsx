import React, { Component } from "react";

import { Card, Button,Accordion } from "react-bootstrap";


import { connect } from "react-redux";
//import { updateDrone,removeDrone } from "../_actions/droneActions";


class CustomerDroneDetails extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      size: "",
      type: "",
      description: "",
      image:""
    };
}

  handleAgricultureServices = (e,drone_id) => {
    //prevent page from refresh
    //e.preventDefault();

   this.props.history.push("/main/customerservicecatalog",drone_id);
    
  };

  

  render() {
   const dronedetails = this.props.location.state;
   var imageuri = null;

   [dronedetails].map(dronedetails => 
   imageuri ="data:image/png;base64," + dronedetails.image
   )

  // console.log(dronedetails);
  
   return(
    <div className="container">
    <div className="row justify-content-center">
        <div className="col-md-8">
                <div className="card">
                    <div className="card-header">Drone Details</div>
                    <div className="card-body">
        {[dronedetails].map(dronedetails => <div>
          <Accordion>
        <Card>
        <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
          <Card.Title>{dronedetails.name}</Card.Title>
          <Card.Text>
            <p>Drone Description - {dronedetails.description} </p>
            <p>Drone Name - {dronedetails.name} </p>
            <p>Drone Size - {dronedetails.size} </p>
            <p>Drone Type - {dronedetails.type} </p>
            <p>Drone Image -  <img src={imageuri} alt="drone"/> </p>
          </Card.Text>

        
          </Card.Body>
         
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1" onClick={(e) => this.handleAgricultureServices(e,dronedetails.drone_id)}>
                  Agriculture Services
                </Accordion.Toggle>
              </Card.Header>
             
            </Card>
          </Accordion>
          </div>)}
          </div>
           </div>
           </div>
           </div>
          </div>
   )
   
  }
}

const mapStateToProps = (state) => ({
  store: state.storeState,
  errors: state.errorState,
});

export default connect(mapStateToProps, {})(CustomerDroneDetails);