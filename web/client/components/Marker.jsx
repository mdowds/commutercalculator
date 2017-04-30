import React from 'react';
import PropTypes from 'prop-types';
import InfoWindow from './InfoWindow.jsx';

export class Marker extends React.Component {
    render(){
        const icon = this.props.isDestination ? "/img/blue.png" : "/img/green.png";

        const marker = new google.maps.Marker({
            position: this.props.position,
            map: this.props.map,
            icon: icon
        });
        return <InfoWindow info={this.props.info} marker={marker} />;
    }
}

Marker.propTypes = {
    position: PropTypes.object,
    info: PropTypes.node,
    map: PropTypes.object,
    isDestination: PropTypes.bool
};

export function DestinationMarker(props) {
    return(<Marker isDestination={true} position={props.position} info={props.info} map={props.map} />);
}
