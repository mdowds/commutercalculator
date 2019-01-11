"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var MapContainer_1 = require("./MapContainer");
var Header_1 = require("./Header");
var SearchForm_1 = require("./SearchForm");
var ResultList_1 = require("./ResultList");
var googlemap_1 = require("../googlemap");
var config_1 = require("../config");
var GoogleMapsLoader = require("google-maps");
var CCAPI = require("../ccapi");
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super.call(this) || this;
        _this.state = {
            destination: undefined,
            results: [],
            resultsLoading: false,
            possibleDestinations: [],
            gmapsLoaded: false
        };
        _this.getJourneys = _this.getJourneys.bind(_this);
        _this.apiUrl = config_1.default.apiUrl;
        return _this;
    }
    App.prototype.componentDidMount = function () {
        var _this = this;
        CCAPI.getDestinations(function (destinations) {
            _this.setState({ possibleDestinations: destinations });
        });
        GoogleMapsLoader.KEY = config_1.default.gmapsApiKey;
        GoogleMapsLoader.load(function (google) {
            _this.map = new googlemap_1.default(google.maps);
            _this.setState({ gmapsLoaded: true });
        });
    };
    App.prototype.getJourneys = function (origin, selectedFilters) {
        var _this = this;
        this.setState({ resultsLoading: true });
        CCAPI.getJourneys(origin.id, selectedFilters, function (destination, journeys) {
            _this.setState({ destination: destination, results: journeys, resultsLoading: false });
        });
    };
    App.prototype.shouldDisplayResultList = function () {
        return this.state.results.length > 0 || this.state.resultsLoading;
    };
    App.prototype.render = function () {
        var containerStyle = {
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column"
        };
        return (<div style={containerStyle}>
                <Header_1.default>
                    <SearchForm_1.default destinations={this.state.possibleDestinations} onSubmit={this.getJourneys}/>
                </Header_1.default>
                <MapContainer_1.default mapObj={this.state.gmapsLoaded ? this.map : undefined} destination={this.state.destination} height={this.shouldDisplayResultList() ? '40%' : undefined}/>
                <ResultList_1.default results={this.state.results} isLoading={this.state.resultsLoading} styles={{ height: this.shouldDisplayResultList() ? '60%' : 0 }}/>
            </div>);
    };
    return App;
}(React.Component));
exports.default = App;
