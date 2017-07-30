import * as React from 'react';
import {Station} from '../types';
import {CSSProperties} from "react";

interface ResultProps {
    readonly origin: Station,
    readonly journeyTime: number,
    readonly showDetails: boolean,
    onSelectResult(selectedResult: string): void
}

export default function Result(props: ResultProps) {

    const divStyle: CSSProperties = {
        padding: 10,
        borderBottom: "1px solid grey"
    };

    const details = props.showDetails ? <div style={{margin: '10px 0px 0px 30px', fontSize: '75%'}}>Season ticket price: £1000</div> : null;

    const icon = props.showDetails ? "img/chevron-up.svg" : "img/chevron-down.svg";

    return (
        <div style={divStyle} onClick={() => {props.onSelectResult(props.origin.id)}}>
            <div>
                <div style={{float: "left", marginRight: 10}}><img src={icon} style={{width: 20, height: 20}}/></div>
                <div style={{display: "inline-block", width: "65%"}}>{props.origin.name}</div>
                <div style={{float: "right"}}>{props.journeyTime} mins</div>
            </div>
            {details}
        </div>
    );
}
