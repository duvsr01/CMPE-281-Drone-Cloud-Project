import React from "react";
import "../../css/dashboardDroneView.css";


class DashboardServiceView extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount = () => {
        console.log("HI+++" + this.props.location.state.data.user_id);
    }

    render(){
        var s = this.props.location.state.data;
        return (
            <div className="mainDiv1">
                <h2>Service Details</h2>
                <h5>Request Id: {s.request_id}</h5>
                <h5>Service Id: {s.service_id}</h5>
                <h5>Booking Date: {s.service_date}</h5>
                <h5>Drone Id: {s.drone_id}</h5>
                <h5>Session Time: {s.session_time}</h5>
                <h5>Number of Sessions: {s.no_of_sessions}</h5>
                <h5>Service Base Cost: {s.service_basecost}</h5>
                <h5><b>Total Cost: {s.service_totalcost}</b></h5>
            </div>
        );
    }
}

export default DashboardServiceView;