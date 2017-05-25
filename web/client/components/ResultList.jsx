import React from 'react';

export default function ResultList(props) {

    const entries = props.results.map((result) => {
        return <li key={result.origin.name}>{result.origin.name}</li>
    });

    const divStyle = {
        width: "100%",
        background: "white",
        height: "50%",
        overflow: "scroll"
    };

    return (
        <div style={divStyle}>
            <ul>{entries}</ul>
        </div>
    );
}
