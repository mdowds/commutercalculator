export default {
    // LatLng: function(lat, lng) {
    //     return {
    //         latitude: parseFloat(lat),
    //         longitude: parseFloat(lng),
    //
    //         lat: function() { return this.latitude; },
    //         lng: function() { return this.longitude; }
    //     };
    // },
    LatLngBounds: class {
        points: Array<any> = [];
        extend(point) { this.points.push(point); }
    },
    // OverlayView: function() {
    //     return {};
    // },
    InfoWindow: function(input) {
        input.infoWindowRendered = true;
        return input;
    },
    Marker: class {
        map;
        position;
        icon;
        markerRendered = false;

        constructor(input) {
            this.map = input.map;
            this.position = input.position;
            this.icon = input.icon;
            this.markerRendered = true;
        }

        setMap(map){ this.map = map; }
        getPosition() { return this.position; }
    },
    // MarkerImage: function() {
    //     return {};
    // },
    Map: function(container, input) {
        return Object.assign({
            container: container,
            fitBounds: function (bounds) { this.bounds = bounds },
            getBounds: function () { return this.bounds }
        }, input);
    },
    // Point: function() {
    //     return {};
    // },
    // Size: function() {
    //     return {};
    // }
    ControlPosition: { RIGHT_BOTTOM: 1 }
}
