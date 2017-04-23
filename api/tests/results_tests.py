import unittest
from unittest.mock import patch
from api.result import *
from api.lib.functional import Maybe


class ResultsTests(unittest.TestCase):

    def test_set_origin(self):
        actual = set_origin("foo")
        self.assertEqual("foo", actual["origin"])

    @patch('api.result.get_travel_time')
    def test_add_journey_time(self, mock_gtt):
        mock_gtt.return_value = Maybe(10)
        actual = add_journey_time("foo", {"origin": "bar"})
        self.assertEqual(10, actual["journeyTime"])

    @patch('api.result.get_travel_time')
    def test_add_journey_time_withNone(self, mock_gtt):
        mock_gtt.return_value = Maybe(None)
        actual = add_journey_time("foo", {"origin": "bar"})
        self.assertEqual(None, actual["journeyTime"])

    def test_validate_result(self):
        self.assertTrue(validate_result({"origin": "foo", "journeyTime": 5}))
        self.assertFalse(validate_result({"origin": "foo", "journeyTime": None}))
