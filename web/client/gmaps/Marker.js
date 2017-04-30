export default class Marker {
    constructor(position) {
        this.position = position;
    }

    addToMap(map) {
        return new google.maps.Marker({
            position: this.position,
            map: map
        });
    }
}
