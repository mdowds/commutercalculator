from peewee import SqliteDatabase

from api.destinations.endpoint import _get_destinations
from api.tests.dbtestcase import DBTestCase

test_db = SqliteDatabase(':memory:')


class DestinationsTests(DBTestCase):

    def test_get_destinations_filters_zone(self):
        self.assertEqual(2, len(_get_destinations()))

    def test_get_destinations_filters_orders(self):
        self.assertEqual("BAR", _get_destinations()[0].sid)
