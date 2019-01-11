import * as React from 'react';
import {} from 'jest';
import { shallow } from 'enzyme';
import MapContainer from '../MapContainer';
import MockGoogleMap from './MockGoogleMap';
import {Station} from "../../types";

const mockDest: Station = {id: "STA", position: {lat: 0, lng: 10}, name: "Station"};
const mockOrigin: Station = {id: "ORG", position: {lat: 5, lng: 0}, name: "Origin"};

test("MapContainer renders the placeholder", () => {
    const mapC = shallow(<MapContainer mapObj={new MockGoogleMap()} destination={mockDest}/>);
    expect(mapC.text()).toEqual('Map loading');
});

test("MapContainer renders a map when given a mapObj", () => {
    const map = new MockGoogleMap();
    const mapC = shallow(<MapContainer mapObj={map} destination={mockDest} />);

    expect(map.container).toBe(mapC.containerElement);
    expect(map.customOptions.center).toEqual({lat: 51.507368, lng: -0.127811});
    expect(map.customOptions.zoom).toEqual(11);
});

test("MapContainer sets the destination position on the map", () => {
    const map = new MockGoogleMap();
    const mapC = shallow(<MapContainer mapObj={map} destination={mockDest} />);

    expect(map.panToPosition).toEqual(mockDest.position);
    expect(map.markerPositions).toContain(mockDest.position);
    expect(map.markerImgs).toContain("img/blue_MarkerS.png");
});

test("MapContainer sets the correct height", () => {
    const mapC = shallow(<MapContainer mapObj={new MockGoogleMap()} destination={mockDest} height={'10%'}/>);
    expect(mapC.prop('style').height).toEqual('10%');

    const mapCNoHeight = shallow(<MapContainer mapObj={new MockGoogleMap()} destination={mockDest}/>);
    expect(mapCNoHeight.prop('style').height).toEqual('100%');
});

test("MapContainer resizes the map when height changes", () => {
    const map = new MockGoogleMap();
    const mapC = shallow(<MapContainer mapObj={map} destination={mockDest} height={'10%'}/>);
    const prevProps = mapC.props();
    mapC.setProps({height: '20%'});
    mapC.instance().componentDidUpdate(prevProps);

    expect(map.resizeCalled).toEqual(true);
});

test("MapContainer sets the origin position on the map", () => {
    const map = new MockGoogleMap();
    const mapC = shallow(<MapContainer mapObj={map} destination={mockDest} origin={mockOrigin} />);

    expect(map.markerPositions).toContain(mockOrigin.position);
    expect(map.markerImgs).toContain("img/green_MarkerO.png");
});

test("MapContainer does not set the origin position on the map with no destination", () => {
    const map = new MockGoogleMap();
    const mapC = shallow(<MapContainer mapObj={map} origin={mockOrigin} />);

    expect(map.markerPositions).not.toContain(mockOrigin.position);
    expect(map.markerImgs).not.toContain("img/green_MarkerO.png");
});

test("MapContainer resizes the map when an origin and destination are given", () => {
    const map = new MockGoogleMap();
    const mapC = shallow(<MapContainer mapObj={map} destination={mockDest} origin={mockOrigin} />);

    expect(map.resizeToFitCalled).toBe(true);
});
