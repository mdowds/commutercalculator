import unittest

from peewee import SqliteDatabase
from playhouse.test_utils import test_database

from api.endpoints.journeys_to import *
from api.endpoints.journeys_to import _get_destination, _build_result, _sanitise_input, _build_output, _create_error, _get_journey_times
import api.tests.helpers as helpers


test_db = SqliteDatabase(':memory:')


class JourneysToTests(unittest.TestCase):

    _origin = Station(sid="FOO", name="Foo Station")
    _dest = Station(sid="BAR", name="Bar Station")

    def setUp(self):
        self._all_stations = helpers.create_station_test_data()
        for station in self._all_stations: station.save(force_insert=True)
        self._fooStation = self._all_stations[0]
        self._barStation = self._all_stations[1]

        self._all_journeys = helpers.create_journey_test_data()
        for journey in self._all_journeys: journey.save(force_insert=True)

    def tearDown(self):
        Station.delete()
        JourneyTime.delete()

    def run(self, result=None):
        # All queries will be run in `test_db`
        with test_database(test_db, [Station, JourneyTime]):
            super(JourneysToTests, self).run(result)

    def test_get_destination(self):
        self.assertEqual(self._fooStation, _get_destination("FOO"))

    def test_get_destination_with_nonexistent(self):
        self.assertRaises(Station.DoesNotExist, _get_destination, "NOT")

    def test_build_result(self):
        actual = _build_result(JourneyTimeResult(self._fooStation, 10))

        self.assertEqual("FOO", actual["origin"]["id"])
        self.assertEqual("Foo", actual["origin"]["name"])
        self.assertEqual(10, actual["journeyTime"])

    def test_sanitise_input(self):
        self.assertEqual("FOO", _sanitise_input("FOO"))
        self.assertEqual("FOO", _sanitise_input("foo"))
        self.assertEqual("FOO", _sanitise_input("FOO123"))
        self.assertEqual("FOO", _sanitise_input("FOO123!"))
        self.assertEqual("FOO", _sanitise_input("FOO;"))

    def test_build_output(self):
        results = ({"origin": {"id": "FOO", "name": "Foo Station"}, "journeyTime": 10})
        output = _build_output(self._barStation, Either(results))

        self.assertEqual("BAR", output["destination"]["id"])
        self.assertEqual("Bar", output["destination"]["name"])
        self.assertEqual(results, output["results"])

    def test_build_output_with_error(self):
        output = _build_output(self._barStation, Either(None, Station.DoesNotExist()))
        self.assertEqual("No station found", output["error"])

        output = _build_output(self._barStation, Either(None, Exception()))
        self.assertEqual("Unknown error", output["error"])

    def test_create_error(self):
        self.assertEqual({"error": "Some error"}, _create_error("Some error"))

    def test_get_journey_times(self):
        journeys = _get_journey_times(self._fooStation)
        self.assertEqual(self._barStation, journeys[0].origin)
        self.assertTrue(journeys[0].time < journeys[1].time)
        self.assertEqual(11, journeys[0].time)
