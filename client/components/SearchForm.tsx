import * as React from 'react';
import * as Autocomplete from 'react-autocomplete';
import styles from './styles/SearchFormStyles';
import SearchFilters from "./SearchFilters";
import {Station, SelectedFilters} from '../types';

interface SearchFormProps {
    onSubmit(selectedStation: Station, filters: SelectedFilters) : void;
    readonly destinations: Array<Station>;
}

interface SearchFormState {
    inputText: string;
    selectedStation?: Station;
    showFilters: boolean;
    filters: SelectedFilters;
}

export default class SearchForm extends React.Component<SearchFormProps, SearchFormState> {

    constructor(props: SearchFormProps) {
        super(props);
        this.state = {inputText: "", selectedStation: undefined, showFilters: false, filters: {}};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    handleSubmit() {
        if(this.state.selectedStation === undefined) return;
        this.setState({showFilters: false});
        this.props.onSubmit(this.state.selectedStation, this.state.filters);
    }

    handleFilterChange(filters: SelectedFilters) {
        this.setState({filters: Object.assign(this.state.filters, filters)});
    }

    static suggestStationName(station: Station, inputText: string) {
        return (
            station.name.toLowerCase().indexOf(inputText.toLowerCase()) !== -1 ||
            station.id.toLowerCase().indexOf(inputText.toLowerCase()) !== -1
        )
    }

    render() {
        const filters = this.state.showFilters ? <SearchFilters onChange={this.handleFilterChange} /> : null;

        return (
            <div>
                <div style={styles.overallWrapper}>
                    <Autocomplete
                        value={this.state.inputText}
                        items={this.props.destinations ? this.props.destinations : []}
                        getItemValue={station => station.name}
                        renderItem={(station, isHighlighted) => (
                            <div style={styles.acItem} key={station.id}>{station.name}</div>
                        )}
                        inputProps={{placeholder: "Enter destination in Zone 1", style: styles.searchInput}}
                        menuStyle={styles.acMenu}
                        onChange={(event, value) => this.setState({inputText: value})}
                        onSelect={(value, station) => this.setState({
                            inputText: station.name,
                            selectedStation: station
                        })}
                        onMenuVisibilityChange={(isOpen) => this.setState({showFilters: isOpen ? false : this.state.showFilters})}
                        shouldItemRender={SearchForm.suggestStationName}
                        wrapperStyle={styles.acWrapper}
                    />
                    <input id="toggleFilters" type="button" value="Filters" style={styles.filtersButton}
                           onClick={() => {
                               this.setState({showFilters: !this.state.showFilters})
                           }}/>
                    <input id="submitSearch" type="button" value="Go" onClick={this.handleSubmit}
                           style={styles.goButton}/>
                </div>
                {filters}
            </div>
        );
    }
}
