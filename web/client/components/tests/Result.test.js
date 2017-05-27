import React from 'react';
import renderer from 'react-test-renderer';
import Result from '../Result.jsx';

test("Result renders the result", () => {
    const result = renderer.create(<Result origin={{name: "Foo"}} journeyTime={10} />);
    expect(result.toJSON()).toMatchSnapshot();
});
