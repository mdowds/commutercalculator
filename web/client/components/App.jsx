import React from 'react';
import MapContainer from './MapContainer.jsx';
import Header from './Header.tsx';
import SearchForm from './SearchForm.jsx';
import ResultList from './ResultList.tsx';
import { getJSON } from '../utils';
import Map from '../map';
import Config from '../config';
import GoogleMapsLoader from 'google-maps';

export default class App extends React.Component {

    constructor(){
        super();
        this.state = {
            destination: {},
            results: [],
            resultsLoading: false,
            possibleDestinations: [],
            gmapsLoaded: false
        };
        this.getJourneys = this.getJourneys.bind(this);
        this.apiUrl = Config.apiUrl;
    }

    componentDidMount() {
        getJSON(this.apiUrl + "destinations", {}, (json) => {
            this.setState({possibleDestinations: json})
        });

        GoogleMapsLoader.KEY = Config.gmapsApiKey;
        GoogleMapsLoader.load((google) => {
            this.map = new Map(google.maps);
            this.setState({gmapsLoaded: true})
        });
    }

    getJourneys(origin, params) {
        this.setState({resultsLoading: true});

        getJSON(this.apiUrl + 'journeys/to/' + origin.id, this.mapParamsForRequest(params), (json) => {
            this.setState({destination: json.destination, results: json.results, resultsLoading: false});
        });
    }

    mapParamsForRequest(params) {
        let paramsOut = {};
        if(params.minTime) paramsOut.min_time = params.minTime;
        if(params.maxTime) paramsOut.max_time = params.maxTime;
        return paramsOut;
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
                    mapObj={this.state.gmapsLoaded ? this.map : null}
                    destination={this.state.destination}
                    height={this.shouldDisplayResultList() ? '50%': undefined}
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
