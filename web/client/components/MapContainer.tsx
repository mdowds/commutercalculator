import * as React from 'react';
import {IGoogleMap} from '../googlemap';
import {Station} from '../types'

interface MapContainerProps {
    readonly mapObj?: IGoogleMap;
    readonly destination?: Station;
    readonly height?: string;
}

export default class MapContainer extends React.Component<MapContainerProps, {}> {

    containerElement: Element|null;
    map: IGoogleMap;

    private setDestination(station: Station, map: IGoogleMap) {
        // if(station.position && station.name && map) {
            map.panTo(station.position);
            map.removeMarkers();
            map.addMarker(station.position, "img/blue_Marker" + station.name.toUpperCase().substring(0,1) + ".png");
        // }
    }

    private createMap(mapObj: IGoogleMap): IGoogleMap {
        const trafalgar = {lat: 51.507368, lng: -0.127811};

        return mapObj.initMap(this.containerElement, {
            center: trafalgar,
            zoom: 11
        });
    }

    render() {
        if(this.props.mapObj) {
            if(!this.map) this.map = this.createMap(this.props.mapObj);
            if(this.props.destination) this.setDestination(this.props.destination, this.map);
        }

        const height = this.props.height ? this.props.height : '100%';

        return (
            <div
                style={{width: '100%', height: height}}
                ref={(div) => this.containerElement = div}
            >Map loading</div>
        )
    }

    componentDidUpdate(prevProps: MapContainerProps) {
        if(prevProps.height !== this.props.height) {
            this.map.resize();
        }
    }
}
