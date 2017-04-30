import React from 'react';
import {shallow} from 'enzyme';
import Header from '../Header.jsx';

test("Header displays the destination", () => {
    const header = shallow(<Header dest="Waterloo" />);
    expect(header.text()).toEqual("Journeys to Waterloo")
});

test("Header displays the default text", () => {
    const header = shallow(<Header />);
    expect(header.text()).toEqual("Commuter Calculator")
});
