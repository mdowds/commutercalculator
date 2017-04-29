import React from 'react'

export default class List extends React.Component {

    constructor(){
        super();
        this.state = { items: [] };
    }

    componentDidMount() {
        window.fetch('http://127.0.0.1/api/journeys/to/VIC').then(
            (response) => { return response.json(); }
        ).then(
            (json) => {
                const results = json.results.map(
                    (result) => { return result.origin.name + ": " + result.journeyTime + " minutes"; }
                );
                this.setState({items: results});
            }
        );
    }

    render() {
        return (
            <div>
                <h3>From London Victoria</h3>
                <ul>
                    { this.state.items.map( (item) => { return <li>{item}</li>; } ) }
                </ul>
            </div>
        );
    }
}
