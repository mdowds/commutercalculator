import React from 'react';
import {shallow} from 'enzyme';
import SearchForm from '../SearchForm.jsx';

test("SearchForm updates state when station input changes", () => {
    const form = shallow(<SearchForm onSubmit={()=>{}}/>);
    expect(form.state().stationInput).toEqual("");

    form.find('#stationInput').simulate('change', {target: {value: "foo"}});
    expect(form.state().stationInput).toEqual("foo");
});

test("SearchForm calls onSubmit when Search button clicked", () => {
    let calledWith = "";
    const onSubmit = (x) => { calledWith = x };

    const form = shallow(<SearchForm onSubmit={onSubmit} />);
    form.setState({stationInput: "FOO"});
    form.find('#submitSearch').simulate('click');
    expect(calledWith).toEqual("FOO");
});
