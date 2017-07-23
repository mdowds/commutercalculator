import React from 'react';
import PropTypes from 'prop-types';

export default class SearchFilters extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onChange({[event.target.id]: event.target.value});
    }

    render() {
        const divStyle = {
            fontSize: '90%',
            padding: 5
        };

        const inputStyle = {
            width: '45%',
            textAlign: 'center',
            padding: 5,
            border: '1px solid grey'
        };

        return(
            <div style={divStyle}>
                <div>Journey time (minutes):</div>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '5px 0'}}>
                    <input id="minTime" style={inputStyle} type="number" placeholder="Minimum" onChange={this.handleChange} />
                    <input id="maxTime" style={inputStyle} type="number" placeholder="Maximum" onChange={this.handleChange} />
                </div>
            </div>
        );
    }
}

SearchFilters.propTypes = {
    onChange: PropTypes.func.isRequired
};
