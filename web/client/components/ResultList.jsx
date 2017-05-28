import React from 'react';
import PropTypes from 'prop-types';
import Result from './Result.jsx'

export default function ResultList(props) {

    const entries = props.results.map((result) => {
        return <Result key={result.origin.id} origin={result.origin} journeyTime={result.journeyTime} />
    });

    const containerStyle = {
        width: "100%",
        background: "white",
        height: "50%",
        overflow: "scroll"
    };

    const loadingIndicator = <div style={{textAlign: "center", paddingTop: 10}}>Results loading</div>;

    return (
        <div style={containerStyle}>
            {props.isLoading ? loadingIndicator : entries}
        </div>
    );
}

ResultList.propTypes = {
    results: PropTypes.arrayOf(PropTypes.object),
    isLoading: PropTypes.bool
};
