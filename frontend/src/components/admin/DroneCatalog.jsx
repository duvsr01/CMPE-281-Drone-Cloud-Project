import React, { Component, useState } from "react";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { createDrone } from "../_actions/droneActions";
import { Col, Form } from "react-bootstrap";

class DroneCatalog extends Component {

    constructor(props) {
        super(props);
        this.state = {
          name: "",
          size: "",
          type: "",
          description: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      };

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
            description: this.state.description
          };
    
          this.props.createDrone(data);
        
      };

      render() {
        const { text, errors } = this.state;
    
        return (
            <div class="row">
            <div className="col-md-5 center">
            <Form>
                <h2>Create Drone</h2>
                <hr />
            
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
                  <Form.Control
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
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
        );
      }


} 

  const mapStateToProps = (state) => ({
    store: state.storeState,
    errors: state.errorState,
  });
  export default connect(mapStateToProps, { createDrone })(DroneCatalog);
