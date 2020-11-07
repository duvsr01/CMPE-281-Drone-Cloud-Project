import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserProfile } from "../_actions/profileActions";
import Home from "../Home/Home";


class Main extends Component {
   componentDidMount() {
  //   this.props.getUserProfile();
   }

  render() {
    return (
      <div>
        <div className="container"></div>
        <BrowserRouter>
          <Switch>
            <Route path="/main/home" Component={Home} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}


export default Main;
