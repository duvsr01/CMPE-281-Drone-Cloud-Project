import React, { Component } from 'react';
import {Row, Col, Card, CardHeader, CardBody} from 'reactstrap';
import GaugeChart from 'react-gauge-chart';
import "../../css/DashboardDroneLiveDataView.css";
class DashboardDroneLiveDataView extends Component {
    render(){
        var data = this.props.location.state.data;
        return (
            <div className="main">
                <h2>{data.drone_name}</h2>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <div className="title">Drone Battery Usage</div>
                            </CardHeader>
                            <CardBody>
                                <GaugeChart id="battery" 
                                    nrOfLevels={30} 
                                    percent={data.battery / 100} 
                                    textColor="black"
                                    colors={["#FF0000", "#00FF00"]}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <CardHeader>
                                <div className="title">Drone CPU Usage</div>
                            </CardHeader>
                            <CardBody>
                                <GaugeChart id="cpu" 
                                    nrOfLevels={30} 
                                    percent={data.cpu_usage / 100} 
                                    textColor="black"
                                />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <CardHeader>
                                <div className="title">Drone Speed</div>
                            </CardHeader>
                            <CardBody>
                                <GaugeChart id="speed" 
                                    nrOfLevels={30} 
                                    percent={data.speed / 100} 
                                    textColor="black"
                                    formatTextValue={value => value + " mph"}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <h5>Drone ID: {data.drone_id}</h5>
                                <h5>User Email: {data.user_email}</h5>
                                <h5>Description: {data.description}</h5>
                                <h5>Altitude: {data.altitude}</h5>
                                <h5>Distance: {data.distance}</h5>
                                <h5>Payload Weight: {data.payload_weight}</h5>
                                <h5>Payload Type: {data.payload_type}</h5>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default DashboardDroneLiveDataView;