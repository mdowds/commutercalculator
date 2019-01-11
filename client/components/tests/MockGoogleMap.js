"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MockGoogleMap = (function () {
    function MockGoogleMap() {
        this.markerPositions = [];
        this.resizeCalled = false;
        this.markerImgs = [];
        this.resizeToFitCalled = false;
    }
    MockGoogleMap.prototype.initMap = function (container, customOptions) {
        this.container = container;
        this.customOptions = customOptions;
        return this;
    };
    MockGoogleMap.prototype.panTo = function (position) { this.panToPosition = position; };
    MockGoogleMap.prototype.removeMarkers = function () { };
    MockGoogleMap.prototype.addMarker = function (position, img) {
        this.markerPositions.push(position);
        this.markerImgs.push(img);
    };
    MockGoogleMap.prototype.resize = function () { this.resizeCalled = true; };
    MockGoogleMap.prototype.resizeToFitMarkers = function () { this.resizeToFitCalled = true; };
    return MockGoogleMap;
}());
exports.default = MockGoogleMap;
