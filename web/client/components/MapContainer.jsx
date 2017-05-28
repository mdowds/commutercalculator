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

        const height = this.props.styles.height ? this.props.styles.height : '100%';

        return (
            <div
                style={{width: '100%', height: height}}
                ref={(div) => this.containerElement = div}
            >Map loading</div>
        )
    }

    componentDidUpdate(prevProps) {
        if(prevProps.styles.height !== this.props.styles.height) {
            this.map.resize();
        }
    }
}

MapContainer.propTypes = {
    mapObj: PropTypes.instanceOf(Map).isRequired,
    destination: PropTypes.object,
    styles: PropTypes.object
};
