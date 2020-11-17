import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { createDrone } from "../_actions/droneActions";
import {  Form } from "react-bootstrap";

class DroneCatalog extends Component {

    constructor(props) {
        super(props);
        this.state = {
          name: "",
          size: "",
          type: "",
          description: "",
          base64TextString:""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      };

      handleImageChange = (e) => {
        console.log("files to upload: " , e.target.files[0]);
        const file =  e.target.files[0];
        if(file) {
          const reader = new FileReader();
          reader.onload = this._handleReaderLoaded.bind(this);
          reader.readAsBinaryString(file);
        }
      }

      _handleReaderLoaded = (readerEvt) => {
        const binaryString = readerEvt.target.result
        this.setState({
          base64TextString : btoa(binaryString)
        })
      }



      handleSubmit = (e) => {
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
            image:this.state.base64TextString,
            status:'active'
          };

          //console.log("data to send:" + data.image);
    
          this.props.createDrone(data);
        
      };

      render() {
        const { text, errors } = this.state;
    
        return (
          <div class="container">
              <div class="row justify-content-center">
                  <div class="col-md-8">
                          <div class="card">
                              <div class="card-header">Create Drone</div>
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
                    value={this.state.dronetype}
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

              <Form.Group controlId="image">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control
                    name="image"
                    type="file"
                    accept=".jpeg,.jpg,.png"
                    value={this.state.image}
                    onChange={(e) => this.handleImageChange(e)}
                  /></Form.Group>
              
              <Button
                className="btn btn-primary"
                onClick={this.handleSubmit}
                type="submit"
              >
                Create Drone
              </Button>
              <br />
              <p className="text-danger"> {errors}</p>
              <p className="text-success"> {text}</p>
              <br />
            </Form>
                              </div>
                          </div>
                  </div>
              </div>
          </div>
      

      
        );
      }


} 

  const mapStateToProps = (state) => ({
    store: state.storeState,
    errors: state.errorState,
  });
  export default connect(mapStateToProps, { createDrone })(DroneCatalog);
