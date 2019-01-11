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
var SearchFilters = (function (_super) {
    __extends(SearchFilters, _super);
    function SearchFilters(props) {
        var _this = _super.call(this, props) || this;
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }
    SearchFilters.prototype.handleChange = function (event) {
        this.props.onChange((_a = {}, _a[event.target.id] = event.target.value, _a));
        var _a;
    };
    SearchFilters.prototype.render = function () {
        var divStyle = {
            fontSize: '90%',
            padding: 5,
            position: 'fixed',
            zIndex: 5,
            backgroundColor: 'white'
        };
        var inputStyle = {
            width: '45%',
            textAlign: 'center',
            padding: 5,
            border: '1px solid grey'
        };
        return (<div style={divStyle}>
                <div>Journey time (minutes):</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
                    <input id="minTime" style={inputStyle} type="number" placeholder="Minimum" onChange={this.handleChange}/>
                    <input id="maxTime" style={inputStyle} type="number" placeholder="Maximum" onChange={this.handleChange}/>
                </div>
            </div>);
    };
    return SearchFilters;
}(React.Component));
exports.default = SearchFilters;
