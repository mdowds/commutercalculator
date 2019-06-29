import * as React from "react";
import { JourneyResult, SeasonTickets, Travelcard } from "../types";
import { CSSProperties } from "react";

interface ResultProps {
  readonly result: JourneyResult;
  readonly isSelected: boolean;
  readonly averageHousePrice?: number;
  onSelectResult(selectedResult: JourneyResult): void;
}

export default class Result extends React.Component<ResultProps, {}> {
  travelcardDescription(travelcard: Travelcard) {
    return (
      <div>
        Zone {travelcard.minZone} to {travelcard.maxZone} travelcard: £
        {travelcard.price}
      </div>
    );
  }

  housePriceDescription() {
    const outcode = this.props.result.origin.postcode.split(" ")[0];
    const price = this.props.averageHousePrice
      ? "£" + this.props.averageHousePrice.toLocaleString("en-GB")
      : "Loading";
    return (
      <div>
        Average house price for {outcode}: {price}
      </div>
    );
  }

  makeDetails(result: JourneyResult) {
    const travelcardDiv = result.seasonTickets.travelcard
      ? this.travelcardDescription(result.seasonTickets.travelcard)
      : null;
    const seasonTicketDiv = result.seasonTickets.seasonTicket ? (
      <div>
        Direct season ticket: £{result.seasonTickets.seasonTicket.price}
      </div>
    ) : null;

    const seasonTicketsDescription = this.seasonTicketsHasValues(
      result.seasonTickets
    ) ? (
      <div>
        {travelcardDiv}
        {seasonTicketDiv}
      </div>
    ) : (
      <div>Season ticket not found</div>
    );

    const directionsLink = (
      <span>
        <a href={result.directionsUrl}>View directions on Google Maps</a> (May
        show a different journey time)
      </span>
    );

    return (
      <div>
        {seasonTicketsDescription}
        {this.housePriceDescription()}
        {directionsLink}
      </div>
    );
  }

  seasonTicketsHasValues(seasonTickets: SeasonTickets) {
    return seasonTickets.travelcard || seasonTickets.seasonTicket;
  }

  render() {
    const bgColour = this.props.isSelected ? "#ddd" : "white";

    const divStyle: CSSProperties = {
      padding: 10,
      borderBottom: "1px solid grey",
      backgroundColor: bgColour
    };

    const details = this.props.isSelected ? (
      <div style={{ margin: "10px 0px 0px 30px", fontSize: "75%" }}>
        {this.makeDetails(this.props.result)}
      </div>
    ) : null;

    const icon = this.props.isSelected
      ? "img/chevron-up.svg"
      : "img/chevron-down.svg";

    return (
      <div
        style={divStyle}
        onClick={() => {
          this.props.onSelectResult(this.props.result);
        }}
      >
        <div>
          <div style={{ float: "left", marginRight: 10 }}>
            <img
              alt="Expand results"
              src={icon}
              style={{ width: 20, height: 20 }}
            />
          </div>
          <div style={{ display: "inline-block", width: "65%" }}>
            {this.props.result.origin.name}
          </div>
          <div style={{ float: "right" }}>
            {this.props.result.journeyTime} mins
          </div>
        </div>
        {details}
      </div>
    );
  }
}
