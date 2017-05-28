import React from 'react';
import PropTypes from 'prop-types';
import Map from '../map';

export default class MapContainer extends React.Component {

    constructor(props) {
        super(props);
        this.map = props.mapObj;
    }

    componentDidMount() {
        const trafalgar = {lat: 51.507368, lng: -0.127811};

        this.map.initMap(this.containerElement, {
            center: trafalgar,
            zoom: 11
        });
    }

    setDestination(position, map) {
        if(position && map) {
            map.panTo(position);
            map.removeMarkers();
            map.addMarker(position, "img/blue.png");
        }
    }

    render() {
        this.setDestination(this.props.destination.position, this.map);

        return (
            <div
                style={{width: '100%', height: '50%'}}
                ref={(div) => this.containerElement = div}
            >Map loading</div>
        )
    }
}

MapContainer.propTypes = {
    mapObj: PropTypes.instanceOf(Map).isRequired
};
