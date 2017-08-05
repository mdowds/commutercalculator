import {} from 'jest';
import GoogleMap from '../googlemap'
import MockGmaps from './MockGmapsApi';
import {Position} from '../types';
import arrayContaining = jasmine.arrayContaining;

let map;

beforeEach(() => {
    map = new GoogleMap(MockGmaps);
});

test("initMap() returns a Google Map with correct container", () => {
    const container = {};
    const gmap = map.initMap(container).renderedMap;

    expect(gmap).toEqual(expect.anything());
    expect(gmap.container).toBe(container);
});

test("initMap() returns a Google Map with default options", () => {
    const gmap = map.initMap({}).renderedMap;

    expect(gmap.center).toEqual({lat: 0, lng: 0});
    expect(gmap.zoom).toEqual(5);
    expect(gmap.clickableIcons).toEqual(false);
    expect(gmap.mapTypeControl).toEqual(false);
    expect(gmap.streetViewControl).toEqual(false);
    expect(gmap.fullscreenControlOptions.position).toEqual(MockGmaps.ControlPosition.RIGHT_BOTTOM);
});

test("initMap() returns a Google Map with specified options", () => {
    const gmap = map.initMap({}, {
        center: {lat: 50, lng: 50},
        zoom: 10
    }).renderedMap;

    expect(gmap.center).toEqual({lat: 50, lng: 50});
    expect(gmap.zoom).toEqual(10);
});

test("addMarker() adds and renders a marker", () => {
    const gmap = map.initMap().renderedMap;
    const marker = map.addMarker();
    expect(marker).toEqual(expect.anything());
    expect(marker.markerRendered).toEqual(true);
    expect(marker.map).toBe(gmap);
});

test("addMarker() returns a marker with correct properties", () => {
    const marker = map.addMarker({lat: 50, lng: 50}, "img.png");
    expect(marker.position).toEqual({lat: 50, lng: 50});
    expect(marker.icon).toEqual("img.png");
});

test("Map keeps track of created Google Map", () => {
    const gmap = map.initMap({}).renderedMap;
    expect(map.renderedMap).toBe(gmap);
});

test("Map keeps track of added markers", () => {
    const marker = map.addMarker();
    expect(map.markers[0]).toBe(marker);
    expect(map.markers.length).toEqual(1);
});

test("removeMarkers() removes all markers", () => {
    const gmap = map.initMap({}).renderedMap;
    const marker = map.addMarker();
    map.removeMarkers();
    expect(map.markers.length).toEqual(0);
    expect(marker.map).toBeNull();
    expect(marker.map).not.toBe(gmap);
});

test("resizeToFitMarkers calls fitBounds with correct bounds", () => {
    const points = [{lat: 1.0, lng: 1.0}, {lat: -1.0, lng: -1.0}];
    map.initMap();
    map.addMarker(points[0], "");
    map.addMarker(points[1], "");

    map.resizeToFitMarkers();
    expect(map.renderedMap.getBounds().points).toEqual(arrayContaining(points));
});
