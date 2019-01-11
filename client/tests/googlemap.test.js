"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var googlemap_1 = require("../googlemap");
var MockGmapsApi_1 = require("./MockGmapsApi");
var arrayContaining = jasmine.arrayContaining;
var map;
beforeEach(function () {
    map = new googlemap_1.default(MockGmapsApi_1.default);
});
test("initMap() returns a Google Map with correct container", function () {
    var container = {};
    var gmap = map.initMap(container).renderedMap;
    expect(gmap).toEqual(expect.anything());
    expect(gmap.container).toBe(container);
});
test("initMap() returns a Google Map with default options", function () {
    var gmap = map.initMap({}).renderedMap;
    expect(gmap.center).toEqual({ lat: 0, lng: 0 });
    expect(gmap.zoom).toEqual(5);
    expect(gmap.clickableIcons).toEqual(false);
    expect(gmap.mapTypeControl).toEqual(false);
    expect(gmap.streetViewControl).toEqual(false);
    expect(gmap.fullscreenControlOptions.position).toEqual(MockGmapsApi_1.default.ControlPosition.RIGHT_BOTTOM);
});
test("initMap() returns a Google Map with specified options", function () {
    var gmap = map.initMap({}, {
        center: { lat: 50, lng: 50 },
        zoom: 10
    }).renderedMap;
    expect(gmap.center).toEqual({ lat: 50, lng: 50 });
    expect(gmap.zoom).toEqual(10);
});
test("addMarker() adds and renders a marker", function () {
    var gmap = map.initMap().renderedMap;
    var marker = map.addMarker();
    expect(marker).toEqual(expect.anything());
    expect(marker.markerRendered).toEqual(true);
    expect(marker.map).toBe(gmap);
});
test("addMarker() returns a marker with correct properties", function () {
    var marker = map.addMarker({ lat: 50, lng: 50 }, "img.png");
    expect(marker.position).toEqual({ lat: 50, lng: 50 });
    expect(marker.icon).toEqual("img.png");
});
test("Map keeps track of created Google Map", function () {
    var gmap = map.initMap({}).renderedMap;
    expect(map.renderedMap).toBe(gmap);
});
test("Map keeps track of added markers", function () {
    var marker = map.addMarker();
    expect(map.markers[0]).toBe(marker);
    expect(map.markers.length).toEqual(1);
});
test("removeMarkers() removes all markers", function () {
    var gmap = map.initMap({}).renderedMap;
    var marker = map.addMarker();
    map.removeMarkers();
    expect(map.markers.length).toEqual(0);
    expect(marker.map).toBeNull();
    expect(marker.map).not.toBe(gmap);
});
test("resizeToFitMarkers calls fitBounds with correct bounds", function () {
    var points = [{ lat: 1.0, lng: 1.0 }, { lat: -1.0, lng: -1.0 }];
    map.initMap();
    map.addMarker(points[0], "");
    map.addMarker(points[1], "");
    map.resizeToFitMarkers();
    expect(map.renderedMap.getBounds().points).toEqual(arrayContaining(points));
});
