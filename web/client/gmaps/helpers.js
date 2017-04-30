function createMap(ref) {
    const trafalgar = {lat: 51.507368, lng: -0.127811};

    return new google.maps.Map(ref, {
        center: trafalgar,
        zoom: 11,
        clickableIcons: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControlOptions: {position: google.maps.ControlPosition.RIGHT_BOTTOM}
    });
}

export { createMap };
