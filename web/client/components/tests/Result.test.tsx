import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Result from '../Result';

test("Result renders the result", () => {
    const result = renderer.create(<Result origin={{id: "FOO", name: "Foo"}} journeyTime={10} />);
    expect(result.toJSON()).toMatchSnapshot();
});
