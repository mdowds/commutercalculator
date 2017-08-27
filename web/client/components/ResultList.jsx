"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Result_1 = require("./Result");
function default_1(props) {
    var entries = props.results.map(function (result) {
        var showDetails = props.selectedResult == result;
        return <Result_1.default key={result.origin.id} result={result} isSelected={showDetails} onSelectResult={props.onSelectResult} averageHousePrice={showDetails ? props.selectedResultHousePrice : undefined}/>;
    });
    var containerStyleDefault = {
        width: "100%",
        background: "white",
        height: "100%",
        overflow: "scroll"
    };
    var containerStyle = props.styles === undefined ? containerStyleDefault : Object.assign(containerStyleDefault, props.styles);
    var loadingIndicator = <div style={{ textAlign: "center", marginTop: 50 }}>Results loading</div>;
    return (<div style={containerStyle}>
            {props.isLoading ? loadingIndicator : entries}
        </div>);
}
exports.default = default_1;
