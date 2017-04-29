import React from 'react';

export default class Map extends React.Component {

    render() {

        this.props.markers.map((marker) => {
            return new google.maps.Marker({
                position: marker.position,
                map: this.props.map
            });
        });

        const mapStyle = {
            width: '100%',
            height: '100%'
        };

        return (
            <div ref={this.props.divRef} style={mapStyle}>Map loading</div>
        );
    }

}
