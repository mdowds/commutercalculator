import React from 'react';
import Map from './Map.jsx';
import Marker from './Marker.jsx'

export default class MapContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {map: {}};
    }

    componentDidMount() {
        this.setState({map: this.createMap()});
    }

    createMap() {
        const trafalgar = {lat: 51.507368, lng: -0.127811};

        return new google.maps.Map(this.mapDiv, {
            center: trafalgar,
            zoom: 11,
            clickableIcons: false,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControlOptions: {position: google.maps.ControlPosition.RIGHT_BOTTOM}
        });
    }

    render() {
        const map = this.state.map ? this.state.map : null;

        const destMarker = this.props.destination ? <Marker map={map} position={this.props.destination.position} /> : null;

        const originsMarkers = this.props.results.map((result) => {
            return <Marker key={result.origin.id} map={map} position={result.origin.position} />
        });

        return (
            <Map divRef={el => this.mapDiv = el}>
                {destMarker}
                {originsMarkers}
            </Map>
        );
    }

}
