from fnplus import tfilter

from api.journeys.to.endpoint import *
from api.journeys.to.endpoint import _sanitise_input, _build_output, _parse_args
from api.tests.dbtestcase import DBTestCase


class EndpointTests(DBTestCase):

    def setUp(self):
        self._all_stations = self.setUp_station_data()
        self._fooStation = self._all_stations[0]
        self._barStation = self._all_stations[1]
        self._bazStation = self._all_stations[2]

        self._all_journeys = self.setUp_journey_time_data()

        self._travelcards = self.setUp_travelcard_data()
        self._season_tickets = self.setUp_season_ticket_data()

    def test_sanitise_input(self):
        self.assertEqual("FOO", _sanitise_input("FOO"))
        self.assertEqual("FOO", _sanitise_input("foo"))
        self.assertEqual("FOO", _sanitise_input("FOO123"))
        self.assertEqual("FOO", _sanitise_input("FOO123!"))
        self.assertEqual("FOO", _sanitise_input("FOO;"))

    def test_build_output(self):
        journey_times = tfilter(lambda jt: jt.destination == 'BAR', self._all_journeys)
        journey_prices = (
            TravelcardForJourney(self._fooStation, self._barStation, self._travelcards[0]),
            TravelcardForJourney(self._bazStation, self._barStation, self._travelcards[1])
        )
        output = _build_output(Either(self._barStation), Either(journey_times), Either(journey_prices), Either(self._season_tickets))

        self.assertEqual("BAR", output["destination"]["id"])
        self.assertEqual("Bar", output["destination"]["name"])
        self.assertEqual("FOO", output["results"][0]["origin"]["id"])
        self.assertEqual(12, output["results"][0]["journeyTime"])
        self.assertEqual(1, output["results"][0]["seasonTickets"]["travelcard"]["minZone"])
        self.assertEqual(1, output["results"][0]["seasonTickets"]["travelcard"]["maxZone"])
        self.assertEqual(1000, output["results"][0]["seasonTickets"]["travelcard"]["price"])
        self.assertEqual(1100, output["results"][1]["seasonTickets"]["seasonTicket"]["price"])

    def test_build_output_with_error(self):
        no_station_error = Either(None, Station.DoesNotExist())
        output = _build_output(no_station_error, no_station_error, no_station_error, no_station_error)
        self.assertEqual("No station found", output["error"])

        generic_error = Either(None, Exception())
        output = _build_output(generic_error, generic_error, generic_error, generic_error)
        self.assertEqual("Unknown error", output["error"])

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
