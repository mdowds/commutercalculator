import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import ResultList from '../ResultList.jsx';
import Result from '../Result.jsx';

test("ResultList renders the container", () => {
    const list = renderer.create(<ResultList results={[]} />);
    expect(list.toJSON()).toMatchSnapshot();
});

test("ResultList renders results", () => {
    const list = shallow(<ResultList results={[mockResult(1, 10), mockResult(2, 20)]} />);
    expect(list.find(Result).length).toEqual(2);
});

function mockResult(id, time) {
    return {
        origin: {id: id},
        journeyTime: time
    }
}
