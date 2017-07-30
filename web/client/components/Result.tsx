import * as React from 'react';
import {JourneyResult, Station} from '../types';
import {CSSProperties} from "react";

interface ResultProps {
    readonly result: JourneyResult,
    readonly isSelected: boolean,
    onSelectResult(selectedResult: string): void
}

function makeDetails(result: JourneyResult) {
    return result.seasonTicket ? <div>Season ticket price: £{result.seasonTicket.price}</div> : null;
}

export default function Result(props: ResultProps) {

    const bgColour = props.isSelected ? '#ddd' : 'white';

    const divStyle: CSSProperties = {
        padding: 10,
        borderBottom: "1px solid grey",
        backgroundColor: bgColour
    };

    const details = props.isSelected ? <div style={{margin: '10px 0px 0px 30px', fontSize: '75%'}}>{makeDetails(props.result)}</div> : null;

    const icon = props.isSelected ? "img/chevron-up.svg" : "img/chevron-down.svg";

    return (
        <div style={divStyle} onClick={() => {props.onSelectResult(props.result.origin.id)}}>
            <div>
                <div style={{float: "left", marginRight: 10}}><img src={icon} style={{width: 20, height: 20}}/></div>
                <div style={{display: "inline-block", width: "65%"}}>{props.result.origin.name}</div>
                <div style={{float: "right"}}>{props.result.journeyTime} mins</div>
            </div>
            {details}
        </div>
    );
}
