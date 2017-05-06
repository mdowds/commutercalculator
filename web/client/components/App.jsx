import React from 'react';
import PropTypes from 'prop-types';
import MapContainer from './MapContainer.jsx';
import Header from './Header.jsx';
import SearchForm from './SearchForm.jsx';
import { getJSON } from '../utils'

export default class App extends React.Component {

    constructor(){
        super();
        this.state = {
            destination: {},
            results: []
        };
        this.getJourneys = this.getJourneys.bind(this);
    }

    getJourneys(origin) {
        getJSON('http://127.0.0.1/api/journeys/to/' + origin, (json) => {
            this.setState({destination: json.destination, results: []});

            json.results.map( (result) => {
                this.setState({results: this.state.results.concat([result])});
            });
        });
    }

    render() {
        return (
            <div className="container">
                <Header destinationName={this.state.destination.name}>
                    <SearchForm onSubmit={this.getJourneys}/>
                </Header>
                <MapContainer gmaps={this.props.gmaps} destination={this.state.destination} results={this.state.results} />
            </div>
        );
    }
}

App.propTypes = {
    gmaps: PropTypes.object
};
