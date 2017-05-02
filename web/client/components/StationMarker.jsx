import React from 'react';
import PropTypes from 'prop-types';
import gmaps from '../gmaps';

export class StationMarker extends React.Component {

    constructor(props) {
        super(props);
        this.openInfoWindow = this.openInfoWindow.bind(this);
    }

    renderMarker() {
        const icon = this.props.isDestination ? "/img/blue.png" : "/img/green.png";

        return new gmaps.Marker({
            position: this.props.station.position,
            map: this.props.map,
            icon: icon
        });
    }

    renderInfoWindow() {
        const journeyDetails = this.props.time ? "Journey time: " + this.props.time + " minutes" : "Destination";

        return new gmaps.InfoWindow({
            content: "<h3>" + this.props.station.name + "</h3>" + journeyDetails
        });
    }

    openInfoWindow() {
        if(!this.marker || !this.infoWindow) return;

        // TODO: Fix auto closing of info window when it loses focus
        // if(this.props.openInfoWindow) {
        //     this.props.openInfoWindow.close();
        //     console.log(this.props.openInfoWindow);
        // }

        // this.props.updateOpenInfoWindow(this.infoWindow);
        this.infoWindow.open(this.marker.getMap(), this.marker);

        this.marker.getMap().addListener('click', () => {
            this.infoWindow.close();
        });
    }

    render(){
        if(!this.props.station) return null;

        this.marker = this.renderMarker();
        this.infoWindow = this.renderInfoWindow();

        this.marker.addListener('click', this.openInfoWindow);

        return null;
    }
}

StationMarker.propTypes = {
    station: PropTypes.object,
    map: PropTypes.object,
    time: PropTypes.number,
    isDestination: PropTypes.bool,
    // updateOpenInfoWindow: PropTypes.func,
    // openInfoWindow: PropTypes.object
};

export function DestinationMarker(props) {
    return(<StationMarker isDestination={true} station={props.station} map={props.map} />);
}
