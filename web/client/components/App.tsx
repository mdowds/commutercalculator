import * as React from 'react';
import MapContainer from './MapContainer';
import Header from './Header';
import SearchForm from './SearchForm';
import ResultList from './ResultList';
import { getJSON } from '../utils';
import GoogleMap from '../googlemap';
import Config from '../config';
import * as GoogleMapsLoader from 'google-maps';
import {CSSProperties} from "react";
import {Station, JourneyResult, SelectedFilters} from "../types";

interface AppState {
    destination?: Station;
    results: Array<JourneyResult>;
    resultsLoading: boolean;
    possibleDestinations: Array<Station>;
    gmapsLoaded: boolean;
}

export default class App extends React.Component<{}, AppState> {

    apiUrl: string;
    map: GoogleMap;

    constructor(){
        super();
        this.state = {
            destination: undefined,
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
            this.map = new GoogleMap(google.maps);
            this.setState({gmapsLoaded: true})
        });
    }

    getJourneys(origin: Station, params: SelectedFilters) {
        this.setState({resultsLoading: true});

        getJSON(this.apiUrl + 'journeys/to/' + origin.id, this.mapParamsForRequest(params), (json) => {
            this.setState({destination: json.destination, results: json.results, resultsLoading: false});
        });
    }

    mapParamsForRequest(params: SelectedFilters) {
        let paramsOut: any = {};
        if(params.minTime) paramsOut.min_time = params.minTime;
        if(params.maxTime) paramsOut.max_time = params.maxTime;
        return paramsOut;
    }

    shouldDisplayResultList() {
        return this.state.results.length > 0 || this.state.resultsLoading;
    }

    render() {
        const containerStyle: CSSProperties = {
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column"
        };

        return (
            <div style={containerStyle}>
                <Header>
                    <SearchForm destinations={this.state.possibleDestinations} onSubmit={this.getJourneys}/>
                </Header>
                <MapContainer
                    mapObj={this.state.gmapsLoaded ? this.map : undefined}
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
