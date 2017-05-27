import React from 'react';
import {shallow} from 'enzyme';
import MapContainer from '../MapContainer.jsx';
import MockGmaps from './MockGmaps';

test("createMaps() returns a Google Map with correct properties", () => {
    const mapContainer = new MapContainer({gmaps: MockGmaps});
    mapContainer.mapDiv = {div: "Container div"};
    const map = mapContainer.createMap(MockGmaps);

    expect(map.container).toEqual(mapContainer.mapDiv);
    expect(map.center).toEqual({lat: 51.507368, lng: -0.127811});
    expect(map.zoom).toEqual(11);
    expect(map.clickableIcons).toEqual(false);
    expect(map.mapTypeControl).toEqual(false);
    expect(map.streetViewControl).toEqual(false);
    expect(map.fullscreenControlOptions.position).toEqual(MockGmaps.ControlPosition.RIGHT_BOTTOM);
});

test("MapContainer renders a Map", () => {
    const mapContainer = shallow(<MapContainer results={[]}/>);
    expect(mapContainer.find('Map').length).toEqual(1);
});

test("MapContainer renders a Map with a DestinationMarker child", () => {
    const destination = {name: "Victoria"};
    const mapContainer = shallow(<MapContainer results={[]} destination={destination} />);
    const marker = mapContainer.find('Map').children('DestinationMarker');

    expect(marker.length).toEqual(1);
    expect(marker.prop('station')).toEqual(destination);
});

// Obsolete test: results are now rendered in a ResultList
// test("MapContainer renders a Map with StationMarker children", () => {
//     const results = [
//         {origin: {id: "VIC"}, journeyTime: 5},
//         {origin: {id: "PAD"}, journeyTime: 10},
//         {origin: {id: "EUS"}, journeyTime: 12}
//     ];
//
//     const mapContainer = shallow(<MapContainer results={results} />);
//     const markers = mapContainer.find('Map').children('StationMarker');
//
//     expect(markers.length).toEqual(results.length);
//
//     const stations = markers.map(node => node.prop('station').id);
//     expect(stations).toEqual(["VIC","PAD","EUS"]);
//
//     const times = markers.map(node => node.prop('time'));
//     expect(times).toEqual([5,10,12]);
// });
