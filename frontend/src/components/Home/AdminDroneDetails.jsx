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
          hardwarespecs: "",
          wingspan:"",
          weight:"",
          battery:"",
          camera:"",
          flighttime:"",
          flightrange:"",
          flightaltitude:"",
          flightspeed:"",
          flightplanningsoftware:"",
          imagesoftware:"",
          powerconsumption:""
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
          softwarespecs:dronedet.softwarespecs,
          wingspan:dronedet.wingspan,
          weight:dronedet.weight,
          battery:dronedet.battery,
          camera:dronedet.camera,
          flighttime:dronedet.flighttime,
          flightrange:dronedet.flightrange,
          flightaltitude:dronedet.flightaltitude,
          flightspeed:dronedet.flightspeed,
          flightplanningsoftware:dronedet.flightplanningsoftware,
          imagesoftware:dronedet.imagesoftware,
          powerconsumption:dronedet.powerconsumption,
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
          wingspan:this.state.wingspan,
          weight:this.state.weight,
          battery:this.state.battery,
          camera:this.state.camera,
          flighttime:this.state.flighttime,
          flightrange:this.state.flightrange,
          flightaltitude:this.state.flightaltitude,
          flightspeed:this.state.flightspeed,
          flightplanningsoftware:this.state.flightplanningsoftware,
          imagesoftware:this.state.imagesoftware,
          powerconsumption:this.state.powerconsumption,
        id:drone_id
      };

      this.props.updateDrone(data);
    
      setTimeout(() => {   this.props.history.push("/main/admin/viewalldrones"); }, 1000);
  };

  handleAgricultureServices = (e,drone_id) => {
    //prevent page from refresh
    //e.preventDefault();

   this.props.history.push("/main/adminservicecatalog",drone_id);
    
  };

  createAgricultureService = (e,dronedetails) => {
   this.props.history.push("/main/createservice",dronedetails);
    
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

      setTimeout(() => {   this.props.history.push("/main/admin/viewalldrones"); }, 1000);

     
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

          <Button
                className="btn btn-primary" type="submit"
                onClick={e => this.handleDeleteDrone(e,droneidparam)}>
                Remove Drone
              </Button>

              <Button
                className="btn btn-primary" type="submit"
                onClick={(e) => this.handleAgricultureServices(e,dronedetails.drone_id)}>
                View All Agriculture Services
              </Button>

              <Button
                className="btn btn-primary" type="submit"
                onClick={(e) => this.createAgricultureService(e,dronedetails)}>
                Create Agriculture Service
              </Button>

          <Accordion>
        <Card className="m-1 border-0 shadow">
         
        
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
             <h2>{dronedetails.description}</h2>
          </Card.Text>
          </Col>
          </Row>

          </Card.Body>
          </Card>

            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Hardware
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
               <Card.Text>WingSpan - {dronedetails.wingspan}</Card.Text>
               <Card.Text>Weight - {dronedetails.weight}</Card.Text>
               <Card.Text>Battery - {dronedetails.battery}</Card.Text>
               <Card.Text>Camera - {dronedetails.camera}</Card.Text>
                <Card.Text>Power Consumption - {dronedetails.powerconsumption}</Card.Text>
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                  Flight Parameters
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
               <Card.Text>Flight Time - {dronedetails.flighttime}</Card.Text>
               <Card.Text>Flight Altitude - {dronedetails.flightaltitude}</Card.Text>
               <Card.Text>Flight Range - {dronedetails.flightrange}</Card.Text>
               <Card.Text>Flight Speed - {dronedetails.flightspeed}</Card.Text>
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                  Software
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
               <Card.Text>Flight Planning Software - {dronedetails.flightplanningsoftware}</Card.Text>
               <Card.Text>Image Software - {dronedetails.imagesoftware}</Card.Text>
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

<hr/>

<span>Hardware Specifications</span>

<Form.Group controlId="wingspan">
<Form.Label>Wingspan</Form.Label>
<Form.Control
  type="text"
  name="wingspan"
  value={this.state.wingspan}
  onChange={this.handleChange}
  placeholder="Wingspan"
/>
</Form.Group>

<Form.Group controlId="weight">
<Form.Label>Weight</Form.Label>
<Form.Control
  type="text"
  name="weight"
  value={this.state.weight}
  onChange={this.handleChange}
  placeholder="weight"
/>
</Form.Group>

<Form.Group controlId="battery">
<Form.Label>Battery</Form.Label>
<Form.Control
  type="text"
  name="battery"
  value={this.state.battery}
  onChange={this.handleChange}
  placeholder="Battery Type"
/>
</Form.Group>

<Form.Group controlId="camera">
<Form.Label>Camera</Form.Label>
<Form.Control
  type="text"
  name="camera"
  value={this.state.camera}
  onChange={this.handleChange}
  placeholder="Camera"
/>
</Form.Group>

<Form.Group controlId="flighttime">
<Form.Label>Flight Time</Form.Label>
<Form.Control
  type="text"
  name="flighttime"
  value={this.state.flighttime}
  onChange={this.handleChange}
  placeholder="Flight Time"
/>
</Form.Group>

<Form.Group controlId="flightrange">
<Form.Label>Flight Range</Form.Label>
<Form.Control
  type="text"
  name="flightrange"
  value={this.state.flightrange}
  onChange={this.handleChange}
  placeholder="Flight Range"
/>
</Form.Group>


<Form.Group controlId="flightaltitude">
<Form.Label>Flight Altitude</Form.Label>
<Form.Control
  type="text"
  name="flightaltitude"
  value={this.state.flightaltitude}
  onChange={this.handleChange}
  placeholder="Flight Altitude"
/>
</Form.Group>

<Form.Group controlId="flightspeed">
<Form.Label>Flight Speed</Form.Label>
<Form.Control
  type="text"
  name="flightspeed"
  value={this.state.flightrflightspeed}
  onChange={this.handleChange}
  placeholder="Flight Speed"
/>
</Form.Group>

<Form.Group controlId="powerconsumption">
<Form.Label>Power Consumption</Form.Label>
<Form.Control
  type="text"
  name="powerconsumption"
  value={this.state.powerconsumption}
  onChange={this.handleChange}
  placeholder="Power Consumption"
/>
</Form.Group>

<hr/>

<span>Software Specifications</span>

<Form.Group controlId="flightplanningsoftware">
<Form.Label>Flight Planning Software</Form.Label>
<Form.Control
  type="text"
  name="flightplanningsoftware"
  value={this.state.flightplanningsoftware}
  onChange={this.handleChange}
  placeholder="Flight Planning Software"
/>
</Form.Group>

<Form.Group controlId="imagesoftware">
<Form.Label>Image Software</Form.Label>
<Form.Control
  type="text"
  name="imagesoftware"
  value={this.state.imagesoftware}
  onChange={this.handleChange}
  placeholder="Image Software"
/>
</Form.Group>

          {/*<Form.Group controlId="hardwarespecs">
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
        /></Form.Group>*/}



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
          {/*  <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="3">
                  Delete Drone
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="3">
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
                <Accordion.Toggle as={Button} variant="link" eventKey="4">
                  Agriculture Services
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="4">
                <Card.Body>
                <Button
                className="btn btn-primary" type="submit"
                onClick={(e) => this.handleAgricultureServices(e,dronedetails.drone_id)}>
                View All Agriculture Services
              </Button>

              <Button
                className="btn btn-primary" type="submit"
                onClick={(e) => this.createAgricultureService(e,dronedetails)}>
                Create Agriculture Service
              </Button>
                </Card.Body>
              </Accordion.Collapse>
          </Card>*/}
          
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