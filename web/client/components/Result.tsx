import * as React from 'react';
import {Station} from '../types';

interface ResultProps {
    origin: Station,
    journeyTime: number
}

export default function Result(props: ResultProps) {

    const divStyle = {
        padding: 10,
        borderBottom: "1px solid grey"
    };

    return (
        <div style={divStyle}>
            <div style={{display: "inline-block", width: "80%"}}>{props.origin.name}</div>
            <div style={{float: "right"}}>{props.journeyTime} mins</div>
        </div>
    );
}
