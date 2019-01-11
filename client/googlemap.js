"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GoogleMap = (function () {
    function GoogleMap(apiRef) {
        this.gmaps = apiRef;
        this.markers = [];
    }
    GoogleMap.prototype.initMap = function (container, customOptions) {
        var defaultOptions = {
            center: { lat: 0, lng: 0 },
            zoom: 5,
            clickableIcons: false,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControlOptions: { position: this.gmaps.ControlPosition.RIGHT_BOTTOM }
        };
        var options = Object.assign(defaultOptions, customOptions);
        this.renderedMap = new this.gmaps.Map(container, options);
        return this;
    };
    GoogleMap.prototype.addMarker = function (position, icon) {
        var marker = new this.gmaps.Marker({
            map: this.renderedMap,
            position: position,
            icon: icon
        });
        this.markers.push(marker);
        return marker;
    };
    GoogleMap.prototype.removeMarkers = function () {
        this.markers.map(function (marker) { marker.setMap(null); });
        this.markers = [];
    };
    GoogleMap.prototype.panTo = function (position) {
        if (this.renderedMap)
            this.renderedMap.panTo(position);
    };
    GoogleMap.prototype.resizeToFitMarkers = function () {
        var bounds = new this.gmaps.LatLngBounds();
        this.markers.map(function (marker) { bounds.extend(marker.getPosition()); });
        this.renderedMap.fitBounds(bounds);
    };
    GoogleMap.prototype.resize = function () {
        this.gmaps.event.trigger(this.renderedMap, 'resize');
    };
    return GoogleMap;
}());
exports.default = GoogleMap;
