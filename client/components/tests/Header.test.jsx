"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var renderer = require("react-test-renderer");
var Header_1 = require("../Header");
test("Header renders the title", function () {
    var header = renderer.create(<Header_1.default />);
    var tree = header.toJSON();
    expect(tree).toMatchSnapshot();
});
test("Header renders children", function () {
    var header = renderer.create(<Header_1.default>Child content</Header_1.default>);
    var tree = header.toJSON();
    expect(tree).toMatchSnapshot();
});
