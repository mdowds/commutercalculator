import React from 'react';
import List from './List.jsx'
import MapContainer from './MapContainer.jsx';
import Header from './Header.jsx';
import { getJSON } from '../utils'

export default class App extends React.Component {

    constructor(){
        super();
        this.state = {
            destination: {}
        };
    }

    componentDidMount() {
        // this.setState({ map: createMap(this.map) });

        getJSON('http://127.0.0.1/api/journeys/to/VIC', (json) => {
            // this.addMarker(json.destination.position, json.destination.name);
            this.setState({destination: json.destination});

            // json.results.map( (result) => {
            //     this.addMarker(result.origin.position, result.origin.name);
            // });
        });
    }

    render() {
        return (
            <div className="container">
                <Header destinationName={this.state.destination.name} />
                <MapContainer destination={this.state.destination} />
            </div>
        );
    }
}
