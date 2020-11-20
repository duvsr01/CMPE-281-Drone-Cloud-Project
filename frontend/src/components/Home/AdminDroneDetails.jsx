import React, { Component } from "react";

import { Card, Button,Accordion } from "react-bootstrap";


import { Nav,Navbar,Col, Row, Form } from "react-bootstrap";

import { connect } from "react-redux";
import { updateDrone,removeDrone } from "../_actions/droneActions";

const styles = {
  cardImage: {
    
    objectFit: 'cover',
    height:"auto"
  },
  imgContainer: {
    height: "10px"
  }
}

class AdminDroneDetails extends Component {
  
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
      imageUrl:"",
      softwarespecs: "",
          hardwarespecs: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
}

componentDidMount(){
  const dronedet = this.props.location.state;
  console.log("drone details image :" + dronedet.image);
  [dronedet].map(dronedet => 
      this.setState({
          name:dronedet.name,
          description:dronedet.description,
          size:dronedet.size,
          type:dronedet.type,
          imageUrl:dronedet.image,
          hardwarespecs:dronedet.hardwarespecs,
          softwarespecs:dronedet.softwarespecs
        })
  )
}

handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  /*handleImageChange = (e) => {
    console.log("files to upload: " , e.target.files[0]);
    const file =  e.target.files[0];
    if(file) {
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }*/

  handleImageChange = (e) => {
    console.log("files to upload: " , e.currentTarget.files[0]);
    
    //const file =  e.currentTarget.files[0];
    this.setState({ image: e.currentTarget.files[0] }, () => { console.log("files: " + this.state.image) });

    
  }

  _handleReaderLoaded = (readerEvt) => {
    const binaryString = readerEvt.target.result
    this.setState({
      base64TextString : btoa(binaryString)
    })
  }

  handleSubmit = (e,drone_id) => {
    //prevent page from refresh
    e.preventDefault();
    this.setState({
      text: "",
      errors: "",
    });

  
      const data = {
        name: this.state.name,
        size: this.state.size,
        type: this.state.type,
        description: this.state.description,
        //image:this.state.base64TextString,
        image:this.state.image,
        imageUrl:this.state.imageUrl,
        softwarespecs: this.state.softwarespecs,
          hardwarespecs: this.state.hardwarespecs,
        id:drone_id
      };

      this.props.updateDrone(data);
    
  };

  handleAgricultureServices = (e,drone_id) => {
    //prevent page from refresh
    //e.preventDefault();

   this.props.history.push("/main/adminservicecatalog",drone_id);
    
  };

  createAgricultureService = (e,drone_id) => {
   this.props.history.push("/main/createservice",drone_id);
    
  };

  handleDeleteDrone = (e,drone_id) => {
    //prevent page from refresh
   // e.preventDefault();
    this.setState({
      text: "",
      errors: "",
    });

      const params = {
        id:drone_id
      };

      this.props.removeDrone(params);

      this.props.history.push("/main/admin/viewalldrones");

     
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



  console.log("image url:" + imageuri);
  
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
             <h3>Size - {dronedetails.size}</h3><br/>
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
              Update Drone
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="3">
                <Card.Body>
                <div class="container">
              <div class="row justify-content-center">
                  <div class="col-md-8">
                          <div class="card">
                              <div class="card-header">Update Drone</div>
                              <div class="card-body">
                <Form>
            
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  /></Form.Group>

                <Form.Group controlId="type">
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    name="type"
                    value={this.state.type}
                    onChange={this.handleChange}
                  /></Form.Group>
                 
                  
                <Form.Group controlId="size">
                  <Form.Label>Size</Form.Label>
                  <Form.Control
                    type="text"
                    name="size"
                    value={this.state.size}
                    onChange={this.handleChange}
                  />
                  
                </Form.Group>
               
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={6}
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                  /></Form.Group>

<Form.Group controlId="hardwarespecs">
                  <Form.Label>Hardware Specifications</Form.Label>
                  <Form.Control as="textarea" rows={6}
                    name="hardwarespecs"
                    value={this.state.hardwarespecs}
                    onChange={this.handleChange}
                  /></Form.Group>

<Form.Group controlId="softwarespecs">
                  <Form.Label>Software Specifications</Form.Label>
                  <Form.Control as="textarea" rows={6}
                    name="softwarespecs"
                    value={this.state.softwarespecs}
                    onChange={this.handleChange}
                  /></Form.Group>

`             <Form.Group controlId="image">
                  <Form.Label>Change Image</Form.Label>
                  <Form.Control
                    name="image"
                    type="file"
                    accept=".jpeg,.jpg,.png"
                    onChange={(e) => this.handleImageChange(e)}
                  /></Form.Group>

    
              <Button
                className="btn btn-primary" type="submit"
                onClick={e => this.handleSubmit(e,dronedetails.drone_id)}>
                Update Drone
              </Button>
              <br />
            </Form></div>
                          </div>
                  </div>
              </div>
          </div>
                  
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="4">
                  Delete Drone
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="4">
                <Card.Body>
                <h4 class="card-title">Are you sure you want to delete this drone from the catalog?</h4>
                  
                  <Button
                className="btn btn-primary" type="submit"
                onClick={e => this.handleDeleteDrone(e,droneidparam)}>
                Remove Drone
              </Button>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="5">
                  Agriculture Services
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="5">
                <Card.Body>
                <Button
                className="btn btn-primary" type="submit"
                onClick={(e) => this.handleAgricultureServices(e,dronedetails.drone_id)}>
                View All Agriculture Services
              </Button>

              <Button
                className="btn btn-primary" type="submit"
                onClick={(e) => this.createAgricultureService(e,dronedetails.drone_id)}>
                Create Agriculture Service
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

export default connect(mapStateToProps, { updateDrone,removeDrone})(AdminDroneDetails);