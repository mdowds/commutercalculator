import React from 'react';
import PropTypes from 'prop-types';
import Map from './Map.jsx';
import {StationMarker, DestinationMarker} from './StationMarker.jsx'

export default class MapContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            map: {}
        };
    }

    componentDidMount() {
        this.setState({map: this.createMap(this.props.gmaps)});
    }

    createMap(gmaps) {
        const trafalgar = {lat: 51.507368, lng: -0.127811};

        return new gmaps.Map(this.mapDiv, {
            center: trafalgar,
            zoom: 11,
            clickableIcons: false,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControlOptions: {position: gmaps.ControlPosition.RIGHT_BOTTOM}
        });
    }

    render() {
        const map = this.state.map ? this.state.map : null;

        const destMarker = this.props.destination ? <DestinationMarker gmaps={this.props.gmaps} map={map} station={this.props.destination} /> : null;

        // const originsMarkers = this.props.results.map((result) => {
        //     return <StationMarker
        //         key={result.origin.id}
        //         gmaps={this.props.gmaps}
        //         map={map}
        //         station={result.origin}
        //         time={result.journeyTime}
        //     />
        // });

        return (
            <Map divRef={el => this.mapDiv = el}>
                {destMarker}
                {/*{originsMarkers}*/}
            </Map>
        );
    }
}

MapContainer.propTypes = {
    gmaps: PropTypes.object,
    destination: PropTypes.object,
    results: PropTypes.arrayOf(PropTypes.object)
};
