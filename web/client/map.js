export default class Map {
    constructor(apiRef) {
        this.gmaps = apiRef;
        this.markers = [];
    }

    initMap(container, customOptions) {
        const defaultOptions = {
            center: {lat: 0, lng: 0},
            zoom: 5,
            clickableIcons: false,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControlOptions: {position: this.gmaps.ControlPosition.RIGHT_BOTTOM}
        };

        const options = Object.assign(defaultOptions, customOptions);
        return this.renderedMap = new this.gmaps.Map(container, options);
    }

    addMarker(position, icon) {
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

    panTo(position) {
        if(this.renderedMap) this.renderedMap.panTo(position);
    }
}