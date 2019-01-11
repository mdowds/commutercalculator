"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var MapContainer_1 = require("../MapContainer");
var MockGoogleMap_1 = require("./MockGoogleMap");
var mockDest = { id: "STA", position: { lat: 0, lng: 10 }, name: "Station" };
var mockOrigin = { id: "ORG", position: { lat: 5, lng: 0 }, name: "Origin" };
test("MapContainer renders the placeholder", function () {
    var mapC = enzyme_1.shallow(<MapContainer_1.default mapObj={new MockGoogleMap_1.default()} destination={mockDest}/>);
    expect(mapC.text()).toEqual('Map loading');
});
test("MapContainer renders a map when given a mapObj", function () {
    var map = new MockGoogleMap_1.default();
    var mapC = enzyme_1.shallow(<MapContainer_1.default mapObj={map} destination={mockDest}/>);
    expect(map.container).toBe(mapC.containerElement);
    expect(map.customOptions.center).toEqual({ lat: 51.507368, lng: -0.127811 });
    expect(map.customOptions.zoom).toEqual(11);
});
test("MapContainer sets the destination position on the map", function () {
    var map = new MockGoogleMap_1.default();
    var mapC = enzyme_1.shallow(<MapContainer_1.default mapObj={map} destination={mockDest}/>);
    expect(map.panToPosition).toEqual(mockDest.position);
    expect(map.markerPositions).toContain(mockDest.position);
    expect(map.markerImgs).toContain("img/blue_MarkerS.png");
});
test("MapContainer sets the correct height", function () {
    var mapC = enzyme_1.shallow(<MapContainer_1.default mapObj={new MockGoogleMap_1.default()} destination={mockDest} height={'10%'}/>);
    expect(mapC.prop('style').height).toEqual('10%');
    var mapCNoHeight = enzyme_1.shallow(<MapContainer_1.default mapObj={new MockGoogleMap_1.default()} destination={mockDest}/>);
    expect(mapCNoHeight.prop('style').height).toEqual('100%');
});
test("MapContainer resizes the map when height changes", function () {
    var map = new MockGoogleMap_1.default();
    var mapC = enzyme_1.shallow(<MapContainer_1.default mapObj={map} destination={mockDest} height={'10%'}/>);
    var prevProps = mapC.props();
    mapC.setProps({ height: '20%' });
    mapC.instance().componentDidUpdate(prevProps);
    expect(map.resizeCalled).toEqual(true);
});
test("MapContainer sets the origin position on the map", function () {
    var map = new MockGoogleMap_1.default();
    var mapC = enzyme_1.shallow(<MapContainer_1.default mapObj={map} destination={mockDest} origin={mockOrigin}/>);
    expect(map.markerPositions).toContain(mockOrigin.position);
    expect(map.markerImgs).toContain("img/green_MarkerO.png");
});
test("MapContainer does not set the origin position on the map with no destination", function () {
    var map = new MockGoogleMap_1.default();
    var mapC = enzyme_1.shallow(<MapContainer_1.default mapObj={map} origin={mockOrigin}/>);
    expect(map.markerPositions).not.toContain(mockOrigin.position);
    expect(map.markerImgs).not.toContain("img/green_MarkerO.png");
});
test("MapContainer resizes the map when an origin and destination are given", function () {
    var map = new MockGoogleMap_1.default();
    var mapC = enzyme_1.shallow(<MapContainer_1.default mapObj={map} destination={mockDest} origin={mockOrigin}/>);
    expect(map.resizeToFitCalled).toBe(true);
});
