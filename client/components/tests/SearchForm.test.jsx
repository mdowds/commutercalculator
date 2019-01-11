"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var renderer = require("react-test-renderer");
var enzyme_1 = require("enzyme");
var SearchForm_1 = require("../SearchForm");
var SearchFilters_1 = require("../SearchFilters");
var Autocomplete = require("react-autocomplete");
var mockStation = { id: "ABC", name: "Foo Station", position: { lat: 0, lng: 0 } };
test("SearchForm renders the form with Autocomplete", function () {
    var form = renderer.create(<SearchForm_1.default onSubmit={function () { }} destinations={[]}/>);
    expect(form.toJSON()).toMatchSnapshot();
});
test("SearchForm updates inputText when station input changes", function () {
    var form = enzyme_1.shallow(<SearchForm_1.default onSubmit={function () { }} destinations={[]}/>);
    expect(form.state().inputText).toEqual("");
    form.find(Autocomplete).simulate('change', {}, "foo");
    expect(form.state().inputText).toEqual("foo");
});
test("SearchForm updates selectedStation and inputText when station is selected", function () {
    var form = enzyme_1.shallow(<SearchForm_1.default onSubmit={function () { }} destinations={[mockStation]}/>);
    expect(form.state().selectedStation).toBeUndefined();
    expect(form.state().inputText).toEqual("");
    form.find(Autocomplete).simulate('select', mockStation.name, mockStation);
    expect(form.state().inputText).toEqual("Foo Station");
    expect(form.state().selectedStation).toBe(mockStation);
});
test("SearchForm calls onSubmit when Go button clicked", function () {
    var calledWith = {};
    var form = enzyme_1.shallow(<SearchForm_1.default onSubmit={function (x) { return calledWith = x; }} destinations={[mockStation]}/>);
    form.setState({ selectedStation: mockStation });
    form.find('#submitSearch').simulate('click');
    expect(calledWith).toBe(mockStation);
});
test("SearchForm doesn't call onSubmit when Search button clicked with no selected station", function () {
    var submitCalled = false;
    var form = enzyme_1.shallow(<SearchForm_1.default onSubmit={function () { return submitCalled = true; }} destinations={[mockStation]}/>);
    form.find('#submitSearch').simulate('click');
    expect(submitCalled).toEqual(false);
});
test("suggestStationName returns correct results", function () {
    expect(SearchForm_1.default.suggestStationName(mockStation, "Foo")).toEqual(true);
    expect(SearchForm_1.default.suggestStationName(mockStation, "foo")).toEqual(true);
    expect(SearchForm_1.default.suggestStationName(mockStation, "abc")).toEqual(true);
    expect(SearchForm_1.default.suggestStationName(mockStation, "ABC")).toEqual(true);
    expect(SearchForm_1.default.suggestStationName(mockStation, "f")).toEqual(true);
    expect(SearchForm_1.default.suggestStationName(mockStation, "Bar")).toEqual(false);
});
test("SearchForm toggles SearchFilter rendering when Filters button clicked", function () {
    var form = enzyme_1.shallow(<SearchForm_1.default onSubmit={function () { }} destinations={[]}/>);
    expect(form.find(SearchFilters_1.default).length).toEqual(0);
    form.find('#toggleFilters').simulate('click');
    expect(form.find(SearchFilters_1.default).length).toEqual(1);
    form.find('#toggleFilters').simulate('click');
    expect(form.find(SearchFilters_1.default).length).toEqual(0);
});
test("handleFilterChange updates state correctly", function () {
    var form = enzyme_1.shallow(<SearchForm_1.default onSubmit={function () { }} destinations={[]}/>);
    form.instance().handleFilterChange({ maxTime: 10 });
    expect(form.state().filters.maxTime).toEqual(10);
    form.instance().handleFilterChange({ maxTime: 20 });
    expect(form.state().filters.maxTime).toEqual(20);
});
