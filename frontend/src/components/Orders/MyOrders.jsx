import React, { Component } from "react";
import { Col, Row, Container, Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import swal from 'sweetalert';
import axios from "axios";
import { properties } from "../../properties";
import { getUserOrders } from "../_actions/orderActions";
import { connect } from "react-redux";
const backendurl = properties.backendhost;

class MyOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      noOrdersMessage: ""
    };
  }

  componentDidMount() {
      let email = localStorage.getItem("email");
      let data = {
          email:email
      }
    this.props.getUserOrders(data);
  }

//   getOrders = async () => {
//     try {
//       let orders = await axios.get(backendurl + 'orders/' + localStorage.getItem("userId"));

//       if (orders.data.length === 0) {
//         this.setState({
//           noOrdersMessage: "Currently, there are no orders for you."
//         })
//       } else {
//         this.setState({
//           ordersList: orders.data
//         })
//       }

//     } catch (e) {
//       console.log(e, e.response);
//     }
//   }

  transformDateTime(data) {
    if (data > 0) {
      let date = new Date(data)
      return date.toUTCString()
    }
    return 0
  }


  render() {
    const { orders } = this.props.orderState;
    if (!Array.isArray(orders) || !orders.length) {
      // array does not exist, is not an array, or is empty
      return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align background blue">
              <h2 className="text-center text-white font-italic font-family-sans-serif">
              My Service Requests
              </h2>
            </div>
          </div>
          <Container>
            <Row>
              <Col md={{ span: 10, offset: 4 }}>
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>
                      There are no service requests!
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      );
    } else {
      return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align background blue">
              <h2 className="text-center text-white font-italic font-family-sans-serif">
                My Service Requests
              </h2>
            </div>
          </div>
          <Container>
            <Row>
              <Col md={{ span: 10, offset: 1 }}>
                <div>
                  <table className="table table-bordered table-hover">
                    <thead className="thead">
                      <tr>
                      
                        <td
                          className="text-center  font-weight-bold"
                          scope="col"
                        >
                          <h5>Drone Name</h5>
                        </td>
                        <td
                          className="text-center  font-weight-bold"
                          scope="col"
                        >
                          <h5>Drone Status</h5>
                        </td>
                        <td
                          className="text-center  font-weight-bold"
                          scope="col"
                        >
                         <h5> Service Name</h5>
                        </td>
                        <td
                          className="text-center  font-weight-bold"
                          scope="col"
                        >
                          <h5>Service Date</h5>
                        </td>
                        <td
                          className="text-center  font-weight-bold"
                          scope="col"
                        >
                          <h5>Service Time</h5>
                        </td>
                        <td
                          className="text-center  font-weight-bold"
                          scope="col"
                        >
                          <h5>Number of Sessions</h5>
                        </td>
                        <td
                          className="text-center  font-weight-bold"
                          scope="col"
                        >
                          <h5>Service Total Cost</h5>
                        </td>
                        <td
                          className="text-center  font-weight-bold"
                          scope="col"
                        >
                          <h5>Request Status</h5>
                        </td>
                       
                      </tr>
                    </thead>
                    <tbody>
                      {orders.length > 0 &&
                        orders.map((order, rowIndex) => {
                          return (
                            <tr key={rowIndex}>
                                                           
                             <td className="text-center text-primary"> <h5>{order.droneName}</h5></td>
                             <td className="text-center text-primary"><h5>{order.droneStatus}</h5></td>
                              <td className="text-center text-primary"><h5>{order.serviceName}</h5></td>
                              <td className="text-center text-primary">
                              <h6>{order.serviceDate}</h6>
                              </td>
                              <td className="text-center text-primary"><h5>{order.serviceTime}</h5></td>
                              <td className="text-center text-primary"><h5>{order.serviceSessionNumber}</h5></td>
                              <td className="text-center text-primary"><h5>{order.serviceTotalCost}</h5></td>
                              <td className="text-center text-primary"><h5>{order.requestStatus}</h5></td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }
}


  const mapStateToProps = (state) => ({
    orderState: state.orderState,
    errors: state.errorState,
  });
  export default connect(mapStateToProps,{getUserOrders})(MyOrders);
  