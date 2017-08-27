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
var Result = (function (_super) {
    __extends(Result, _super);
    function Result() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Result.prototype.travelcardDescription = function (travelcard) {
        return <div>Zone {travelcard.minZone} to {travelcard.maxZone} travelcard: £{travelcard.price}</div>;
    };
    Result.prototype.housePriceDescription = function () {
        var outcode = this.props.result.origin.postcode.split(" ")[0];
        var price = this.props.averageHousePrice ? "£" + this.props.averageHousePrice.toLocaleString('en-GB') : "Loading";
        return <div>Average house price for {outcode}: {price}</div>;
    };
    Result.prototype.makeDetails = function (result) {
        var travelcardDiv = result.seasonTickets.travelcard ? this.travelcardDescription(result.seasonTickets.travelcard) : null;
        var seasonTicketDiv = result.seasonTickets.seasonTicket ? <div>Direct season ticket: £{result.seasonTickets.seasonTicket.price}</div> : null;
        var seasonTicketsDescription = this.seasonTicketsHasValues(result.seasonTickets) ?
            <div>{travelcardDiv}{seasonTicketDiv}</div> :
            <div>Season ticket not found</div>;
        var directionsLink = <span><a href={result.directionsUrl}>View directions on Google Maps</a> (May show a different journey time)</span>;
        return <div>
            {seasonTicketsDescription}
            {this.housePriceDescription()}
            {directionsLink}
        </div>;
    };
    Result.prototype.seasonTicketsHasValues = function (seasonTickets) {
        return seasonTickets.travelcard || seasonTickets.seasonTicket;
    };
    Result.prototype.render = function () {
        var _this = this;
        var bgColour = this.props.isSelected ? '#ddd' : 'white';
        var divStyle = {
            padding: 10,
            borderBottom: "1px solid grey",
            backgroundColor: bgColour
        };
        var details = this.props.isSelected ? <div style={{ margin: '10px 0px 0px 30px', fontSize: '75%' }}>{this.makeDetails(this.props.result)}</div> : null;
        var icon = this.props.isSelected ? "img/chevron-up.svg" : "img/chevron-down.svg";
        return (<div style={divStyle} onClick={function () { _this.props.onSelectResult(_this.props.result); }}>
                <div>
                    <div style={{ float: "left", marginRight: 10 }}><img src={icon} style={{ width: 20, height: 20 }}/></div>
                    <div style={{ display: "inline-block", width: "65%" }}>{this.props.result.origin.name}</div>
                    <div style={{ float: "right" }}>{this.props.result.journeyTime} mins</div>
                </div>
                {details}
            </div>);
    };
    return Result;
}(React.Component));
exports.default = Result;
