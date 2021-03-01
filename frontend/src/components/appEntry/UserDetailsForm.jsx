import React, { Component } from "react";
import { Col, Form, Navbar, Nav, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { connect } from "react-redux";
import axios from "axios";
import { properties } from "../../properties";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";
import firebase from "firebase";
import { updateAccount,getUserDetails,updateProfile } from "../_actions/accountActions";
import Spinner from "react-bootstrap/Spinner";
import agriculturaldrones from "../../common/images/agriculturaldrones.jpg";

class UserDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      email:"",
      address1: "",
      address2:"",
      cityName: "",
      stateName: "CA",
      zipCode: "",
      formHorizontalRadios: "customer",
      phone:"",
      locality:"",
      ranchName:"",
      errors: "",
      profileCompleted: "",
      loading: false,
      formErrors: {},

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount(){
    let email=localStorage.getItem("email");
    let data={
       email:email
    }
    this.props.getUserDetails(data);
    if(Object.keys(this.props.accountState.user).length>0){
      const user=this.props.accountState.user;
      this.setState({
        profileCompleted:user.profileCompleted
      })
    }
  
    }

    componentDidUpdate(prevProps) {
      console.log("repsonse status is "+ this.props.accountState);
     
      if (
        this.props.accountState &&
        this.props.accountState !== prevProps.accountState
      ) {
        if (this.props.accountState.responseStatus === 200) {   
           this.setState({
            profileCompleted:1,         
            formErrors: {},
          }); 
          
        }
      }
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

  
  
  onLogoutClick = (e) => {
    e.preventDefault();
    // logout logic
    firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
        localStorage.clear(); //for localStorage
        window.location.href = "/";
      })
      .catch(function (error) {
        // An error happened.
        console.log("Error occurred while logging out");
      });
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  validate = () => {
    var letters = /^[0-9a-zA-Z]+$/;

    var zipExp = /^\d{5}(-\d{4})?$/;


    let address1Error = "";
    let address2Error = "";
    let cityNameError = "";
    let stateNameError = "";
    let zipCodeError = "";
    let formHorizontalRadiosError="";
    let phoneError="";
    let localityError="";
    let ranchNameError="";

    if (!this.state.address1) {
      address1Error = "Please enter Address 1";
    }

    if (!this.state.address2) {
      address2Error = "Please enter Address 2";
    }

    if (!this.state.cityName) {
      cityNameError = "Please enter City";
    }

    if (!this.state.stateName) {
      stateNameError = "Please enter State";
    }

    if (!this.state.zipCode) {
      zipCodeError = "Please enter Zipcode";
    } else if (!this.state.zipCode.match(zipExp)) {
      zipCodeError =
        "The US zip code must contain 5 digits. Allowed formats are 12345 or 12345-1234";
    }

    if (!this.state.formHorizontalRadios) {
      formHorizontalRadiosError = "Please select user type";
    }

    if (!this.state.phone) {
      phoneError = "Please enter phone number";
    }

    if (!this.state.locality) {
      localityError = "Please enter locality ";
    }

    if ( this.state.formHorizontalRadios==="customer" && !this.state.ranchName) {
      ranchNameError = "Please enter RanchName ";
    }

    if (
   
      address1Error ||
      address2Error ||
      cityNameError ||
      stateNameError ||
      zipCodeError ||
      formHorizontalRadiosError||
      phoneError||
      localityError||
      ranchNameError
    ) {
      this.setState((prevState) => ({
        formErrors: {
          // object that we want to update
          ...prevState.formErrors, // keep all other key-value pairs
          address1Error: address1Error,
          address2Error: address2Error,
          cityNameError: cityNameError,
          stateNameError: stateNameError,
          zipCodeError: zipCodeError,
          formHorizontalRadiosError: formHorizontalRadiosError,
          phoneError:phoneError,
          localityError:localityError,
          ranchNameError:ranchNameError
        },
      }));
      return false;
    }
    return true;
  };

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      errors: "",
    });

    const isValid = this.validate();

    if (isValid) {
      this.setState({
        loading: true,
      });

      const data = {
        email: localStorage.getItem("email"),
        address1: this.state.address1,
        address2: this.state.address2,
        city: this.state.cityName,
        stateName: this.state.stateName,
        zip: this.state.zipCode,
        usertype: this.state.formHorizontalRadios,
        phone: this.state.phone,
        locality: this.state.locality,
        ranch_name: this.state.ranchName
      };
      console.log("data is in handle submit step 2..", data);

      this.setState({
        loading: true,
      });

      // axios call to set profile
      this.props.updateProfile(data);

      // const backendurl = properties.backendhost + "users/updateProfile";
      // axios
      //   .post(backendurl, data)
      //   .then((response) => {
      //     swal(
      //       "Thank you for registering."
      //     );
      //     this.setState({
      //       profileCompleted: true,
      //       loading: false,
      //     });
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     this.setState({
      //       formErrors: {},
      //       loading: false,
      //     });
      //   });

      //this.props.registerUser(data, this.props.history);
    }
  }
  render() {
    console.log("----------------------- In User Details form -----------------------")
    const { errors, loading } = this.state;
    const{user}=this.props.accountState;

    console.log("user details are:"+ JSON.stringify(user));

    console.log("the profile completed state is"+ this.state.profileCompleted);


    let redirectVar = null;
    if (this.state.profileCompleted === 1 || user.profileCompleted===1) {
      redirectVar = <Redirect to="/main/home" />;
    }

    let spinner;
    if (loading) {
      spinner = <Spinner animation="border" variant="primary" />;
    }

    var logoutButton;

    logoutButton = (
      <div className="collapse navbar-collapse navbar-right" id="navbarNav">
        <Nav className="mr-auto"></Nav>
        <Link
          className="nav-link text-dark t-font-size-14"
          to="/"
          onClick={this.onLogoutClick}
        >
          <i className="fas fa-sign-out-alt pr-2"></i>Logout
        </Link>
      </div>
    );

    console.log(this.state);
    return (
      <div>
      {redirectVar}
        <Navbar bg="light" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav.Link>{logoutButton}</Nav.Link>
          </Navbar.Collapse>
        </Navbar>
        <div className="d-md-flex h-md-100 align-items-center">
          <div className="col-md-6 p-0 bg-indigo h-md-100">
            <div className="text-white d-md-flex align-items-center h-100 p-7 text-center justify-content-center">
              <div className="logoarea pt-5 pb-5">
                <div className="container">           
                    <img
                  src={agriculturaldrones}
                  width="900"
                  height="700"
                  alt="avatar"
                /> 
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 p-0 bg-white h-md-100 loginarea">
            <div className="d-md-flex align-items-right h-md-100 p-5 justify-content-center">
              <div className="container border rounded p-5">
                <div className="container">
                  <span>
                    <div>
                      <h3 className="text-center text-success">Drone Cloud Platform</h3>
                    </div>
                  </span>
                </div>
                <br />
                <br />
                <div></div>
                <h6>
                <Form>
                  <Form.Row>
                  <Form.Group as={Col} controlId="displayName">
                    <Form.Label> Name : {user.displayName}</Form.Label>
                  </Form.Group>

                  <Form.Group as={Col} controlId="email">
                    <Form.Label> Email : {user.email}</Form.Label>
                  </Form.Group>                    
                  </Form.Row>

                  <Form.Group controlId="address1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address1"
                      value={this.state.address1}
                      placeholder="1234 Main St"
                      onChange={this.handleChange}
                    />
                    {this.state.formErrors.address1Error ? (
                      <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.formErrors.address1Error}
                      </div>
                    ) : null}
                  </Form.Group>

                  <Form.Group controlId="address2">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control
                      type="text"
                      name="address2"
                      value={this.state.address2}
                      onChange={this.handleChange}
                    />
                    {this.state.formErrors.address2Error ? (
                      <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.formErrors.address2Error}
                      </div>
                    ) : null}
                  </Form.Group>

                  <Form.Row>
                    <Form.Group as={Col} controlId="cityName">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="cityName"
                        value={this.state.cityName}
                        onChange={this.handleChange}
                      />
                      {this.state.formErrors.cityNameError ? (
                        <div style={{ fontSize: 12, color: "red" }}>
                          {this.state.formErrors.cityNameError}
                        </div>
                      ) : null}
                    </Form.Group>

                    <Form.Group as={Col} controlId="stateName">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        as="select"
                        name="stateName"
                        value={this.state.stateName}
                        onChange={this.handleChange}
                      >
                        <option>CA</option>
                        <option>TX</option>
                        <option>VA</option>
                      </Form.Control>
                      {this.state.formErrors.stateNameError ? (
                        <div style={{ fontSize: 12, color: "red" }}>
                          {this.state.formErrors.stateNameError}
                        </div>
                      ) : null}
                    </Form.Group>

                    <Form.Group as={Col} controlId="zipCode">
                      <Form.Label>Zip</Form.Label>
                      <Form.Control
                        type="text"
                        name="zipCode"
                        value={this.state.zipCode}
                        onChange={this.handleChange}
                      />
                      {this.state.formErrors.zipCodeError ? (
                        <div style={{ fontSize: 12, color: "red" }}>
                          {this.state.formErrors.zipCodeError}
                        </div>
                      ) : null}
                    </Form.Group>
                  </Form.Row>               

                  <fieldset>
                  <Form.Group as={Row}>
                    <Form.Label as="legend" column sm={2}>
                      User Type
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Check
                        onChange={this.handleChange}
                        type="radio"
                        label="customer"
                        name="formHorizontalRadios"
                        value="customer"
                        id="customer"
                        defaultChecked    
                      />
                      <Form.Check
                        onChange={this.handleChange}
                        type="radio"
                        label="pilot"
                        name="formHorizontalRadios"
                        value="pilot"
                        id="pilot"
                 
                      />                  
                    </Col>
                  </Form.Group>
                </fieldset>
              
                {this.state.formHorizontalRadios && 
                this.state.formHorizontalRadios === "customer" ?
                (<div>
                   <Form.Row>
                  <Form.Group as={Col} controlId="phone">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        value={this.state.phone}
                        onChange={this.handleChange}
                      />
                      {this.state.formErrors.phoneError ? (
                        <div style={{ fontSize: 12, color: "red" }}>
                          {this.state.formErrors.phoneError}
                        </div>
                      ) : null}
                    </Form.Group>

                    <Form.Group as={Col} controlId="locality">
                      <Form.Label>Locality</Form.Label>
                      <Form.Control
                        type="text"
                        name="locality"
                        value={this.state.locality}
                        onChange={this.handleChange}
                      />
                      {this.state.formErrors.localityError ? (
                        <div style={{ fontSize: 12, color: "red" }}>
                          {this.state.formErrors.localityError}
                        </div>
                      ) : null}
                    </Form.Group>
                    
                    <Form.Group as={Col} controlId="ranchName">
                      <Form.Label>Ranch</Form.Label>
                      <Form.Control
                        type="text"
                        name="ranchName"
                        value={this.state.ranchName}
                        onChange={this.handleChange}
                      />
                      {this.state.formErrors.ranchNameError ? (
                        <div style={{ fontSize: 12, color: "red" }}>
                          {this.state.formErrors.ranchNameError}
                        </div>
                      ) : null}
                    </Form.Group>
                    </Form.Row>
                </div>)
                :(<div>                  
                </div>)}

                {this.state.formHorizontalRadios && 
                this.state.formHorizontalRadios === "pilot" ?
                (<div>
                   <Form.Row>
                  <Form.Group as={Col} controlId="phone">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        value={this.state.phone}
                        onChange={this.handleChange}
                      />
                      {this.state.formErrors.phoneError ? (
                        <div style={{ fontSize: 12, color: "red" }}>
                          {this.state.formErrors.phoneError}
                        </div>
                      ) : null}
                    </Form.Group>

                    <Form.Group as={Col} controlId="locality">
                      <Form.Label>Locality</Form.Label>
                      <Form.Control
                        type="text"
                        name="locality"
                        value={this.state.localityError}
                        onChange={this.handleChange}
                      />
                      {this.state.formErrors.localityError ? (
                        <div style={{ fontSize: 12, color: "red" }}>
                          {this.state.formErrors.localityError}
                        </div>
                      ) : null}
                    </Form.Group>
                    </Form.Row>         
                    </div>)
                :(<div>                  
                </div>)}

                  <Button
                    className="btn btn-success"
                    type="submit"
                    onClick={this.handleSubmit}
                    // disabled={!this.state.screenName || !this.state.nickName}
                  >
                    Proceed
                  </Button>
                  {spinner}
                  <br />
                  <p className="text-danger"> {errors}</p>
                </Form>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
    accountState: state.accountState,
    errors: state.errorState,
  });

export default connect(mapStateToProps,{updateAccount,getUserDetails,updateProfile})(UserDetailsForm);
