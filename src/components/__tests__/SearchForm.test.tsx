import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import SearchForm from '../SearchForm';
import SearchFilters from '../SearchFilters';
import Autocomplete from 'react-autocomplete';
import {Station} from "../../types"

const mockStation: Station = {id: "ABC", name: "Foo Station", position: {lat: 0, lng: 0}};

test("SearchForm renders the form with Autocomplete", () => {
    const form = renderer.create(<SearchForm onSubmit={()=>{}} destinations={[]} />);
    expect(form.toJSON()).toMatchSnapshot();
});

test("SearchForm updates inputText when station input changes", () => {
    const form = shallow(<SearchForm onSubmit={()=>{}} destinations={[]} />);
    expect(form.state().inputText).toEqual("");

    form.find(Autocomplete).simulate('change', {}, "foo");
    expect(form.state().inputText).toEqual("foo");
});

test("SearchForm updates selectedStation and inputText when station is selected", () => {
    const form = shallow(<SearchForm onSubmit={()=>{}} destinations={[mockStation]} />);
    expect(form.state().selectedStation).toBeUndefined();
    expect(form.state().inputText).toEqual("");
    form.find(Autocomplete).simulate('select', mockStation.name, mockStation);
    expect(form.state().inputText).toEqual("Foo Station");
    expect(form.state().selectedStation).toBe(mockStation);
});

test("SearchForm calls onSubmit when Go button clicked", () => {
    let calledWith = {};

    const form = shallow(<SearchForm onSubmit={x => calledWith = x} destinations={[mockStation]} />);
    form.setState({selectedStation: mockStation});
    form.find('#submitSearch').simulate('click');
    expect(calledWith).toBe(mockStation);
});

test("SearchForm doesn't call onSubmit when Search button clicked with no selected station", () => {
    let submitCalled = false;

    const form = shallow(<SearchForm onSubmit={() => submitCalled = true} destinations={[mockStation]} />);
    form.find('#submitSearch').simulate('click');
    expect(submitCalled).toEqual(false);
});

test("suggestStationName returns correct results", () => {

    expect(SearchForm.suggestStationName(mockStation, "Foo")).toEqual(true);
    expect(SearchForm.suggestStationName(mockStation, "foo")).toEqual(true);
    expect(SearchForm.suggestStationName(mockStation, "abc")).toEqual(true);
    expect(SearchForm.suggestStationName(mockStation, "ABC")).toEqual(true);
    expect(SearchForm.suggestStationName(mockStation, "f")).toEqual(true);
    expect(SearchForm.suggestStationName(mockStation, "Bar")).toEqual(false);
});

test("SearchForm toggles SearchFilter rendering when Filters button clicked", () => {
    const form = shallow(<SearchForm onSubmit={()=>{}} destinations={[]} />);
    expect(form.find(SearchFilters).length).toEqual(0);

    form.find('#toggleFilters').simulate('click');
    expect(form.find(SearchFilters).length).toEqual(1);

    form.find('#toggleFilters').simulate('click');
    expect(form.find(SearchFilters).length).toEqual(0);
});

test("handleFilterChange updates state correctly", () => {
    const form = shallow(<SearchForm onSubmit={()=>{}} destinations={[]} />);
    form.instance().handleFilterChange({maxTime: 10});
    expect(form.state().filters.maxTime).toEqual(10);

    form.instance().handleFilterChange({maxTime: 20});
    expect(form.state().filters.maxTime).toEqual(20);
});
