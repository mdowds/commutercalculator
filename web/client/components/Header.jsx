import React from 'react';

export default function Header(props) {
    const divStyle = {
        backgroundColor: "white",
        width: "100%"
    };

    const h1Style = {
        margin: "2px 0",
        fontSize: "25px",
        textAlign: "center"
    };

    return (
        <div style={divStyle}>
            <h1 style={h1Style}>Commuter Calculator</h1>
            {props.children}
        </div>
    );
}
