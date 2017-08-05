import {Position} from "./types";

export interface IGoogleMap {
    initMap(container: Element|null, customOptions: google.maps.MapOptions): IGoogleMap;
    addMarker(position: Position, icon: string): google.maps.Marker;
    removeMarkers(): void;
    panTo(position: Position);
    resize(): void;
    resizeToFitMarkers(): void;
}

export default class GoogleMap implements IGoogleMap {

    gmaps;
    renderedMap: google.maps.Map;
    markers: Array<google.maps.Marker>;

    constructor(apiRef) {
        this.gmaps = apiRef;
        this.markers = [];
    }

    initMap(container: Element|null, customOptions: google.maps.MapOptions) {
        const defaultOptions: google.maps.MapOptions = {
            center: {lat: 0, lng: 0},
            zoom: 5,
            clickableIcons: false,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControlOptions: {position: this.gmaps.ControlPosition.RIGHT_BOTTOM}
        };

        const options = Object.assign(defaultOptions, customOptions);
        this.renderedMap = new this.gmaps.Map(container, options);
        return this;
    }

    addMarker(position: Position, icon: string) {
        const marker = new this.gmaps.Marker({
            map: this.renderedMap,
            position: position,
            icon: icon
        });

        this.markers.push(marker);
        return marker;
    }

    removeMarkers() {
        this.markers.map((marker) => {marker.setMap(null)});
        this.markers = [];
    }

    panTo(position: Position) {
        if(this.renderedMap) this.renderedMap.panTo(position);
    }

    resizeToFitMarkers() {
        let bounds = new this.gmaps.LatLngBounds();
        this.markers.map((marker) => { bounds.extend(marker.getPosition()) });
        this.renderedMap.fitBounds(bounds);
    }

    resize() {
        this.gmaps.event.trigger(this.renderedMap, 'resize');
    }
}