import React from 'react';
import PropTypes from 'prop-types';
import gmaps from '../gmaps';

export default class InfoWindow extends React.Component {
    render() {
        const infoWindow = new gmaps.InfoWindow({
            content: this.props.info
        });

        this.props.marker.addListener('click', () => {
            infoWindow.open(this.props.marker.getMap(), this.props.marker);
        });

        return null;
    }
}

InfoWindow.propTypes = {
    info: PropTypes.node,
    marker: PropTypes.object
};
