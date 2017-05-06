import React from 'react';
import PropTypes from 'prop-types';

export default function Map(props) {
    const mapStyle = {
        width: '100%',
        height: '100%'
    };

    return (
        <div ref={props.divRef} style={mapStyle}>
            Map loading
            {props.children};
        </div>
    );
}

Map.propTypes = {
    divRef: PropTypes.func
};
