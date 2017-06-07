import React from 'react';
import { shallow } from 'enzyme';
import MapContainer from '../MapContainer.jsx';
import MockMap from './MockMap';

const mockStation = {position: {lat: 0, long: 10}, name: "Station"};

test("MapContainer renders the placeholder", () => {
    const mapC = shallow(<MapContainer />);
    expect(mapC.text()).toEqual('Map loading');
});

test("MapContainer renders a map when given a mapObj", () => {
    const map = new MockMap();
    const mapC = shallow(<MapContainer mapObj={map} destination={mockStation} />);

    expect(map.container).toBe(mapC.containerElement);
    expect(map.customOptions.center).toEqual({lat: 51.507368, lng: -0.127811});
    expect(map.customOptions.zoom).toEqual(11);
});

test("MapContainer sets the destination position on the map", () => {
    const map = new MockMap();
    const mapC = shallow(<MapContainer mapObj={map} destination={mockStation} />);

    expect(map.panToPosition).toEqual(mockStation.position);
    expect(map.markerPosition).toEqual(mockStation.position);
    expect(map.markerImg).toEqual("img/blue_MarkerS.png");
});

test("MapContainer sets the correct height", () => {
    const mapC = shallow(<MapContainer mapObj={new MockMap()} destination={mockStation} height={'10%'}/>);
    expect(mapC.prop('style').height).toEqual('10%');

    const mapCNoHeight = shallow(<MapContainer mapObj={new MockMap()} destination={mockStation}/>);
    expect(mapCNoHeight.prop('style').height).toEqual('100%');
});

test("MapContainer resizes the map when height changes", () => {
    const map = new MockMap();
    const mapC = shallow(<MapContainer mapObj={map} destination={mockStation} height={'10%'}/>);
    const prevProps = mapC.props();
    mapC.setProps({height: '20%'});
    mapC.instance().componentDidUpdate(prevProps);

    expect(map.resizeCalled).toEqual(true);
});
