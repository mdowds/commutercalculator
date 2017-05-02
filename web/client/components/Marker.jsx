import React from 'react';
import PropTypes from 'prop-types';
import InfoWindow from './InfoWindow.jsx';
import gmaps from '../gmaps';

export class Marker extends React.Component {
    render(){
        const icon = this.props.isDestination ? "/img/blue.png" : "/img/green.png";

        const marker = new gmaps.Marker({
            position: this.props.position,
            map: this.props.map,
            icon: icon
        });

        return <InfoWindow name={this.props.name} time={this.props.time} marker={marker} />;
    }
}

Marker.propTypes = {
    position: PropTypes.object,
    name: PropTypes.string,
    map: PropTypes.object,
    time: PropTypes.number,
    isDestination: PropTypes.bool
};

export function DestinationMarker(props) {
    return(<Marker isDestination={true} position={props.position} name={props.name} map={props.map} />);
}
