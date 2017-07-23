import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import SearchFilters from '../SearchFilters.jsx';

test("SearchFilters renders the filter form", () => {
    const filters = renderer.create(<SearchFilters onChange={() => {}} />);
    expect(filters.toJSON()).toMatchSnapshot();
});

test("SearchFilters calls onChange when minimum journey time changes", () => {
    let selected = null;
    const filters = shallow(<SearchFilters onChange={(x) => selected = x} />);
    filters.find('#minTime').simulate('change', {target: {id: 'minTime', value: 30}});
    expect(selected.minTime).toEqual(30);
});

test("SearchFilters calls onChange when maximum journey time changes", () => {
    let selected = null;
    const filters = shallow(<SearchFilters onChange={(x) => selected = x} />);
    filters.find('#maxTime').simulate('change', {target: {id: 'maxTime', value: 20}});
    expect(selected.maxTime).toEqual(20);
});
