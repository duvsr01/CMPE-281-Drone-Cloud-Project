import React, { Component } from "react";
import CustomerHome from "./CustomerHome";
import AdminHome from "./AdminHome";
import Dashboard from "./Dashboard";

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
    } else {
      homeComponent = <Dashboard />
    }

    return (
      <div>
        {<Dashboard />}
        {/* {homeComponent} */}
      </div>
    );
  }
}

export default Home;
