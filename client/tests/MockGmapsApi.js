"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    // LatLng: function(lat, lng) {
    //     return {
    //         latitude: parseFloat(lat),
    //         longitude: parseFloat(lng),
    //
    //         lat: function() { return this.latitude; },
    //         lng: function() { return this.longitude; }
    //     };
    // },
    LatLngBounds: (function () {
        function class_1() {
            this.points = [];
        }
        class_1.prototype.extend = function (point) { this.points.push(point); };
        return class_1;
    }()),
    // OverlayView: function() {
    //     return {};
    // },
    InfoWindow: function (input) {
        input.infoWindowRendered = true;
        return input;
    },
    Marker: (function () {
        function class_2(input) {
            this.markerRendered = false;
            this.map = input.map;
            this.position = input.position;
            this.icon = input.icon;
            this.markerRendered = true;
        }
        class_2.prototype.setMap = function (map) { this.map = map; };
        class_2.prototype.getPosition = function () { return this.position; };
        return class_2;
    }()),
    // MarkerImage: function() {
    //     return {};
    // },
    Map: function (container, input) {
        return Object.assign({
            container: container,
            fitBounds: function (bounds) { this.bounds = bounds; },
            getBounds: function () { return this.bounds; }
        }, input);
    },
    // Point: function() {
    //     return {};
    // },
    // Size: function() {
    //     return {};
    // }
    ControlPosition: { RIGHT_BOTTOM: 1 }
};
