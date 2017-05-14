import unittest
from unittest.mock import patch
from api.interfaces.gmaps import *
from api.interfaces.gmaps import _build_params


class GmapsInterfaceTests(unittest.TestCase):

    @patch("api.interfaces.gmaps.load_config_value")
    def test_build_params(self, mock_lcv):
        mock_lcv.return_value = "abcde"

        origin = Station(lat=1.5, long=-0.2)
        dest = Station(lat=1.6, long=-0.3)
        actual = _build_params(dest, origin)

        self.assertEqual("1.5,-0.2", actual["origin"])
        self.assertEqual("1.6,-0.3", actual["destination"])
        self.assertEqual("transit", actual["mode"])
        self.assertEqual("abcde", actual["key"])

    @patch("api.interfaces.gmaps.load_config_value")
    def test_build_params_curried(self, mock_lcv):
        mock_lcv.return_value = "abcde"

        origin = Station(lat=1.5, long=-0.2)
        dest = Station(lat=1.6, long=-0.3)
        actual = _build_params(dest)(origin)

        self.assertEqual("1.5,-0.2", actual["origin"])
        self.assertEqual("1.6,-0.3", actual["destination"])
        self.assertEqual("transit", actual["mode"])
        self.assertEqual("abcde", actual["key"])
