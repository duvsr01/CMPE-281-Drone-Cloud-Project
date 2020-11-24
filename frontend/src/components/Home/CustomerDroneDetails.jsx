import React, { Component } from "react";
import { Card, Button,Accordion } from "react-bootstrap";
import { connect } from "react-redux";
import farmingdrone from "../../common/images/farmingdrone.jpg";
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
        
        <Card.Img variant="top" src={farmingdrone} />
          <Card.Body>
          <Card.Title><h4>{dronedetails.name}</h4> </Card.Title>
          <Card.Text>
            <h5><p>Drone Description - {dronedetails.description} </p></h5>
            <h5><p>Drone Name - {dronedetails.name} </p></h5>
            <h5><p>Drone Size - {dronedetails.size} </p></h5>
            <h5><p>Drone Type - {dronedetails.type} </p></h5>
            {/* <h5><p>Drone Image -  <img src={imageuri} alt="drone"/> </p></h5> */}
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