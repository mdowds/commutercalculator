import unittest
from api.endpoints.journeys_to import build_result, validate_result
from api.lib.functional import Maybe
from api.data import Station


class JourneysToTests(unittest.TestCase):

    station = Station(sid="FOO", name="Foo Station")

    def test_build_result(self):
        actual = build_result(lambda x: Maybe(10), self.station)

        self.assertEqual("FOO", actual["origin"]["id"])
        self.assertEqual("Foo Station", actual["origin"]["name"])
        self.assertEqual(10, actual["journeyTime"])

    def test_build_result_withNone(self):
        actual = build_result(lambda x: Maybe(None), self.station)
        self.assertEqual("FOO", actual["origin"]["id"])
        self.assertEqual("Foo Station", actual["origin"]["name"])
        self.assertEqual(None, actual["journeyTime"])

    def test_validate_result(self):
        self.assertTrue(validate_result({"origin": self.station, "journeyTime": 5}))
        self.assertFalse(validate_result({"origin": self.station, "journeyTime": None}))
        self.assertFalse(validate_result({"origin": None, "journeyTime": 5}))
