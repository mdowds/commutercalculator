import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from 'react-autocomplete';
import styles from './styles/SearchFormStyles';
import {isEmptyObject} from '../utils';

export default class SearchForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {inputText: "", selectedStation: {}};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        if(isEmptyObject(this.state.selectedStation)) return;
        this.props.onSubmit(this.state.selectedStation);
    }

    suggestStationName(station, inputText) {
        return (
            station.name.toLowerCase().indexOf(inputText.toLowerCase()) !== -1 ||
            station.id.toLowerCase().indexOf(inputText.toLowerCase()) !== -1
        )
    }

    render() {
        return (
            <div style={styles.overallWrapper}>
                <Autocomplete
                    value={this.state.inputText}
                    items={this.props.destinations ? this.props.destinations : []}
                    getItemValue={station => station.name}
                    renderItem={(station, isHighlighted) => (
                        <div style={styles.acItem} key={station.id}>{station.name}</div>
                    )}
                    inputProps={{placeholder: "Enter destination", style: styles.searchInput}}
                    menuStyle={styles.acMenu}
                    onChange={(event, value) => this.setState({inputText: value})}
                    onSelect={(value, station) => this.setState({inputText: station.name, selectedStation: station})}
                    shouldItemRender={this.suggestStationName}
                    wrapperStyle={styles.acWrapper}
                />
                <input id="submitSearch" type="button" value="Go" onClick={this.handleSubmit} style={styles.goButton} />
            </div>
        );
    }
}

SearchForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    destinations: PropTypes.arrayOf(PropTypes.object)
};
