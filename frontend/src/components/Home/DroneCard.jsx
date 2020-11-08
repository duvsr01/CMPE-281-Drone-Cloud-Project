import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Col, Row, Button } from "react-bootstrap";
import { connect } from "react-redux";

class DroneCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  render() {
    const { drone } = this.props;
    return (
    <Card bg="white" style={{ width: "25rem", margin: "1rem" }}>
    <Card.Img variant="top" src="holder.js/100px180" />
    <Card.Body>
    <Card.Title>{drone.name}</Card.Title>
    <Card.Text>
        {drone.description}
    </Card.Text>
    <Button variant="primary">Details</Button>
    </Card.Body>
    </Card>
    );
  }
}


export default DroneCard;
