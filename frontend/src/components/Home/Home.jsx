import React, { Component } from "react";
import CustomerHome from "./CustomerHome";
import AdminHome from "./AdminHome";

class Home extends Component {

  render() {
    var homeComponent;
  
    if (
      localStorage.getItem("usertype") === "admin"
    ) {
      homeComponent = <AdminHome />;
    } else if (
      localStorage.getItem("usertype") === "customer"
    ) {
      homeComponent = <CustomerHome />;
    }

    return (
      <div>
         Home Page
        {homeComponent}
      </div>
    );
  }
}

export default Home;
