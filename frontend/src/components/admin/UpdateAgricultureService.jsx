import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import {updateAgricultureService } from "../_actions/droneActions";
import {  Form } from "react-bootstrap";

class UpdateAgricultureService extends Component {

    constructor(props) {
        super(props);
        this.state = {
          name: "",
          description: "",
          basecost: "",
          service_id: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        const service = this.props.location.state;
        [service].map(service => 
            this.setState({
                name:service.name,
                description:service.description,
                basecost:service.basecost
              })
        )
    }

   

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      };


      handleSubmit = (e,service_id) => {
        //prevent page from refresh
        e.preventDefault();
        this.setState({
          text: "",
          errors: ""
        });
    
          const data = {
            name: this.state.name,
            basecost: this.state.basecost,
            description: this.state.description,
            id:service_id
          };
    
          this.props.updateAgricultureService(data);

        
      };

      render() {
        const { text, errors } = this.state;

        const agricultureservice = this.props.location.state;
    
        return (
            <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                        <div class="card">
                            <div class="card-header">Update Agriculture Service</div>
                            {[agricultureservice].map(agricultureservice =>      <div class="card-body">
            <Form name="myForm">
                <h2>Update Agriculture Service</h2>
                <hr />
            
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  /></Form.Group>

                <Form.Group controlId="basecost">
                  <Form.Label>Base Cost</Form.Label>
                  <Form.Control
                    name="basecost"       
                    value={this.state.basecost}
                    onChange={this.handleChange}
                  /></Form.Group>
                 
               
                 <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={3}
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                  /></Form.Group>
              
              <Button
                className="btn btn-primary" type="submit"
                onClick={e => this.handleSubmit(e,agricultureservice.service_id)}>
                Update Agriculture Service
              </Button>
              <br />
              <p className="text-danger"> {errors}</p>
              <p className="text-success"> {text}</p>
              <br />
            </Form>
            </div>)}
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
  export default connect(mapStateToProps, { updateAgricultureService })(UpdateAgricultureService);
