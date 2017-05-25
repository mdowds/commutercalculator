import React from 'react';
import PropTypes from 'prop-types';

export default class SearchForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {stationInput: ""};
        this.handleStationNameChange = this.handleStationNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        this.props.onSubmit(this.state.stationInput);
    }

    handleStationNameChange(e) {
        this.setState({stationInput: e.target.value});
    }

    render() {
        return (
            <div style={{padding: 5, boxSizing: "border-box"}}>
                <div>Journeys to <input id="stationInput" type="text" onChange={this.handleStationNameChange} /></div>
                <div><input id="submitSearch" type="button" value="Search" onClick={this.handleSubmit}/></div>
            </div>
        );
    }
}

SearchForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};
