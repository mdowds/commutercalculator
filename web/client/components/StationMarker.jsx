import React from 'react';
import PropTypes from 'prop-types';

export class StationMarker extends React.Component {

    constructor(props) {
        super(props);
        this.openInfoWindow = this.openInfoWindow.bind(this);
    }

    renderMarker() {
        const icon = this.props.isDestination ? "/img/blue.png" : "/img/green.png";

        return new this.props.gmaps.Marker({
            position: this.props.station.position,
            map: this.props.map,
            icon: icon
        });
    }

    renderInfoWindow() {
        const journeyDetails = this.props.time ? "Journey time: " + this.props.time + " minutes" : "Destination";

        return new this.props.gmaps.InfoWindow({
            content: "<h3>" + this.props.station.name + "</h3>" + journeyDetails
        });
    }

    openInfoWindow() {
        if(!this.marker || !this.infoWindow) return;
        this.infoWindow.open(this.marker.getMap(), this.marker);
        this.marker.getMap().addListener('click', () => {
            this.infoWindow.close();
        });
    }

    render(){
        if(!this.props.station || !this.props.gmaps) return null;

        this.marker = this.renderMarker();
        this.infoWindow = this.renderInfoWindow();

        this.marker.addListener('click', this.openInfoWindow);

        return null;
    }
}

StationMarker.propTypes = {
    gmaps: PropTypes.object,
    station: PropTypes.object,
    map: PropTypes.object,
    time: PropTypes.number,
    isDestination: PropTypes.bool,
};

export function DestinationMarker(props) {
    return(<StationMarker isDestination={true} gmaps={props.gmaps} station={props.station} map={props.map} />);
}
