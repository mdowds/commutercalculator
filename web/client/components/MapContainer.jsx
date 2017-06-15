import React from 'react';
import PropTypes from 'prop-types';
import Map from '../map';

export default class MapContainer extends React.Component {

    setDestination(station, map) {
        if(station.position && station.name && map) {
            map.panTo(station.position);
            map.removeMarkers();
            map.addMarker(station.position, "img/blue_Marker" + station.name.toUpperCase().substring(0,1) + ".png");
        }
    }

    createMap() {
        const trafalgar = {lat: 51.507368, lng: -0.127811};

        return this.props.mapObj.initMap(this.containerElement, {
            center: trafalgar,
            zoom: 11
        });
    }

    render() {
        if(this.props.mapObj) {
            if(!this.map) this.map = this.createMap();
            this.setDestination(this.props.destination, this.map);
        }

        const height = this.props.height ? this.props.height : '100%';

        return (
            <div
                style={{width: '100%', height: height}}
                ref={(div) => this.containerElement = div}
            >Map loading</div>
        )
    }

    componentDidUpdate(prevProps) {
        if(prevProps.height !== this.props.height) {
            this.map.resize();
        }
    }
}

MapContainer.propTypes = {
    mapObj: PropTypes.instanceOf(Map),
    destination: PropTypes.object,
    height: PropTypes.string
};
