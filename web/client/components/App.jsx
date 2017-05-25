import React from 'react';
import PropTypes from 'prop-types';
import MapContainer from './MapContainer.jsx';
import Header from './Header.jsx';
import SearchForm from './SearchForm.jsx';
import ResultList from './ResultList.jsx'
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

        const containerStyle = {
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column"
        };

        return (
            <div style={containerStyle}>
                <Header destinationName={this.state.destination.name}>
                    <SearchForm onSubmit={this.getJourneys}/>
                </Header>
                <MapContainer gmaps={this.props.gmaps} destination={this.state.destination} results={this.state.results} />
                <ResultList results={this.state.results} />
            </div>
        );
    }
}

App.propTypes = {
    gmaps: PropTypes.object
};
