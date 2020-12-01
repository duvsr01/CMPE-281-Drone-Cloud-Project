import React, { Component } from 'react';
import '../../css/droneMarker.css';
import droneImage from '../../common/images/mapDrone.png';
export default class DroneMarker extends Component {

    render() {
      return (
         <div id="marker">
            <img id="droneImage" src={droneImage} alt="drone"/>
            <div id="text">{this.props.text}</div>
         </div>
      );
    }
}