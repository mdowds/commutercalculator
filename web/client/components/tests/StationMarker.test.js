import React from 'react';
import {StationMarker} from '../StationMarker.jsx';
import MockGmaps from './MockGmaps';

test("StationMarker renders a Marker", () => {
    expect(renderStationMarker({}).marker.markerRendered).toEqual(true);
});

test("StationMarker renders a Marker in correct position", () => {
    const pos = {lat: 10, lng: -0.5};
    const stationMarker = renderStationMarker({
        station: {position: pos}
    });
    expect(stationMarker.marker.position).toEqual(pos);
});

test("StationMarker renders a Marker on the map", () => {
    const map = {map: "Some map"};
    const stationMarker = renderStationMarker({map: map});
    expect(stationMarker.marker.map).toBe(map);
});

test("StationMarker renders an origin Marker with green icon", () => {
    expect(renderStationMarker({}).marker.icon).toEqual("/img/green.png");
});

test("StationMarker renders a destination Marker with blue icon", () => {
    expect(renderStationMarker({isDestination: true}).marker.icon).toEqual("/img/blue.png");
});

test("StationMarker renders an InfoWindow", () => {
    expect(renderStationMarker({}).infoWindow.infoWindowRendered).toEqual(true);
});

test("StationMarker renders an InfoWindow with origin content", () => {
    const stationMarker = renderStationMarker({
        station: {name: "Victoria"},
        time: 5
    });
    expect(stationMarker.infoWindow.content).toEqual("<h3>Victoria</h3>Journey time: 5 minutes");
});

test("StationMarker renders an InfoWindow with destination content", () => {
    const stationMarker = renderStationMarker({
        station: {name: "Victoria"},
        isDestination: true
    });
    expect(stationMarker.infoWindow.content).toEqual("<h3>Victoria</h3>Destination");
});

function renderStationMarker(props) {
    const stationMarker = new StationMarker({
        gmaps: MockGmaps,
        map: props.map ? props.map : {},
        station: props.station ? props.station : {},
        time: props.time ? props.time : null,
        isDestination: props.isDestination ? props.isDestination : null
    });
    stationMarker.render();
    return stationMarker;
}
