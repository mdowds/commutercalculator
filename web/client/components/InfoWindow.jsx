import React from 'react';
import PropTypes from 'prop-types';
import gmaps from '../gmaps';

export default class InfoWindow extends React.Component {

    generateBody() {
        const journeyDetails = this.props.time ? "Journey time: " + this.props.time + " minutes" : "Destination";
        return "<h3>" + this.props.name + "</h3>" + journeyDetails;
    }

    render() {
        const marker = this.props.marker;

        const infoWindow = new gmaps.InfoWindow({
            content: this.generateBody()
        });

        marker.addListener('click', () => {
            infoWindow.open(marker.getMap(), marker);
        });

        if(marker.getMap()) {
            marker.getMap().addListener('click', () => {
               infoWindow.close();
            });
        }


        return null;
    }
}

InfoWindow.propTypes = {
    name: PropTypes.string,
    time: PropTypes.number,
    marker: PropTypes.object
};
