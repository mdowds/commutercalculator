from api.journeys.to.datafetcher import *
from api.tests.dbtestcase import DBTestCase


class DataFetcherTests(DBTestCase):

    def setUp(self):
        self._all_stations = self.setUp_station_data()
        self._fooStation = self._all_stations[0]
        self._barStation = self._all_stations[1]
        self._bazStation = self._all_stations[2]

        self._all_journeys = self.setUp_journey_time_data()

        self._travelcards = self.setUp_travelcard_data()

    def test_get_destination(self):
        self.assertEqual(self._fooStation, get_destination("FOO"))

    def test_get_destination_with_nonexistent(self):
        self.assertRaises(Station.DoesNotExist, get_destination, "NOT")

    def test_get_journey_times(self):
        journeys = get_journey_times(0, 999, self._fooStation)
        self.assertEqual(self._barStation, journeys[0].origin)
        self.assertTrue(journeys[0].time < journeys[1].time)
        self.assertEqual(11, journeys[0].time)

    def test_get_journey_times_with_time_filter(self):
        journeys = get_journey_times(5, 15, self._fooStation)
        for journey in journeys:
            self.assertTrue(15 >= journey.time)
            self.assertTrue(5 <= journey.time)

    def test_get_travelcard_prices(self):
        prices = get_travelcard_prices((self._barStation, self._bazStation), self._fooStation)
        self.assertEqual(1000, prices[0].travelcard.annual_price)
        self.assertEqual(1500, prices[1].travelcard.annual_price)

    def test_get_journey_prices_with_border_station(self):
        prices = get_travelcard_prices((self._fooStation, self._bazStation), self._barStation)
        self.assertEqual(1000, prices[0].travelcard.annual_price)
        self.assertEqual(750, prices[1].travelcard.annual_price)

    def test_get_journey_prices_with_zoneless_origin(self):
        prices = get_travelcard_prices((self._all_stations[3], self._bazStation), self._fooStation)
        self.assertIsNone(prices[0].travelcard)
        self.assertEqual(1500, prices[1].travelcard.annual_price)
