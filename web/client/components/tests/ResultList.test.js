import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import ResultList from '../ResultList.tsx';
import Result from '../Result.tsx';

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
    const list = shallow(<ResultList results={[mockResult(1, 10), mockResult(2, 20)]} isLoading={false} />);
    expect(list.find(Result).length).toEqual(2);
});

function mockResult(id, time) {
    return {
        origin: {id: id},
        journeyTime: time
    }
}
