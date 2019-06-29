import * as React from "react";
import {CSSProperties, ReactNode} from "react";

interface HeaderProps {
  children: ReactNode;
};

export default function Header(props: HeaderProps) {
  const divStyle: CSSProperties = {
    backgroundColor: "white",
    width: "100%"
  };

  const h1Style: CSSProperties = {
    margin: "2px 0",
    fontSize: "25px",
    textAlign: "center"
  };

  return (
    <div style={divStyle}>
      <h1 style={h1Style}>Commuter Calculator</h1>
      {props.children}
    </div>
  );
}
