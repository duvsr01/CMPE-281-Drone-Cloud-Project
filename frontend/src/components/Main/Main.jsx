import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../Home/Home";
import NavBar from "../navBar/NavBar";
import DroneCatalog from "../admin/DroneCatalog";
import SearchDrones from "../admin/SearchDrones";
import ViewAllDrones from "../admin/ViewAllDrones";


class Main extends Component {
   componentDidMount() {
  //   this.props.getUserProfile();
   }

  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
        </div>
        <BrowserRouter>
          <Switch>
            <Route path="/main/home" component={Home} />
            <Route path="/main/admin/createdrone" component={DroneCatalog} />
            <Route path="/main/admin/searchdrones" component={SearchDrones} />
            <Route path="/main/admin/viewalldrones" component={ViewAllDrones} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}


export default Main;
