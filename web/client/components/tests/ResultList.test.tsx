import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {} from 'jest';
import { shallow } from 'enzyme';
import ResultList from '../ResultList';
import Result from '../Result';
import {JourneyResult} from "../../types";

test("ResultList renders the container", () => {
    const list = renderer.create(<ResultList results={[]} isLoading={false} />);
    expect(list.toJSON()).toMatchSnapshot();
});

test("ResultList renders the container with custom styles", () => {
    const list = renderer.create(<ResultList results={[]} isLoading={false} styles={{height: 200}} />);
    expect(list.toJSON()).toMatchSnapshot();
});

test("ResultList renders the loading indicator", () => {
    const list = renderer.create(<ResultList results={[]} isLoading={true} />);
    expect(list.toJSON()).toMatchSnapshot();
});

test("ResultList renders results", () => {
    const list = shallow(<ResultList results={[mockResult("foo", 10), mockResult("bar", 20)]} isLoading={false} />);
    expect(list.find(Result).length).toEqual(2);
});

test("ResultList renders details for one result when selectedResult is set", () => {
     const list = shallow(<ResultList results={[mockResult("foo", 10), mockResult("bar", 20)]} isLoading={false} />);
     expect(list.find('[showDetails=true]').length).toEqual(0);

     list.instance().handleResultSelection("foo");
     expect(list.find('[showDetails=true]').length).toEqual(1);
});

test("ResultList closes details for one result when selectedResult is set with the same value", () => {
     const list = shallow(<ResultList results={[mockResult("foo", 10), mockResult("bar", 20)]} isLoading={false} />);
     list.instance().handleResultSelection("foo");
     expect(list.find('[showDetails=true]').length).toEqual(1);

     list.instance().handleResultSelection("foo");
     expect(list.find('[showDetails=true]').length).toEqual(0);
});

function mockResult(id, time): JourneyResult {
    return {
        origin: {id: id, name: id, position: {lat: 0, lng: 0}},
        journeyTime: time
    }
}
