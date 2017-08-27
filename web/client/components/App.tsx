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
import * as NHPAPI from "../nhpapi";

interface AppState {
    results: Array<JourneyResult>;
    resultsLoading: boolean;
    possibleDestinations: Array<Station>;
    gmapsLoaded: boolean;

    destination?: Station;
    selectedResult?: JourneyResult;
    selectedResultHousePrice?: number;
}

export default class App extends React.Component<{}, AppState> {

    apiUrl: string;
    map: GoogleMap;

    constructor(){
        super();
        this.state = {
            destination: undefined,
            selectedResult: undefined,
            selectedResultHousePrice: undefined,
            results: [],
            resultsLoading: false,
            possibleDestinations: [],
            gmapsLoaded: false
        };
        this.getJourneys = this.getJourneys.bind(this);
        this.handleResultSelection = this.handleResultSelection.bind(this);
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

    private getJourneys(origin: Station, selectedFilters: SelectedFilters) {
        this.setState({resultsLoading: true});

        CCAPI.getJourneys(origin.id, selectedFilters, (destination, journeys) => {
            this.setState({
                destination: destination,
                selectedResult: undefined,
                results: journeys,
                resultsLoading: false
            });
        });
    }

    private shouldDisplayResultList() {
        return this.state.results.length > 0 || this.state.resultsLoading;
    }

    private handleResultSelection(selectedResult: JourneyResult) {
        const newResult = this.state.selectedResult != selectedResult ? selectedResult : undefined;
        this.setState({selectedResult: newResult});

        if(newResult){
            const postcode_components = newResult.origin.postcode.split(" ");
            NHPAPI.getPrices(postcode_components[0], (averagePrice => {
                this.setState({selectedResultHousePrice: averagePrice});
            }));
        }
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
                    height={this.shouldDisplayResultList() ? '40%': undefined}
                    origin={this.state.selectedResult ? this.state.selectedResult.origin : undefined}
                />
                <ResultList
                    results={this.state.results}
                    isLoading={this.state.resultsLoading}
                    styles={{height: this.shouldDisplayResultList() ? '60%': 0}}
                    onSelectResult={this.handleResultSelection}
                    selectedResult={this.state.selectedResult}
                    selectedResultHousePrice={this.state.selectedResultHousePrice}
                />
            </div>
        );
    }
}
