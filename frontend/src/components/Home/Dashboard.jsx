/*!

=========================================================
* Now UI Dashboard React - v1.4.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

import {withRouter} from "react-router-dom";

import '../../css/dashboard.css';

import axios from "axios";
import {properties} from "../../properties";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  Button,
  Label,
  FormGroup,
  Input,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import PanelHeader from "./PanelHeader.jsx";

import {
  getDashboardPanelChart,
  getBarChart,
  // dashboardPanelChart,
  dashboardShippedProductsChart,
  dashboardAllProductsChart,
  // dashboard24HoursPerformanceChart,
} from "../../variables/charts.js";

class Dashboard extends React.Component {

  constructor() {
    super();
    this.state = {previousOrders: null, ordersPriceChart : [], isAdmin: false, allServicesNames: [], allServicesTotal: [], allService: {}, allUsers: []};
  }

  componentDidMount = () => {
    const backendurl = properties.backendhost + "dashboard";
    // var uid = localStorage.getItem("uid");
    var isAdmin = (localStorage.getItem("usertype").localeCompare("customer") === 0) ? false: true;

    var allServices = {}
    axios.get(backendurl + "/getAllServices")
    .then((res) => {
      res.data.forEach(o => {
        if(allServices[o.service_id] == null){
          allServices[o.service_id] = {}
          allServices[o.service_id]['name'] = o.name;
          allServices[o.service_id]['total'] = 0
          allServices[o.service_id]['data'] = new Array(0,0,0,0,0,0,0,0,0,0,0,0);
        }
      })
      this.setState({allServices: allServices});
    })
    .catch((err) => {
      console.log(err);
    })
    console.log("isadmin", isAdmin);
    if(!isAdmin){ // CUSTOMER
      axios.get(backendurl + "/previousOrders/sruthi.duvvuri1@gmail.com")
      .then((res) => {
        var prevOrders = [];
        var chart = new Array(0,0,0,0,0,0,0,0,0,0,0,0);
        var allServices = this.state.allServices;
        res.data.forEach(o => {
          var total = parseInt(o.service_totalcost);
          allServices[o.service_id]['total'] += total;
          var date = new Date(o.service_date);
          var month = date.getMonth();
          chart[month] = chart[month] + total;
          prevOrders.push(
              <tr onClick={() => this.handleServiceClick(o)} className="tableRow">
                <td>{o.request_id}</td>
                <td>{date.toString().split("GMT")[0]}</td>
                <td>{o.drone_id}</td>
                <td className="text-right">{o.service_totalcost}</td>
              </tr>
          )
        })
        var a = [];
        var b = [];
        for(const id in allServices){
          a.push(allServices[id]['name']);
          b.push(allServices[id]['total']);
        }
        this.setState({previousOrders: prevOrders, ordersPriceChart: chart, allServicesNames: a, allServicesTotal: b});
      })
      .catch((err) => {
        console.log(err);
      })

    }

    else{ // ADMIN
      axios.get(backendurl + "/getAllUsers")
      .then((res) => {
        var allUsers = [];
        res.data.forEach((o) => {
          allUsers.push(
            <tr className="tableRow" onClick={() => this.handleUsersClick(o)}>
              <td>{o.user_id}</td>
              <td>{o.displayName}</td>
              <td>{o.email}</td>
              <td className="text-right">{o.usertype}</td>
            </tr>
          )
        })
        this.setState({allUsers: allUsers});
        console.log("qweqweqwe", this.state.allUsers[0]);
      })
      .catch((err) => {
        console.log(err);
      })

      axios.get(backendurl + "/getAllRequests")
      .then((res) => {
        var allServices = this.state.allServices;
        var allRequests = [];
        var chart = new Array(0,0,0,0,0,0,0,0,0,0,0,0);
        var lineChartData = {};
        res.data.forEach((o) => {
          var name = allServices[o.service_id]['name'];
          var date = new Date(o.service_date);
          var month = date.getMonth();
          if(lineChartData[name] == null){
            lineChartData[name] = new Array(0,0,0,0,0,0,0,0,0,0,0,0);
          }
          var total = parseInt(o.service_totalcost);
          allServices[o.service_id]['total'] += total;
          lineChartData[name][month] += total;
          chart[month] = chart[month] + total;
          var color = (o.request_status === "Approved") ? "Green" : "Black";
          allRequests.push(
            <tr className="tableRow" onClick={() => this.handleRequestsClick(o)}>
              <td>{o.request_id}</td>
              <td>{allServices[o.service_id]['name']}</td>
              <td>{o.email}</td>
              <td>{date.toString().split("GMT")[0]}</td>
              <td>{o.service_totalcost}</td>
              <td style={{color: color}}>{o.request_status}</td>
            </tr>
          )
        });
        var a = [];
        var b = [];
        for(const id in allServices){
          a.push(allServices[id]['name']);
          b.push(allServices[id]['total']);
        }
        // console.log("loop", lineChartData['TryThis']);
        var lineData = [];
        for(const data in lineChartData){
          console.log("loop " + data + lineChartData[data]);
          var temp = {};
          temp['label'] = data;
          temp['data'] = lineChartData[data];
          var r = Math.floor(Math.random() * 256);
          var g = Math.floor(Math.random() * 256);
          var bl = Math.floor(Math.random() * 256);
          temp['borderColor'] = "rgb(" + r + "," + g + "," + bl + ")";
          temp['backgroundColor'] = "rgba(255,255,255,0)";
          lineData.push(temp);
        }
        var servicesLineChart = {};
        servicesLineChart['labels'] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        servicesLineChart['datasets'] = lineData;
        this.setState({allService: allServices, allServicesNames: a, allServicesTotal: b, revenueChart: chart, allRequests: allRequests, servicesLineChart: servicesLineChart})
        console.log("linedata", this.state.lineData[0]);
      })
      .catch((err) => {
        console.log(err);
      })

      axios.get(backendurl + "/getAllDrones")
      .then((res) => {
        var allDrones = []
        res.data.forEach((o) => {
          allDrones.push(
            <tr onClick={() => this.handleDroneClick(o)} className="tableRow">
              <td>{o.name}</td>
              <td>{o.type}</td>
              <td>{o.size}</td>
              <td className="text-right" style={{color: (o.status === "active") ? "green" : "red"}}>{o.status}</td>
            </tr>
          )
        })
        this.setState({allDrones: allDrones})
      })
      .catch((err) => {
        console.log(err);
      })
    }
    this.setState({isAdmin: isAdmin});
  }

  handleDroneClick = (o) => {
    this.props.history.push('/main/dashboardDroneView', {
      data: o
    })
  }

  handleServiceClick = (o) => {
    // const history = useHistory();
    this.props.history.push('/main/dashboardServiceView', {
      data: o
    })
  }

  handleRequestsClick = (o) => {
    this.props.history.push('/main/dashboardRequestsView', {
      data: o
    })
  }

  handleUsersClick = (o) => {
    this.props.history.push('/main/dashboardUsersView', {
      data: o,
      services: this.state.allServices
    })
  }

  render() {

    var dashboardPanelChart = getDashboardPanelChart();
    var barChart = getBarChart();
    var isAdmin = this.state.isAdmin;
    if(!isAdmin){
      dashboardPanelChart.data.datasets[0].data = this.state.ordersPriceChart;
      dashboardPanelChart.data.datasets[0].label = "Total Cost in $";
      barChart.data.datasets[0].label = "Total expenditure in $";

    } else {
      dashboardPanelChart.data.datasets[0].data = this.state.revenueChart;
      dashboardPanelChart.data.datasets[0].label = "Total Revenue in $";
      barChart.data.datasets[0].label = "Total revenue in $";
    }
    barChart.data.labels = this.state.allServicesNames;
    barChart.data.datasets[0].data = this.state.allServicesTotal;

    return (
      <div id="mainDiv">
        <h2>{(isAdmin) ? "Revenue" : "Expenditure"} history</h2>
        <PanelHeader
          size="lg"
          content={
            <Line
              data={dashboardPanelChart.data}
              options={dashboardPanelChart.options}
            />
          }
        />
        <div className="content">
          <Row>
            {/* <Col xs={12} md={4}>
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Global Sales</h5>
                  <CardTitle tag="h4">Shipped Products</CardTitle>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      className="btn-round btn-outline-default btn-icon"
                      color="default"
                    >
                      <i className="now-ui-icons loader_gear" />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Action</DropdownItem>
                      <DropdownItem>Another Action</DropdownItem>
                      <DropdownItem>Something else here</DropdownItem>
                      <DropdownItem className="text-danger">
                        Remove data
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={dashboardShippedProductsChart.data}
                      options={dashboardShippedProductsChart.options}
                    />
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="stats">
                    <i className="now-ui-icons arrows-1_refresh-69" /> Just
                    Updated
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">2020 Sales</h5>
                  <CardTitle tag="h4">All products</CardTitle>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      className="btn-round btn-outline-default btn-icon"
                      color="default"
                    >
                      <i className="now-ui-icons loader_gear" />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Action</DropdownItem>
                      <DropdownItem>Another Action</DropdownItem>
                      <DropdownItem>Something else here</DropdownItem>
                      <DropdownItem className="text-danger">
                        Remove data
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={dashboardAllProductsChart.data}
                      options={dashboardAllProductsChart.options}
                    />
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="stats">
                    <i className="now-ui-icons arrows-1_refresh-69" /> Just
                    Updated
                  </div>
                </CardFooter>
              </Card>
            </Col> */}
            <Col xs={12} md={12}>
              <Card className="card-chart">
                <CardHeader>
                  {/* <h5 className="card-category">Email Statistics</h5> */}
                  <CardTitle tag="h4">{((!isAdmin) ? "Expenditure" : "Revenue") + " by Service Type"}</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Bar
                      data={barChart.data}
                      options={barChart.options}
                    />
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="stats">
                    <i className="now-ui-icons ui-2_time-alarm" /> Last 7 days
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          {isAdmin && <Row>
            <Col xs={12} md={12}>
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h4">Monthly Revenue by Service Type</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={this.state.servicesLineChart}
                      options={dashboardAllProductsChart.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>}
          <Row>
            {isAdmin && <Col xs={12} md={6}>
              <Card className="card-tasks">
                <CardHeader>
                  {/* <h5 className="card-category">Backend Development</h5> */}
                  <CardTitle tag="h4">All Drones</CardTitle>
                </CardHeader>
                <CardBody>
                <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Size</th>
                        <th className="text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody >
                      {this.state.allDrones}
                    </tbody>
                  </Table>
                  {/* <div className="table-full-width table-responsive">
                    <Table>
                      <tbody>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input defaultChecked type="checkbox" />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </td>
                          <td className="text-left">
                            Sign contract for "What are conference organizers
                            afraid of?"
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="info"
                              id="tooltip731609871"
                              type="button"
                            >
                              <i className="now-ui-icons ui-2_settings-90" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip731609871"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="danger"
                              id="tooltip923217206"
                              type="button"
                            >
                              <i className="now-ui-icons ui-1_simple-remove" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip923217206"
                            >
                              Remove
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </td>
                          <td className="text-left">
                            Lines From Great Russian Literature? Or E-mails From
                            My Boss?
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="info"
                              id="tooltip907509347"
                              type="button"
                            >
                              <i className="now-ui-icons ui-2_settings-90" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip907509347"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="danger"
                              id="tooltip496353037"
                              type="button"
                            >
                              <i className="now-ui-icons ui-1_simple-remove" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip496353037"
                            >
                              Remove
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input defaultChecked type="checkbox" />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </td>
                          <td className="text-left">
                            Flooded: One year later, assessing what was lost and
                            what was found when a ravaging rain swept through
                            metro Detroit
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="info"
                              id="tooltip326247652"
                              type="button"
                            >
                              <i className="now-ui-icons ui-2_settings-90" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip326247652"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="danger"
                              id="tooltip389516969"
                              type="button"
                            >
                              <i className="now-ui-icons ui-1_simple-remove" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip389516969"
                            >
                              Remove
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div> */}
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="now-ui-icons loader_refresh spin" /> Updated 3
                    minutes ago
                  </div>
                </CardFooter>
              </Card>
            </Col>}
            <Col xs={12} md={(isAdmin) ? 6 : 12}>
              <Card className="scrollTable">
                <CardHeader>
                  {/* <h5 className="card-category">All Persons List</h5> */}
                  <CardTitle tag="h4">{(!isAdmin) ? "All Previous Orders" : "Customers"}</CardTitle>
                </CardHeader>
                <CardBody >
                  <Table responsive>
                    <thead className="text-primary">
                      {!isAdmin && 
                        <tr>
                          <th>Request ID</th>
                          <th>Start Date</th>
                          <th>Drone ID</th>
                          <th className="text-right">Number of Sessions</th>
                        </tr>
                      }
                      {isAdmin && 
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th className="text-right">User Type</th>
                        </tr>
                      }
                    </thead>
                    <tbody >
                      {!isAdmin && this.state.previousOrders}
                      {isAdmin && this.state.allUsers}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {isAdmin && 
            <Row>
              <Col xs={12} md={12}>
                <Card>
                <CardHeader>
                  <CardTitle tag="h4">Requests</CardTitle>
                </CardHeader>
                <CardBody>
                <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>ID</th>
                        <th>Service Name</th>
                        <th>Requester Email</th>
                        <th>Service Date</th>
                        <th>Total Cost</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody >
                      {this.state.allRequests}
                    </tbody>
                  </Table>
                </CardBody>
                </Card>
              </Col>
            </Row>
          }
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
