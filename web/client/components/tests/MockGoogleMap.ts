import {IGoogleMap} from "../../googlemap"

export default class MockGoogleMap implements IGoogleMap {

    container: Element|null;
    customOptions;
    panToPosition;
    markerPosition;
    resizeCalled: boolean;
    markerImg: string;

    initMap(container, customOptions) {
        this.container = container;
        this.customOptions = customOptions;
        return this;
    }
    panTo(position) { this.panToPosition = position; }
    removeMarkers() {}
    addMarker(position, img) {
        this.markerPosition = position;
        this.markerImg = img;
    }
    resize() { this.resizeCalled = true; }
}
