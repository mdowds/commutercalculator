import * as React from "react";
import { useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  useGoogleMap
} from "@react-google-maps/api";
import { Station, Position } from "../types";
import { trafalgar } from "../constants";

const makeMarkerImageString = (name: string, colour: string) =>
  "img/" + colour + "_Marker" + name.toUpperCase().substring(0, 1) + ".png";

const PanMap = ({ position }: { position: Position }) => {
  const map = useGoogleMap();

  useEffect(() => {
    if (map) map.panTo(position);
  }, [map, position]);

  return null;
};

const FitMapBounds = ({ positions }: { positions: Position[] }) => {
  const map = useGoogleMap();

  useEffect(() => {
    if (!map) return;

    // @ts-ignore
    const bounds = new window.google.maps.LatLngBounds();
    positions.forEach(position => {
      bounds.extend(position);
    });
    map.fitBounds(bounds);
  }, [map, positions]);

  return null;
};

interface MapContainerProps {
  readonly destination?: Station;
  readonly origin?: Station;
}

const MapContainer = ({ destination, origin }: MapContainerProps) => (
  <LoadScript
    id="script-loader"
    googleMapsApiKey={process.env.REACT_APP_GMAPS_API_KEY}
  >
    <GoogleMap
      id="map"
      center={trafalgar}
      mapContainerStyle={{ width: "100%", height: "100%" }}
      zoom={11}
      options={{ streetViewControl: false, mapTypeControl: false }}
    >
      {destination && (
        <>
          <Marker
            position={destination.position}
            icon={makeMarkerImageString(destination.name, "blue")}
          />
          <PanMap position={destination.position} />
          {origin && (
            <>
              <Marker
                position={origin.position}
                icon={makeMarkerImageString(origin.name, "green")}
              />
              <FitMapBounds
                positions={[origin.position, destination.position]}
              />
            </>
          )}
        </>
      )}
    </GoogleMap>
  </LoadScript>
);

export default MapContainer;
