import * as React from 'react';
import {default as Result} from './Result';
import {JourneyResult} from '../types';
import {CSSProperties} from "react";

interface ResultListProps {
    readonly results: Array<JourneyResult>,
    readonly styles?: CSSProperties,
    readonly isLoading: boolean
}

interface ResultListState {
    selectedResult?: string
}

export default class ResultList extends React.Component<ResultListProps, ResultListState> {

    constructor(props: ResultListProps) {
        super(props);
        this.state = {};
        this.handleResultSelection = this.handleResultSelection.bind(this);
    }

    handleResultSelection(selectedResult: string) {
        const newResult = this.state.selectedResult != selectedResult ? selectedResult : undefined;
        this.setState({selectedResult: newResult});
    }

    render() {
        const entries = this.props.results.map((result) => {
            const showDetails = this.state.selectedResult == result.origin.id;

            return <Result key={result.origin.id} result={result} isSelected={showDetails} onSelectResult={this.handleResultSelection} />
        });

        const containerStyleDefault: CSSProperties = {
            width: "100%",
            background: "white",
            height: "100%",
            overflow: "scroll"
        };

        const containerStyle = this.props.styles === undefined ? containerStyleDefault : Object.assign(containerStyleDefault, this.props.styles);

        const loadingIndicator = <div style={{textAlign: "center", marginTop: 50}}>Results loading</div>;

        return (
            <div style={containerStyle}>
                {this.props.isLoading ? loadingIndicator : entries}
            </div>
        );
    }


}
