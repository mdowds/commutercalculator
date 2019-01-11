"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var querystring_1 = require("querystring");
function getJSON(url, params, callback) {
    var fullUrl = isEmptyObject(params) ? url : url + '?' + querystring_1.default.stringify(params);
    fetch(fullUrl).then(function (response) { return response.json(); }).then(callback);
}
exports.getJSON = getJSON;
function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}
exports.isEmptyObject = isEmptyObject;
