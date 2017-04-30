import React from 'react';
import PropTypes from 'prop-types';

export default class Map extends React.Component {

    render() {
        const mapStyle = {
            width: '100%',
            height: '100%'
        };

        return (
            <div ref={this.props.divRef} style={mapStyle}>
                Map loading
                {this.props.children};
            </div>
        );
    }
}

Map.propTypes = {
    divRef: PropTypes.func
};
