import unittest
from api.interfaces.gmaps import *


class GmapsInterfaceTests(unittest.TestCase):

    def test_get_directions_containsCorrectUrl(self):
        self.assertEqual("https://maps.googleapis.com/maps/api/directions/json", get_directions.args[0])

    def test_extract_duration(self):
        mock = {"routes": [{"legs": [{"duration": {"value": 2} }] }], "status": "OK" }
        empty = {}
        invalid = {"status": "ZERO-RESULTS"}
        self.assertEqual(2, extract_duration(mock))
        self.assertEqual(None, extract_duration(empty))
        self.assertEqual(None, extract_duration(invalid))
