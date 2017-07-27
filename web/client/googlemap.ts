import {Position} from "./types"

export interface IGoogleMap {
    initMap(container, customOptions): IGoogleMap;
    addMarker;
    removeMarkers;
    panTo;
    resize;
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
        return this.markers = [];
    }

    panTo(position: Position) {
        if(this.renderedMap) this.renderedMap.panTo(position);
    }

    resize() {
        this.gmaps.event.trigger(this.renderedMap, 'resize');
    }
}