import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../Home/Home";
import NavBar from "../navBar/NavBar";

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
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}


export default Main;
