import unittest
from api.endpoints.journeys_to import _build_result, _sanitise_input, Station, JourneyTimeResult, _build_output


class JourneysToTests(unittest.TestCase):

    origin = Station(sid="FOO", name="Foo Station")
    dest = Station(sid="BAR", name="Bar Station")

    def test_build_result(self):
        actual = _build_result(JourneyTimeResult(self.origin, 10))

        self.assertEqual("FOO", actual["origin"]["id"])
        self.assertEqual("Foo Station", actual["origin"]["name"])
        self.assertEqual(10, actual["journeyTime"])

    def test_sanitise_input(self):
        self.assertEqual("FOO", _sanitise_input("FOO"))
        self.assertEqual("FOO", _sanitise_input("foo"))
        self.assertEqual("FOO", _sanitise_input("FOO123"))
        self.assertEqual("FOO", _sanitise_input("FOO123!"))
        self.assertEqual("FOO", _sanitise_input("FOO;"))

    def test_build_output(self):
        results = [{"origin": {"id": "FOO", "name": "Foo Station"}, "journeyTime": 10}]

        self.assertEqual("BAR", _build_output(self.dest, results)["destination"]["id"])
        self.assertEqual("Bar Station", _build_output(self.dest, results)["destination"]["name"])
        self.assertEqual(results, _build_output(self.dest, results)["results"])