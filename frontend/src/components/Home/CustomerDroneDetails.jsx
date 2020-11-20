import React, { Component } from "react";

import { Card, Button,Accordion } from "react-bootstrap";


import { Col, Row } from "react-bootstrap";

import { connect } from "react-redux";

const styles = {
  cardImage: {
    
    objectFit: 'cover',
    height:"auto"
  },
  imgContainer: {
    height: "10px"
  }
}

class CustomerDroneDetails extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      size: "",
      type: "",
      description: "",
      base64TextString:"",
      setImage:false,
      image:null,
      imageUrl:""
    };
}

componentDidMount(){
  const dronedet = this.props.location.state;
  //console.log("drone details image :" + dronedet.image);
  [dronedet].map(dronedet => 
      this.setState({
          name:dronedet.name,
          description:dronedet.description,
          size:dronedet.size,
          type:dronedet.type,
          imageUrl:dronedet.image
        })
  )
}

  
  handleAgricultureServices = (e,drone_id) => {
    //prevent page from refresh
    //e.preventDefault();

   this.props.history.push("/main/adminservicecatalog",drone_id);
    
  };

 

  

  render() {
   const dronedetails = this.props.location.state;

   var imageuri = null;
   var droneidparam = null;

   [dronedetails].map(dronedetails => 
   //imageuri ="data:image/png[jpg][jpeg];base64," + dronedetails.image,
   
   imageuri=dronedetails.image,
   droneidparam = dronedetails.drone_id
   )

   if(imageuri != null || imageuri != undefined)
   imageuri = imageuri.replace(/"/g, '');

  
   return(

     
     
    <div class="container">
    <div class="row justify-content-center">
      
        <div class="col-md-12">
                <div class="card">
                    <div class="card-header">Drone Details</div>
                    <div class="card-body">
        {[dronedetails].map(dronedetails => <div>
          <Accordion>
        <Card className="m-5 border-0 shadow">
         
        
          <Card.Body>
          <div class="card-block text-center">
          <h1 class="card-title">{dronedetails.name}</h1>
           
        </div>
          
          <Row>

          <Col>
          <Card.Img variant="top" src={imageuri} style={styles.cardImage}/></Col>
          <Col>
          <Card.Text>
            <h3>Size - {dronedetails.size}<br/></h3>
            <h3>Type - {dronedetails.type}</h3>
          </Card.Text>
          </Col>
          </Row>

          </Card.Body>
          </Card>

          <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Description
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
               <Card.Text><h3>{dronedetails.description}</h3></Card.Text>
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                  Hardware Specification
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
               <Card.Text><h3>{dronedetails.hardwarespecs}</h3></Card.Text>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                  Software Specification
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
               <Card.Text><h3>{dronedetails.softwarespecs}</h3></Card.Text>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="3">
                  Agriculture Services
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="3">
                <Card.Body>
                <Button
                className="btn btn-primary" type="submit"
                onClick={(e) => this.handleAgricultureServices(e,dronedetails.drone_id)}>
                View All Agriculture Services
              </Button>

              
                </Card.Body>
              </Accordion.Collapse>
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