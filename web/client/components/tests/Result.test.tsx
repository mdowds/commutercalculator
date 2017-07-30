import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {} from 'jest';
import Result from '../Result';

test("Result renders the result", () => {
    const result = renderer.create(<Result origin={{id: "FOO", name: "Foo", position:{lat: 0, lng: 0}}} journeyTime={10} showDetails={false} onSelectResult={() => {}} />);
    expect(result.toJSON()).toMatchSnapshot();
});

test("Result renders the result with details", () => {
    const result = renderer.create(<Result origin={{id: "FOO", name: "Foo", position:{lat: 0, lng: 0}}} journeyTime={10} showDetails={true} onSelectResult={() => {}} />);
    expect(result.toJSON()).toMatchSnapshot();
});
