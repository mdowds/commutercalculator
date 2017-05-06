export default {
    LatLng: function(lat, lng) {
        return {
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),

            lat: function() { return this.latitude; },
            lng: function() { return this.longitude; }
        };
    },
    LatLngBounds: function(ne, sw) {
        return {
            getSouthWest: function() { return sw; },
            getNorthEast: function() { return ne; }
        };
    },
    OverlayView: function() {
        return {};
    },
    InfoWindow: function(input) {
        input.infoWindowRendered = true;
        return input;
    },
    Marker: function(input) {
        input.addListener = function () {
            return {};
        };

        input.markerRendered = true;
        return input;
    },
    MarkerImage: function() {
        return {};
    },
    Map: function() {
        return {};
    },
    Point: function() {
        return {};
    },
    Size: function() {
        return {};
    }
}
