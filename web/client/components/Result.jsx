import React from 'react';
import PropTypes from 'prop-types';

export default function Result(props) {

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

Result.propTypes = {
    origin: PropTypes.object.isRequired,
    journeyTime: PropTypes.number
};
