import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import CustomerHome from "./CustomerHome";
import AdminHome from "./AdminHome";
//import PilotHome from "./PilotHome";
import { Container, Row, Card, Col } from "react-bootstrap";
import { connect } from "react-redux"; 
import { updateAccount,getUserDetails } from "../_actions/accountActions";
import { properties } from "../../properties";
import PilotHome from "./PilotHome";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: null,
      profileCompleted: null,
      responseStatus: false,
      verified: false,
    };
  }

  componentDidMount(){
    let email=localStorage.getItem("email");
    let data={
       email:email
    }
    this.props.getUserDetails(data);
}

 
  render() {
    var homeComponent;
    const{user}=this.props.accountState;
    let redirectVar;
    let displayMessage;
    console.log("Check for user profile completion : "+user.profileCompleted);
    console.log("User Type: "+user.usertype);
    if (
      user.usertype && user.usertype === "admin"
    ) {
      homeComponent = <AdminHome />;
    } else if (
      user.profileCompleted &&
      user.profileCompleted===1 &&
      user.usertype === "customer"
    ) {
      homeComponent = <CustomerHome />;
    }
    else if (
      user.profileCompleted &&
        user.profileCompleted===1 &&
        user.usertype === "pilot"
      ) {
        homeComponent = <PilotHome />;
      }



      if(Object.keys(user).length>0 && user.usertype !== "admin" && user.profileCompleted!==1) {
        console.log("User profile completed: "+user.profileCompleted);
        console.log("Into redirect");
        // homeComponent = <Redirect to="/userDetailsForm" />;
         window.location.href = "/userDetailsForm";
      }


    return (
      <div>
        {/* {redirectVar} */}
        {homeComponent}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
    accountState: state.accountState,
    errors: state.errorState,
  });

export default connect(mapStateToProps,{getUserDetails})(Home);
