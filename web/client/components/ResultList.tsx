import * as React from 'react';
import {default as Result} from './Result';
import {JourneyResult} from '../types';
import {CSSProperties} from "react";

interface ResultListProps {
    readonly results: Array<JourneyResult>,
    readonly styles?: CSSProperties,
    readonly isLoading: boolean
}

export default function ResultList(props: ResultListProps) {

    const entries = props.results.map((result) => {
        return <Result key={result.origin.id} origin={result.origin} journeyTime={result.journeyTime} />
    });

    const containerStyleDefault: CSSProperties = {
        width: "100%",
        background: "white",
        height: "100%",
        overflow: "scroll"
    };

    const containerStyle = props.styles === undefined ? containerStyleDefault : Object.assign(containerStyleDefault, props.styles);

    const loadingIndicator = <div style={{textAlign: "center", marginTop: 50}}>Results loading</div>;

    return (
        <div style={containerStyle}>
            {props.isLoading ? loadingIndicator : entries}
        </div>
    );
}
