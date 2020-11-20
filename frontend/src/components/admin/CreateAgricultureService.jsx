import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { createAgricultureService } from "../_actions/droneActions";
import {  Form } from "react-bootstrap";

class CreateAgricultureService extends Component {

    constructor(props) {
        super(props);
        this.state = {
          name: "",
          description: "",
          basecost: "",
          drone_id: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      };


      handleSubmit = (e,drone_id)  => {
        //prevent page from refresh
        e.preventDefault();
        this.setState({
          text: "",
          errors: "",
        });
       
          const data = {
            name: this.state.name,
            basecost: this.state.basecost,
            description: this.state.description,
            drone_id:drone_id,
            servicestatus:'active'
          };

          //console.log("data to send:" + data.image);
    
          this.props.createAgricultureService(data);
        
      };

      render() {
        const { text, errors } = this.state;

        const drone_id = this.props.location.state;
    
        return (
            <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                        <div class="card">
                            <div class="card-header">Create Agriculture Service</div>
                            <div class="card-body">
            <Form>
                
            
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                  type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    placeholder="Name"
                    required
                  /></Form.Group>

                <Form.Group controlId="basecost">
                  <Form.Label>Base Cost</Form.Label>
                  <Form.Control
                  type="number"
                    name="basecost"
                    value={this.state.basecost}
                    onChange={this.handleChange}
                    min="0"
                    step="0.01"
                    placeholder="Base Cost"
                    required
                  /></Form.Group>
                 
               
                 <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={6}
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                    placeholder="Description"
                  /></Form.Group>
              
              <Button
                className="btn btn-primary" type="submit"
                onClick={e => this.handleSubmit(e,drone_id)}>
                Create Agriculture Service
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
  export default connect(mapStateToProps, { createAgricultureService })(CreateAgricultureService);
