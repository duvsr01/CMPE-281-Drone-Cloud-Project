import React, { Component} from "react";
import { connect } from "react-redux";
import { Card, Button, Col , Row} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { bookDroneService } from "../_actions/serviceActions";
import sprayingservice from "../../common/images/sprayingservice.png";
import fieldmapping from "../../common/images/fieldmapping.png";
 
import swal from "sweetalert";
 
class ServiceCard extends Component {
  constructor(props) {
  super(props);
  this.state={
    drone_id:"",
    service_id:"",
    user_email:"",
    name:"",
    description:"",
    basecost:"",
    date:"",
    sessionTime:"15",
    sessionNumber:"1",
    added:false
  };
this.handleDateSelect = this.handleDateSelect.bind(this);
this.handleDateChange = this.handleDateChange.bind(this);
}

componentDidMount(){
    let date = new Date();
    this.setState({
        date:date
    })
}

  handleDateChange = value=> {
    this.setState({
      date: value,
    });
  };

  handleDateSelect = value => {
    console.log("the event is"+value);
    this.setState({
      date: value ,
    });
  };

  sessionTimeChange = async (e) => {
    this.setState({
      sessionTime: e.target.value,
    });
  };

  sessionNumberChange = async (e) => {
    this.setState({
      sessionNumber: e.target.value,
    });
  };

  bookService = (drone_id,user_email,service_id,basecost,date,sessionTime,sessionNumber) => {
    this.setState({
      added:true,
    });

    // let existing_cart_drone_id = localStorage.getItem("cart_drone_id");
    // let current_drone_id = drone_id;
    // console.log("the existing store id" + existing_cart_drone_id);
    // console.log("the current cart store id" + current_drone_id);
    // if (
    //   existing_cart_drone_id !== null &&
    //   existing_cart_drone_id.toString().trim() !==
    //   current_drone_id.toString().trim()
    // ) {
    //   swal(
    //     "Cannot add services from mutiple drones in one booking. Clear existing booking to services from new drone"
    //   );
    //   return;
    // }
    let data = {
      drone_id: drone_id,
      user_email: user_email,
      service_id: service_id,
      service_basecost:basecost,
      service_date:date,
      session_time:sessionTime,
      no_of_sessions:sessionNumber,
      service_totalcost: eval("basecost * sessionTime * sessionNumber"),
    };

    this.props.bookDroneService(data);
    
    // let cart = localStorage.getItem("cart")
    // ? JSON.parse(localStorage.getItem("cart"))
    // : [];
    // if (cart.length > 0) {
    //   let existingCartItem = cart.find(
    //     (element) => (element.drone_id === drone_id && element.service_id === service_id)
    //   );
    //   if (existingCartItem) {
    //    return;
    //   } else {
    //     cart.push(cartItem);
    //   }
    //   }else {
    //     cart.push(cartItem);
    //   };
    //   localStorage.setItem("cart", JSON.stringify(cart));
    //   localStorage.setItem("cart_drone_id", drone_id);
  };


  render() {
    const{drone_id}=this.props;

    const user_email =localStorage.getItem("email");
    const{date,sessionTime,sessionNumber} =this.state;
    console.log("details "+ drone_id,user_email,date,sessionTime,sessionNumber);
    
    return(
      <Card bg="white" style={{ width: "25rem", margin: "5rem" }}>
      <Card.Img variant="top" src={fieldmapping} />
         {/* <Card.Body><Card.Img variant="top" src={this.props.product.imageURL} /> */}
          <Col>
            <Card.Title> <b>Service Name: {this.props.service.name} </b></Card.Title>
            <Card.Text>
              <b>Description: </b>
              {this.props.service.description}
            </Card.Text>
            <Card.Text>
              <b>Basecost: </b>${this.props.service.basecost}  
            </Card.Text>
            <Card.Text>
              <b> Select Date: </b> 
            </Card.Text>
            <DatePicker
            selected={date}
            onChange={event =>
              this.handleDateChange(
                event
              )
            }
            onSelect={event =>
              this.handleDateSelect(
                event
              )
            }
          />
            <Card.Text>
               <br/>
              <b> Select time required per session: </b>
            </Card.Text>
            <select onChange={this.sessionTimeChange} > 
              <option selected value="15">15</option>
              <option value="30">30</option>
              <option value="45">45</option>
              <option value="60">60</option>
            </select>
            <p>Minutes</p>
             <Card.Text>
             <br/>
              <b> Choose number of sessions: </b>
            </Card.Text>
            <input
              type="number"
              defaultValue="1"
              name="sessionNumber"
              min="0"
              className="mt-auto"
              onChange={ this.sessionNumberChange}
            ></input>
          </Col>
          <br/>
            
            <Button
                variant="primary"
                disabled={this.state.added}
                onClick={() =>
                  this.bookService(
                    this.props.drone_id,
                    this.props.user_email,
                    this.props.service.service_id,
                    this.props.service.basecost,
                    date,
                    sessionTime,
                    sessionNumber
                  )
                }
              >
                Book Drone Service
              </Button>
              <Col><br/></Col>
          </Card>
    )}
    }

const mapStateToProps =(state)=>({
    droneState:state.droneState,
    serviceState:state.serviceState,
    errorState:state.errorState
  
  })
  
  
export default connect(mapStateToProps,{bookDroneService}) (ServiceCard);