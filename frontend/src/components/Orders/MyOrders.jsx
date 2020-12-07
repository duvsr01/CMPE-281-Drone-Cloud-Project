import React, { Component } from "react";
import { Col, Row, Container, Card, CardDeck } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import swal from 'sweetalert';
import axios from "axios";
import { properties } from "../../properties";
import { getUserOrders } from "../_actions/orderActions";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import BookingUpdateForm from "../Customer/BookingUpdateForm";
import OrderItem from "./OrderItem";
const backendurl = properties.backendhost;

class MyOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      noOrdersMessage: "",
      modalShow: false,
    };
  }

  onHide = () => this.setState({ modalShow: false });

  componentDidMount() {
      let email = localStorage.getItem("email");
      let data = {
          email:email
      }
    this.props.getUserOrders(data);
  }


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
      let rowContent = orders.map((order,rowIndex)=>{
        return (
          <Col key={rowIndex} md={{ span: 25, offset: -1}}>
           <table className="table table-striped table-bordered" >   <tbody>  <OrderItem order={order}/></tbody></table>
          </Col>
        );
      });
      return (
        <div style={{ height: "75vh" }} >
          <div className="row background blue">
            <div className="col center-align">
              <h2 className="text-center text-white font-italic font-family-sans-serif">
                My Service Requests
              </h2>
            </div>
          </div>

          
          <Container>
            {/* <Row>
              <Col md={{ span: 25, offset: -1}}>
                <div>
                  <table className="table table-striped table-bordered" >
                    <thead className="thead-dark">
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
                          <h5>Service Start Date</h5>
                        </td>
                        <td
                          className="text-center  font-weight-bold"
                          scope="col"
                        >
                          <h5>Service End Date</h5>
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
                        <td
                          className="text-center  font-weight-bold"
                          scope="col"
                        >
                          <h5>Location</h5>
                        </td>
                        <td></td>
                       
                      </tr>
                    </thead>
                    </table>
                    </div>
                    </Col>
                    </Row> */}
         <CardDeck>{rowContent}</CardDeck>         
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
  