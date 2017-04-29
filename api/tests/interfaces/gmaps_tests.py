import unittest
from api.interfaces.gmaps import *


class GmapsInterfaceTests(unittest.TestCase):

    def test_get_directions(self):
        self.assertEqual("https://maps.googleapis.com/maps/api/directions/json", get_directions.args[0])

    def test_extract_duration(self):
        mock = {"routes": [{"legs": [{"duration": {"value": 2} }] }], "status": "OK" }
        empty = {}
        invalid = {"routes": [], "status": "ZERO-RESULTS"}
        self.assertEqual(2, extract_duration(mock))
        self.assertEqual(None, extract_duration(empty))
        self.assertEqual(None, extract_duration(invalid))

    def test_build_params(self):
        origin = Station(place_id="abc123")
        dest = Station(place_id="xyz456")
        actual = build_params(origin, dest)

        self.assertEqual("place_id:" + origin.place_id, actual["origin"])
        self.assertEqual("place_id:" + dest.place_id, actual["destination"])
        self.assertEqual("transit", actual["mode"])
        self.assertEqual(load_config_value("gmapsApiKey"), actual["key"])
