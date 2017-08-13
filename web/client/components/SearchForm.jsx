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
var Autocomplete = require("react-autocomplete");
var SearchFormStyles_1 = require("./styles/SearchFormStyles");
var SearchFilters_1 = require("./SearchFilters");
var SearchForm = (function (_super) {
    __extends(SearchForm, _super);
    function SearchForm(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { inputText: "", selectedStation: undefined, showFilters: false, filters: {} };
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.handleFilterChange = _this.handleFilterChange.bind(_this);
        return _this;
    }
    SearchForm.prototype.handleSubmit = function () {
        if (this.state.selectedStation === undefined)
            return;
        this.setState({ showFilters: false });
        this.props.onSubmit(this.state.selectedStation, this.state.filters);
    };
    SearchForm.prototype.handleFilterChange = function (filters) {
        this.setState({ filters: Object.assign(this.state.filters, filters) });
    };
    SearchForm.suggestStationName = function (station, inputText) {
        return (station.name.toLowerCase().indexOf(inputText.toLowerCase()) !== -1 ||
            station.id.toLowerCase().indexOf(inputText.toLowerCase()) !== -1);
    };
    SearchForm.prototype.render = function () {
        var _this = this;
        var filters = this.state.showFilters ? <SearchFilters_1.default onChange={this.handleFilterChange}/> : null;
        return (<div style={SearchFormStyles_1.default.overallWrapper}>
                <Autocomplete value={this.state.inputText} items={this.props.destinations ? this.props.destinations : []} getItemValue={function (station) { return station.name; }} renderItem={function (station, isHighlighted) { return (<div style={SearchFormStyles_1.default.acItem} key={station.id}>{station.name}</div>); }} inputProps={{ placeholder: "Enter destination in Zone 1", style: SearchFormStyles_1.default.searchInput }} menuStyle={SearchFormStyles_1.default.acMenu} onChange={function (event, value) { return _this.setState({ inputText: value }); }} onSelect={function (value, station) { return _this.setState({ inputText: station.name, selectedStation: station }); }} onMenuVisibilityChange={function (isOpen) { return _this.setState({ showFilters: isOpen ? false : _this.state.showFilters }); }} shouldItemRender={SearchForm.suggestStationName} wrapperStyle={SearchFormStyles_1.default.acWrapper}/>
                <input id="toggleFilters" type="button" value="Filters" style={SearchFormStyles_1.default.filtersButton} onClick={function () { _this.setState({ showFilters: !_this.state.showFilters }); }}/>
                <input id="submitSearch" type="button" value="Go" onClick={this.handleSubmit} style={SearchFormStyles_1.default.goButton}/>
                {filters}
            </div>);
    };
    return SearchForm;
}(React.Component));
exports.default = SearchForm;
