import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../Home/Home";
import NavBar from "../navBar/NavBar";
import DroneCatalog from "../admin/DroneCatalog";
import SearchDrones from "../admin/SearchDrones";
import ViewAllDrones from "../admin/ViewAllDrones";
import AdminDroneDetails from "../Home/AdminDroneDetails";
import CustomerDroneDetails from "../Home/CustomerDroneDetails";
import AdminAgricultureServiceCatalog from "../admin/AdminAgricultureServiceCatalog";
import CustomerAgricultureServiceCatalog from "../Home/CustomerAgricultureServiceCatalog";
import CreateAgricultureService from "../admin/CreateAgricultureService";
import UpdateAgricultureService  from "../admin/UpdateAgricultureService";
import ReviewServiceRequests  from "../BookingService/ReviewServiceRequests";
import MyOrders from "../Orders/MyOrders";
import DashboardServiceView from "../Home/DashboardServiceView";
import DashboardDroneView from "../Home/DashboardDroneView";
import DashboardRequestsView from "../Home/DashboardRequestsView";
import DashboardUsersView from "../Home/DashboardUsersView";
import Dashboard from "../Home/Dashboard";

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
            <Route path="/main/dashboard" component={Dashboard} />
            <Route path="/main/admin/createdrone" component={DroneCatalog} />
            <Route path="/main/admin/searchdrones" component={SearchDrones} />
            <Route path="/main/admin/viewalldrones" component={ViewAllDrones} />
            <Route path="/main/admindronedetails" component={AdminDroneDetails}/> 
            <Route path="/main/customerdronedetails" component={CustomerDroneDetails}/> 
            <Route path="/main/adminservicecatalog" component={AdminAgricultureServiceCatalog}/> 
            <Route path="/main/customerservicecatalog" component={CustomerAgricultureServiceCatalog}/>
            <Route path="/main/createservice" component={CreateAgricultureService}/> 
            <Route path="/main/updateservice" component={UpdateAgricultureService}/> 
            <Route path="/main/admin/reviewServiceRequests" component={ReviewServiceRequests}/>
            <Route path="/main/customer/orders" component={MyOrders}/>
            <Route path="/main/updateservice" component={UpdateAgricultureService}/>
            <Route path="/main/dashboardServiceView" component={DashboardServiceView}/> 
            <Route path="/main/dashboardDroneView" component={DashboardDroneView}/> 
            <Route path="/main/dashboardRequestsView" component={DashboardRequestsView}/> 
            <Route path="/main/dashboardUsersView" component={DashboardUsersView}/> 
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}


export default Main;
