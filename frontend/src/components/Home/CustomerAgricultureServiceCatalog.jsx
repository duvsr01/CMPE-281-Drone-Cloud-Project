import React, { Component } from "react";
import {getAgricultureServicesByDroneId} from "../_actions/droneActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";
import {Form} from "react-bootstrap";

import Button from "react-bootstrap/Button";
 
class CustomerAgricultureServiceCatalog extends Component {
  state={
    drone_id:"",
    service_id:"",
    basecost:"",
    description:"",
    name:""
  }

  componentDidMount(){
    const drone_id = this.props.location.state;
    const user_email=localStorage.getItem("email");
    this.setState({
      drone_id: drone_id,
      user_email:user_email
    })

    const params = {
        id : drone_id
      };
    this.props.getAgricultureServicesByDroneId(params);
  }


  addToCart = (index, drone_id, user_email, service_id,service_basecost) => {
    let cartItem = {
      drone_id: drone_id,
      user_email: user_email,
      service_id: service_id,
      service_basecost:service_basecost
    };
    let cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
    if (cart.length > 0) {
      let existingCartItem = cart.find(
        (element) => element.service_id === service_id
      );
      if (existingCartItem) {
       return;
      } else {
        cart.push(cartItem);
      }
  }else {
    cart.push(cartItem);
  };
  localStorage.setItem("cart", JSON.stringify(cart));
  //localStorage.setItem("cart_drone_id", current_cart_drone_id);
  };

  updateService = (e,service_id) => {
    //prevent page from refresh
    //e.preventDefault();

   this.props.history.push("/main/updateservice",service_id);
    
  };


  render() {
  const {agricultureservices,loading} = this.props.droneState;
  let serviceContent;
  if(agricultureservices==null || loading){
    <Spinner />
  }
  else{
  serviceContent = agricultureservices.map((agricultureservice,index)=>{
    return(
       <tr>
           <td className="h6">{agricultureservice.name}</td>
           <td  className="h6">{agricultureservice.basecost}</td>
           <td  className="h6">{agricultureservice.description}</td>
           <td className="text-left">
            {" "}
            <Button
                variant="primary"
                service_id={agricultureservice.service_id}
                onClick={() =>
                  this.addToCart(
                    index,
                    this.state.drone_id,
                    this.state.user_email,
                    agricultureservice.service_id,
                    agricultureservice.basecost
                  )
                }
              >
                Add Service for Booking
              </Button>
            </td>
                                  
       </tr>
    )
    
  })}

    
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align background blue">
            <h2 className="text-center text-white font-italic font-family-sans-serif">
             Service Catalog
            </h2>
          </div>
        </div>
        <div className=" container">
          <div className="container">
            <div>
            <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col"  className="h3">Name</th>
                <th scope="col" className="h3">Basecost</th>
                <th scope="col" className="h3">Description</th>
                
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {serviceContent}
              </tbody>
              </table>
            </div>
          </div>
          </div>
      </div>
    );
  }
}


CustomerAgricultureServiceCatalog.propTypes={
  errors: PropTypes.object.isRequired,
  agricultureServices:PropTypes.array,
}
const mapStateToProps =(state)=>({
  droneState:state.droneState,
  errorState:state.errorState

})

export default connect(mapStateToProps,{getAgricultureServicesByDroneId}) (CustomerAgricultureServiceCatalog);