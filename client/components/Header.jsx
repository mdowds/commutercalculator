"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function Header(props) {
    var divStyle = {
        backgroundColor: "white",
        width: "100%"
    };
    var h1Style = {
        margin: "2px 0",
        fontSize: "25px",
        textAlign: "center"
    };
    return (<div style={divStyle}>
            <h1 style={h1Style}>Commuter Calculator</h1>
            {props.children}
        </div>);
}
exports.default = Header;
