"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function travelcardDescription(travelcard) {
    return <div>Zone {travelcard.minZone} to {travelcard.maxZone} travelcard: £{travelcard.price}</div>;
}
function makeDetails(result) {
    var travelcardDiv = result.seasonTickets.travelcard ? travelcardDescription(result.seasonTickets.travelcard) : null;
    var seasonTicketDiv = result.seasonTickets.seasonTicket ? <div>Direct season ticket: £{result.seasonTickets.seasonTicket.price}</div> : null;
    var seasonTicketsDescription = <div>
        {travelcardDiv}
        {seasonTicketDiv}
    </div>;
    return seasonTicketsHasValues(result.seasonTickets) ?
        seasonTicketsDescription :
        <div>Season ticket not found</div>;
}
function seasonTicketsHasValues(seasonTickets) {
    return seasonTickets.travelcard || seasonTickets.seasonTicket;
}
function Result(props) {
    var bgColour = props.isSelected ? '#ddd' : 'white';
    var divStyle = {
        padding: 10,
        borderBottom: "1px solid grey",
        backgroundColor: bgColour
    };
    var details = props.isSelected ? <div style={{ margin: '10px 0px 0px 30px', fontSize: '75%' }}>{makeDetails(props.result)}</div> : null;
    var icon = props.isSelected ? "img/chevron-up.svg" : "img/chevron-down.svg";
    return (<div style={divStyle} onClick={function () { props.onSelectResult(props.result); }}>
            <div>
                <div style={{ float: "left", marginRight: 10 }}><img src={icon} style={{ width: 20, height: 20 }}/></div>
                <div style={{ display: "inline-block", width: "65%" }}>{props.result.origin.name}</div>
                <div style={{ float: "right" }}>{props.result.journeyTime} mins</div>
            </div>
            {details}
        </div>);
}
exports.default = Result;
