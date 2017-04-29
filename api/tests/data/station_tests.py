import unittest
from api.data.station import *

class StationTests(unittest.TestCase):

    def test_serialize_station(self):
        station = Station(sid="FOO", name="Foo Station", lat=1.25, long=2.23, place_id="baz123")
        result = serialize_station(station)

        self.assertEqual(station.sid, result["sid"])
        self.assertEqual(station.name, result["name"])
        self.assertEqual(station.name, result["lat"])
        self.assertEqual(station.name, result["long"])
        self.assertEqual(station.name, result["placeId"])