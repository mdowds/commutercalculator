import unittest

from peewee import SqliteDatabase
from playhouse.test_utils import test_database

from api.endpoints.journeys_to import *
from api.endpoints.journeys_to import _get_destination, _build_result, _sanitise_input, _build_output, _create_error, _get_journey_times, _parse_args, _get_journey_prices
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
        self._bazStation = self._all_stations[2]

        self._all_journeys = helpers.create_journey_test_data()
        for journey in self._all_journeys: journey.save(force_insert=True)

        self._travelcards = helpers.create_travelcard_test_data()
        for travelcard in self._travelcards: travelcard.save(force_insert=True)

    def tearDown(self):
        Station.delete()
        JourneyTime.delete()
        Travelcard.delete()

    def run(self, result=None):
        # All queries will be run in `test_db`
        with test_database(test_db, [Station, JourneyTime, Travelcard]):
            super(JourneysToTests, self).run(result)

    def test_get_destination(self):
        self.assertEqual(self._fooStation, _get_destination("FOO"))

    def test_get_destination_with_nonexistent(self):
        self.assertRaises(Station.DoesNotExist, _get_destination, "NOT")

    def test_build_result(self):
        actual = _build_result(JourneyResult(self._fooStation, 10, 1000))

        self.assertEqual("FOO", actual["origin"]["id"])
        self.assertEqual("Foo", actual["origin"]["name"])
        self.assertEqual(10, actual["journeyTime"])
        self.assertEqual(1000, actual["seasonTicket"]["price"])

    def test_build_result_with_no_price(self):
        actual = _build_result(JourneyResult(self._fooStation, 10, NO_PRICE_FOUND))
        self.assertIsNone(actual["seasonTicket"]["price"])

    def test_sanitise_input(self):
        self.assertEqual("FOO", _sanitise_input("FOO"))
        self.assertEqual("FOO", _sanitise_input("foo"))
        self.assertEqual("FOO", _sanitise_input("FOO123"))
        self.assertEqual("FOO", _sanitise_input("FOO123!"))
        self.assertEqual("FOO", _sanitise_input("FOO;"))

    def test_build_output(self):
        results = JourneyResults(self._barStation, (JourneyResult(self._fooStation, 10, 1000), JourneyResult(self._bazStation, 10, 1000)))
        output = _build_output(Either(results))

        self.assertEqual("BAR", output["destination"]["id"])
        self.assertEqual("Bar", output["destination"]["name"])
        self.assertEqual("FOO", output["results"][0]["origin"]["id"])
        self.assertEqual(10, output["results"][0]["journeyTime"])
        self.assertEqual(1000, output["results"][0]["seasonTicket"]["price"])

    def test_build_output_with_error(self):
        output = _build_output(Either(None, Station.DoesNotExist()))
        self.assertEqual("No station found", output["error"])

        output = _build_output(Either(None, Exception()))
        self.assertEqual("Unknown error", output["error"])

    def test_create_error(self):
        self.assertEqual({"error": "Some error"}, _create_error("Some error"))

    def test_get_journey_times(self):
        journeys = _get_journey_times(DEFAULT_MIN_TIME, DEFAULT_MAX_TIME, self._fooStation).results
        self.assertEqual(self._barStation, journeys[0].origin)
        self.assertTrue(journeys[0].time < journeys[1].time)
        self.assertEqual(11, journeys[0].time)

    def test_get_journey_times_with_time_filter(self):
        journeys = _get_journey_times(5, 15, self._fooStation).results
        for journey in journeys:
            self.assertTrue(15 >= journey.time)
            self.assertTrue(5 <= journey.time)

    def test_parse_args_with_no_args(self):
        args = _parse_args({'min_time': None, 'max_time': None})
        self.assertEqual(DEFAULT_MIN_TIME, args.min_time)
        self.assertEqual(DEFAULT_MAX_TIME, args.max_time)

    def test_parse_args_with_one_arg(self):
        args_max = _parse_args({'min_time': None, 'max_time': 30})
        self.assertEqual(DEFAULT_MIN_TIME, args_max.min_time)
        self.assertEqual(30, args_max.max_time)

        args_min = _parse_args({'min_time': 10, 'max_time': None})
        self.assertEqual(10, args_min.min_time)
        self.assertEqual(DEFAULT_MAX_TIME, args_min.max_time)

    def test_parse_args_with_two_args(self):
        args = _parse_args({'min_time': 5, 'max_time': 60})
        self.assertEqual(5, args.min_time)
        self.assertEqual(60, args.max_time)

    def test_parse_args_with_negative(self):
        args_max = _parse_args({'min_time': -5, 'max_time': -10})
        self.assertEqual(DEFAULT_MIN_TIME, args_max.min_time)
        self.assertEqual(DEFAULT_MAX_TIME, args_max.max_time)

    def test_get_journey_prices(self):
        existing_journeys = (JourneyResult(self._barStation, 10, -1), JourneyResult(self._bazStation, 15, -1))
        existing_results = JourneyResults(self._fooStation, existing_journeys)

        new_results = _get_journey_prices(existing_results).results

        self.assertEqual(len(existing_results), len(new_results))
        self.assertEqual(existing_results.results[0].origin.sid, new_results[0].origin.sid)
        self.assertEqual(1000, new_results[0].price)
        self.assertEqual(1500, new_results[1].price)

    def test_get_journey_prices_with_border_station(self):
        existing_journeys = (JourneyResult(self._fooStation, 10, -1), JourneyResult(self._bazStation, 15, -1))
        existing_results = JourneyResults(self._barStation, existing_journeys)

        new_results = _get_journey_prices(existing_results).results

        self.assertEqual(1000, new_results[0].price)
        self.assertEqual(750, new_results[1].price)

    def test_get_journey_prices_with_zoneless_origin(self):
        existing_journeys = (JourneyResult(self._all_stations[3], 10, -1), JourneyResult(self._bazStation, 15, -1))
        existing_results = JourneyResults(self._fooStation, existing_journeys)

        new_results = _get_journey_prices(existing_results).results

        self.assertEqual(-1, new_results[0].price)
        self.assertEqual(1500, new_results[1].price)