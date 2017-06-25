import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import SearchForm from '../SearchForm.jsx';
import Autocomplete from 'react-autocomplete';

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
    const dest = {id: "FOO", name: "Foo Station"};
    const form = shallow(<SearchForm onSubmit={()=>{}} destinations={[dest]} />);
    expect(form.state().selectedStation).toEqual({});
    expect(form.state().inputText).toEqual("");

    form.find(Autocomplete).simulate('select', dest.name, dest);
    expect(form.state().inputText).toEqual("Foo Station");
    expect(form.state().selectedStation).toBe(dest);
});

test("SearchForm calls onSubmit when Search button clicked", () => {
    let calledWith = {};
    const dest = {id: "FOO", name: "Foo Station"};

    const form = shallow(<SearchForm onSubmit={x => calledWith = x} destinations={[dest]} />);
    form.setState({selectedStation: dest});
    form.find('#submitSearch').simulate('click');
    expect(calledWith).toBe(dest);
});

test("SearchForm doesn't call onSubmit when Search button clicked with no selected station", () => {
    let submitCalled = false;
    const dest = {id: "FOO", name: "Foo Station"};

    const form = shallow(<SearchForm onSubmit={() => submitCalled = true} destinations={[dest]} />);
    form.find('#submitSearch').simulate('click');
    expect(submitCalled).toEqual(false);
});

test("suggestStationName returns correct results", () => {
    const dest = {id: "ABC", name: "Foo Station"};
    const form = new SearchForm(()=>{} ,[dest]);

    expect(form.suggestStationName(dest, "Foo")).toEqual(true);
    expect(form.suggestStationName(dest, "foo")).toEqual(true);
    expect(form.suggestStationName(dest, "abc")).toEqual(true);
    expect(form.suggestStationName(dest, "ABC")).toEqual(true);
    expect(form.suggestStationName(dest, "f")).toEqual(true);
    expect(form.suggestStationName(dest, "Bar")).toEqual(false);
});
