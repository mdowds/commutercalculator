import React from 'react';
import PropTypes from 'prop-types';
import MapContainer from './MapContainer.jsx';
import Header from './Header.jsx';
import { getJSON } from '../utils'

export default class App extends React.Component {

    constructor(){
        super();
        this.state = {
            destination: {},
            results: []
        };
    }

    componentDidMount() {

        getJSON('http://127.0.0.1/api/journeys/to/VIC', (json) => {
            this.setState({destination: json.destination});

            json.results.map( (result) => {
                this.setState({results: this.state.results.concat([result])});
            });
        });
    }

    render() {
        return (
            <div className="container">
                <Header destinationName={this.state.destination.name} />
                <MapContainer gmaps={this.props.gmaps} destination={this.state.destination} results={this.state.results} />
            </div>
        );
    }
}

App.propTypes = {
    gmaps: PropTypes.object
};
