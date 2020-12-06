import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { searchDrones } from "../_actions/droneActions";
import {Row, Col, Form } from "react-bootstrap";
import Spinner from "../../common/Spinner";
import DroneCard from "../Home/DroneCard";
import PropTypes from "prop-types";

class SearchDrones extends Component {

    constructor(props) {
        super(props);
        this.state = {
          name: "",
          description: "",
          type:""
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
       
          const params = {
            name: this.state.name,
            description: this.state.description,
            type:this.state.type
          };
    
          this.props.searchDrones(params);
        
      };

      render() {
        const { text, errors } = this.state;
        
        const {drones,loading} = this.props.droneState;
        let droneContent;
        if(drones==null || loading){
          <Spinner />
        }
        else{
          
        droneContent = drones.map((drone,index)=>{
          return(
              <Col key={index} sm={5}>
              <DroneCard drone={drone} />
            </Col>)
          
        })}

        return (
          <div class="container">
          <div class="row justify-content-center">
              <div class="col-md-8">
                      <div class="card">
                          <div class="card-header">Search Drones</div>
                          <div class="card-body">
            <Form>
               
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  /></Form.Group>
               
               <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={2}
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                  /></Form.Group>

          <Form.Group controlId="type">
            <Form.Label>Type: </Form.Label>
            <Form.Control as="select" name="type" custom onChange={this.handleChange} value={this.state.type}>
              <option value="datacollection">Data Collection</option>
              <option value="spreading">Agriculture Spreading</option>
              <option value="monitoring">Monitoring</option>
              <option value="spraying">Spraying</option>
            </Form.Control>

                
                  </Form.Group>
              <Button
                className="btn btn-primary"
                onClick={this.handleSubmit}
                type="submit"
              >
                Search Drones
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

              <div className="container">
           <div>

             
             
             <Row>{droneContent}</Row>
           </div>
          </div>
          </div>
          
          
          
        );
      }


} 

SearchDrones.propTypes={
    drones:PropTypes.array,
}

  const mapStateToProps = (state) => ({
    store: state.storeState,
    errors: state.errorState,
    droneState:state.droneState
  });
  export default connect(mapStateToProps, { searchDrones })(SearchDrones);
