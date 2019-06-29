import * as React from "react";
import { CSSProperties } from "react";

export default function Footer() {
  const divStyle: CSSProperties = {
    backgroundColor: "white",
    width: "100%",
    fontSize: 10,
    textAlign: "center",
    margin: "3px 0"
  };

  return (
    <div style={divStyle}>
      &copy;2017 Matt Dowds. Journey time data from Google Maps and season
      ticket data from <a href="http://www.brfares.com/">BRFares</a>.
    </div>
  );
}
