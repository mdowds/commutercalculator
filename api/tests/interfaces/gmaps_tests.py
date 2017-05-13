import unittest
from unittest.mock import patch
from api.interfaces.gmaps import *


class GmapsInterfaceTests(unittest.TestCase):

    def test_extract_duration(self):
        mock = {"routes": [{"legs": [{"duration": {"value": 2} }] }], "status": "OK" }
        empty = {}
        invalid = {"routes": [], "status": "ZERO-RESULTS"}
        self.assertEqual(2, extract_duration(mock))
        self.assertEqual(None, extract_duration(empty))
        self.assertEqual(None, extract_duration(invalid))

    @patch("api.interfaces.gmaps.load_config_value")
    def test_build_params(self, mock_lcv):
        mock_lcv.return_value = "abcde"

        origin = Station(lat=1.5, long=-0.2)
        dest = Station(lat=1.6, long=-0.3)
        actual = build_params(origin, dest)

        self.assertEqual("1.5,-0.2", actual["origin"])
        self.assertEqual("1.6,-0.3", actual["destination"])
        self.assertEqual("transit", actual["mode"])
        self.assertEqual("abcde", actual["key"])

    @patch("api.interfaces.gmaps.load_config_value")
    def test_build_params_curried(self, mock_lcv):
        mock_lcv.return_value = "abcde"

        origin = Station(lat=1.5, long=-0.2)
        dest = Station(lat=1.6, long=-0.3)
        actual = build_params(origin)(dest)

        self.assertEqual("1.5,-0.2", actual["origin"])
        self.assertEqual("1.6,-0.3", actual["destination"])
        self.assertEqual("transit", actual["mode"])
        self.assertEqual("abcde", actual["key"])
