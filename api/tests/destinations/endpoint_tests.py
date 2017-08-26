import unittest

from peewee import SqliteDatabase
from playhouse.test_utils import test_database

import api.tests.helpers as helpers
from api.destinations.endpoint import *
from api.destinations.endpoint import _get_destinations

test_db = SqliteDatabase(':memory:')


class DestinationsTests(unittest.TestCase):

    def setUp(self):
        self._all_stations = helpers.create_station_test_data()
        for station in self._all_stations: station.save(force_insert=True)

    def tearDown(self):
        Station.delete()

    def run(self, result=None):
        # All queries will be run in `test_db`
        with test_database(test_db, [Station]):
            super(DestinationsTests, self).run(result)

    def test_get_destinations_filters_zone(self):
        self.assertEqual(2, len(_get_destinations()))

    def test_get_destinations_filters_orders(self):
        self.assertEqual("BAR", _get_destinations()[0].sid)
