import React from 'react';

export default class Marker extends React.Component {
    render(){
        this.marker = new google.maps.Marker({
            position: this.props.position,
            map: this.props.map
        });
        return null;
    }
}
