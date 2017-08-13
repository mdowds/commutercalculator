"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var renderer = require("react-test-renderer");
var Result_1 = require("../Result");
var mockResult = { origin: { id: "FOO", name: "Foo", position: { lat: 0, lng: 0 } }, journeyTime: 10, seasonTicket: { price: 1000 } };
test("Result renders the result", function () {
    var result = renderer.create(<Result_1.default result={mockResult} isSelected={false} onSelectResult={function () { }}/>);
    expect(result.toJSON()).toMatchSnapshot();
});
test("Result renders the result with details", function () {
    var result = renderer.create(<Result_1.default result={mockResult} isSelected={true} onSelectResult={function () { }}/>);
    expect(result.toJSON()).toMatchSnapshot();
});
test("Result renders the result with price not found string", function () {
    var mockResultNoPrice = { origin: { id: "FOO", name: "Foo", position: { lat: 0, lng: 0 } }, journeyTime: 10, seasonTicket: { price: null } };
    var result = renderer.create(<Result_1.default result={mockResultNoPrice} isSelected={true} onSelectResult={function () { }}/>);
    expect(result.toJSON()).toMatchSnapshot();
});
