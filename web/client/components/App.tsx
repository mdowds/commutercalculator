import * as React from 'react';
import MapContainer from './MapContainer';
import Header from './Header';
import SearchForm from './SearchForm';
import ResultList from './ResultList';
import GoogleMap from '../googlemap';
import Config from '../config';
import * as GoogleMapsLoader from 'google-maps';
import {CSSProperties} from "react";
import {Station, JourneyResult, SelectedFilters} from "../types";
import * as CCAPI from "../ccapi";

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
        CCAPI.getDestinations((destinations) => {
            this.setState({possibleDestinations: destinations})
        });

        GoogleMapsLoader.KEY = Config.gmapsApiKey;
        GoogleMapsLoader.load((google) => {
            this.map = new GoogleMap(google.maps);
            this.setState({gmapsLoaded: true})
        });
    }

    getJourneys(origin: Station, selectedFilters: SelectedFilters) {
        this.setState({resultsLoading: true});

        CCAPI.getJourneys(origin.id, selectedFilters, (destination, journeys) => {
            this.setState({destination: destination, results: journeys, resultsLoading: false});
        });
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
