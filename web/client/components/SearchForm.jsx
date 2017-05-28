import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from 'react-autocomplete';

export default class SearchForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {inputText: "", selectedStation: {}};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        this.props.onSubmit(this.state.selectedStation);
    }

    suggestStationName(station, inputText) {
        return (
            station.name.toLowerCase().indexOf(inputText.toLowerCase()) !== -1 ||
            station.id.toLowerCase().indexOf(inputText.toLowerCase()) !== -1
        )
    }

    render() {

        const acMenuStyle = {
            borderRadius: '3px',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '2px 0',
            fontSize: '90%',
            position: 'fixed',
            overflow: 'auto',
            maxHeight: '50%',
            zIndex: 10
        };

        return (
            <div style={{padding: 5, boxSizing: "border-box"}}>
                <div>Journeys to
                    <Autocomplete
                        value={this.state.inputText}
                        items={this.props.destinations ? this.props.destinations : []}
                        getItemValue={station => station.name}
                        renderItem={(station, isHighlighted) => (
                            <div style={{zIndex: 10}} key={station.id}>{station.name}</div>
                        )}
                        menuStyle={acMenuStyle}
                        onChange={(event, value) => this.setState({inputText: value})}
                        onSelect={(value, station) => this.setState({inputText: station.name, selectedStation: station})}
                        shouldItemRender={this.suggestStationName}
                    />
                </div>
                <div><input id="submitSearch" type="button" value="Search" onClick={this.handleSubmit}/></div>
            </div>
        );
    }
}

SearchForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    destinations: PropTypes.arrayOf(PropTypes.object)
};
