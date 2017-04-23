function initMap() {
    var trafalgar = {lat: 51.507368, lng: -0.127811};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: trafalgar
    });
    var marker = addMarker(trafalgar, map);
    marker.setMap(map);
}

function addMarker(pos) {
    return new google.maps.Marker({
        position: pos
    });
}
