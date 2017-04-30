import React from 'react';

export default class Header extends React.Component {

    render() {

        const divStyle = {
            padding: "5px",
            position: "fixed",
            zIndex: 1,
            backgroundColor: "white",
            width: "100%"
        };

        const title = this.props.dest !== undefined ? "Journeys to " + this.props.dest : "Commuter Calculator";

        return (
            <div style={divStyle}>
                {title}
            </div>
        );
    }

}
