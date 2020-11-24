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
          drone_id: "",
          errors: "",
          text: null,
          formErrors: {},
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps) {
     
      if (this.props.errors !== prevProps.errors) {
        console.log("errors are" + this.props.errors);
        if (this.props.errors) {
          this.setState({
            text: "",
            formErrors: {},
            errors: this.props.errors.message,
          });
        }
      }
    }

    validate = () => {
  
      let nameError = "";
      let costError = "";
      let descriptionError = "";

      var costExp = /^[1-9]\d{0,7}(?:\.\d{1,4})?$/;
  
      if (!this.state.name) {
        nameError = "Please enter service Name";
      }
  
      if (!this.state.basecost) {
        costError = "Please enter cost";
      } else if (!this.state.basecost.match(costExp)) {
        costError =
          "Enter a valid cost (Allowed are prices in numbers. Min - 0) ";
      }
  
  
      if (!this.state.description) {
        descriptionError = "Please enter description";
      }
  
  
      if (
        nameError || costError ||
        descriptionError 
      ) {
        this.setState((prevState) => ({
          formErrors: {
            // object that we want to update
            ...prevState.formErrors, // keep all other key-value pairs
            nameError: nameError, // update the value of specific key
            costError: costError,
            descriptionError: descriptionError
          },
        }));
        return false;
      }
      return true;
    };

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
        const isValid = this.validate();
        if (isValid) {
          const data = {
            name: this.state.name,
            basecost: this.state.basecost,
            description: this.state.description,
            drone_id:drone_id,
            servicestatus:'active'
          };

          //console.log("data to send:" + data.image);
    
          this.props.createAgricultureService(data);

          setTimeout(() => {   this.props.history.push("/main/adminservicecatalog",drone_id); }, 1000);
        }
        
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
                  />
                  {this.state.formErrors.nameError ? (
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.formErrors.nameError}
                </div>
              ) : null}
                  </Form.Group>

                <Form.Group controlId="basecost">
                  <Form.Label>Base Cost</Form.Label>
                  <Form.Control
                  type="text"
                    name="basecost"
                    value={this.state.basecost}
                    onChange={this.handleChange}
                    placeholder="Base Cost"
                    required
                  />
                  {this.state.formErrors.costError ? (
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.formErrors.costError}
                </div>
              ) : null}
                  </Form.Group>
                 
               
                 <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={6}
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                    placeholder="Description"
                  />
                  {this.state.formErrors.descriptionError ? (
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.formErrors.descriptionError}
                </div>
              ) : null}
                  </Form.Group>
              
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
