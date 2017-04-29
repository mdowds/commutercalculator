import React from 'react';

export default class Map extends React.Component {

    constructor(){
        super();
        this.state = { markers: [] };
    }

    componentDidMount() {
        const trafalgar = {lat: 51.507368, lng: -0.127811};

        this.map = new google.maps.Map(this.refs.map, {
            center: trafalgar,
            zoom: 11
        });

        this.setState({
            markers: [{
                position: trafalgar
            }]
        });
    }

    render() {

        this.state.markers.map((marker) => {
            return new google.maps.Marker({
                position: marker.position,
                map: this.map
            });
        });

        const mapStyle = {
            width: '100%',
            height: '100%'
        };

        return (
            <div ref="map" style={mapStyle}>I should be a map!</div>
        );
    }

}
