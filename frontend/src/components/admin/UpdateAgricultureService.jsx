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
          service_id: "",
          servicetype:""
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
                basecost:service.basecost,
                servicetype:service.servicetype
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
            id:service_id,
            servicetype:this.state.servicetype
          };
    
          this.props.updateAgricultureService(data);

        
      };

      render() {
        const { text, errors } = this.state;

        const agricultureservice = this.props.location.state;

        var dronetype = agricultureservice.dronetype;

        var serviceTypeList;

        if(dronetype === "datacollection") {
          serviceTypeList = [
            { value: 'cropmapping', name: 'Crop Mapping and Surveying' },     
            { value: 'analysis', name: 'Soil and field analysis' },           
          ]; 
        } else if(dronetype === "spraying") {
          serviceTypeList = [
            { value: 'cropspraying', name: 'Crop Spraying and Spot Spraying' },           
          ];
        } else if(dronetype === "spreading") {
          serviceTypeList = [
            { value: 'seedplanting', name: 'Seed Planting' },           
          ];
        } else if(dronetype === "monitoring") {
          serviceTypeList = [
            { value: 'irrigationmonitoring', name: 'Irrigation Monitoring and Management' },     
            { value: 'liverstock', name: 'Real time livestock monitoring' },           
          ]; 
        }

    
        return (
            <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                        <div class="card">
                            <div class="card-header">Update Agriculture Service</div>
                            {[agricultureservice].map(agricultureservice =>      <div class="card-body">
            <Form name="myForm">
            
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

<Form.Group controlId="servicetype">
            <Form.Label>Service Type: </Form.Label>
            <Form.Control as="select" name="servicetype" custom onChange={this.handleChange} value={this.state.servicetype}>
            {serviceTypeList.map((e, key) => {
        return <option key={key} value={e.value}>{e.name}</option>;
    })} 
            </Form.Control> 
                  </Form.Group>
              
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
    errors: state.errorState,
  });
  export default connect(mapStateToProps, { updateAgricultureService })(UpdateAgricultureService);
