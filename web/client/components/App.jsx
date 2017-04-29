import React from 'react';
import List from './List.jsx'
import Map from './Map.jsx'

export default class App extends React.Component {

    constructor(){
        super();
        this.state = { map: {}, markers: [] };
    }

    componentDidMount() {
        const trafalgar = {lat: 51.507368, lng: -0.127811};

        this.setState({
            map: new google.maps.Map(this.map, {
                center: trafalgar,
                zoom: 11
            })
        });

        window.fetch('http://127.0.0.1/api/journeys/to/VIC').then(
            (response) => { return response.json(); }
        ).then(
            (json) => {
                this.addMarker({position: json.destination.position});

                json.results.map( (result) => {
                    this.addMarker({position: result.origin.position});
                    //return result.origin.name + ": " + result.journeyTime + " minutes";
                });
            }
        );
    }

    addMarker(marker) {
        this.setState({ markers: this.state.markers.concat([marker])});
    }

    render() {
        return (
            <Map
                divRef={el => this.map = el}
                map={this.state.map}
                markers={this.state.markers}
            />
        );
    }
}
