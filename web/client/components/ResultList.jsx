import React from 'react';
import PropTypes from 'prop-types';
import Result from './Result.jsx'

export default function ResultList(props) {

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

ResultList.propTypes = {
    results: PropTypes.arrayOf(PropTypes.object).isRequired,
    isLoading: PropTypes.bool.isRequired,
    styles: PropTypes.object
};
