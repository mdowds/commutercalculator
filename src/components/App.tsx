import * as React from "react";
import { CSSProperties } from "react";
import MapContainer from "./MapContainer";
import Header from "./Header";
import SearchForm from "./SearchForm";
import ResultList from "./ResultList";
import Footer from "./Footer";
import { Station, JourneyResult, SelectedFilters } from "../types";
import * as CCAPI from "../ccapi";
import * as NHPAPI from "../nhpapi";

interface AppState {
  results: Array<JourneyResult>;
  resultsLoading: boolean;
  possibleDestinations: Array<Station>;

  destination?: Station;
  selectedResult?: JourneyResult;
  selectedResultHousePrice?: number;
}

export default class App extends React.Component<{}, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      destination: undefined,
      selectedResult: undefined,
      selectedResultHousePrice: undefined,
      results: [],
      resultsLoading: false,
      possibleDestinations: []
    };
    this.getJourneys = this.getJourneys.bind(this);
    this.handleResultSelection = this.handleResultSelection.bind(this);
  }

  componentDidMount() {
    CCAPI.getDestinations().then(destinations => {
      this.setState({ possibleDestinations: destinations });
    });
  }

  private getJourneys(origin: Station, selectedFilters: SelectedFilters) {
    this.setState({ resultsLoading: true });

    CCAPI.getJourneys(origin.id, selectedFilters).then(
      ({ destination, results }) => {
        this.setState({
          destination,
          selectedResult: undefined,
          results,
          resultsLoading: false
        });
      }
    );
  }

  private shouldDisplayResultList() {
    return this.state.results.length > 0 || this.state.resultsLoading;
  }

  private handleResultSelection(selectedResult: JourneyResult) {
    const newResult =
      this.state.selectedResult !== selectedResult ? selectedResult : undefined;
    this.setState({ selectedResult: newResult });

    if (newResult) {
      const [outcode] = newResult.origin.postcode.split(" ");
      NHPAPI.getPrices(outcode).then(averagePrice => {
        this.setState({ selectedResultHousePrice: averagePrice });
      });
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
          <SearchForm
            destinations={this.state.possibleDestinations}
            onSubmit={this.getJourneys}
          />
        </Header>
        <MapContainer
          destination={this.state.destination}
          origin={
            this.state.selectedResult
              ? this.state.selectedResult.origin
              : undefined
          }
        />
        <ResultList
          results={this.state.results}
          isLoading={this.state.resultsLoading}
          styles={{ height: this.shouldDisplayResultList() ? "60%" : 0 }}
          onSelectResult={this.handleResultSelection}
          selectedResult={this.state.selectedResult}
          selectedResultHousePrice={this.state.selectedResultHousePrice}
        />
        <Footer />
      </div>
    );
  }
}
