import React from 'react';
import List from './List.jsx'
import Map from './Map.jsx';
import Header from './Header.jsx';
import Marker from '../gmaps/Marker'
import { createMap } from '../gmaps/helpers'
import { getJSON } from '../utils'

export default class App extends React.Component {

    constructor(){
        super();
        this.state = {
            map: {},
            dest: "",
            markers: []
        };
    }

    componentDidMount() {
        this.setState({ map: createMap(this.map) });

        getJSON('http://127.0.0.1/api/journeys/to/VIC', (json) => {
            this.addMarker(json.destination.position);
            this.setState({dest: json.destination.name});

            json.results.map( (result) => {
                this.addMarker(result.origin.position);
            });
        });
    }

    addMarker(position) {
        const marker = new Marker(position);
        this.setState({ markers: this.state.markers.concat([marker])});
    }

    render() {
        return (
            <div className="container">
                <Header dest={this.state.dest} />
                <Map
                    divRef={el => this.map = el}
                    map={this.state.map}
                    markers={this.state.markers}
                />
            </div>
        );
    }
}
