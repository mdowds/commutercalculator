import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {} from 'jest';
import Result from '../Result';

const mockResult = {origin: {id: "FOO", name: "Foo", position:{lat: 0, lng: 0}}, journeyTime: 10, seasonTicket: {price: 1000}};

test("Result renders the result", () => {
    const result = renderer.create(<Result result={mockResult} isSelected={false} onSelectResult={() => {}} />);
    expect(result.toJSON()).toMatchSnapshot();
});

test("Result renders the result with details", () => {
    const result = renderer.create(<Result result={mockResult} isSelected={true} onSelectResult={() => {}} />);
    expect(result.toJSON()).toMatchSnapshot();
});

test("Result renders the result with price not found string", () => {
    const mockResultNoPrice = {origin: {id: "FOO", name: "Foo", position:{lat: 0, lng: 0}}, journeyTime: 10, seasonTicket: {price: null}};
    const result = renderer.create(<Result result={mockResultNoPrice} isSelected={true} onSelectResult={() => {}} />);
    expect(result.toJSON()).toMatchSnapshot();
});
