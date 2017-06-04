import React from 'react';
import PropTypes from 'prop-types';
import MapContainer from './MapContainer.jsx';
import Header from './Header.jsx';
import SearchForm from './SearchForm.jsx';
import ResultList from './ResultList.jsx';
import { getJSON } from '../utils';
import Map from '../map';
import Config from '../../config/config';

export default class App extends React.Component {

    constructor(){
        super();
        this.state = {
            destination: {},
            results: [],
            resultsLoading: false,
            possibleDestinations: []
        };
        this.getJourneys = this.getJourneys.bind(this);
        this.apiUrl = Config.apiUrl;
    }

    componentDidMount() {
        getJSON(this.apiUrl + "destinations", (json) => {
            this.setState({possibleDestinations: json})
        });
    }

    getJourneys(origin) {
        this.setState({resultsLoading: true});

        getJSON(this.apiUrl + 'journeys/to/' + origin.id, (json) => {
            this.setState({destination: json.destination, results: json.results, resultsLoading: false});
        });
    }

    shouldDisplayResultList() {
        return this.state.results.length > 0 || this.state.resultsLoading;
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
                    <SearchForm destinations={this.state.possibleDestinations} onSubmit={this.getJourneys}/>
                </Header>
                <MapContainer
                    mapObj={new Map(this.props.gmapsApi)}
                    destination={this.state.destination}
                    styles={{height: this.shouldDisplayResultList() ? '50%': undefined}}
                />
                <ResultList
                    results={this.state.results}
                    isLoading={this.state.resultsLoading}
                    styles={{height: this.shouldDisplayResultList() ? '50%': 0}}
                />
            </div>
        );
    }
}

App.propTypes = {
    gmapsApi: PropTypes.object.isRequired
};
