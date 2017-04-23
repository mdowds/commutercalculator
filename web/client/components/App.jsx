import React from 'react';
import List from './List.jsx'

export default class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Stations</h1>
                <List />
            </div>
        );
    }
}
