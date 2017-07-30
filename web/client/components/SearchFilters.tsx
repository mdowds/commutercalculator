import * as React from 'react';
import {CSSProperties} from 'react';
import {SelectedFilters} from '../types';

interface SearchFiltersProps {
    onChange(filters: SelectedFilters) : void;
}

export default class SearchFilters extends React.Component<SearchFiltersProps, {}> {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onChange({[event.target.id]: event.target.value});
    }

    render() {
        const divStyle: CSSProperties = {
            fontSize: '90%',
            padding: 5,
            position: 'fixed',
            zIndex: 5,
            backgroundColor: 'white'
        };

        const inputStyle: CSSProperties = {
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
