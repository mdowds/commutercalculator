import unittest
from typing import Tuple

from peewee import SqliteDatabase
from playhouse.test_utils import test_database

from api.data import Station, JourneyTime, Travelcard
from api.tests import helpers


class DBTestCase(unittest.TestCase):

    test_db = SqliteDatabase(':memory:')

    def tearDown(self):
        Station.delete()
        JourneyTime.delete()
        Travelcard.delete()

    def run(self, result=None):
        # All queries will be run in `test_db`
        with test_database(self.test_db, [Station, JourneyTime, Travelcard]):
            super(DBTestCase, self).run(result)

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
