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
var MapContainer = (function (_super) {
    __extends(MapContainer, _super);
    function MapContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MapContainer.prototype.setDestination = function (station, map) {
        // if(station.position && station.name && map) {
        map.panTo(station.position);
        map.removeMarkers();
        map.addMarker(station.position, this.makeMarkerImageString(station.name, "blue"));
        // }
    };
    MapContainer.prototype.setOrigin = function (station, map) {
        map.addMarker(station.position, this.makeMarkerImageString(station.name, "green"));
        map.resizeToFitMarkers();
    };
    MapContainer.prototype.createMap = function (mapObj) {
        var trafalgar = { lat: 51.507368, lng: -0.127811 };
        return mapObj.initMap(this.containerElement, {
            center: trafalgar,
            zoom: 11
        });
    };
    MapContainer.prototype.makeMarkerImageString = function (name, colour) {
        return "img/" + colour + "_Marker" + name.toUpperCase().substring(0, 1) + ".png";
    };
    MapContainer.prototype.render = function () {
        var _this = this;
        if (this.props.mapObj) {
            if (!this.map)
                this.map = this.createMap(this.props.mapObj);
            if (this.props.destination) {
                this.setDestination(this.props.destination, this.map);
                if (this.props.origin)
                    this.setOrigin(this.props.origin, this.map);
            }
        }
        var height = this.props.height ? this.props.height : '100%';
        return (<div style={{ width: '100%', height: height }} ref={function (div) { return _this.containerElement = div; }}>Map loading</div>);
    };
    MapContainer.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.height !== this.props.height) {
            this.map.resize();
        }
    };
    return MapContainer;
}(React.Component));
exports.default = MapContainer;
