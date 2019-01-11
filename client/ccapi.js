"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var config_1 = require("./config");
function getDestinations(callback) {
    utils_1.getJSON(config_1.default.apiUrl + "destinations", {}, function (json) {
        callback(json);
    });
}
exports.getDestinations = getDestinations;
function getJourneys(originId, selectedFilters, callback) {
    var params = {};
    if (selectedFilters.minTime)
        params.min_time = selectedFilters.minTime;
    if (selectedFilters.maxTime)
        params.max_time = selectedFilters.maxTime;
    utils_1.getJSON(config_1.default.apiUrl + 'journeys/to/' + originId, params, function (json) {
        var response = json;
        callback(response.destination, response.results);
    });
}
exports.getJourneys = getJourneys;
