"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var renderer = require("react-test-renderer");
var Result_1 = require("../Result");
test("Result renders the result", function () {
    var result = renderer.create(<Result_1.default result={mockResult(true, true)} isSelected={false} onSelectResult={function () { }}/>);
    expect(result.toJSON()).toMatchSnapshot();
});
test("Result renders the result with details for travelcard and season ticket", function () {
    var result = renderer.create(<Result_1.default result={mockResult(true, true)} isSelected={true} onSelectResult={function () { }}/>);
    expect(result.toJSON()).toMatchSnapshot();
});
test("Result renders the result with details for travelcard but no season ticket", function () {
    var result = renderer.create(<Result_1.default result={mockResult(false, true)} isSelected={true} onSelectResult={function () { }}/>);
    expect(result.toJSON()).toMatchSnapshot();
});
test("Result renders the result with details for season ticket but no travelcard", function () {
    var result = renderer.create(<Result_1.default result={mockResult(true, false)} isSelected={true} onSelectResult={function () { }}/>);
    expect(result.toJSON()).toMatchSnapshot();
});
test("Result renders the result with price not found string", function () {
    var result = renderer.create(<Result_1.default result={mockResult(false, false)} isSelected={true} onSelectResult={function () { }}/>);
    expect(result.toJSON()).toMatchSnapshot();
});
function mockResult(includeSeasonTicket, includeTravelcard) {
    var travelcard = includeTravelcard ? { minZone: 1, maxZone: 2, price: 1000 } : null;
    var seasonTicket = includeSeasonTicket ? { price: 900 } : null;
    return {
        origin: {
            id: "FOO", name: "Foo", position: { lat: 0, lng: 0 }, postcode: "E1 1A"
        },
        journeyTime: 10,
        directionsUrl: "https://google.maps",
        seasonTickets: {
            travelcard: travelcard,
            seasonTicket: seasonTicket
        }
    };
}
