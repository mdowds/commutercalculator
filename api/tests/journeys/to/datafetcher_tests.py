from api.journeys.to.datafetcher import *
from api.tests.dbtestcase import DBTestCase


class DataFetcherTests(DBTestCase):

    def test_get_destination(self):
        self.assertEqual(self.fooStation, get_destination("FOO"))

    def test_get_destination_with_nonexistent(self):
        self.assertRaises(Station.DoesNotExist, get_destination, "NOT")

    def test_get_journey_times(self):
        journeys = get_journey_times(0, 999, self.fooStation)
        self.assertEqual(self.barStation, journeys[0].origin)
        self.assertTrue(journeys[0].time < journeys[1].time)
        self.assertEqual(11, journeys[0].time)

    def test_get_journey_times_with_time_filter(self):
        journeys = get_journey_times(5, 15, self.fooStation)
        for journey in journeys:
            self.assertTrue(15 >= journey.time)
            self.assertTrue(5 <= journey.time)

    def test_get_travelcard_prices(self):
        prices = get_travelcard_prices((self.barStation, self.bazStation), self.fooStation)
        self.assertEqual(1000, prices[0].travelcard.annual_price)
        self.assertEqual(1500, prices[1].travelcard.annual_price)

    def test_get_travelcard_prices_with_border_station(self):
        prices = get_travelcard_prices((self.fooStation, self.bazStation), self.barStation)
        self.assertEqual(1000, prices[0].travelcard.annual_price)
        self.assertEqual(750, prices[1].travelcard.annual_price)

    def test_get_travelcard_prices_with_zoneless_origin(self):
        prices = get_travelcard_prices((self.all_stations[3], self.bazStation), self.fooStation)
        self.assertIsNone(prices[0].travelcard)
        self.assertEqual(1500, prices[1].travelcard.annual_price)

    def test_get_season_ticket_prices(self):
        tickets = get_season_ticket_prices([self.all_stations[3]], self.barStation)
        self.assertEqual(1100, tickets[0].annual_price)
