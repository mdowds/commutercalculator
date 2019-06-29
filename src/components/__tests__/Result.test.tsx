import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {} from 'jest';

import Result from '../Result';
import {JourneyResult} from "../../types";

test("Result renders the result", () => {
    const result = renderer.create(<Result result={mockResult(true, true)} isSelected={false} onSelectResult={() => {}} />);
    expect(result.toJSON()).toMatchSnapshot();
});

test("Result renders the result with details for travelcard and season ticket", () => {
    const result = renderer.create(<Result result={mockResult(true, true)} isSelected={true} onSelectResult={() => {}} />);
    expect(result.toJSON()).toMatchSnapshot();
});

test("Result renders the result with details for travelcard but no season ticket", () => {
    const result = renderer.create(<Result result={mockResult(false, true)} isSelected={true} onSelectResult={() => {}} />);
    expect(result.toJSON()).toMatchSnapshot();
});

test("Result renders the result with details for season ticket but no travelcard", () => {
    const result = renderer.create(<Result result={mockResult(true, false)} isSelected={true} onSelectResult={() => {}} />);
    expect(result.toJSON()).toMatchSnapshot();
});

test("Result renders the result with price not found string", () => {
    const result = renderer.create(<Result result={mockResult(false, false)} isSelected={true} onSelectResult={() => {}} />);
    expect(result.toJSON()).toMatchSnapshot();
});

function mockResult(includeSeasonTicket: boolean, includeTravelcard: boolean): JourneyResult {

    const travelcard = includeTravelcard ? {minZone: 1, maxZone: 2, price: 1000} : null;
    const seasonTicket = includeSeasonTicket ? {price: 900} : null;

    return {
        origin: {
            id: "FOO", name: "Foo", position:{lat: 0, lng: 0}, postcode: "E1 1A"
        },
        journeyTime: 10,
        directionsUrl: "https://google.maps",
        seasonTickets: {
            travelcard: travelcard,
            seasonTicket: seasonTicket
        }
    };
}
