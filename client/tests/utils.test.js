"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
test("isEmptyObject() returns correct results", function () {
    expect(utils_1.isEmptyObject({})).toEqual(true);
    expect(utils_1.isEmptyObject({ foo: "bar" })).toEqual(false);
});
