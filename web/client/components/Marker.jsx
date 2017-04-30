import React from 'react';
import PropTypes from 'prop-types';
import InfoWindow from './InfoWindow.jsx';

export default class Marker extends React.Component {
    render(){
        const marker = new google.maps.Marker({
            position: this.props.position,
            map: this.props.map
        });
        return <InfoWindow info={this.props.info} marker={marker} />;
    }
}

Marker.propTypes = {
    position: PropTypes.object,
    info: PropTypes.node,
    map: PropTypes.object
};
