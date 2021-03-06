import * as React from "react";
import { default as Result } from "./Result";
import { JourneyResult } from "../types";
import { CSSProperties } from "react";

interface ResultListProps {
  readonly results: Array<JourneyResult>;
  selectedResult?: JourneyResult;
  selectedResultHousePrice?: number;
  readonly styles?: CSSProperties;
  readonly isLoading: boolean;
  onSelectResult(selectedResult: JourneyResult): void;
}

export default function(props: ResultListProps) {
  const entries = props.results.map(result => {
    const showDetails = props.selectedResult === result;

    return (
      <Result
        key={result.origin.id}
        result={result}
        isSelected={showDetails}
        onSelectResult={props.onSelectResult}
        averageHousePrice={
          showDetails ? props.selectedResultHousePrice : undefined
        }
      />
    );
  });

  const containerStyleDefault: CSSProperties = {
    width: "100%",
    background: "white",
    height: "100%",
    overflowY: "scroll"
  };

  const containerStyle =
    props.styles === undefined
      ? containerStyleDefault
      : Object.assign(containerStyleDefault, props.styles);

  const loadingIndicator = (
    <div style={{ textAlign: "center", marginTop: 50 }}>Results loading</div>
  );

  return (
    <div style={containerStyle}>
      {props.isLoading ? loadingIndicator : entries}
    </div>
  );
}
