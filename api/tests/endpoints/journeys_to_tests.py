import unittest
from unittest.mock import patch
from api.endpoints.journeys_to import *
from api.data import Station


class JourneysToTests(unittest.TestCase):

    origin = Station(sid="FOO", name="Foo Station")
    dest = Station(sid="BAR", name="Bar Station")

    @patch("api.endpoints.journeys_to.get_journey_time")
    def test_build_result(self, mock_gjt):
        mock_gjt.return_value = 10
        actual = build_result(self.dest, self.origin)

        self.assertEqual("FOO", actual["origin"]["id"])
        self.assertEqual("Foo Station", actual["origin"]["name"])
        self.assertEqual(10, actual["journeyTime"])

        mock_gjt.return_value = None
        self.assertEqual(None, build_result(self.dest, self.origin)["journeyTime"])

    def test_validate_result(self):
        self.assertTrue(validate_result({"origin": self.origin, "journeyTime": 5}))
        self.assertFalse(validate_result({"origin": self.origin, "journeyTime": None}))
        self.assertFalse(validate_result({"origin": None, "journeyTime": 5}))

    def test_sanitise_input(self):
        self.assertEqual("FOO", sanitise_input("FOO"))
        self.assertEqual("FOO", sanitise_input("foo"))
        self.assertEqual("FOO", sanitise_input("FOO123"))
        self.assertEqual("FOO", sanitise_input("FOO123!"))
        self.assertEqual("FOO", sanitise_input("FOO;"))
