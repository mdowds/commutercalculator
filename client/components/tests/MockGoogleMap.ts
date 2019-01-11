import {IGoogleMap} from "../../googlemap"

export default class MockGoogleMap implements IGoogleMap {

    container: Element|null;
    customOptions;
    panToPosition;
    markerPositions = [];
    resizeCalled = false;
    markerImgs = [];
    resizeToFitCalled = false;

    initMap(container, customOptions) {
        this.container = container;
        this.customOptions = customOptions;
        return this;
    }
    panTo(position) { this.panToPosition = position; }
    removeMarkers() {}
    addMarker(position, img) {
        this.markerPositions.push(position);
        this.markerImgs.push(img);
    }
    resize() { this.resizeCalled = true; }
    resizeToFitMarkers() { this.resizeToFitCalled = true; }
}
