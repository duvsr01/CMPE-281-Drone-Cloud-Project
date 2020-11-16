import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  Dropdown,
  Button
} from "react-bootstrap";
import firebase from "firebase";
import DropdownButton from "react-bootstrap/DropdownButton";


class Navigationbar extends Component {
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

  onSearchClick = (e) => {
    e.preventDefault();

   // window.location.href = "/main/admin/search";
  };

  render() {
    let displayName;
    let usertype;
    let uid = localStorage.getItem("uid");
    if (uid) {
        displayName = localStorage.getItem("displayName");
        usertype = localStorage.getItem("usertype");

    }
 

    var logoutButton, menuButtons, searchButton;

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

    searchButton = (
      <div className="collapse navbar-collapse navbar-right" id="navbarNav">
        <Nav className="mr-auto"></Nav>
        <Link
          className="nav-link text-dark t-font-size-14"
          to="/"
          onClick={this.onSearchClick}
        >
          Search
        </Link>
      </div>
    );

  

    if (usertype === "customer") {
      menuButtons = (
        <div className="collapse navbar-collapse navbar-right" id="navbarNav">
          <Nav className="mr-auto">
            <Nav.Item>
              <h5 className="text-center text-bold font-">Hi {displayName}</h5>
            </Nav.Item>
          </Nav>
          <Nav className="mr-auto-right mr-sm-2">
          <Nav.Link href="/main/home">Home</Nav.Link>
          <Nav.Link href="/main/customer/search">Search Drones</Nav.Link>
          <DropdownButton id="dropdown-basic-button" title="Account">
            <Dropdown.Item href="/main/customer/account">
              My Account
            </Dropdown.Item>
            <Dropdown.Item href="/main/customer/orders">
              My Orders
            </Dropdown.Item>
            <Dropdown.Item href="/main/customer/tracking">
             Tracking and Monitoring
            </Dropdown.Item>
            <Dropdown.Item href="/main/customer/billing">
              Billing
            </Dropdown.Item>
          </DropdownButton>
          <Nav.Link href="/main/cart">
            <Button>
              {" "}
              <i className="fa fa-shopping-cart" aria-hidden="true">
                Cart{" "}
              </i>
            </Button>
          </Nav.Link>
          </Nav>
        </div>
      );
    } else if (usertype === "admin") {
      menuButtons = (
        <div className="collapse navbar-collapse navbar-right" id="navbarNav">
          <Nav className="mr-auto">
            <Nav.Item>
              <h5 className="text-center text-bold font-">Hi {displayName}</h5>
            </Nav.Item>
          </Nav>
          <Nav className="mr-auto-right mr-sm-2">
          <Nav.Link href="/main/home">Home</Nav.Link>
          <DropdownButton id="dropdown-basic-button" title="Drone Catalog">
          <Dropdown.Item href="/main/admin/viewalldrones">View All Drones</Dropdown.Item>
          <Dropdown.Item href="/main/admin/createdrone">Create Drone</Dropdown.Item>
          <Dropdown.Item href="/main/admin/searchdrones">Search Drones</Dropdown.Item>
        </DropdownButton>
          </Nav>
        </div>
      );
    }

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-white border">
          <Navbar.Brand>
            <Link to="/home" className="nav-link" href="#"></Link>
          </Navbar.Brand>
          {menuButtons}
          <Nav.Link>{logoutButton}</Nav.Link>
        </nav>
      </div>
    );
  }
}

export default Navigationbar;
