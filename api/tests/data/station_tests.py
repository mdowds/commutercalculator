import unittest
from api.data.station import *


class StationTests(unittest.TestCase):

    def test_serialize_station(self):
        station = Station(sid="FOO", name="Foo Station", place_id="baz123", lat=1.4, long=-0.3)
        result = serialize_station(station)

        self.assertEqual(station.sid, result["id"])
        self.assertEqual(station.name, result["name"])
        self.assertEqual(station.place_id, result["placeId"])
        self.assertEqual(station.lat, result["position"]["lat"])
        self.assertEqual(station.long, result["position"]["long"])
