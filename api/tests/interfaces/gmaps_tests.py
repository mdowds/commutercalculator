import unittest
from unittest.mock import patch
from api.interfaces.gmaps import *
from api.interfaces.gmaps import _build_params, _extract_journey_times, _prepare_request, _extract_journey_time, _add_arrival_param


class GmapsInterfaceTests(unittest.TestCase):
    origin = Station(lat=1.5, long=-0.2, name="Foo")
    dest = Station(lat=1.6, long=-0.3)

    @patch("api.interfaces.gmaps.load_config_value")
    def test_build_params(self, mock_lcv):
        mock_lcv.return_value = "abcde"
        actual = _build_params(self.dest, self.origin)

        self.assertEqual("1.5,-0.2", actual["origin"])
        self.assertEqual("1.6,-0.3", actual["destination"])
        self.assertEqual("transit", actual["mode"])
        self.assertEqual("abcde", actual["key"])

    def test_add_arrival_param(self):
        actual = _add_arrival_param(1001, frozendict({}))
        self.assertEqual(1001, actual["arrival_time"])

    @patch("api.interfaces.gmaps.load_config_value")
    def test_build_params_curried(self, mock_lcv):
        mock_lcv.return_value = "abcde"
        actual = _build_params(self.dest)(self.origin)

        self.assertEqual("1.5,-0.2", actual["origin"])
        self.assertEqual("1.6,-0.3", actual["destination"])
        self.assertEqual("transit", actual["mode"])
        self.assertEqual("abcde", actual["key"])

    @patch("api.interfaces.gmaps.requests.Response")
    def test_extract_journey_times(self, mock_response):
        mock_response.json.return_value = {"routes": [{"legs": [{"duration": {"value": 600}}]}]}
        self.assertEqual(10, _extract_journey_times([], self.origin, mock_response)[0].time)
        self.assertEqual("Foo", _extract_journey_times([], self.origin, mock_response)[0].origin.name)

    @patch("api.interfaces.gmaps.requests.Response")
    def test_extract_journey_times_with_none(self, mock_response):
        mock_response.json.return_value = None
        self.assertEqual([], _extract_journey_times([], self.origin, mock_response))

    @patch("api.interfaces.gmaps.requests.Response")
    def test_extract_journey_time(self, mock_response):
        mock_response.json.return_value = {"routes": [{"legs": [{"duration": {"value": 600}}]}]}
        self.assertEqual(10, _extract_journey_time(self.origin, mock_response).time)
        self.assertEqual("Foo", _extract_journey_time(self.origin, mock_response).origin.name)

    @patch("api.interfaces.gmaps.requests.Response")
    def test_extract_journey_times_with_none(self, mock_response):
        mock_response.json.return_value = None
        self.assertEqual(None, _extract_journey_time(self.origin, mock_response))

    @patch("api.interfaces.gmaps.load_config_value")
    def test_prepare_request(self, mock_lcv):
        mock_lcv.return_value = "abcde"
        actual = _prepare_request([], self.dest, self.origin)
        self.assertEqual(_build_params(self.dest, self.origin), actual.params)
