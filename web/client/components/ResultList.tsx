import * as React from 'react';
import {default as Result} from './Result';
import {JourneyResult} from '../types';

interface ResultListProps {
    results: Array<JourneyResult>,
    styles,
    isLoading: boolean
}

export default function ResultList(props: ResultListProps) {

    const entries = props.results.map((result) => {
        return <Result key={result.origin.id} origin={result.origin} journeyTime={result.journeyTime} />
    });

    const containerStyle = Object.assign({
        width: "100%",
        background: "white",
        height: "100%",
        overflow: "scroll",
    }, props.styles);

    const loadingIndicator = <div style={{textAlign: "center", marginTop: 50}}>Results loading</div>;

    return (
        <div style={containerStyle}>
            {props.isLoading ? loadingIndicator : entries}
        </div>
    );
}
