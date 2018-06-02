import unittest
from typing import Tuple

from peewee import SqliteDatabase

from api.data import Station, JourneyTime, Travelcard, SeasonTicket
from api.tests import helpers

test_db = SqliteDatabase(':memory:')


class DBTestCase(unittest.TestCase):

    _models = [Station, JourneyTime, Travelcard, SeasonTicket]

    def setUp(self):
        for model in self._models: model.bind(test_db)
        test_db.create_tables(self._models)

        self.all_stations = self.setUp_station_data()
        self.fooStation = self.all_stations[0]
        self.barStation = self.all_stations[1]
        self.bazStation = self.all_stations[2]

        self.all_journeys = self.setUp_journey_time_data()

        self.travelcards = self.setUp_travelcard_data()
        self.season_tickets = self.setUp_season_ticket_data()

    def tearDown(self):
        test_db.drop_tables(self._models)
        test_db.close()

    def setUp_station_data(self) -> Tuple[Station, ...]:
        stations = helpers.create_station_test_data()
        for station in stations: station.save(force_insert=True)
        return stations

    def setUp_journey_time_data(self) -> Tuple[JourneyTime, ...]:
        journeys = helpers.create_journey_test_data()
        for journey in journeys: journey.save(force_insert=True)
        return journeys

    def setUp_travelcard_data(self) -> Tuple[Travelcard, ...]:
        travelcards = helpers.create_travelcard_test_data()
        for travelcard in travelcards: travelcard.save(force_insert=True)
        return travelcards

    def setUp_season_ticket_data(self) -> Tuple[SeasonTicket, ...]:
        season_tickets = helpers.create_season_ticket_test_data()
        for season_ticket in season_tickets: season_ticket.save(force_insert=True)
        return season_tickets
