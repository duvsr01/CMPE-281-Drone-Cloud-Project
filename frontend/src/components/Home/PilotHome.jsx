import React, { Component } from "react";
import { Col, Row, Container,Form,Button } from "react-bootstrap";
import {getDrones} from "../_actions/droneActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";
import PilotCard from "../Pilot/PilotCard";
 
class PilotHome extends Component {
  state={
    drone_id:"",
    name:"",
    type:"",
    size:"",
    description:"",
    image:""
  }

  componentDidMount(){
    this.props.getDrones();
    
  }


  render() {
  const {drones,loading} = this.props.droneState;
  let droneContent;
  if(drones==null || loading){
    <Spinner />
  }
  else{
  droneContent = drones.map((drone,index)=>{
    return(
        <Col key={index} md={3}>
        <PilotCard drone={drone} />
      </Col>)
    
  })}

    
    return (
       <div style={{ height: "75vh" }} >       
        <div className="row">
          <div className="col s12 center-align background blue">
          <h2 className="text-center text-white font-italic font-family-sans-serif">
             Pilot Home
          </h2>
          </div>   
        </div>
      
          <div className="container">
            <div className="container border ">
              <div class="row justify-content-center">
                  <div class="col-md-12"> 
                  <br/>
                  <h5> 
                <Form>
                <Form.Label> <b>Update Pilot Details</b> </Form.Label>
                  <Form.Group controlId="exampleForm.ControlSelect2">
                    <Form.Label>Select Drones to Pilot</Form.Label>
                    <Form.Control as="select" multiple>
                    <option>PHANTOM RTK</option>
                    <option>Agras T16</option>
                    <option>AgrasT16 - Improved</option>
                    <option>Monitoring eBeeX</option>
                    <option>Agrast16-improved</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlSelect3">
                    <Form.Label>Select Days</Form.Label>
                    <Form.Control as="select" multiple>
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                    <option>Sunday</option>
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId="exampleForm.ControlSelect3">
                    <Form.Label>Select Time</Form.Label>
                    <Form.Control as="select" multiple>
                    <option>9 AM - 12 PM</option>
                    <option>1 PM - 5 PM</option>
                    <option>6 PM - 9 PM</option>
                    </Form.Control>
                </Form.Group>

                <Button>Update</Button>
                  
                  </Form>
                  </h5>
                  </div>
            </div>
          </div>
          </div>
          </div>
      
    );
  }
}


PilotHome.propTypes={
  errors: PropTypes.object.isRequired,
  drones:PropTypes.array,
}
const mapStateToProps =(state)=>({
  droneState:state.droneState,
  errorState:state.errorState

})

export default connect(mapStateToProps,{getDrones}) (PilotHome);