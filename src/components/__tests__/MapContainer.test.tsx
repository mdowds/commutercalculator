import * as React from "react";
import { shallow } from "enzyme";
import MapContainer from "../MapContainer";
import { Station } from "../../types";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mockDest: Station = {
  id: "STA",
  position: { lat: 0, lng: 10 },
  name: "Station"
};
const mockOrigin: Station = {
  id: "ORG",
  position: { lat: 5, lng: 0 },
  name: "Origin"
};

test("MapContainer renders correctly with no destination or origin set", () => {
  const mapC = shallow(<MapContainer />);

  expect(mapC.find(LoadScript)).toHaveLength(1);
  expect(mapC.find(GoogleMap)).toHaveLength(1);
});

test("MapContainer sets the destination position on the map", () => {
  const mapC = shallow(<MapContainer destination={mockDest} />);

  expect(mapC.find(Marker).props().position).toEqual(mockDest.position);
  expect(mapC.find(Marker).props().icon).toBe("img/blue_MarkerS.png");
});

test("MapContainer pans to the destination on the map", () => {
  const mapC = shallow(<MapContainer destination={mockDest} />);

  expect(mapC.find("PanMap").props().position).toEqual(mockDest.position);
});

test("MapContainer sets the origin position on the map", () => {
  const mapC = shallow(
    <MapContainer destination={mockDest} origin={mockOrigin} />
  );

  expect(
    mapC
      .find(Marker)
      .at(1)
      .props().position
  ).toEqual(mockOrigin.position);
  expect(
    mapC
      .find(Marker)
      .at(1)
      .props().icon
  ).toBe("img/green_MarkerO.png");
});

test("MapContainer fits the map around the origin and destination positions", () => {
  const mapC = shallow(
    <MapContainer destination={mockDest} origin={mockOrigin} />
  );
  const boundsPositions = mapC.find("FitMapBounds").props().positions;

  expect(boundsPositions).toContainEqual(mockDest.position);
  expect(boundsPositions).toContainEqual(mockOrigin.position);
});
